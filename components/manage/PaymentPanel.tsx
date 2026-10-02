"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { IconCheck, IconLock, IconShield } from "@/components/ui/Icons";
import { Rich } from "@/components/ui/Rich";
import { api, ApiError, errorCode } from "@/lib/api";
import { useI18n } from "@/lib/i18n/client";
import { rememberEmail, useRememberedEmail } from "@/lib/remembered-email";
import { PLAN } from "@/lib/site";
import type { CodeView, PaymentMode } from "@/lib/types";
import { looksLikeEmail, StripeCheckout, type Prices } from "./StripeCheckout";

/**
 * Activating (or reactivating) a code: our Stripe payment form, open as soon as the page loads, with the email
 * field and the consent box above it – the same as on DoneSignIn. In developer mode without a Stripe key, a demo
 * button stands in for the payment.
 */
export function PaymentPanel({
  code,
  firstActivation,
  mode,
  stripeKey,
  onActivated,
  showTitle = true,
}: {
  code: CodeView;
  firstActivation: boolean;
  /** The card above already says “Activate your QR code” for a new code. */
  showTitle?: boolean;
  mode: PaymentMode;
  stripeKey: string;
  onActivated: (next: CodeView) => void;
}) {
  const { t, l, lang, fill, money, error: errorText } = useI18n();
  const P = t.manage.paywall;
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  // Typing replaces the address remembered from an earlier payment.
  const remembered = useRememberedEmail();
  const [typed, setEmail] = useState<string | null>(null);
  const email = typed ?? remembered;
  const [consent, setConsent] = useState(false);
  const [consentWarning, setConsentWarning] = useState(false);
  const [emailWarning, setEmailWarning] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const requested = useRef(false);
  const live = mode === "stripe" && !!stripeKey;

  // The payment form opens with the page: the code's Checkout Session is fetched once (even under StrictMode).
  // If its last payment was never recorded, the code comes back activated instead.
  useEffect(() => {
    if (!live || requested.current) return;
    requested.current = true;
    api<{ clientSecret?: string; code?: CodeView }>(`/api/codes/${code.token}/billing`, "POST", { action: "checkout", lang })
      .then((res) => {
        if (res.code) onActivated(res.code);
        else if (res.clientSecret) setClientSecret(res.clientSecret);
      })
      .catch((err) => setError(errorText(errorCode(err))));
  }, [live, code.token, lang, onActivated, errorText]);

  const staticPrices: Prices = {
    today: money(firstActivation ? PLAN.introCents : PLAN.monthlyCents),
    monthly: money(PLAN.monthlyCents),
  };
  const links = { terms: l("/terms"), privacy: l("/privacy") };

  const priceRow = (prices: Prices) => (
    <div className="flex items-baseline justify-between gap-4 border-y border-ink/10 py-4">
      <span className="font-semibold">{firstActivation ? fill(P.priceIntro) : P.priceMonthly}</span>
      <span className="display text-4xl leading-none tabular-nums">{prices.today}</span>
    </div>
  );

  const consentBox = (
    <>
      <label
        className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-3.5 text-[13px] leading-relaxed transition-colors ${
          consentWarning && !consent ? "border-coral bg-coral-soft/50" : "border-ink/10 bg-paper/70"
        }`}
      >
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => {
            setConsent(e.target.checked);
            setConsentWarning(false);
          }}
          className="peer sr-only"
        />
        <span
          className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border-[1.5px] transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-kobalt ${
            consent ? "border-ink bg-ink text-lime" : "border-ink/30 bg-white"
          }`}
          aria-hidden
        >
          {consent && <IconCheck className="size-3.5" strokeWidth={3.5} />}
        </span>
        <span className="text-ink-2">
          <Rich text={P.consent} links={links} />
        </span>
      </label>
      <AnimatePresence>
        {consentWarning && !consent && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden text-sm font-medium text-coral-deep"
            role="alert"
          >
            {P.consentNeeded}
          </motion.p>
        )}
      </AnimatePresence>
    </>
  );

  const emailField = (
    <label className="block space-y-1.5 pt-1">
      <span className="text-[13px] font-semibold text-ink-2">{P.email}</span>
      <input
        ref={emailRef}
        type="email"
        autoComplete="email"
        placeholder={P.emailPlaceholder}
        value={email}
        aria-invalid={emailWarning}
        onChange={(e) => {
          setEmail(e.target.value);
          setEmailWarning(false);
        }}
        className={`field ${emailWarning ? "!border-coral" : ""}`}
      />
      <span className={`block text-xs ${emailWarning ? "font-medium text-coral-deep" : "text-muted"}`}>
        {emailWarning ? t.errors.invalid_email : P.emailHint}
      </span>
    </label>
  );

  const emailMissing = () => {
    setEmailWarning(true);
    emailRef.current?.focus();
  };

  async function paid(sessionId: string) {
    if (looksLikeEmail(email)) rememberEmail(email.trim());
    try {
      const { code: next } = await api(`/api/codes/${code.token}/billing`, "POST", { action: "complete", sessionId, lang });
      onActivated(next);
    } catch (err) {
      setError(errorText(err instanceof ApiError ? err.code : "payment_incomplete"));
    }
  }

  async function demoActivate() {
    if (!consent) {
      setConsentWarning(true);
      return;
    }
    setBusy(true);
    try {
      const { code: next } = await api(`/api/codes/${code.token}/demo`, "POST", { action: "subscribe" });
      onActivated(next);
    } catch (err) {
      setError(errorText(errorCode(err)));
    }
    setBusy(false);
  }

  const renewal = fill(firstActivation ? P.renewal : P.renewalReactivate);

  return (
    <div className="mt-6 rounded-3xl border border-ink/10 bg-white p-5 shadow-[var(--shadow-soft)] sm:p-6">
      {showTitle && <h3 className="display mb-4 text-2xl leading-tight">{firstActivation ? P.titleActivate : P.titleReactivate}</h3>}
      <p className="text-[13px] font-semibold tracking-wide text-muted uppercase">{P.includes}</p>
      <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
        {P.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-[14px] text-ink-2">
            <IconCheck className="mt-0.5 size-4 shrink-0 text-kobalt" strokeWidth={3} />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-5 space-y-3">
        {mode === "off" || (mode === "stripe" && !stripeKey) ? (
          <>
            {priceRow(staticPrices)}
            <p className="rounded-2xl bg-sun-soft p-4 text-sm text-ink">{P.notConfigured}</p>
          </>
        ) : mode === "demo" ? (
          <>
            {priceRow(staticPrices)}
            <p className="rounded-2xl border-2 border-dashed border-sun bg-sun-soft p-3.5 text-[13px] leading-relaxed">{P.demo}</p>
            {consentBox}
            <button type="button" className="btn btn-primary w-full py-3.5" disabled={busy} onClick={() => void demoActivate()}>
              {P.demoButton}
            </button>
          </>
        ) : clientSecret ? (
          <StripeCheckout
            stripeKey={stripeKey}
            clientSecret={clientSecret}
            consent={consent}
            onConsentMissing={() => setConsentWarning(true)}
            email={email}
            onEmailMissing={emailMissing}
            onPaid={(sessionId) => void paid(sessionId)}
            renderPrices={(prices) => (
              <>
                {priceRow(prices)}
                {emailField}
                {consentBox}
                <p className="pt-1 text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">{P.methods}</p>
              </>
            )}
          />
        ) : (
          <>
            {priceRow(staticPrices)}
            {!error && (
              <p className="flex items-center gap-2 py-6 text-sm text-muted">
                <span className="inline-block size-4 animate-spin rounded-full border-2 border-current border-r-transparent" aria-hidden />
                {P.loading}
              </p>
            )}
          </>
        )}

        {error && <p className="text-sm font-medium text-coral-deep">{error}</p>}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 border-t border-ink/10 pt-4 text-xs text-muted">
        <span className="flex items-center gap-1.5">
          <IconLock className="size-3.5" /> {P.ssl}
        </span>
        <span className="flex items-center gap-1.5">
          <IconShield className="size-3.5" /> {P.stripe}
        </span>
        <span className="flex items-center gap-1.5">
          <IconCheck className="size-3.5" /> {P.cancelAnytime}
        </span>
      </div>
      <p className="mt-3 rounded-2xl bg-paper p-3.5 text-[12.5px] leading-relaxed text-muted">{renewal}</p>
    </div>
  );
}
