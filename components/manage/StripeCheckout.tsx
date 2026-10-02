"use client";

import { CheckoutElementsProvider, ExpressCheckoutElement, PaymentElement, useCheckoutElements } from "@stripe/react-stripe-js/checkout";
import {
  loadStripe,
  type Appearance,
  type Stripe,
  type StripeConstructorOptions,
  type StripeExpressCheckoutElementConfirmEvent,
} from "@stripe/stripe-js";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { IconCard, IconLock } from "@/components/ui/Icons";
import { useI18n } from "@/lib/i18n/client";
import { INTL_LOCALE, type Locale } from "@/lib/i18n/config";

// The payment form of a Checkout Session (ui_mode "elements"): express buttons (Apple Pay, Google Pay, PayPal,
// Link) and the card form, which is open from the start. The card can be typed in before the consent is given,
// but nothing is charged without it.

const stripes = new Map<string, Promise<Stripe | null>>();

function stripeFor(key: string, lang: Locale) {
  const id = `${key}:${lang}`;
  let promise = stripes.get(id);
  if (!promise) {
    // developerTools: with test keys Stripe.js would put its "stripe >" badge in a corner of every page.
    promise = loadStripe(key, { locale: lang as StripeConstructorOptions["locale"], developerTools: { assistant: { enabled: false } } });
    stripes.set(id, promise);
  }
  return promise;
}

/** Stripe’s iframes cannot see our CSS, so the brand colours are passed in. */
const appearance: Appearance = {
  theme: "stripe",
  variables: {
    colorPrimary: "#2f45ff",
    colorBackground: "#ffffff",
    colorText: "#16161d",
    colorDanger: "#d63c1f",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
    borderRadius: "14px",
  },
};

export type Prices = { today: string; monthly: string | null };

/** Only the format – the server and Stripe check it again. */
export const looksLikeEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());

type CheckoutProps = {
  consent: boolean;
  onConsentMissing: () => void;
  /** From the field above the form; the card payment uses it, an express payment takes the wallet's address. */
  email: string;
  onEmailMissing: () => void;
  onPaid: (sessionId: string) => void;
  renderPrices: (prices: Prices) => ReactNode;
};

export function StripeCheckout(props: CheckoutProps & { stripeKey: string; clientSecret: string }) {
  const { lang } = useI18n();
  const stripe = useMemo(() => stripeFor(props.stripeKey, lang), [props.stripeKey, lang]);
  const options = useMemo(() => ({ clientSecret: props.clientSecret, elementsOptions: { appearance } }), [props.clientSecret]);
  return (
    <CheckoutElementsProvider stripe={stripe} options={options}>
      <PaymentMethods {...props} />
    </CheckoutElementsProvider>
  );
}

function Spinner() {
  return <span className="inline-block size-4 animate-spin rounded-full border-2 border-current border-r-transparent" aria-hidden />;
}

function PaymentMethods({ consent, onConsentMissing, email, onEmailMissing, onPaid, renderPrices }: CheckoutProps) {
  const state = useCheckoutElements();
  const { lang, t, fill } = useI18n();
  const P = t.manage.paywall;
  // undefined: still loading; false: no express method on this device (the divider is hidden then).
  const [express, setExpress] = useState<boolean>();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Stripe gets the typed address too, so Link's “save my details” box comes pre-filled.
  const checkout = state.type === "success" ? state.checkout : null;
  useEffect(() => {
    const address = email.trim();
    if (!checkout || !looksLikeEmail(address)) return;
    const timer = setTimeout(() => {
      void checkout.updateEmail(address).then((result) => {
        if (result.type === "error") console.warn("[checkout] updateEmail:", result.error.message);
      });
    }, 700);
    return () => clearTimeout(timer);
  }, [checkout, email]);

  if (state.type === "loading") {
    return (
      <p className="flex items-center gap-2 py-6 text-sm text-muted">
        <Spinner /> {P.loading}
      </p>
    );
  }
  if (state.type === "error" || !checkout) {
    return <p className="py-4 text-sm font-medium text-coral-deep">{state.type === "error" ? state.error.message : null}</p>;
  }

  // Amounts are formatted like the rest of the page (Stripe’s own texts show “1,00 EUR” in some languages).
  const money = (minor: number) =>
    new Intl.NumberFormat(INTL_LOCALE[lang], {
      style: "currency",
      currency: checkout.currency.toUpperCase(),
      currencyDisplay: "narrowSymbol",
    }).format(minor / checkout.minorUnitsAmountDivisor);
  const prices: Prices = {
    today: money(checkout.total.total.minorUnitsAmount),
    monthly: checkout.recurring ? money(checkout.recurring.dueNext.total.minorUnitsAmount) : null,
  };

  const finish = async (confirmation: Parameters<typeof checkout.confirm>[0]) => {
    setBusy(true);
    setError(null);
    const result = await checkout.confirm({ redirect: "if_required", ...confirmation });
    if (result.type === "error") {
      setError(result.error.message);
      setBusy(false);
      return;
    }
    onPaid(result.session.id);
  };

  const payByCard = () => {
    if (!consent) return onConsentMissing();
    const address = email.trim();
    if (!looksLikeEmail(address)) return onEmailMissing();
    void finish({ email: address });
  };

  // An express payment takes the address from the wallet (Apple Pay, Google Pay, PayPal, Link).
  const payExpress = (event: StripeExpressCheckoutElementConfirmEvent) => void finish({ expressCheckoutConfirmEvent: event });

  return (
    <div className="space-y-3">
      {renderPrices(prices)}

      <div className={`relative ${express === false ? "hidden" : ""}`}>
        {/* Express buttons cannot be held back, so they stay disabled until the consent is given. */}
        <div className={`transition-opacity ${consent ? "" : "pointer-events-none opacity-45"}`} aria-disabled={!consent}>
          <ExpressCheckoutElement
            options={{
              buttonHeight: 48,
              buttonTheme: undefined,
              paymentMethods: undefined,
              buttonType: { applePay: "plain", googlePay: "plain", paypal: "paypal" },
              layout: { maxColumns: 1, maxRows: 6, overflow: "never" },
              paymentMethodOrder: ["apple_pay", "google_pay", "paypal", "link"],
            }}
            onReady={(event) => setExpress(!!event.availablePaymentMethods)}
            onConfirm={payExpress}
          />
        </div>
        {!consent && <button type="button" aria-label={P.consentNeeded} className="absolute inset-0 cursor-not-allowed" onClick={onConsentMissing} />}
      </div>

      {express && (
        <div className="flex items-center gap-3 pt-1 text-[12px] font-medium text-muted">
          <span className="h-px flex-1 bg-ink/10" />
          <IconCard className="size-4" />
          {P.card}
          <span className="h-px flex-1 bg-ink/10" />
        </div>
      )}

      <div className="space-y-3 rounded-2xl border border-ink/10 bg-white p-4">
        <PaymentElement options={{ layout: "tabs" }} />
        <button
          type="button"
          className={`btn btn-primary w-full py-3.5 transition-opacity ${consent ? "" : "opacity-60"}`}
          disabled={busy}
          onClick={payByCard}
        >
          {busy ? <Spinner /> : <IconLock className="size-4" />}
          {fill(P.pay, { amount: prices.today })}
        </button>
      </div>

      {busy && !error && (
        <p className="flex items-center gap-2 text-sm text-muted">
          <Spinner /> {P.processing}
        </p>
      )}
      {error && <p className="text-sm font-medium text-coral-deep">{error}</p>}
    </div>
  );
}
