"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { IconKey, IconLogout, IconMail } from "@/components/ui/Icons";
import { Rich } from "@/components/ui/Rich";
import { api, errorCode } from "@/lib/api";
import { useI18n } from "@/lib/i18n/client";
import { useRememberedEmail } from "@/lib/remembered-email";
import { SIGNIN } from "@/lib/signin";

// Signing in with an email code on the “My codes” page: subscribers see the codes paid for with their email
// address on any device (the server looks them up through Stripe).

export const SIGN_IN_ID = "sign-in";
const EMAIL_INPUT_ID = "sign-in-email";

function Spinner() {
  return <span className="inline-block size-4 animate-spin rounded-full border-2 border-current border-r-transparent" aria-hidden />;
}

/** Scrolls to the sign-in card and puts the cursor into the email field. */
export function focusSignIn() {
  setTimeout(() => document.getElementById(EMAIL_INPUT_ID)?.focus({ preventScroll: true }), 450);
}

export function SignInCard({ onSignedIn }: { onSignedIn: (email: string) => void }) {
  const { t, lang, fill, error: errorText } = useI18n();
  const A = t.account;
  const remembered = useRememberedEmail();
  const [typed, setEmail] = useState<string | null>(null);
  const email = (typed ?? remembered).trim();
  const [step, setStep] = useState<"email" | "code">("email");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function run(action: () => Promise<void>) {
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      await action();
    } catch (err) {
      setError(errorText(errorCode(err)));
    }
    setBusy(false);
  }

  const send = (e?: FormEvent) => {
    e?.preventDefault();
    const again = step === "code";
    void run(async () => {
      await api("/api/auth/request", "POST", { email, lang });
      setCode("");
      setStep("code");
      if (again) setNotice(A.resent);
    });
  };

  const verify = (e: FormEvent) => {
    e.preventDefault();
    void run(async () => {
      await api("/api/auth/verify", "POST", { code });
      onSignedIn(email.toLowerCase());
    });
  };

  const digits = code.replace(/\D/g, "").length;

  return (
    <div id={SIGN_IN_ID} className="card relative scroll-mt-28 overflow-hidden p-6 sm:p-7">
      <div className="pointer-events-none absolute -top-24 -right-20 size-60 rounded-full bg-lime/30 blur-3xl" />
      <div className="relative">
        <span className="grid size-11 place-items-center rounded-2xl bg-ink text-lime">
          <IconMail className="size-5" />
        </span>
        <h2 className="mt-4 text-xl font-semibold tracking-tight">{A.title}</h2>

        {step === "email" ? (
          <form onSubmit={send}>
            <p className="mt-1 text-[14px] leading-relaxed text-muted">{A.text}</p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <input
                id={EMAIL_INPUT_ID}
                type="email"
                required
                autoComplete="email"
                aria-label={A.email}
                placeholder={t.manage.paywall.emailPlaceholder}
                value={typed ?? remembered}
                onChange={(e) => setEmail(e.target.value)}
                className="field"
              />
              <button type="submit" className="btn btn-primary shrink-0" disabled={busy || !email}>
                {busy ? <Spinner /> : <IconMail className="size-4" />}
                {A.send}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={verify}>
            <p className="mt-1 text-[14px] leading-relaxed text-muted">
              <Rich text={fill(A.sent, { email, minutes: SIGNIN.codeMinutes })} />
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <input
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="[0-9 ]*"
                maxLength={7}
                autoFocus
                required
                aria-label={A.code}
                placeholder="000000"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/[^\d ]/g, ""))}
                className="field text-center font-mono text-xl tracking-[0.4em] placeholder:tracking-[0.4em] sm:max-w-[230px]"
              />
              <button type="submit" className="btn btn-primary shrink-0" disabled={busy || digits !== 6}>
                {busy ? <Spinner /> : <IconKey className="size-4" />}
                {A.verify}
              </button>
            </div>
            <div className="mt-3 flex flex-wrap justify-between gap-2 text-[13px]">
              <button type="button" className="font-semibold text-kobalt hover:underline disabled:opacity-50" onClick={() => send()} disabled={busy}>
                {A.resend}
              </button>
              <button
                type="button"
                className="text-muted hover:text-ink"
                disabled={busy}
                onClick={() => {
                  setStep("email");
                  setError(null);
                  setNotice(null);
                }}
              >
                {A.otherEmail}
              </button>
            </div>
          </form>
        )}

        <AnimatePresence>
          {(error || notice) && (
            <motion.p
              key={error ?? notice}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`overflow-hidden pt-2 text-sm font-medium ${error ? "text-coral-deep" : "text-ink-2"}`}
              role={error ? "alert" : "status"}
            >
              {error ?? notice}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/** Who is signed in, with the sign-out button. */
export function SignedInBar({ email, onSignedOut }: { email: string; onSignedOut: () => void }) {
  const { t, fill, error: errorText } = useI18n();
  const A = t.account;
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function signOut() {
    setBusy(true);
    try {
      await api("/api/account", "DELETE");
      onSignedOut();
    } catch (err) {
      setError(errorText(errorCode(err)));
      setBusy(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-[22px] border border-ink/10 bg-card px-4 py-3 sm:px-5"
    >
      <div className="flex min-w-0 items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-lime text-ink">
          <IconMail className="size-[18px]" />
        </span>
        <div className="min-w-0">
          <div className="truncate text-[15px] text-ink-2">
            <Rich text={fill(A.signedIn, { email })} />
          </div>
          <div className="text-[13px] text-muted">{error ?? A.signedInText}</div>
        </div>
      </div>
      <button type="button" className="btn btn-ghost py-2 text-sm" disabled={busy} onClick={() => void signOut()}>
        {busy ? <Spinner /> : <IconLogout className="size-4" />}
        {A.signOut}
      </button>
    </motion.div>
  );
}
