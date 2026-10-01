"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n/client";
import { LOCALE_COOKIE, LOCALE_NAMES, LOCALES, localePath, stripLocale, type Locale } from "@/lib/i18n/config";

/** The current page in another language (English has no prefix). */
function useSwitchHref() {
  const pathname = usePathname();
  return (target: Locale) => localePath(target, stripLocale(pathname));
}

/** The choice is remembered, so “/” and the QR codes’ pages open in this language next time. */
function remember(lang: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${lang}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
    </svg>
  );
}

/** Legördülő nyelvválasztó a fejlécbe. */
export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, t } = useI18n();
  const href = useSwitchHref();
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => !box.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={box} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t.common.language}
        className="flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-semibold text-ink-2 uppercase transition-colors hover:bg-ink/5 hover:text-ink"
      >
        <GlobeIcon />
        {lang}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.16 }}
            className="card absolute top-full right-0 z-10 mt-2 grid w-44 origin-top-right gap-0.5 p-1.5"
          >
            {LOCALES.map((l) => (
              <Link
                key={l}
                role="menuitem"
                href={href(l)}
                hrefLang={l}
                prefetch={false}
                onClick={() => {
                  remember(l);
                  setOpen(false);
                }}
                className={`flex items-center justify-between rounded-xl px-3 py-2 text-[15px] transition-colors ${
                  l === lang ? "bg-ink text-paper" : "text-ink-2 hover:bg-ink/5 hover:text-ink"
                }`}
              >
                {LOCALE_NAMES[l]}
                <span className={`font-mono text-[11px] uppercase ${l === lang ? "text-lime" : "text-muted"}`}>{l}</span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Nyelvek egy sorban (mobilmenü, lábléc). */
export function LanguageRow({ dark = false, onPick }: { dark?: boolean; onPick?: () => void }) {
  const { lang, t } = useI18n();
  const href = useSwitchHref();
  return (
    <nav className="flex flex-wrap gap-1.5" aria-label={t.common.language}>
      {LOCALES.map((l) => (
        <Link
          key={l}
          href={href(l)}
          hrefLang={l}
          prefetch={false}
          onClick={() => {
            remember(l);
            onPick?.();
          }}
          title={LOCALE_NAMES[l]}
          className={`rounded-lg px-2.5 py-1 font-mono text-[12px] font-bold uppercase transition-colors ${
            l === lang
              ? dark
                ? "bg-lime text-ink"
                : "bg-ink text-lime"
              : dark
                ? "text-paper/60 hover:bg-paper/10 hover:text-paper"
                : "text-muted hover:bg-ink/5 hover:text-ink"
          }`}
        >
          {l}
        </Link>
      ))}
    </nav>
  );
}
