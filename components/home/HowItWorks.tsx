"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { QrCode } from "@/components/qr/QrCode";
import { IconCheck } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { DEFAULT_DESIGN } from "@/lib/design";
import { useI18n } from "@/lib/i18n/client";
import { brand } from "@/lib/site";


export function HowItWorks() {
  const { t, fill } = useI18n();
  return (
    <section id="how" className="relative mx-auto max-w-6xl scroll-mt-24 px-4 pt-24 sm:px-5 sm:pt-32">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <Reveal>
            <span className="eyebrow">{t.how.eyebrow}</span>
            <h2 className="display mt-5 text-[clamp(2rem,4.6vw,3.6rem)] leading-[0.98]">
              {t.how.title} <span className="text-kobalt">{t.how.titleAccent}</span>
            </h2>
          </Reveal>
          <ol className="mt-10 space-y-4">
            {t.how.steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <li className="group flex gap-5 rounded-3xl border border-transparent p-4 transition-colors hover:border-ink/10 hover:bg-card/70 sm:p-5">
                  <span className="display grid size-12 shrink-0 place-items-center rounded-2xl bg-ink text-xl text-lime transition-transform duration-300 group-hover:-rotate-6">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{s.title}</h3>
                    <p className="mt-1 leading-relaxed text-muted">{fill(s.text)}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
        <Reveal delay={0.15}>
          <RedirectDemo />
        </Reveal>
      </div>
    </section>
  );
}

const TONES = ["bg-sun", "bg-lime", "bg-sky"];

function RedirectDemo() {
  const d = useI18n().t.how.demo;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timer = setInterval(() => setI((v) => (v + 1) % d.targets.length), 3000);
    return () => clearInterval(timer);
  }, [inView, d.targets.length]);

  const t = { ...d.targets[i], tone: TONES[i % TONES.length] };
  const short = `${brand.domain}/q/7kp2xa`;

  return (
    <div ref={ref} className="card dot-grid relative overflow-hidden bg-paper p-6 sm:p-9">
      <div className="pointer-events-none absolute -top-20 -right-20 size-64 rounded-full bg-lilac/50 blur-3xl" />
      <div className="relative flex flex-col items-center">
        <div className="flex items-center gap-4 self-stretch rounded-2xl border border-ink/10 bg-white p-3 pr-5 shadow-[var(--shadow-soft)]">
          <div className="w-20 shrink-0 overflow-hidden rounded-xl ring-1 ring-ink/10">
            <QrCode text={`https://${short}`} design={DEFAULT_DESIGN} animate={false} className="block h-auto w-full" />
          </div>
          <div>
            <div className="text-[12px] font-semibold tracking-wider text-muted uppercase">{d.printed}</div>
            <div className="mt-0.5 font-semibold">{d.printedText}</div>
          </div>
        </div>

        <Wire pulseKey={i} />

        <div className="flex items-center gap-3 self-stretch rounded-2xl bg-ink p-4 text-paper">
          <span className="grid size-10 place-items-center rounded-xl bg-lime font-mono text-sm font-bold text-ink">→</span>
          <div className="min-w-0">
            <div className="text-[12px] font-semibold tracking-wider text-paper/55 uppercase">{d.short}</div>
            <div className="truncate font-mono text-[15px]">{short}</div>
          </div>
        </div>

        <Wire pulseKey={i} delay={0.35} />

        <div className="relative self-stretch">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={t.url}
              initial={{ opacity: 0, y: 26, rotateX: -40 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -18, scale: 0.96 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-[var(--shadow-soft)]"
              style={{ transformPerspective: 800 }}
            >
              <div className={`flex items-center gap-1.5 px-4 py-2.5 ${t.tone}`}>
                <span className="size-2.5 rounded-full bg-ink/25" />
                <span className="size-2.5 rounded-full bg-ink/25" />
                <span className="size-2.5 rounded-full bg-ink/25" />
                <span className="ml-2 truncate rounded-md bg-white/70 px-2 py-0.5 font-mono text-[12px]">{t.url}</span>
              </div>
              <div className="flex items-center justify-between gap-4 px-4 py-4">
                <div>
                  <div className="text-[12px] font-semibold tracking-wider text-muted uppercase">{d.target}</div>
                  <div className="display mt-1 text-xl">{t.title}</div>
                </div>
                <div className="grid w-24 gap-1.5" aria-hidden>
                  <span className="h-2 rounded-full bg-ink/10" />
                  <span className="h-2 w-3/4 rounded-full bg-ink/10" />
                  <span className="h-2 w-1/2 rounded-full bg-ink/10" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence>
            <motion.div
              key={`toast-${i}`}
              initial={{ opacity: 0, scale: 0.6, y: 8 }}
              animate={{ opacity: [0, 1, 1, 0], scale: [0.6, 1, 1, 0.95], y: [8, 0, 0, -6] }}
              transition={{ duration: 2.4, times: [0, 0.12, 0.8, 1], delay: 0.5 }}
              className="absolute -top-4 right-3 flex items-center gap-1.5 rounded-full bg-kobalt px-3 py-1.5 text-[13px] font-semibold text-white shadow-lg"
            >
              <IconCheck className="size-3.5" strokeWidth={3} /> {d.updated}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Wire({ pulseKey, delay = 0 }: { pulseKey: number; delay?: number }) {
  return (
    <div className="relative h-11 w-px" aria-hidden>
      <div className="absolute inset-0 border-l-2 border-dashed border-ink/25" />
      <motion.span
        key={pulseKey}
        className="absolute -left-[5px] size-3 rounded-full bg-kobalt shadow-[0_0_0_4px_rgb(47_69_255/0.18)]"
        initial={{ top: "-10%", opacity: 0 }}
        animate={{ top: ["-10%", "90%"], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 0.6, delay, ease: "easeInOut" }}
      />
    </div>
  );
}
