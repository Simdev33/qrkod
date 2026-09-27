"use client";

import { motion, type HTMLMotionProps } from "motion/react";

/** Görgetésre finoman felúszó blokk. */
export function Reveal({
  delay = 0,
  y = 24,
  children,
  ...rest
}: HTMLMotionProps<"div"> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Soronként alulról felúszó cím. A belső padding + negatív margó helyet ad a nagybetűs ékezeteknek. */
export function LineReveal({ lines, className = "", delay = 0 }: { lines: React.ReactNode[]; className?: string; delay?: number }) {
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="-mt-[0.22em] -mb-[0.12em] block overflow-hidden pt-[0.22em] pb-[0.12em]">
          <motion.span
            className="block"
            initial={{ y: "115%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.9, delay: delay + i * 0.11, ease: [0.16, 1, 0.3, 1] }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
