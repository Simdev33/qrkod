"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";
import { QrCode } from "@/components/qr/QrCode";
import { Reveal } from "@/components/ui/Reveal";
import { DEFAULT_DESIGN, type Design } from "@/lib/design";
import { useI18n } from "@/lib/i18n/client";
import { brand, PLAN } from "@/lib/site";

const SLEEPY: Design = { ...DEFAULT_DESIGN, fg: "#b9b4a8", eye: "#b9b4a8", bg: "#fffdf8" };
const MONTHS = 6;

export function Lifecycle() {
  const { t, fill } = useI18n();
  const L = t.life;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const [p, setP] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setP(v));

  const days = Math.round(Math.min(1, Math.max(0, (p - 0.1) / 0.55)) * PLAN.introDays);
  const months = Math.round(Math.min(1, Math.max(0, (p - 0.68) / 0.3)) * MONTHS);

  return (
    <section className="relative mx-auto max-w-6xl px-4 pt-24 sm:px-5 sm:pt-32">
      <Reveal className="max-w-3xl">
        <span className="eyebrow">{L.eyebrow}</span>
        <h2 className="display mt-5 text-[clamp(2rem,4.6vw,3.6rem)] leading-[0.98]">
          <span className="marker">{fill(L.title)}</span>
          <span className="mt-3 block text-[0.5em] leading-tight text-muted">{fill(L.titleMark)}</span>
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">
          {fill(L.lead)}
        </p>
      </Reveal>

      <div ref={ref} className="card relative mt-12 overflow-hidden p-5 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.35fr_1.1fr] lg:gap-6">
          {/* 0. nap */}
          <Phase chip={L.born.chip} chipClass="bg-ink text-paper" title={L.born.title} text={fill(L.born.text)}>
            <div className="grid h-[132px] place-items-center">
              <motion.div
                className="w-[112px] overflow-hidden rounded-2xl shadow-[var(--shadow-soft)] ring-1 ring-ink/10"
                animate={{ scale: p > 0.04 ? 1 : 0.6, opacity: p > 0.04 ? 1 : 0, rotate: p > 0.04 ? 0 : -12 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              >
                <QrCode text={`https://${brand.domain}/q/a9b3kd`} design={DEFAULT_DESIGN} animate={false} className="block h-auto w-full" />
              </motion.div>
            </div>
          </Phase>

          {/* 1–30. nap */}
          <Phase
            chip={fill(L.trial.chip)}
            chipClass="bg-lime text-ink"
            title={L.trial.title}
            text={L.trial.text}
          >
            <div className="flex h-[132px] flex-col justify-center">
              <div className="grid grid-cols-10 gap-1.5">
                {Array.from({ length: PLAN.introDays }, (_, i) => (
                  <span
                    key={i}
                    className={`aspect-square rounded-[5px] transition-all duration-300 ${
                      i < days ? "scale-100 bg-lime shadow-[inset_0_-2px_0_rgb(22_22_29/0.14)]" : "scale-90 bg-paper-2"
                    }`}
                    style={{ transitionDelay: `${(i % 10) * 12}ms` }}
                  />
                ))}
              </div>
              <div className="mt-3 flex justify-between font-mono text-[12px] text-muted">
                <span>{fill(L.trial.day, { n: days })}</span>
                <span>{fill(L.trial.label)}</span>
              </div>
            </div>
          </Phase>

          {/* 31. naptól */}
          <Phase chip={fill(L.paid.chip)} chipClass="bg-kobalt text-white" title={fill(L.paid.title)} text={fill(L.paid.text)}>
            <div className="flex h-[132px] items-center">
              <div className="grid w-full grid-cols-7 items-center gap-1.5">
                {Array.from({ length: MONTHS }, (_, i) => (
                  <span
                    key={i}
                    className={`grid aspect-[3/4] place-items-center rounded-lg font-mono text-[11px] font-bold transition-all duration-300 ${
                      i < months ? "bg-kobalt text-white shadow-[inset_0_-3px_0_rgb(0_0_0/0.2)]" : "bg-paper-2 text-transparent"
                    }`}
                    style={{ transitionDelay: `${i * 40}ms` }}
                  >
                    {L.paid.unit}
                  </span>
                ))}
                <span className={`display text-center text-2xl transition-colors duration-500 ${months >= MONTHS ? "text-kobalt" : "text-ink/15"}`}>∞</span>
              </div>
            </div>
          </Phase>
        </div>

        {/* Elágazás: ha nem fizetsz elő */}
        <div className="mt-8 grid gap-5 rounded-3xl border border-dashed border-ink/20 bg-paper/60 p-5 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-7 sm:p-6">
          <div className="relative mx-auto w-24 sm:mx-0">
            <div className="overflow-hidden rounded-2xl ring-1 ring-ink/10">
              <QrCode text={`https://${brand.domain}/q/a9b3kd`} design={SLEEPY} animate={false} className="block h-auto w-full" />
            </div>
            <motion.span
              className="display absolute -top-3 -right-3 text-lg text-muted"
              animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.6, repeat: Infinity }}
            >
              zzz
            </motion.span>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-coral-soft px-3 py-1 text-[13px] font-semibold text-coral-deep">{L.branch.chip}</span>
            </div>
            <h3 className="mt-2 text-xl font-semibold tracking-tight">{L.branch.title}</h3>
            <p className="mt-1.5 max-w-2xl leading-relaxed text-muted">
              {L.branch.text}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Phase({
  chip,
  chipClass,
  title,
  text,
  children,
}: {
  chip: string;
  chipClass: string;
  title: string;
  text: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <span className={`self-start rounded-full px-3 py-1 font-mono text-[12px] font-bold ${chipClass}`}>{chip}</span>
      <div className="mt-4">{children}</div>
      <h3 className="mt-4 text-xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-1.5 leading-relaxed text-muted">{text}</p>
    </div>
  );
}
