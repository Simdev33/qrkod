"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { QrCode } from "@/components/qr/QrCode";
import { IconDownload, IconKey } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { DEFAULT_DESIGN, type Design } from "@/lib/design";
import { brand } from "@/lib/site";

const SHOWCASE: Design[] = [
  { ...DEFAULT_DESIGN },
  { ...DEFAULT_DESIGN, dots: "dots", eyes: "circle", fg: "#3b1a5c", eye: "#8a3ffc", bg: "#faf6ff" },
  { ...DEFAULT_DESIGN, dots: "rounded", eyes: "leaf", fg: "#17402e", eye: "#2c8a5e", bg: "#f4fbef" },
  { ...DEFAULT_DESIGN, dots: "square", eyes: "square", fg: "#16161d", eye: "#e8452a", bg: "#fff6f0", frame: true, frameText: "Étlap" },
];

export function Features() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-5 sm:pt-32">
      <Reveal className="max-w-3xl">
        <span className="eyebrow">Minden benne van</span>
        <h2 className="display mt-5 text-[clamp(2rem,4.6vw,3.6rem)] leading-[0.98]">Egy dollárért nem kell kompromisszum.</h2>
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
        <Reveal className="md:row-span-2">
          <StyleCard />
        </Reveal>
        <Reveal delay={0.06}>
          <StatsCard />
        </Reveal>
        <Reveal delay={0.12}>
          <Card title="Nyomdakész letöltés" text="PNG akár 2400 px-ben, és vektoros SVG, ami plakátméretben is éles.">
            <div className="flex gap-2">
              {["PNG", "SVG"].map((f, i) => (
                <motion.span
                  key={f}
                  whileHover={{ y: -4, rotate: i ? 3 : -3 }}
                  className={`flex items-center gap-2 rounded-xl border-[1.5px] border-ink px-3.5 py-2 font-mono text-sm font-bold ${i ? "bg-sky" : "bg-sun"}`}
                >
                  <IconDownload className="size-4" /> .{f.toLowerCase()}
                </motion.span>
              ))}
            </div>
          </Card>
        </Reveal>
        <Reveal delay={0.06}>
          <Card title="Regisztráció nélkül" text="Nem kell fiók és jelszó: egy titkos kezelőlinket kapsz, ez az eszköz pedig megjegyzi a kódjaidat.">
            <div className="flex items-center gap-2 overflow-hidden rounded-xl bg-ink px-3 py-2.5 text-paper">
              <IconKey className="size-4 shrink-0 text-lime" />
              <span className="truncate font-mono text-[13px]">
                {brand.domain}/kezeles/<span className="text-paper/40">Xk2…9fQ</span>
              </span>
            </div>
          </Card>
        </Reveal>
        <Reveal delay={0.12}>
          <CancelCard />
        </Reveal>
      </div>
    </section>
  );
}

function Card({ title, text, children, className = "" }: { title: string; text: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`card flex h-full flex-col justify-between gap-6 p-6 sm:p-7 ${className}`}>
      {children}
      <div>
        <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
        <p className="mt-1.5 leading-relaxed text-muted">{text}</p>
      </div>
    </div>
  );
}

function StyleCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => setI((v) => (v + 1) % SHOWCASE.length), 2600);
    return () => clearInterval(t);
  }, [inView]);

  return (
    <div ref={ref} className="card relative flex h-full flex-col justify-between gap-8 overflow-hidden p-6 sm:p-7">
      <div className="pointer-events-none absolute -top-24 -left-24 size-72 rounded-full bg-lime/40 blur-3xl" />
      <div className="relative mx-auto mt-4 w-full max-w-[260px]">
        <div className="overflow-hidden rounded-3xl shadow-[var(--shadow-card)] ring-1 ring-ink/10">
          <QrCode text={`https://${brand.domain}/q/s7yle2`} design={SHOWCASE[i]} className="block h-auto w-full" />
        </div>
        <div className="mt-5 flex justify-center gap-1.5">
          {SHOWCASE.map((_, k) => (
            <button
              key={k}
              type="button"
              aria-label={`${k + 1}. minta`}
              onClick={() => setI(k)}
              className={`h-1.5 rounded-full transition-all duration-300 ${k === i ? "w-6 bg-ink" : "w-1.5 bg-ink/20"}`}
            />
          ))}
        </div>
      </div>
      <div className="relative">
        <h3 className="text-xl font-semibold tracking-tight">Saját stílus és logó</h3>
        <p className="mt-1.5 leading-relaxed text-muted">
          Négy pöttyminta, négyféle sarokjel, saját színek, logó a közepén és keret felirattal. A kontrasztra figyelmeztetünk,
          hogy biztosan beolvasható maradjon.
        </p>
      </div>
    </div>
  );
}

const BARS = [3, 5, 4, 8, 6, 11, 9, 14, 12, 17, 15, 21];

function StatsCard() {
  return (
    <Card title="Beolvasás-statisztika" text="Látod, hányan és mikor olvassák be a kódodat – napra lebontva.">
      <div className="flex h-24 items-end gap-1.5">
        {BARS.map((b, i) => (
          <motion.span
            key={i}
            className={`flex-1 rounded-t-md ${i === BARS.length - 1 ? "bg-kobalt" : "bg-kobalt/25"}`}
            initial={{ height: 0 }}
            whileInView={{ height: `${(b / 21) * 100}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </div>
    </Card>
  );
}

function CancelCard() {
  const [on, setOn] = useState(true);
  return (
    <Card title="Egy kattintással lemondható" text="Nincs hűségidő. Lemondás után a kifizetett hónap végéig még működik.">
      <button
        type="button"
        onClick={() => setOn((v) => !v)}
        className="flex items-center justify-between gap-3 rounded-xl border border-ink/10 bg-paper px-4 py-3 text-left"
        aria-pressed={on}
      >
        <span className="text-sm font-semibold">{on ? "Előfizetés aktív" : "Lemondva – hónap végéig él"}</span>
        <span className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${on ? "bg-kobalt" : "bg-ink/20"}`}>
          <motion.span
            className="absolute top-1 left-1 size-5 rounded-full bg-white shadow"
            animate={{ x: on ? 20 : 0 }}
            transition={{ type: "spring", stiffness: 600, damping: 32 }}
          />
        </span>
      </button>
    </Card>
  );
}
