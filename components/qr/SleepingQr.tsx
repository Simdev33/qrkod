"use client";

import { motion } from "motion/react";
import type { Design } from "@/lib/design";
import { QrCode } from "./QrCode";

/** Szürkére halványuló, „alvó” QR-kód a szünetelő kódok oldalán. */
export function SleepingQr({ text, design }: { text: string; design: Design }) {
  return (
    <div className="relative mx-auto w-44">
      <motion.div
        initial={{ filter: "grayscale(0)", opacity: 1 }}
        animate={{ filter: "grayscale(1)", opacity: 0.45 }}
        transition={{ duration: 1.6, delay: 0.9, ease: "easeInOut" }}
        className="overflow-hidden rounded-3xl ring-1 ring-ink/10"
      >
        <QrCode text={text} design={design} className="block h-auto w-full" label="Szünetelő QR-kód" />
      </motion.div>
      {["z", "z", "Z"].map((z, i) => (
        <motion.span
          key={i}
          className="display absolute text-ink"
          style={{ right: -8 - i * 14, top: 8 - i * 22, fontSize: 18 + i * 7 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: [0, 1, 0], y: [10, -8, -22] }}
          transition={{ duration: 2.8, delay: 1.8 + i * 0.45, repeat: Infinity, repeatDelay: 0.6 }}
        >
          {z}
        </motion.span>
      ))}
    </div>
  );
}
