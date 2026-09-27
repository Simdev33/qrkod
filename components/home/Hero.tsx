"use client";

import { motion } from "motion/react";
import { LineReveal } from "@/components/ui/Reveal";

// Lebegő „pixelek” a cím körül: a QR-modulok visszhangja, színes részletek a világos alapon.
const PIXELS = [
  { c: "bg-lime", s: 22, x: "3%", y: "10%", r: 12, d: 0 },
  { c: "bg-kobalt", s: 14, x: "6%", y: "74%", r: -8, d: 1.2 },
  { c: "bg-coral", s: 18, x: "95%", y: "8%", r: 18, d: 0.6 },
  { c: "bg-sun", s: 12, x: "91%", y: "80%", r: -14, d: 1.8 },
  { c: "bg-sky", s: 26, x: "97%", y: "44%", r: 8, d: 2.4 },
  { c: "bg-ink", s: 10, x: "0.5%", y: "42%", r: 0, d: 3 },
];

export function Hero({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative overflow-x-clip">
      <div
        className="dot-grid pointer-events-none absolute inset-x-0 -top-24 h-[760px] [mask-image:radial-gradient(ellipse_at_50%_30%,black_30%,transparent_72%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute top-10 left-1/2 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(198_240_60/0.35),transparent)]" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4 pt-10 sm:px-5 sm:pt-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-[380px] md:block" aria-hidden>
          {PIXELS.map((p, i) => (
            <motion.span
              key={i}
              className={`absolute block rounded-[5px] ${p.c}`}
              style={{ width: p.s, height: p.s, left: p.x, top: p.y }}
              initial={{ opacity: 0, scale: 0, rotate: p.r - 90 }}
              animate={{ opacity: 1, scale: 1, rotate: p.r, y: [0, -12, 0] }}
              transition={{
                opacity: { delay: 0.5 + i * 0.08, duration: 0.4 },
                scale: { delay: 0.5 + i * 0.08, type: "spring", stiffness: 300, damping: 14 },
                rotate: { delay: 0.5 + i * 0.08, duration: 0.8 },
                y: { delay: p.d, duration: 6 + i, repeat: Infinity, ease: "easeInOut" },
              }}
            />
          ))}
        </div>

        <div className="relative mx-auto max-w-5xl text-center">
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-kobalt/60" />
              <span className="relative size-2 rounded-full bg-kobalt" />
            </span>
            Dinamikus QR-kód · az első hónap ingyen
          </motion.span>

          <h1 className="display mt-6 text-[clamp(2.4rem,6vw,5.4rem)] leading-[0.94]">
            <LineReveal
              delay={0.1}
              lines={[
                "Nyomtasd ki egyszer,",
                <>
                  irányítsd <span className="marker">bármikor.</span>
                </>,
              ]}
            />
          </h1>

          <motion.p
            className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-2 sm:text-lg"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            Készíts QR-kódot pár másodperc alatt. <strong className="font-semibold text-ink">30 napig ingyen működik</strong>,
            utána <strong className="font-semibold text-ink">havi 1 dollárért</strong> él tovább — a mögötte lévő linket pedig
            közben bármikor átírhatod.
          </motion.p>
        </div>

        <motion.div
          id="keszito"
          className="relative mt-10 scroll-mt-28 sm:mt-14"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
