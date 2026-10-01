import "server-only";
import Stripe from "stripe";
import { applySubscription, getById, getBySubscription, type CodeRow } from "./codes";
import { paymentMode } from "./mode";
import { localePath, type Locale } from "@/lib/i18n/config";
import { fill } from "@/lib/i18n/format";
import { getDictionary } from "@/lib/i18n/server";
import { brand, DAY, PLAN } from "@/lib/site";
import { isSubscribed } from "@/lib/status";
import type { SubStatus } from "@/lib/types";

// Stripe – the same setup as GetProCV / DoneSignIn / ConvertPDFNow, which share the Stripe account.
// Everything that belongs to this site is tagged `metadata.app = "generatemyqrcodes"`: our customers,
// subscriptions, product, prices and portal configuration.
//
// Every QR code has its own subscription: {introDays} days for {introCents} (a trial plus a one-off fee on
// the first invoice), then {monthlyCents} a month. A code that was live before is reactivated without the
// introductory days. The payment form is our own page (Checkout Session, ui_mode "elements").
//
// Without a Stripe key, in development, a demo activation stands in for the payment; in production the
// subscription is switched off.

export { paymentMode };

export const APP = "generatemyqrcodes";
const PRODUCT_ID = "generatemyqrcodes";
const LOOKUP = { intro: "generatemyqrcodes_intro_eur_100", monthly: "generatemyqrcodes_monthly_eur_399" } as const;

let client: Stripe | null = null;

export function stripe() {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) throw new Error("payments_off");
  client ??= new Stripe(key, { appInfo: { name: brand.name } });
  return client;
}

const ours = (object: { metadata?: Stripe.Metadata | null }) => object.metadata?.app === APP;

/* --------------------------------- prices --------------------------------- */

let pricesPromise: Promise<{ intro: string; monthly: string }> | null = null;

async function ensureProduct() {
  try {
    // The name appears on the payment form, on receipts and in the customer portal.
    const product = await stripe().products.retrieve(PRODUCT_ID);
    if (product.name !== brand.name) await stripe().products.update(PRODUCT_ID, { name: brand.name });
  } catch (error) {
    if ((error as { code?: string }).code !== "resource_missing") throw error;
    await stripe().products.create({
      id: PRODUCT_ID,
      name: brand.name,
      description: getDictionary("en").billing.productDescription,
      metadata: { app: APP },
    });
  }
}

async function loadPrices() {
  const fromEnv = { intro: process.env.STRIPE_PRICE_INTRO, monthly: process.env.STRIPE_PRICE_MONTHLY };
  if (fromEnv.intro && fromEnv.monthly) return { intro: fromEnv.intro, monthly: fromEnv.monthly };

  const { data } = await stripe().prices.list({ lookup_keys: Object.values(LOOKUP), active: true, limit: 10 });
  const byKey = new Map(data.map((price) => [price.lookup_key, price.id]));
  let intro = fromEnv.intro ?? byKey.get(LOOKUP.intro);
  let monthly = fromEnv.monthly ?? byKey.get(LOOKUP.monthly);
  if (!intro || !monthly) await ensureProduct();
  if (!intro) {
    const price = await stripe().prices.create({
      product: PRODUCT_ID,
      currency: PLAN.currency.toLowerCase(),
      unit_amount: PLAN.introCents,
      lookup_key: LOOKUP.intro,
      nickname: `${PLAN.introDays}-day intro fee`,
      metadata: { app: APP },
    });
    intro = price.id;
  }
  if (!monthly) {
    const price = await stripe().prices.create({
      product: PRODUCT_ID,
      currency: PLAN.currency.toLowerCase(),
      unit_amount: PLAN.monthlyCents,
      recurring: { interval: "month" },
      lookup_key: LOOKUP.monthly,
      nickname: "Monthly per QR code",
      metadata: { app: APP },
    });
    monthly = price.id;
  }
  return { intro, monthly };
}

/** The two prices – created in Stripe on first use (or taken from STRIPE_PRICE_INTRO / STRIPE_PRICE_MONTHLY). */
function prices() {
  pricesPromise ??= loadPrices().catch((error) => {
    pricesPromise = null;
    throw error;
  });
  return pricesPromise;
}

/* -------------------------------- customers ------------------------------- */

export const normalizeEmail = (email: string) => email.trim().toLowerCase();
export const isEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length <= 254;

/** Our customer with this email address (the newest), or a new one with our tag. */
async function ensureCustomer(email: string, lang: Locale) {
  const { data } = await stripe().customers.list({ email: normalizeEmail(email), limit: 20 });
  const existing = data.filter((customer) => !customer.deleted && ours(customer)).sort((a, b) => b.created - a.created)[0];
  if (existing) return existing.id;
  const created = await stripe().customers.create({
    email: normalizeEmail(email),
    preferred_locales: [lang],
    metadata: { app: APP },
  });
  return created.id;
}

/* ------------------------------ subscriptions ----------------------------- */

/** Since the 2025 API versions the period end is on the subscription items. */
const periodEnd = (s: Stripe.Subscription) => {
  const legacy = (s as unknown as { current_period_end?: number }).current_period_end;
  const end = s.items.data[0]?.current_period_end ?? legacy;
  return end ? end * 1000 : null;
};

/** Writes a subscription’s state onto its code. A late event of an older, ended subscription never overwrites a newer one. */
async function sync(sub: Stripe.Subscription, codeId?: string | null) {
  if (!ours(sub)) return;
  const id = codeId || sub.metadata?.code || (await getBySubscription(sub.id))?.id;
  const row = id ? await getById(id) : null;
  if (!row) return;
  if (row.sub_id && row.sub_id !== sub.id && !isSubscribed(sub.status as SubStatus)) return;
  await applySubscription(row.id, {
    id: sub.id,
    status: sub.status as SubStatus,
    periodEnd: periodEnd(sub),
    cancelAtPeriodEnd: sub.cancel_at_period_end || !!sub.cancel_at,
    customer: typeof sub.customer === "string" ? sub.customer : sub.customer?.id,
  });
}

/**
 * A Checkout Session for our own payment form. A code activated for the first time gets the
 * introductory days (trial + one-off fee); a reactivated code starts monthly right away.
 * Returns the client secret for the payment form.
 */
export async function createCheckout(row: CodeRow, email: string, origin: string, lang: Locale) {
  if (paymentMode() !== "stripe") throw new Error("payments_off");
  const [{ intro, monthly }, customer] = await Promise.all([prices(), ensureCustomer(email, lang)]);
  const firstActivation = row.paid_until == null;
  const back = `${origin}${localePath(lang, `/manage/${row.token}`)}`;

  const session = await stripe().checkout.sessions.create({
    ui_mode: "elements",
    mode: "subscription",
    customer,
    client_reference_id: row.id,
    line_items: firstActivation
      ? [
          { price: monthly, quantity: 1 },
          { price: intro, quantity: 1 },
        ]
      : [{ price: monthly, quantity: 1 }],
    subscription_data: {
      ...(firstActivation ? { trial_period_days: PLAN.introDays } : {}),
      description: fill(getDictionary(lang).billing.subscriptionDescription, { brand: brand.name, id: row.id }),
      metadata: { app: APP, code: row.id },
    },
    billing_address_collection: "auto",
    // Stripe replaces the literal {CHECKOUT_SESSION_ID}, so it must not be URL-encoded.
    return_url: `${back}?checkout_session_id={CHECKOUT_SESSION_ID}`,
    metadata: { app: APP, code: row.id, locale: lang },
  });
  if (!session.client_secret) throw new Error("payment_failed");
  return session.client_secret;
}

/**
 * After the payment (or the return from a payment method that left the page): reads the Checkout Session
 * and writes the new subscription onto the code. Returns false if it is not a completed payment of this code.
 */
export async function completeCheckout(sessionId: string, row: CodeRow) {
  if (paymentMode() !== "stripe" || !/^cs_[A-Za-z0-9_]+$/.test(sessionId)) return false;
  const session = await stripe().checkout.sessions.retrieve(sessionId, { expand: ["subscription"] });
  if (session.status !== "complete" || !ours(session) || session.metadata?.code !== row.id) return false;
  const sub = session.subscription;
  if (!sub || typeof sub === "string") return false;
  await sync(sub, row.id);
  return true;
}

/** Cancel at the end of the paid period (cancel = true), or withdraw the cancellation. */
export async function setCancelAtPeriodEnd(row: CodeRow, cancel: boolean) {
  if (!row.sub_id) throw new Error("no_subscription");
  if (row.sub_id.startsWith("demo_")) {
    await applySubscription(row.id, {
      id: row.sub_id,
      status: row.sub_status ?? "active",
      periodEnd: row.paid_until,
      cancelAtPeriodEnd: cancel,
    });
    return;
  }
  await sync(await stripe().subscriptions.update(row.sub_id, { cancel_at_period_end: cancel }), row.id);
}

/** Ends the subscription immediately (when the code is deleted), so a deleted code is not charged. */
export async function cancelImmediately(row: CodeRow) {
  if (!row.sub_id || row.sub_id.startsWith("demo_") || row.sub_status === "canceled") return;
  await stripe().subscriptions.cancel(row.sub_id);
}

/* ----------------------------- customer portal ---------------------------- */

let portalConfig: Promise<string> | null = null;

/** Our own portal configuration (cancel at period end, card change, invoices) – created once. */
function portalConfiguration(origin: string) {
  portalConfig ??= (async () => {
    const { data } = await stripe().billingPortal.configurations.list({ active: true, limit: 100 });
    const existing = data.find((configuration) => configuration.metadata?.app === APP);
    if (existing) return existing.id;
    const created = await stripe().billingPortal.configurations.create({
      metadata: { app: APP },
      business_profile: {
        privacy_policy_url: `${origin}/privacy`,
        terms_of_service_url: `${origin}/terms`,
      },
      features: {
        subscription_cancel: { enabled: true, mode: "at_period_end" },
        payment_method_update: { enabled: true },
        invoice_history: { enabled: true },
        customer_update: { enabled: true, allowed_updates: ["email"] },
      },
    });
    return created.id;
  })().catch((error) => {
    portalConfig = null;
    throw error;
  });
  return portalConfig;
}

/** Stripe customer portal: change the card, download invoices. */
export async function portalUrl(row: CodeRow, origin: string, lang: Locale) {
  if (paymentMode() !== "stripe" || !row.customer_id || row.customer_id.startsWith("demo_")) throw new Error("no_customer");
  const session = await stripe().billingPortal.sessions.create({
    customer: row.customer_id,
    return_url: `${origin}${localePath(lang, `/manage/${row.token}`)}`,
    configuration: await portalConfiguration(origin),
    locale: lang as Stripe.BillingPortal.SessionCreateParams.Locale,
  });
  return session.url;
}

/* --------------------------------- webhook -------------------------------- */

export function verifyWebhook(payload: string, signature: string | null): Stripe.Event | null {
  const secret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  if (!secret || !signature || paymentMode() !== "stripe") return null;
  try {
    return stripe().webhooks.constructEvent(payload, signature, secret);
  } catch {
    return null;
  }
}

export async function handleEvent(event: Stripe.Event) {
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      if (!ours(session)) return;
      const subId = typeof session.subscription === "string" ? session.subscription : session.subscription?.id;
      if (!subId) return;
      await sync(await stripe().subscriptions.retrieve(subId), session.metadata?.code);
      return;
    }
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted":
      await sync(event.data.object);
      return;
    case "invoice.paid": {
      const invoice = event.data.object as Stripe.Invoice & { subscription?: string | null };
      const subId = invoice.parent?.subscription_details?.subscription ?? invoice.subscription;
      const id = typeof subId === "string" ? subId : subId?.id;
      if (id) await sync(await stripe().subscriptions.retrieve(id));
      return;
    }
  }
}

/* ----------------------- developer demo (no Stripe key) ----------------------- */

export async function demoSubscribe(row: CodeRow, now = Date.now()) {
  if (paymentMode() !== "demo") throw new Error("payments_off");
  const firstActivation = row.paid_until == null;
  await applySubscription(row.id, {
    id: row.sub_id?.startsWith("demo_") ? row.sub_id : `demo_${row.id}_${now.toString(36)}`,
    status: firstActivation ? "trialing" : "active",
    periodEnd: now + (firstActivation ? PLAN.introDays : 30) * DAY,
    cancelAtPeriodEnd: false,
    customer: `demo_cus_${row.id}`,
  });
}
