"use client";

import { animate, motion, useMotionValue, useTransform } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IconArrowRight, IconCheck } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { pricing } from "@/lib/site";

const INCLUDED = [
  "Korlátlan beolvasás",
  "A cél bármikor átírható",
  "Napi beolvasás-statisztika",
  "Színek, minta, logó, keret",
  "PNG és SVG letöltés",
  "Bármikor lemondható",
];

export function Pricing() {
  return (
    <section id="arazas" className="mx-auto max-w-6xl scroll-mt-24 px-4 pt-24 sm:px-5 sm:pt-32">
      <Reveal className="mx-auto max-w-3xl text-center">
        <span className="eyebrow">Árazás</span>
        <h2 className="display mt-5 text-[clamp(2rem,4.6vw,3.6rem)] leading-[0.98]">
          Egy ár. Egy kód.
          <br />
          <span className="whitespace-nowrap text-kobalt">Egy dollár.</span>
        </h2>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <div className="card relative h-full overflow-hidden p-7 sm:p-10">
            <div className="pointer-events-none absolute -right-16 -bottom-24 size-80 rounded-full bg-kobalt-soft blur-2xl" />
            <div className="relative">
              <span className="rounded-full bg-lime px-3 py-1 text-[13px] font-bold">Az első {pricing.trialDays} nap ingyen</span>
              <div className="mt-6 flex items-end gap-3">
                <span className="display text-[clamp(5rem,14vw,8.5rem)] leading-[0.8]">1 $</span>
                <span className="pb-2 text-lg leading-tight text-muted">
                  / hó
                  <br />/ QR-kód
                </span>
              </div>
              <p className="mt-6 max-w-md leading-relaxed text-ink-2">
                A próbaidő alatt bármikor előfizethetsz: az első dollárt akkor is csak a {pricing.trialDays}. nap után vonjuk le.
                A bankod a saját árfolyamán váltja át forintra.
              </p>
              <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
                {INCLUDED.map((t) => (
                  <li key={t} className="flex items-center gap-2.5">
                    <span className="grid size-5 place-items-center rounded-md bg-ink text-lime">
                      <IconCheck className="size-3" strokeWidth={3.5} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <Link href="/#keszito" className="btn btn-primary mt-9">
                Kipróbálom ingyen <IconArrowRight className="size-5" />
              </Link>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <Calculator />
        </Reveal>
      </div>
    </section>
  );
}

function Calculator() {
  const [n, setN] = useState(5);
  const monthly = useMotionValue(n);
  const monthlyText = useTransform(monthly, (v) => `${Math.round(v)} $`);
  const yearlyText = useTransform(monthly, (v) => `${Math.round(v) * 12} $`);

  useEffect(() => {
    const c = animate(monthly, n, { duration: 0.5, ease: [0.16, 1, 0.3, 1] });
    return () => c.stop();
  }, [n, monthly]);

  return (
    <div className="card dot-grid-light relative flex h-full flex-col overflow-hidden bg-ink p-7 text-paper sm:p-10">
      <h3 className="text-xl font-semibold">Hány kódod lesz?</h3>
      <p className="mt-1.5 text-paper/60">Minden kód külön él – csak azokért fizetsz, amiket életben tartasz.</p>

      <div className="mt-8 flex items-baseline justify-between">
        <span className="display text-5xl text-lime">{n}</span>
        <span className="text-paper/60">QR-kód</span>
      </div>
      <input
        type="range"
        min={1}
        max={50}
        value={n}
        onChange={(e) => setN(Number(e.target.value))}
        aria-label="QR-kódok száma"
        className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-paper/15 accent-lime [&::-webkit-slider-thumb]:size-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-lg [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-ink [&::-webkit-slider-thumb]:bg-lime"
        style={{ background: `linear-gradient(to right, var(--color-lime) ${((n - 1) / 49) * 100}%, rgb(243 240 232 / 0.15) 0)` }}
      />

      <div className="mt-auto grid grid-cols-2 gap-3 pt-10">
        <div className="rounded-2xl bg-paper/8 p-4 ring-1 ring-paper/10">
          <div className="text-[13px] text-paper/55">Havonta</div>
          <motion.div className="display mt-1 text-3xl">{monthlyText}</motion.div>
        </div>
        <div className="rounded-2xl bg-paper/8 p-4 ring-1 ring-paper/10">
          <div className="text-[13px] text-paper/55">Egy évre</div>
          <motion.div className="display mt-1 text-3xl">{yearlyText}</motion.div>
        </div>
      </div>
      <p className="mt-4 text-[13px] text-paper/50">Az első hónap minden kódnál ingyenes.</p>
    </div>
  );
}
