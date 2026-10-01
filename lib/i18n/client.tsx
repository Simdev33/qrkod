"use client";

import { createContext, useContext, useMemo } from "react";
import { brand } from "@/lib/site";
import { localePath, type Locale } from "./config";
import type { Dictionary } from "./dictionaries/en";
import { fill, formatAgo, formatDate, formatMoney, formatNumber, formatShortDate, plural, priceVars, type Plural, type Vars } from "./format";

type Ctx = { lang: Locale; dict: Dictionary };
const I18nContext = createContext<Ctx | null>(null);

/** A gyökér-layout adja át az aktuális nyelvet és szótárat a kliens-komponenseknek. */
export function I18nProvider({ lang, dict, children }: Ctx & { children: React.ReactNode }) {
  const value = useMemo(() => ({ lang, dict }), [lang, dict]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export type ErrorCode = keyof Dictionary["errors"];

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n: hiányzik az I18nProvider");
  const { lang, dict } = ctx;
  return useMemo(() => {
    // The brand and the prices are filled into every text automatically.
    const base = { brand: brand.name, ...priceVars(lang) };
    return {
      lang,
      t: dict,
      /** Nyelvi előtagos belső útvonal. */
      l: (path = "/") => localePath(lang, path),
      fill: (template: string, vars?: Vars) => fill(template, { ...base, ...vars }),
      plural: (entry: Plural, n: number, vars?: Vars) => plural(lang, entry, n, { ...base, ...vars }),
      date: (ms: number) => formatDate(lang, ms),
      shortDate: (ms: number) => formatShortDate(lang, ms),
      number: (n: number) => formatNumber(lang, n),
      money: (cents: number) => formatMoney(lang, cents),
      ago: (ms: number, now: number) => formatAgo(lang, ms, now),
      /** Szerveres hibakód → lefordított üzenet. */
      error: (code: string | undefined) => fill((code && dict.errors[code as ErrorCode]) || dict.errors.generic, base),
    };
  }, [lang, dict]);
}
