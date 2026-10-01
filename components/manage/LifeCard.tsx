"use client";

import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { IconCard } from "@/components/ui/Icons";
import { Rich } from "@/components/ui/Rich";
import { api, errorCode } from "@/lib/api";
import { useI18n } from "@/lib/i18n/client";
import type { LifeStatus, Phase } from "@/lib/status";
import type { CodeView, PaymentMode } from "@/lib/types";
import type { Notify } from "./ManageView";
import { PaymentPanel } from "./PaymentPanel";

const RING: Record<Phase, string> = {
  pending: "#b9b4a8",
  free: "#9ccc12",
  intro: "#9ccc12",
  active: "#2f45ff",
  canceling: "#f0a800",
  expired: "#ff5a3c",
};

export function LifeCard({
  code,
  status,
  now,
  mode,
  stripeKey,
  onUpdate,
  onActivated,
  notify,
}: {
  code: CodeView;
  status: LifeStatus;
  now: number;
  mode: PaymentMode;
  stripeKey: string;
  onUpdate: (c: CodeView) => void;
  onActivated: (c: CodeView) => void;
  notify: Notify;
}) {
  const { t, lang, fill, plural, date, error: errorText } = useI18n();
  const T = t.manage.life;
  const [busy, setBusy] = useState<string | null>(null);
  const { phase } = status;

  async function billing(action: "cancel" | "resume" | "portal") {
    setBusy(action);
    try {
      if (action === "portal") {
        const { url } = await api<{ url: string }>(`/api/codes/${code.token}/billing`, "POST", { action, lang });
        window.location.href = url;
        return;
      }
      const { code: next } = await api(`/api/codes/${code.token}/billing`, "POST", { action, lang });
      onUpdate(next);
      notify(action === "cancel" ? T.canceledToast : T.resumedToast);
    } catch (e) {
      notify(errorText(errorCode(e)), "error");
    }
    setBusy(null);
  }

  // The ring: how much is left of the current period.
  const ring = status.alive ? Math.min(1, Math.max(0.02, (status.activeUntil - now) / status.periodLength)) : 0;
  const rich = (text: string, when: number) => <Rich text={fill(text, { date: date(when) })} />;

  let heading: string;
  let text: React.ReactNode;
  switch (phase) {
    case "pending":
      heading = T.pendingHeading;
      text = fill(T.pendingText);
      break;
    case "free":
      heading = plural(T.freeHeading, status.daysLeft);
      text = rich(T.freeText, code.trialEndsAt);
      break;
    case "intro":
      heading = plural(T.introHeading, status.daysLeft);
      text = rich(T.introText, status.nextCharge ?? status.activeUntil);
      break;
    case "active":
      heading = T.activeHeading;
      text = rich(T.activeText, status.nextCharge ?? status.activeUntil);
      break;
    case "canceling":
      heading = plural(T.cancelingHeading, status.daysLeft);
      text = rich(T.cancelingText, status.activeUntil);
      break;
    default:
      heading = T.expiredHeading;
      text = (
        <>
          {rich(T.expiredText, status.activeUntil)} {code.missedScans > 0 ? plural(T.missed, code.missedScans) : T.noMissed}{" "}
          {T.reviveNote}
        </>
      );
  }

  return (
    <div className="card relative overflow-hidden p-6 sm:p-7">
      {(phase === "expired" || phase === "pending") && (
        <div className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-lime/25 blur-3xl" />
      )}
      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
        <Ring
          value={ring}
          color={RING[phase]}
          days={status.daysLeft}
          off={!status.alive}
          label={status.alive ? plural(T.ringLeft, status.daysLeft) : phase === "pending" ? T.ringPending : T.ringPaused}
        />
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-semibold tracking-tight">{heading}</h2>
          <p className="mt-2 leading-relaxed text-muted">{text}</p>
        </div>
      </div>

      {!status.subscribed ? (
        <div className="relative">
          <PaymentPanel
            code={code}
            firstActivation={status.firstActivation}
            mode={mode}
            stripeKey={stripeKey}
            onActivated={onActivated}
            showTitle={phase !== "pending"}
          />
        </div>
      ) : (
        <div className="relative mt-6 flex flex-wrap items-center gap-2">
          {!code.cancelAtPeriodEnd ? (
            <button type="button" className="btn btn-ghost" disabled={!!busy} onClick={() => billing("cancel")}>
              {busy === "cancel" ? T.canceling : T.cancel}
            </button>
          ) : (
            <button type="button" className="btn btn-primary" disabled={!!busy} onClick={() => billing("resume")}>
              {busy === "resume" ? T.resuming : T.resume}
            </button>
          )}
          {mode === "stripe" && code.hasCustomer && (
            <button type="button" className="btn btn-ghost" disabled={!!busy} onClick={() => billing("portal")}>
              <IconCard className="size-4" /> {T.portal}
            </button>
          )}
        </div>
      )}

      <dl className="relative mt-6 grid grid-cols-2 gap-3 border-t border-ink/10 pt-5 text-sm">
        <div>
          <dt className="text-muted">{T.created}</dt>
          <dd className="mt-0.5 font-medium">{date(code.createdAt)}</dd>
        </div>
        {status.activeUntil > code.createdAt && (
          <div>
            <dt className="text-muted">{T.paidUntil}</dt>
            <dd className="mt-0.5 font-medium">{date(status.activeUntil)}</dd>
          </div>
        )}
      </dl>
    </div>
  );
}

function Ring({ value, color, days, off, label }: { value: number; color: string; days: number; off: boolean; label: string }) {
  const mv = useMotionValue(0);
  const shown = useTransform(mv, (v) => Math.round(v));
  const [n, setN] = useState(0);
  useEffect(() => shown.on("change", setN), [shown]);
  useEffect(() => {
    const c = animate(mv, days, { duration: 1.1, ease: [0.16, 1, 0.3, 1] });
    return () => c.stop();
  }, [days, mv]);

  return (
    <div className="relative size-[132px] shrink-0">
      <svg viewBox="0 0 120 120" className="size-full -rotate-90">
        <circle cx="60" cy="60" r="50" fill="none" stroke="#ebe6da" strokeWidth="12" />
        <motion.circle
          style={{ opacity: value > 0 ? 1 : 0 }}
          cx="60"
          cy="60"
          r="50"
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: value }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="display text-4xl leading-none">{off ? "0" : n}</div>
          <div className="mt-1 max-w-[96px] text-[12px] leading-tight font-medium text-muted">{label}</div>
        </div>
      </div>
    </div>
  );
}
