"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useRef, useState, type ReactNode } from "react";
import {
  contrastIssue,
  DOT_STYLES,
  EYE_STYLES,
  FRAME_TEXT_MAX,
  PALETTES,
  type Design,
  type DotStyle,
  type EyeStyle,
} from "@/lib/design";
import { processLogo } from "@/lib/logo";
import { dotPath, eyePaths } from "@/lib/qr/geometry";
import { IconAlert, IconTrash, IconUpload } from "@/components/ui/Icons";
import { useI18n } from "@/lib/i18n/client";

type Tab = "pattern" | "colors" | "logo" | "frame";
const TABS: Tab[] = ["pattern", "colors", "logo", "frame"];

export function DesignControls({ design, onChange }: { design: Design; onChange: (d: Design) => void }) {
  const { t } = useI18n();
  const [tab, setTab] = useState<Tab>("pattern");
  const uid = useId();
  const set = (patch: Partial<Design>) => onChange({ ...design, ...patch });

  return (
    <div>
      <div role="tablist" aria-label={t.design.tablist} className="relative grid grid-cols-4 rounded-2xl bg-paper-2/80 p-1">
        {TABS.map((id) => (
          <button
            key={id}
            role="tab"
            type="button"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={`relative z-10 rounded-xl py-2.5 text-sm font-semibold transition-colors ${
              tab === id ? "text-ink" : "text-muted hover:text-ink"
            }`}
          >
            {tab === id && (
              <motion.span
                layoutId={`tab-${uid}`}
                className="absolute inset-0 -z-10 rounded-xl bg-white shadow-[0_1px_0_rgb(22_22_29/0.06),0_4px_12px_-6px_rgb(22_22_29/0.3)]"
                transition={{ type: "spring", stiffness: 520, damping: 38 }}
              />
            )}
            {t.design.tabs[id]}
            {id === "logo" && design.logo && <span className="ml-1.5 inline-block size-1.5 rounded-full bg-kobalt align-middle" />}
          </button>
        ))}
      </div>

      <div className="relative mt-5 min-h-[212px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {tab === "pattern" && <PatternTab design={design} set={set} />}
            {tab === "colors" && <ColorsTab design={design} set={set} />}
            {tab === "logo" && <LogoTab design={design} set={set} />}
            {tab === "frame" && <FrameTab design={design} set={set} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

type TabProps = { design: Design; set: (p: Partial<Design>) => void };

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-5 last:mb-0">
      <div className="mb-2.5 text-[13px] font-semibold tracking-wide text-muted uppercase">{title}</div>
      {children}
    </div>
  );
}

function Tile({ active, onClick, label, children }: { active: boolean; onClick: () => void; label: string; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`group flex flex-col items-center gap-1.5 rounded-2xl border p-2.5 text-xs font-medium transition-all duration-200 ${
        active
          ? "border-kobalt bg-kobalt-soft/70 text-ink shadow-[0_0_0_3px_rgb(47_69_255/0.14)]"
          : "border-ink/10 bg-white text-muted hover:-translate-y-0.5 hover:border-ink/25 hover:text-ink"
      }`}
    >
      <span className="transition-transform duration-300 group-hover:scale-110">{children}</span>
      {label}
    </button>
  );
}

/* ---------------- Minta ---------------- */

const SAMPLE = ["11011", "10110", "01101", "11011", "10111"];
const sampleOn = (x: number, y: number) => SAMPLE[y]?.[x] === "1";

function DotSample({ style }: { style: DotStyle }) {
  const paths: string[] = [];
  for (let y = 0; y < 5; y++)
    for (let x = 0; x < 5; x++)
      if (sampleOn(x, y))
        paths.push(
          dotPath(style, x, y, { t: sampleOn(x, y - 1), r: sampleOn(x + 1, y), b: sampleOn(x, y + 1), l: sampleOn(x - 1, y) }, 0.02),
        );
  return (
    <svg viewBox="-0.5 -0.5 6 6" className="size-10" aria-hidden>
      <path d={paths.join("")} fill="currentColor" className="text-ink" />
    </svg>
  );
}

function EyeSample({ style }: { style: EyeStyle }) {
  const p = eyePaths(style, 0, 0, 0);
  return (
    <svg viewBox="-0.6 -0.6 8.2 8.2" className="size-10 text-ink" aria-hidden>
      <path d={p.outer} fill="currentColor" fillRule="evenodd" />
      <path d={p.inner} fill="currentColor" />
    </svg>
  );
}

function PatternTab({ design, set }: TabProps) {
  const { t } = useI18n();
  return (
    <>
      <Group title={t.design.dotsTitle}>
        <div className="grid grid-cols-4 gap-2">
          {DOT_STYLES.map((id) => (
            <Tile key={id} active={design.dots === id} onClick={() => set({ dots: id })} label={t.design.dots[id]}>
              <DotSample style={id} />
            </Tile>
          ))}
        </div>
      </Group>
      <Group title={t.design.eyesTitle}>
        <div className="grid grid-cols-4 gap-2">
          {EYE_STYLES.map((id) => (
            <Tile key={id} active={design.eyes === id} onClick={() => set({ eyes: id })} label={t.design.eyes[id]}>
              <EyeSample style={id} />
            </Tile>
          ))}
        </div>
      </Group>
    </>
  );
}

/* ---------------- Színek ---------------- */

function ColorsTab({ design, set }: TabProps) {
  const { t, fill } = useI18n();
  const issue = contrastIssue(design);
  return (
    <>
      <Group title={t.design.palettesTitle}>
        <div className="flex flex-wrap gap-2">
          {PALETTES.map((p) => {
            const active = p.fg === design.fg && p.eye === design.eye && p.bg === design.bg;
            return (
              <button
                key={p.id}
                type="button"
                title={t.design.palettes[p.id]}
                aria-label={t.design.palettes[p.id]}
                aria-pressed={active}
                onClick={() => set({ fg: p.fg, eye: p.eye, bg: p.bg })}
                className={`relative size-11 rounded-full border-2 transition-transform duration-200 hover:scale-110 ${
                  active ? "border-kobalt shadow-[0_0_0_3px_rgb(47_69_255/0.2)]" : "border-white shadow-[0_0_0_1px_rgb(22_22_29/0.14)]"
                }`}
                style={{ background: `conic-gradient(${p.fg} 0 50%, ${p.eye} 0 75%, ${p.bg} 0)` }}
              />
            );
          })}
        </div>
      </Group>
      <Group title={t.design.customTitle}>
        <div className="grid gap-2 sm:grid-cols-3">
          <ColorField label={t.design.fg} ariaLabel={fill(t.design.colorOf, { label: t.design.fg })} value={design.fg} onChange={(fg) => set({ fg })} />
          <ColorField label={t.design.eye} ariaLabel={fill(t.design.colorOf, { label: t.design.eye })} value={design.eye} onChange={(eye) => set({ eye })} />
          <ColorField label={t.design.bg} ariaLabel={fill(t.design.colorOf, { label: t.design.bg })} value={design.bg} onChange={(bg) => set({ bg })} />
        </div>
      </Group>
      <AnimatePresence>
        {issue && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-start gap-2 overflow-hidden rounded-xl bg-coral-soft px-3 py-2.5 text-[13px] leading-snug text-coral-deep"
          >
            <IconAlert className="mt-px size-4 shrink-0" />
            {issue === "inverted" ? t.design.inverted : t.design.lowContrast}
          </motion.p>
        )}
      </AnimatePresence>
    </>
  );
}

function ColorField({
  label,
  ariaLabel,
  value,
  onChange,
}: {
  label: string;
  ariaLabel: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [draft, setDraft] = useState(value);
  const [prev, setPrev] = useState(value);
  if (value !== prev) {
    setPrev(value);
    setDraft(value);
  }
  return (
    <label className="flex items-center gap-2.5 rounded-2xl border border-ink/12 bg-white p-2 pr-3 focus-within:border-kobalt">
      <span className="relative size-9 shrink-0 overflow-hidden rounded-xl shadow-[inset_0_0_0_1px_rgb(22_22_29/0.14)]" style={{ background: value }}>
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 size-full cursor-pointer opacity-0"
          aria-label={ariaLabel}
        />
      </span>
      <span className="min-w-0">
        <span className="block text-[11px] font-semibold tracking-wide text-muted uppercase">{label}</span>
        <input
          value={draft}
          spellCheck={false}
          onChange={(e) => {
            const v = e.target.value.trim();
            setDraft(v);
            const full = v.startsWith("#") ? v : `#${v}`;
            if (/^#[0-9a-f]{6}$/i.test(full)) onChange(full.toLowerCase());
          }}
          onBlur={() => setDraft(value)}
          className="w-full bg-transparent font-mono text-sm text-ink uppercase outline-none"
        />
      </span>
    </label>
  );
}

/* ---------------- Logó ---------------- */

function LogoTab({ design, set }: TabProps) {
  const { t, error: errorText } = useI18n();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [over, setOver] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  async function take(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      set({ logo: await processLogo(file) });
    } catch (e) {
      setError(errorText(e instanceof Error ? e.message : undefined));
    } finally {
      setBusy(false);
      if (input.current) input.current.value = "";
    }
  }

  return (
    <div>
      <input
        ref={input}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/svg+xml"
        className="hidden"
        onChange={(e) => take(e.target.files?.[0])}
      />
      {design.logo ? (
        <div className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-white p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={design.logo} alt={t.design.logoAlt} className="size-16 rounded-xl bg-paper object-contain p-1.5" />
          <div className="min-w-0 flex-1">
            <div className="font-semibold">{t.design.logoOn}</div>
            <p className="text-[13px] text-muted">{t.design.logoOnHint}</p>
          </div>
          <div className="flex shrink-0 gap-1.5">
            <button type="button" className="btn btn-ghost px-3 py-2 text-sm" onClick={() => input.current?.click()}>
              {t.design.replace}
            </button>
            <button
              type="button"
              className="btn btn-ghost px-2.5 py-2 text-sm"
              aria-label={t.design.removeLogo}
              onClick={() => set({ logo: null })}
            >
              <IconTrash className="size-4" />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => input.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setOver(true);
          }}
          onDragLeave={() => setOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setOver(false);
            take(e.dataTransfer.files?.[0]);
          }}
          className={`flex w-full flex-col items-center gap-2 rounded-2xl border-2 border-dashed px-4 py-8 text-center transition-colors ${
            over ? "border-kobalt bg-kobalt-soft/60" : "border-ink/15 bg-white hover:border-ink/30"
          }`}
        >
          <span className={`grid size-11 place-items-center rounded-2xl bg-lime text-ink ${busy ? "animate-pulse" : ""}`}>
            <IconUpload />
          </span>
          <span className="font-semibold">{busy ? t.design.processing : t.design.drop}</span>
          <span className="text-[13px] text-muted">{t.design.formats}</span>
        </button>
      )}
      {error && <p className="mt-3 text-[13px] font-medium text-coral-deep">{error}</p>}
    </div>
  );
}

/* ---------------- Keret ---------------- */

function FrameTab({ design, set }: TabProps) {
  const { t } = useI18n();
  return (
    <div>
      <button
        type="button"
        role="switch"
        aria-checked={design.frame}
        onClick={() => set({ frame: !design.frame })}
        className="flex w-full items-center justify-between gap-4 rounded-2xl border border-ink/10 bg-white p-4 text-left"
      >
        <span>
          <span className="block font-semibold">{t.design.frameToggle}</span>
          <span className="text-[13px] text-muted">{t.design.frameToggleHint}</span>
        </span>
        <span className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${design.frame ? "bg-kobalt" : "bg-ink/15"}`}>
          <motion.span
            className="absolute top-1 left-1 size-5 rounded-full bg-white shadow"
            animate={{ x: design.frame ? 20 : 0 }}
            transition={{ type: "spring", stiffness: 600, damping: 34 }}
          />
        </span>
      </button>

      <div className={`mt-4 transition-opacity ${design.frame ? "" : "opacity-50"}`}>
        <label className="mb-2 block text-[13px] font-semibold tracking-wide text-muted uppercase" htmlFor="frame-text">
          {t.design.frameText}
        </label>
        <div className="relative">
          <input
            id="frame-text"
            className="field pr-16"
            value={design.frameText}
            maxLength={FRAME_TEXT_MAX}
            onChange={(e) => set({ frameText: e.target.value, frame: true })}
          />
          <span className="absolute top-1/2 right-4 -translate-y-1/2 font-mono text-xs text-muted">
            {design.frameText.length}/{FRAME_TEXT_MAX}
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {t.design.frameIdeas.map((idea) => (
            <button
              key={idea}
              type="button"
              onClick={() => set({ frameText: idea, frame: true })}
              className={`rounded-full border px-3 py-1 text-[13px] transition-colors ${
                design.frameText === idea && design.frame
                  ? "border-ink bg-ink text-paper"
                  : "border-ink/12 bg-white text-ink-2 hover:border-ink/30"
              }`}
            >
              {idea}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
