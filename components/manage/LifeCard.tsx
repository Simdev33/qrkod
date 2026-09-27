"use client";

import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { IconArrowRight, IconCard } from "@/components/ui/Icons";
import { api } from "@/lib/api";
import { fmtDate, fmtNumber } from "@/lib/format";
import { DAY, pricing } from "@/lib/site";
import type { LifeStatus } from "@/lib/status";
import type { CodeView, PaymentMode } from "@/lib/types";
import type { Notify } from "./ManageView";

const RING = {
  trial: "#9ccc12",
  scheduled: "#2f45ff",
  active: "#2f45ff",
  canceling: "#f0a800",
  expired: "#ff5a3c",
};

export function LifeCard({
  code,
  status,
  now,
  mode,
  onUpdate,
  notify,
}: {
  code: CodeView;
  status: LifeStatus;
  now: number;
  mode: PaymentMode;
  onUpdate: (c: CodeView) => void;
  notify: Notify;
}) {
  const [busy, setBusy] = useState<string | null>(null);
  const { phase } = status;

  async function billing(action: "checkout" | "cancel" | "resume" | "portal") {
    setBusy(action);
    try {
      if (action === "checkout" || action === "portal") {
        const { url } = await api<{ url: string }>(`/api/codes/${code.token}/billing`, "POST", { action });
        window.location.href = url;
        return;
      }
      const { code: next } = await api(`/api/codes/${code.token}/billing`, "POST", { action });
      onUpdate(next);
      notify(action === "cancel" ? "Lemondva. A kód a kifizetett időszak végéig még működik." : "Szuper, az előfizetés folytatódik.");
    } catch (e) {
      notify((e as Error).message, "error");
    }
    setBusy(null);
  }

  // Gyűrű: mennyi van hátra az aktuális (ingyenes vagy fizetett) időszakból.
  const ring = status.alive ? Math.min(1, Math.max(0.02, (status.activeUntil - now) / (pricing.trialDays * DAY))) : 0;
  const trialShort = code.trialEndsAt - now < 49 * 60 * 60 * 1000;

  let heading: string;
  let text: React.ReactNode;
  if (phase === "trial") {
    heading = `Még ${status.daysLeft} napig ingyen`;
    text = trialShort ? (
      <>Az ingyenes hónap hamarosan véget ér ({fmtDate(code.trialEndsAt)}). Ha most előfizetsz, a kód megszakítás nélkül működik tovább.</>
    ) : (
      <>
        Az ingyenes hónap vége: <b className="font-semibold text-ink">{fmtDate(code.trialEndsAt)}</b> Ha most előfizetsz, a kód
        megszakítás nélkül él tovább – az első 1 $-t akkor is csak ezután vonjuk le.
      </>
    );
  } else if (phase === "scheduled") {
    heading = "Előfizetve – minden rendben";
    text = (
      <>
        Az ingyenes hónap vége: <b className="font-semibold text-ink">{fmtDate(code.trialEndsAt)}</b> Az első 1 $-os terhelés ekkor
        lesz, utána havonta megújul.
      </>
    );
  } else if (phase === "active") {
    heading = "Aktív előfizetés";
    text = (
      <>
        Következő terhelés: <b className="font-semibold text-ink">{fmtDate(status.nextCharge ?? status.activeUntil)}</b> · 1 $. A kód
        addig is, azután is megszakítás nélkül működik.
      </>
    );
  } else if (phase === "canceling") {
    heading = `Lemondva – még ${status.daysLeft} napig él`;
    text = (
      <>
        Működik eddig: <b className="font-semibold text-ink">{fmtDate(status.activeUntil)}</b> Utána szünetel, de bármikor
        újraélesztheted.
      </>
    );
  } else {
    heading = "A kód szünetel";
    text = (
      <>
        Lejárt: <b className="font-semibold text-ink">{fmtDate(status.activeUntil)}</b>{" "}
        {code.missedScans > 0
          ? `Azóta ${fmtNumber(code.missedScans)} sikertelen beolvasás volt – ők most a „szünetel” oldalt látták.`
          : "Aki beolvassa, most a „szünetel” oldalt látja."}{" "}
        Előfizetéssel ugyanez a kód azonnal újra él.
      </>
    );
  }

  const canCheckout = !status.subscribed;
  const checkoutLabel = phase === "expired" ? "Újraélesztés – 1 $/hó" : phase === "canceling" ? "Újra előfizetek – 1 $/hó" : "Előfizetés – 1 $/hó";

  return (
    <div className="card relative overflow-hidden p-6 sm:p-7">
      {phase === "expired" && <div className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-coral/15 blur-3xl" />}
      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
        <Ring value={ring} color={RING[phase]} days={status.daysLeft} expired={!status.alive} />
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-semibold tracking-tight">{heading}</h2>
          <p className="mt-2 leading-relaxed text-muted">{text}</p>
        </div>
      </div>

      <div className="relative mt-6 flex flex-wrap items-center gap-2">
        {canCheckout && (
          <button
            type="button"
            disabled={mode === "off" || !!busy}
            onClick={() => billing("checkout")}
            className={`btn ${phase === "expired" ? "btn-lime" : "btn-primary"} px-6 py-3.5`}
          >
            {busy === "checkout" ? "Átirányítás…" : checkoutLabel}
            <IconArrowRight className="size-5" />
          </button>
        )}
        {status.subscribed && !code.cancelAtPeriodEnd && (
          <button type="button" className="btn btn-ghost" disabled={!!busy} onClick={() => billing("cancel")}>
            {busy === "cancel" ? "Lemondás…" : "Előfizetés lemondása"}
          </button>
        )}
        {status.subscribed && code.cancelAtPeriodEnd && (
          <button type="button" className="btn btn-primary" disabled={!!busy} onClick={() => billing("resume")}>
            {busy === "resume" ? "Egy pillanat…" : "Mégis folytatom"}
          </button>
        )}
        {mode === "stripe" && code.hasCustomer && (
          <button type="button" className="btn btn-ghost" disabled={!!busy} onClick={() => billing("portal")}>
            <IconCard className="size-4" /> Számlák és kártya
          </button>
        )}
      </div>
      {canCheckout && (
        <p className="relative mt-3 text-[13px] text-muted">
          {mode === "off"
            ? "Az előfizetés jelenleg nem érhető el."
            : mode === "demo"
              ? "Fejlesztői mód: demó fizetés, valódi terhelés nélkül."
              : "Biztonságos fizetés a Stripe-on keresztül · bármikor lemondható."}
        </p>
      )}

      <dl className="relative mt-6 grid grid-cols-2 gap-3 border-t border-ink/10 pt-5 text-sm sm:grid-cols-3">
        <div>
          <dt className="text-muted">Létrehozva</dt>
          <dd className="mt-0.5 font-medium">{fmtDate(code.createdAt)}</dd>
        </div>
        <div>
          <dt className="text-muted">Ingyenes hónap vége</dt>
          <dd className="mt-0.5 font-medium">{fmtDate(code.trialEndsAt)}</dd>
        </div>
        {code.paidUntil && code.paidUntil > code.trialEndsAt && (
          <div>
            <dt className="text-muted">Kifizetve eddig</dt>
            <dd className="mt-0.5 font-medium">{fmtDate(code.paidUntil)}</dd>
          </div>
        )}
      </dl>
    </div>
  );
}

function Ring({ value, color, days, expired }: { value: number; color: string; days: number; expired: boolean }) {
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
          <div className="display text-4xl leading-none">{expired ? "0" : n}</div>
          <div className="mt-1 text-[12px] font-medium text-muted">{expired ? "szünetel" : "nap van hátra"}</div>
        </div>
      </div>
    </div>
  );
}
