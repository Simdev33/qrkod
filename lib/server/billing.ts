import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { applySubscription, getById, getBySubscription, type CodeRow } from "./codes";
import { paymentMode } from "./mode";
import { brand, DAY, pricing } from "@/lib/site";
import { isSubscribed } from "@/lib/status";
import type { SubStatus } from "@/lib/types";

// Előfizetés: Stripe Checkout (subscription mód), külön npm-csomag nélkül — a Stripe REST API-ja
// form-kódolt kéréseket vár. Minden QR-kód saját, havi 1 $-os előfizetést kap.
//
// Ha a próbaidőből még legalább 49 óra hátravan, a Stripe-előfizetés a próbaidő végéig „trialing”
// állapotban indul, így az első 1 $-t csak a 30. nap után vonja le.
//
// Stripe-kulcs nélkül, fejlesztői módban egy demó fizetőoldal helyettesíti a Stripe-ot, hogy a teljes
// folyamat kipróbálható legyen. Éles módban kulcs nélkül az előfizetés ki van kapcsolva.

const STRIPE_API = "https://api.stripe.com/v1";
const secretKey = () => process.env.STRIPE_SECRET_KEY?.trim() || "";

export { paymentMode };

async function stripe<T>(path: string, init?: { method?: string; body?: URLSearchParams }): Promise<T> {
  const res = await fetch(`${STRIPE_API}${path}`, {
    method: init?.method ?? "GET",
    headers: {
      Authorization: `Bearer ${secretKey()}`,
      ...(init?.body ? { "Content-Type": "application/x-www-form-urlencoded" } : {}),
    },
    body: init?.body,
    cache: "no-store",
  });
  const json = (await res.json()) as T & { error?: { message?: string } };
  if (!res.ok) throw new Error(json.error?.message ?? `Stripe-hiba (${res.status})`);
  return json;
}

type StripeSubscription = {
  id: string;
  object: "subscription";
  status: SubStatus;
  customer: string | { id: string };
  cancel_at_period_end: boolean;
  cancel_at: number | null;
  current_period_end?: number;
  items?: { data?: { current_period_end?: number }[] };
  metadata?: { code?: string };
};

type CheckoutSession = {
  id: string;
  url: string | null;
  client_reference_id: string | null;
  customer: string | null;
  subscription: string | StripeSubscription | null;
  metadata?: { code?: string };
};

/** A 2025-ös API-verziók óta az időszak vége az előfizetés tételein van, régebben magán az előfizetésen. */
const periodEnd = (s: StripeSubscription) => {
  const end = s.items?.data?.[0]?.current_period_end ?? s.current_period_end;
  return end ? end * 1000 : null;
};

async function sync(sub: StripeSubscription, codeId?: string | null) {
  const id = codeId || sub.metadata?.code || (await getBySubscription(sub.id))?.id;
  const row = id ? await getById(id) : null;
  if (!row) return;
  // Egy korábbi, már lezárt előfizetés késve érkező eseménye nem írhatja felül az újat.
  if (row.sub_id && row.sub_id !== sub.id && !isSubscribed(sub.status)) return;
  await applySubscription(row.id, {
    id: sub.id,
    status: sub.status,
    periodEnd: periodEnd(sub),
    cancelAtPeriodEnd: sub.cancel_at_period_end || !!sub.cancel_at,
    customer: typeof sub.customer === "string" ? sub.customer : sub.customer?.id,
  });
}

const TRIAL_MIN_LEAD = 49 * 60 * 60 * 1000;

/** Elég idő van-e még a próbaidőből ahhoz, hogy az első terhelés a próbaidő végére essen. */
export const trialHasLead = (row: CodeRow, now = Date.now()) => row.trial_ends_at - now > TRIAL_MIN_LEAD;

/** A fizetőoldal címe: Stripe Checkout, vagy fejlesztéskor a demó oldal. */
export async function createCheckout(row: CodeRow, origin: string): Promise<string> {
  const mode = paymentMode();
  if (mode === "demo") return `${origin}/fizetes/demo/${row.token}`;
  if (mode === "off") throw new Error("Az előfizetés jelenleg nem érhető el.");

  const manage = `${origin}/kezeles/${row.token}`;
  const body = new URLSearchParams({
    mode: "subscription",
    locale: "hu",
    client_reference_id: row.id,
    "metadata[code]": row.id,
    "subscription_data[metadata][code]": row.id,
    "subscription_data[description]": `${brand.name} QR-kód: ${row.id}`,
    "line_items[0][quantity]": "1",
    "line_items[0][price_data][currency]": pricing.currency,
    "line_items[0][price_data][unit_amount]": String(pricing.monthlyCents),
    "line_items[0][price_data][recurring][interval]": "month",
    "line_items[0][price_data][product_data][name]": `${brand.name} · QR-kód életben tartása`,
    "line_items[0][price_data][product_data][description]": `A(z) ${row.id} kódú QR-kód havi díja. Bármikor lemondható.`,
    success_url: `${manage}?fizetes=siker&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${manage}?fizetes=megszakitva`,
  });
  if (trialHasLead(row)) {
    body.set("subscription_data[trial_end]", String(Math.floor(row.trial_ends_at / 1000)));
  }
  if (row.customer_id) body.set("customer", row.customer_id);

  const session = await stripe<CheckoutSession>("/checkout/sessions", { method: "POST", body });
  if (!session.url) throw new Error("A Stripe nem adott vissza fizetési oldalt.");
  return session.url;
}

/**
 * Visszatéréskor a Stripe-tól kérdezzük le a munkamenetet, így a webhook megérkezése előtt is friss
 * az állapot (és webhook nélkül, helyi fejlesztésnél is működik).
 */
export async function confirmCheckout(sessionId: string, row: CodeRow) {
  if (paymentMode() !== "stripe" || !/^cs_[A-Za-z0-9_]+$/.test(sessionId)) return;
  try {
    const s = await stripe<CheckoutSession>(
      `/checkout/sessions/${encodeURIComponent(sessionId)}?expand[]=subscription`,
    );
    if (s.client_reference_id !== row.id || !s.subscription || typeof s.subscription === "string") return;
    await sync(s.subscription, row.id);
  } catch {
    // A webhook ettől még rendbe teszi.
  }
}

/** Lemondás a kifizetett időszak végére (cancel = true), illetve a lemondás visszavonása. */
export async function setCancelAtPeriodEnd(row: CodeRow, cancel: boolean) {
  if (!row.sub_id) throw new Error("Ehhez a kódhoz nincs előfizetés.");
  if (row.sub_id.startsWith("demo_")) {
    await applySubscription(row.id, {
      id: row.sub_id,
      status: row.sub_status ?? "active",
      periodEnd: row.paid_until,
      cancelAtPeriodEnd: cancel,
    });
    return;
  }
  const sub = await stripe<StripeSubscription>(`/subscriptions/${encodeURIComponent(row.sub_id)}`, {
    method: "POST",
    body: new URLSearchParams({ cancel_at_period_end: String(cancel) }),
  });
  await sync(sub, row.id);
}

/** Azonnali megszüntetés (a kód törlésekor), hogy ne fusson tovább egy törölt kód díja. */
export async function cancelImmediately(row: CodeRow) {
  if (!row.sub_id || row.sub_id.startsWith("demo_") || row.sub_status === "canceled") return;
  await stripe(`/subscriptions/${encodeURIComponent(row.sub_id)}`, { method: "DELETE" });
}

/** Stripe ügyfélportál: bankkártya cseréje, számlák letöltése. */
export async function portalUrl(row: CodeRow, origin: string) {
  if (paymentMode() !== "stripe" || !row.customer_id) throw new Error("Ehhez a kódhoz nincs fizetési fiók.");
  const s = await stripe<{ url: string }>("/billing_portal/sessions", {
    method: "POST",
    body: new URLSearchParams({ customer: row.customer_id, return_url: `${origin}/kezeles/${row.token}`, locale: "hu" }),
  });
  return s.url;
}

/* ---------------- Webhook ---------------- */

type StripeEvent = { id: string; type: string; data: { object: Record<string, unknown> } };

export function verifyWebhook(payload: string, header: string | null): StripeEvent | null {
  const secret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  if (!secret || !header) return null;
  const parts = header.split(",").map((p) => p.split("=") as [string, string]);
  const t = parts.find(([k]) => k === "t")?.[1];
  const signatures = parts.filter(([k]) => k === "v1").map(([, v]) => v);
  if (!t || !signatures.length || Math.abs(Date.now() / 1000 - Number(t)) > 300) return null;
  const expected = Buffer.from(createHmac("sha256", secret).update(`${t}.${payload}`).digest("hex"));
  const ok = signatures.some((sig) => {
    const given = Buffer.from(sig);
    return given.length === expected.length && timingSafeEqual(given, expected);
  });
  if (!ok) return null;
  try {
    return JSON.parse(payload) as StripeEvent;
  } catch {
    return null;
  }
}

export async function handleEvent(event: StripeEvent) {
  const obj = event.data.object;
  switch (event.type) {
    case "checkout.session.completed": {
      const s = obj as unknown as CheckoutSession;
      const subId = typeof s.subscription === "string" ? s.subscription : s.subscription?.id;
      if (!subId) return;
      const sub = await stripe<StripeSubscription>(`/subscriptions/${encodeURIComponent(subId)}`);
      await sync(sub, s.client_reference_id || s.metadata?.code);
      return;
    }
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted":
      await sync(obj as unknown as StripeSubscription);
      return;
    case "invoice.paid":
    case "invoice.payment_succeeded": {
      const inv = obj as {
        subscription?: string | null;
        parent?: { subscription_details?: { subscription?: string } | null } | null;
      };
      const subId = inv.parent?.subscription_details?.subscription ?? inv.subscription;
      if (!subId) return;
      await sync(await stripe<StripeSubscription>(`/subscriptions/${encodeURIComponent(subId)}`));
      return;
    }
  }
}

/* ---------------- Fejlesztői demó (Stripe-kulcs nélkül) ---------------- */

export async function demoSubscribe(row: CodeRow, now = Date.now()) {
  if (paymentMode() !== "demo") throw new Error("A demó fizetés csak fejlesztői módban érhető el.");
  const inTrial = trialHasLead(row, now);
  await applySubscription(row.id, {
    id: row.sub_id?.startsWith("demo_") ? row.sub_id : `demo_${row.id}_${now.toString(36)}`,
    status: inTrial ? "trialing" : "active",
    periodEnd: inTrial ? row.trial_ends_at : now + 30 * DAY,
    cancelAtPeriodEnd: false,
    customer: `demo_cus_${row.id}`,
  });
}
