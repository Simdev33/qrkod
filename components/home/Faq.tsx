"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { IconPlus } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

const QA = [
  {
    q: "Mi az a dinamikus QR-kód?",
    a: "A kód nem közvetlenül a weboldaladat tartalmazza, hanem egy rövid linket (pl. kockakod.hu/q/7kp2xa), ami továbbirányít a célra. Így a célt bármikor átírhatod, a kinyomtatott kód pedig ugyanaz marad.",
  },
  {
    q: "Mi történik a 30. nap után, ha nem fizetek elő?",
    a: "A kód szünetel: aki beolvassa, egy „ez a kód most szünetel” oldalt lát. A kódot és a beállításait megőrizzük, így ha később előfizetsz, ugyanaz a kód azonnal újra működik – nem kell újranyomtatni.",
  },
  {
    q: "Kell bankkártya a próbaidőhöz?",
    a: "Nem. A kód létrehozásához sem regisztráció, sem kártya nem kell. Kártyát csak akkor adsz meg, amikor előfizetsz.",
  },
  {
    q: "Ha a próbaidő alatt fizetek elő, elveszítem a hátralévő ingyenes napokat?",
    a: "Nem. Az első 1 $-t a 30. nap után vonjuk le, onnantól havonta. (Ha már csak két napnál kevesebb van hátra, az előfizetés azonnal indul.)",
  },
  {
    q: "Hogyan mondhatom le?",
    a: "A kód kezelőoldalán egy kattintással. A kifizetett hónap végéig a kód még működik, utána szünetel. Hűségidő nincs.",
  },
  {
    q: "Hogyan érem el a kódjaimat regisztráció nélkül?",
    a: "Minden kódhoz tartozik egy titkos kezelőlink – ezt érdemes elmenteni vagy elküldeni magadnak. Az a böngésző, amelyikben a kódot készítetted, a „Kódjaim” oldalon is megjegyzi.",
  },
  {
    q: "Miért dollárban van az ár?",
    a: "Így minden országban ugyanannyi. A bankod a saját árfolyamán váltja át forintra – ez havonta néhány száz forint.",
  },
  {
    q: "Van korlát a beolvasások számára?",
    a: "Nincs. Egy kódot akárhányszor beolvashatnak, a díj ugyanúgy havi 1 $.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="gyik" className="mx-auto max-w-4xl scroll-mt-24 px-4 pt-24 sm:px-5 sm:pt-32">
      <Reveal className="text-center">
        <span className="eyebrow">GYIK</span>
        <h2 className="display mt-5 text-[clamp(2rem,4.6vw,3.6rem)] leading-[0.98]">Gyakori kérdések</h2>
      </Reveal>
      <div className="mt-12 space-y-3">
        {QA.map((item, i) => {
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
                      <p className="px-5 pb-6 leading-relaxed text-ink-2 sm:px-7">{item.a}</p>
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
