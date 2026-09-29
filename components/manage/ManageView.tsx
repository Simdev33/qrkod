"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { DesignControls } from "@/components/design/DesignControls";
import { QrStage } from "@/components/qr/QrStage";
import { CopyButton } from "@/components/ui/CopyButton";
import { IconArrowRight, IconDownload, IconExternal, IconPalette, IconPencil } from "@/components/ui/Icons";
import { api, errorCode } from "@/lib/api";
import type { Design } from "@/lib/design";
import { useI18n } from "@/lib/i18n/client";
import { rememberCode } from "@/lib/local-codes";
import { downloadQr } from "@/lib/qr/export";
import { lifeStatus } from "@/lib/status";
import type { CodeView, PaymentMode } from "@/lib/types";
import { DangerZone, DemoTools, ManageLinkCard } from "./ExtraCards";
import { LifeCard } from "./LifeCard";
import { StatsCard } from "./StatsCard";
import { TargetCard } from "./TargetCard";

type Flash = "new" | "paid" | "checkout-canceled" | null;
export type Notify = (msg: string, tone?: "ok" | "error") => void;

export function ManageView({
  initial,
  serverNow,
  origin,
  mode,
  flash,
}: {
  initial: CodeView;
  serverNow: number;
  origin: string;
  mode: PaymentMode;
  flash: Flash;
}) {
  const router = useRouter();
  const { t, l, error: errorText } = useI18n();
  const M = t.manage;
  const [code, setCode] = useState(initial);
  const [now, setNow] = useState(serverNow);
  const [draft, setDraft] = useState<Design | null>(null);
  const [toast, setToast] = useState<{ id: number; msg: string; tone: "ok" | "error" } | null>(null);
  const [banner, setBanner] = useState<Flash>(flash);

  const shortUrl = `${origin}/q/${code.id}`;
  // Nyelv nélküli kezelőlink: megnyitáskor a látogató saját nyelvén jelenik meg.
  const manageUrl = `${origin}/manage/${code.token}`;
  const status = lifeStatus(code, now);
  const design = draft ?? code.design;

  const notify: Notify = useCallback((msg, tone = "ok") => setToast({ id: Date.now(), msg, tone }), []);

  // Az eszköz megjegyzi a kódot (akkor is, ha a kezelőlinket máshonnan nyitották meg).
  useEffect(() => {
    rememberCode({ id: code.id, token: code.token, title: code.title, createdAt: code.createdAt });
  }, [code.id, code.token, code.title, code.createdAt]);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(timer);
  }, []);

  // A ?new=1 / ?payment=… paramétert eltüntetjük, hogy frissítéskor ne jöjjön újra az üzenet.
  useEffect(() => {
    if (flash) router.replace(l(`/manage/${code.token}`), { scroll: false });
  }, [flash, code.token, router, l]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3800);
    return () => clearTimeout(t);
  }, [toast]);

  const update = useCallback((next: CodeView) => {
    setCode(next);
    setNow(Date.now());
  }, []);

  async function saveDesign() {
    if (!draft) return;
    try {
      const { code: next } = await api(`/api/codes/${code.token}`, "PATCH", { design: draft });
      update(next);
      setDraft(null);
      notify(M.designSaved);
    } catch (e) {
      notify(errorText(errorCode(e)), "error");
    }
  }

  async function download(format: "png" | "svg", px?: number) {
    try {
      await downloadQr(shortUrl, design, format, `kockakod-${code.id}${px && px > 1200 ? "-large" : ""}`, px);
    } catch (e) {
      notify(errorText(errorCode(e)), "error");
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pt-6 pb-10 sm:px-5 sm:pt-10">
      <AnimatePresence>{banner && <Banner kind={banner} manageUrl={manageUrl} onClose={() => setBanner(null)} />}</AnimatePresence>

      {/* Fejléc */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap items-end justify-between gap-5"
      >
        <div className="min-w-0">
          <Link href={l("/my-codes")} className="text-sm font-medium text-muted hover:text-ink">
            {M.back}
          </Link>
          <TitleEditor code={code} onSaved={update} notify={notify} />
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <StatusPill phase={status.phase} />
            <span className="flex items-center gap-1 rounded-full border border-ink/12 bg-card py-1 pr-1 pl-3 font-mono text-[13px]">
              {shortUrl.replace(/^https?:\/\//, "")}
              <CopyButton text={shortUrl} label={M.copyShort} compact />
              <a
                href={shortUrl}
                target="_blank"
                rel="noreferrer"
                className="grid size-7 place-items-center rounded-full text-muted hover:bg-ink/5 hover:text-ink"
                aria-label={M.openNew}
              >
                <IconExternal className="size-3.5" />
              </a>
            </span>
          </div>
        </div>
      </motion.div>

      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        {/* QR + letöltés */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="lg:row-span-2"
        >
          <div className="card p-5 sm:p-7 lg:sticky lg:top-28">
            <div className="dot-grid relative overflow-hidden rounded-[22px] bg-paper px-6 py-7 sm:px-10">
              <div className={`transition-[filter,opacity] duration-700 ${status.alive ? "" : "opacity-60 grayscale"}`}>
                <QrStage text={shortUrl} design={design} scanning={status.alive} className="mx-auto w-full max-w-[330px]" />
              </div>
              {!status.alive && (
                <motion.span
                  initial={{ scale: 0.6, opacity: 0, rotate: -14 }}
                  animate={{ scale: 1, opacity: 1, rotate: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 14, delay: 0.5 }}
                  className="display absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl border-[1.5px] border-ink bg-coral px-5 py-2.5 text-xl text-white shadow-[4px_4px_0_var(--color-ink)]"
                >
                  {M.pausedStamp}
                </motion.span>
              )}
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2">
              <button type="button" className="btn btn-ink px-3 text-sm" onClick={() => download("png", 1200)}>
                <IconDownload className="size-4" /> {M.png}
              </button>
              <button type="button" className="btn btn-ghost px-3 text-sm" onClick={() => download("png", 2400)}>
                {M.pngLarge}
              </button>
              <button type="button" className="btn btn-ghost px-3 text-sm" onClick={() => download("svg")}>
                {M.svg}
              </button>
            </div>
            <p className="mt-3 text-center text-[13px] text-muted">
              {status.alive ? M.testHint : M.pausedHint}
            </p>

            <DesignEditor
              design={design}
              dirty={!!draft}
              onChange={setDraft}
              onSave={saveDesign}
              onReset={() => setDraft(null)}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-5"
        >
          <LifeCard code={code} status={status} now={now} mode={mode} onUpdate={update} notify={notify} />
          <TargetCard code={code} onUpdate={update} notify={notify} />
          <StatsCard code={code} now={now} alive={status.alive} />
          <ManageLinkCard manageUrl={manageUrl} shortUrl={shortUrl} title={code.title} />
          {mode === "demo" && <DemoTools token={code.token} onUpdate={update} notify={notify} />}
          <DangerZone code={code} subscribed={status.subscribed} notify={notify} />
        </motion.div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            role="status"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 420, damping: 30 }}
            className={`fixed bottom-5 left-1/2 z-[60] w-[min(92vw,460px)] -translate-x-1/2 rounded-2xl border-[1.5px] border-ink px-5 py-3.5 text-[15px] font-medium shadow-[4px_4px_0_var(--color-ink)] ${
              toast.tone === "ok" ? "bg-lime text-ink" : "bg-coral text-white"
            }`}
          >
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatusPill({ phase }: { phase: ReturnType<typeof lifeStatus>["phase"] }) {
  const { t } = useI18n();
  const tone = {
    trial: "bg-lime text-ink",
    scheduled: "bg-kobalt text-white",
    active: "bg-kobalt text-white",
    canceling: "bg-sun text-ink",
    expired: "bg-coral text-white",
  }[phase];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-semibold ${tone}`}>
      <span className={`size-1.5 rounded-full bg-current ${phase === "expired" ? "" : "animate-blink"}`} />
      {t.status[phase]}
    </span>
  );
}

function TitleEditor({ code, onSaved, notify }: { code: CodeView; onSaved: (c: CodeView) => void; notify: Notify }) {
  const { t, error: errorText } = useI18n();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(code.title);

  async function save() {
    try {
      const { code: next } = await api(`/api/codes/${code.token}`, "PATCH", { title: value });
      onSaved(next);
      setEditing(false);
    } catch (e) {
      notify(errorText(errorCode(e)), "error");
    }
  }

  if (editing) {
    return (
      <form
        className="mt-2 flex max-w-xl gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          save();
        }}
      >
        <input autoFocus className="field text-lg" value={value} maxLength={60} onChange={(e) => setValue(e.target.value)} placeholder={t.manage.titlePlaceholder} />
        <button className="btn btn-ink" type="submit">
          {t.common.save}
        </button>
      </form>
    );
  }
  return (
    <button type="button" onClick={() => setEditing(true)} className="group mt-2 flex max-w-full items-center gap-3 text-left">
      <h1 className="display text-[clamp(1.9rem,4.4vw,3.2rem)] min-w-0 leading-[1.05] break-words sm:truncate">{code.title || t.manage.untitled}</h1>
      <IconPencil className="size-5 shrink-0 text-muted opacity-0 transition-opacity group-hover:opacity-100" />
    </button>
  );
}

function DesignEditor({
  design,
  dirty,
  onChange,
  onSave,
  onReset,
}: {
  design: Design;
  dirty: boolean;
  onChange: (d: Design) => void;
  onSave: () => void;
  onReset: () => void;
}) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-5 border-t border-ink/10 pt-5">
      <button type="button" className="flex w-full items-center justify-between gap-3 text-left" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span className="flex items-center gap-2.5 font-semibold">
          <IconPalette className="size-5 text-kobalt" /> {t.manage.designEdit}
        </span>
        <motion.span animate={{ rotate: open ? 90 : 0 }} className="text-muted">
          <IconArrowRight className="size-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-5">
              <DesignControls design={design} onChange={onChange} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {dirty && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="mt-4 flex gap-2"
          >
            <button type="button" className="btn btn-primary flex-1" onClick={onSave}>
              {t.manage.saveChanges}
            </button>
            <button type="button" className="btn btn-ghost" onClick={onReset}>
              {t.manage.discard}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Banner({ kind, manageUrl, onClose }: { kind: Exclude<Flash, null>; manageUrl: string; onClose: () => void }) {
  const { t } = useI18n();
  const B = t.manage.banner;
  const content = {
    new: { tone: "bg-lime", title: B.newTitle, text: B.newText },
    paid: { tone: "bg-kobalt text-white", title: B.paidTitle, text: B.paidText },
    "checkout-canceled": { tone: "bg-sun", title: B.canceledTitle, text: B.canceledText },
  }[kind];

  return (
    <motion.div
      initial={{ opacity: 0, y: -16, height: 0 }}
      animate={{ opacity: 1, y: 0, height: "auto" }}
      exit={{ opacity: 0, y: -10, height: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="overflow-hidden"
    >
      <div className={`mb-6 flex flex-wrap items-center gap-4 rounded-3xl border-[1.5px] border-ink p-5 shadow-[4px_4px_0_var(--color-ink)] sm:p-6 ${content.tone}`}>
        <div className="min-w-0 flex-1">
          <div className="text-lg font-bold tracking-tight">{content.title}</div>
          <p className="mt-1 opacity-80">{content.text}</p>
        </div>
        <div className="flex items-center gap-2">
          {kind === "new" && <CopyButton text={manageUrl} label={t.manage.link.copy} />}
          <button type="button" onClick={onClose} className="btn px-3 py-2 text-sm underline-offset-4 hover:underline">
            {t.common.close}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
