"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { IconPlus } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { useI18n } from "@/lib/i18n/client";
import { RETENTION_MONTHS } from "@/lib/legal";
import { brand } from "@/lib/site";


export function Faq() {
  const { t, fill } = useI18n();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="mx-auto max-w-4xl scroll-mt-24 px-4 pt-24 sm:px-5 sm:pt-32">
      <Reveal className="text-center">
        <span className="eyebrow">{t.faq.eyebrow}</span>
        <h2 className="display mt-5 text-[clamp(2rem,4.6vw,3.6rem)] leading-[0.98]">{t.faq.title}</h2>
      </Reveal>
      <div className="mt-12 space-y-3">
        {t.faq.items.map((item, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={item.q} delay={Math.min(i, 4) * 0.04} y={14}>
              <div className={`rounded-3xl border transition-colors duration-300 ${isOpen ? "border-ink/15 bg-card shadow-[var(--shadow-soft)]" : "border-ink/10 bg-card/50"}`}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left sm:px-7"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="text-[17px] font-semibold tracking-tight">{item.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0, backgroundColor: isOpen ? "#c6f03c" : "rgba(22,22,29,0.06)" }}
                    transition={{ duration: 0.25 }}
                    className="grid size-9 shrink-0 place-items-center rounded-xl"
                  >
                    <IconPlus className="size-4" strokeWidth={2.5} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-6 leading-relaxed text-ink-2 sm:px-7">{fill(item.a, { domain: brand.domain, months: RETENTION_MONTHS })}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
