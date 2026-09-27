"use client";

import { AnimatePresence, motion, useAnimationControls } from "motion/react";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";
import { DesignControls } from "@/components/design/DesignControls";
import { QrStage } from "@/components/qr/QrStage";
import { IconArrowRight, IconCheck, IconLink } from "@/components/ui/Icons";
import { DEFAULT_DESIGN, type Design } from "@/lib/design";
import { normalizeUrl, prettyUrl } from "@/lib/format";
import { randomCode } from "@/lib/ids";
import { rememberCode } from "@/lib/local-codes";

export function Generator({ origin, candidate: initialCandidate }: { origin: string; candidate: string }) {
  const router = useRouter();
  const [raw, setRaw] = useState("");
  const [title, setTitle] = useState("");
  const [design, setDesign] = useState<Design>(DEFAULT_DESIGN);
  const [candidate, setCandidate] = useState(initialCandidate);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const shake = useAnimationControls();

  // Ha a Next elrejtve megtartaná az oldalt (Activity), visszatéréskor friss kód és aktív gomb várjon.
  const created = useRef(false);
  useLayoutEffect(
    () => () => {
      if (!created.current) return;
      created.current = false;
      setBusy(false);
      setCandidate(randomCode());
    },
    [],
  );

  const shortUrl = `${origin}/q/${candidate}`;
  const target = normalizeUrl(raw);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    if (!target) {
      setError(raw.trim() ? "Ez nem tűnik érvényes webcímnek. Például: pelda.hu/menu" : "Add meg a linket, ahová a kód vezessen.");
      shake.start({ x: [0, -10, 9, -6, 4, 0], transition: { duration: 0.45 } });
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/codes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target, title, design, proposedId: candidate }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Nem sikerült létrehozni a kódot.");
      rememberCode({ id: json.id, token: json.token, title: title.trim(), createdAt: Date.now() });
      created.current = true;
      router.push(`/kezeles/${json.token}?uj=1`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Nem sikerült létrehozni a kódot.");
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={create}
      noValidate
      className="card relative grid grid-cols-1 gap-x-10 gap-y-7 p-5 sm:p-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:p-10 [grid-template-areas:'input'_'preview'_'design'_'create'] lg:[grid-template-areas:'input_preview'_'design_preview'_'create_preview']"
    >
      {/* 1. Cél */}
      <div className="[grid-area:input]">
        <Step n={1} title="Hová vezessen a kód?" />
        <motion.div animate={shake} className="relative mt-4">
          <IconLink className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted" />
          <input
            className={`field py-4 pl-12 text-base ${error ? "border-coral focus:border-coral" : ""}`}
            placeholder="pelda.hu/menu"
            inputMode="url"
            autoComplete="url"
            spellCheck={false}
            value={raw}
            onChange={(e) => {
              setRaw(e.target.value);
              if (error) setError(null);
            }}
            aria-label="Cél webcím"
            aria-invalid={!!error}
          />
          <AnimatePresence>
            {target && (
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 600, damping: 26 }}
                className="absolute top-1/2 right-3 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-lime text-ink"
              >
                <IconCheck className="size-4" strokeWidth={2.6} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
        <AnimatePresence initial={false}>
          {error && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden pt-2 text-sm font-medium text-coral-deep"
              role="alert"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
        <input
          className="field mt-3"
          placeholder="Megnevezés – csak te látod (pl. Étlap az asztalokon)"
          maxLength={60}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-label="Megnevezés"
        />
      </div>

      {/* Előnézet */}
      <div className="[grid-area:preview] lg:row-span-3">
        <div className="lg:sticky lg:top-28">
          <div className="dot-grid relative overflow-hidden rounded-[24px] border border-ink/8 bg-paper px-6 pt-6 pb-5 sm:px-10 sm:pt-9">
            <div className="pointer-events-none absolute -top-16 -right-10 size-48 rounded-full bg-lime/40 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-16 size-56 rounded-full bg-sky/50 blur-3xl" />
            <QrStage text={shortUrl} design={design} className="relative mx-auto w-full max-w-[250px] sm:max-w-[320px]" />
            <Connector short={shortUrl.replace(/^https?:\/\//, "")} target={target} />
          </div>
          <p className="mt-3 px-1 text-center text-[13px] leading-relaxed text-muted">
            A kód a rövid linkedet tartalmazza, ezért a célt később bármikor átírhatod — a kinyomtatott kód marad.
          </p>
        </div>
      </div>

      {/* 2. Megjelenés */}
      <div className="[grid-area:design]">
        <Step n={2} title="Szabd a saját stílusodra" />
        <div className="mt-4">
          <DesignControls design={design} onChange={setDesign} />
        </div>
      </div>

      {/* 3. Létrehozás */}
      <div className="[grid-area:create]">
        <button type="submit" className="btn btn-primary w-full py-4 text-base sm:text-lg" disabled={busy}>
          {busy ? (
            <>
              <Spinner /> Kód készül…
            </>
          ) : (
            <>
              QR-kód létrehozása ingyen <IconArrowRight className="size-5" />
            </>
          )}
        </button>
        <ul className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-1.5 text-[13px] text-ink-2">
          {["30 napig ingyen", "Nem kérünk kártyát", "Utána 1 $/hó, bármikor lemondható"].map((t) => (
            <li key={t} className="flex items-center gap-1.5">
              <IconCheck className="size-3.5 text-kobalt" strokeWidth={3} /> {t}
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
}

function Step({ n, title }: { n: number; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-8 place-items-center rounded-xl bg-ink font-mono text-sm font-bold text-lime">{n}</span>
      <h2 className="text-lg font-semibold tracking-tight sm:text-xl">{title}</h2>
    </div>
  );
}

function Spinner() {
  return (
    <span className="grid size-5 grid-cols-2 gap-0.5" aria-hidden>
      {[0, 1, 3, 2].map((i) => (
        <motion.span
          key={i}
          className="rounded-[2px] bg-white"
          animate={{ opacity: [0.25, 1, 0.25] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.18 }}
        />
      ))}
    </span>
  );
}

/** Rövid link → cél: a „dinamikus” lényeg egy pillantásra. */
function Connector({ short, target }: { short: string; target: string | null }) {
  const host = target ? new URL(target).hostname.replace(/^www\./, "") : null;
  return (
    <div className="relative mt-6 flex flex-col items-center gap-1.5 text-[13px] sm:flex-row sm:gap-2">
      <span className="max-w-full shrink-0 truncate rounded-full bg-ink px-3 py-1.5 font-mono text-[12px] text-paper">{short}</span>
      <span className="relative h-4 w-px overflow-hidden sm:h-px sm:w-auto sm:min-w-6 sm:flex-1" aria-hidden>
        <svg className="absolute inset-0 hidden h-full w-full sm:block" preserveAspectRatio="none" viewBox="0 0 100 1">
          <line x1="0" y1="0.5" x2="100" y2="0.5" stroke="#16161d" strokeWidth="2" strokeDasharray="3 3" vectorEffect="non-scaling-stroke">
            <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="0.8s" repeatCount="indefinite" />
          </line>
        </svg>
        <span className="absolute inset-0 border-l-2 border-dashed border-ink/60 sm:hidden" />
      </span>
      <span className="relative max-w-full min-w-0 shrink overflow-hidden rounded-full border border-ink/15 bg-white px-3 py-1.5">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={host ?? "none"}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={`block truncate ${target ? "text-ink" : "text-muted"}`}
          >
            {target ? prettyUrl(target) : "a te linked"}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}
