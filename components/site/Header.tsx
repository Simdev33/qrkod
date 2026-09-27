"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { onLocalCodesChange, readLocalCodes } from "@/lib/local-codes";
import { Logo } from "./Logo";

const NAV = [
  { href: "/#hogyan", label: "Hogyan működik" },
  { href: "/#arazas", label: "Árazás" },
  { href: "/#gyik", label: "GYIK" },
];

const codeCount = () => readLocalCodes().length;

export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const count = useSyncExternalStore(onLocalCodesChange, codeCount, () => 0);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12));
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 px-3 pt-3 sm:px-5"
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl px-3 py-2.5 transition-all duration-300 sm:px-4 ${
          scrolled || open
            ? "border border-ink/10 bg-card/85 shadow-[0_10px_30px_-18px_rgb(22_22_29/0.35)] backdrop-blur-xl"
            : "border border-transparent"
        }`}
      >
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Fő navigáció">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="rounded-xl px-3.5 py-2 text-[15px] font-medium text-ink-2 transition-colors hover:bg-ink/5 hover:text-ink">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/kodjaim" className="btn btn-ghost hidden px-4 py-2.5 text-sm sm:inline-flex">
            Kódjaim
            {count > 0 && (
              <span className="grid min-w-5 place-items-center rounded-full bg-ink px-1.5 py-0.5 font-mono text-[11px] leading-none text-lime">
                {count}
              </span>
            )}
          </Link>
          <Link href="/#keszito" className="btn btn-lime hidden px-4 py-2.5 text-sm sm:inline-flex">
            Kód készítése
          </Link>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-xl md:hidden"
            aria-label={open ? "Menü bezárása" : "Menü megnyitása"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="relative block h-3.5 w-5">
              <motion.span className="absolute left-0 h-0.5 w-5 rounded bg-ink" animate={open ? { top: 6, rotate: 45 } : { top: 0, rotate: 0 }} />
              <motion.span className="absolute top-1.5 left-0 h-0.5 w-5 rounded bg-ink" animate={{ opacity: open ? 0 : 1 }} />
              <motion.span className="absolute left-0 h-0.5 w-5 rounded bg-ink" animate={open ? { top: 6, rotate: -45 } : { top: 12, rotate: 0 }} />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="card mx-auto mt-2 grid max-w-6xl gap-1 p-2 md:hidden"
            aria-label="Mobil navigáció"
          >
            {[...NAV, { href: "/kodjaim", label: count ? `Kódjaim (${count})` : "Kódjaim" }].map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-base font-medium hover:bg-ink/5">
                {n.label}
              </Link>
            ))}
            <Link href="/#keszito" onClick={() => setOpen(false)} className="btn btn-lime mt-1">
              Kód készítése
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
