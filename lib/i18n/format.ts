import { INTL_LOCALE, type Locale } from "./config";

// Nyelvfüggő formázás és a szótárbejegyzések kitöltése. Kliensen és szerveren is használható.

const TZ = "Europe/Budapest";
const DAY = 24 * 60 * 60 * 1000;

export type Plural = { one: string; other: string };
export type Vars = Record<string, string | number>;

/** {kulcs} helyőrzők kitöltése. Az ismeretlen helyőrző változatlan marad. */
export function fill(template: string, vars: Vars = {}) {
  return template.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));
}

const pluralRules = new Map<Locale, Intl.PluralRules>();

/** Többes számú bejegyzés kiválasztása és kitöltése ({n} automatikusan a szám). */
export function plural(lang: Locale, entry: Plural, n: number, vars: Vars = {}) {
  let rules = pluralRules.get(lang);
  if (!rules) pluralRules.set(lang, (rules = new Intl.PluralRules(INTL_LOCALE[lang])));
  const form = rules.select(n) === "one" ? entry.one : entry.other;
  return fill(form, { n: formatNumber(lang, n), ...vars });
}

export const formatNumber = (lang: Locale, n: number) => new Intl.NumberFormat(INTL_LOCALE[lang]).format(n);

export const formatDate = (lang: Locale, ms: number) =>
  new Intl.DateTimeFormat(INTL_LOCALE[lang], { year: "numeric", month: "long", day: "numeric", timeZone: TZ }).format(ms);

export const formatShortDate = (lang: Locale, ms: number) =>
  new Intl.DateTimeFormat(INTL_LOCALE[lang], { month: "short", day: "numeric", timeZone: TZ }).format(ms);

export const formatUsd = (lang: Locale, amount: number) =>
  new Intl.NumberFormat(INTL_LOCALE[lang], { style: "currency", currency: "USD" }).format(amount);

/** „5 perce”, „tegnap”, „3 hete”… az Intl.RelativeTimeFormat saját fordításával. */
export function formatAgo(lang: Locale, ms: number, now: number) {
  const rtf = new Intl.RelativeTimeFormat(INTL_LOCALE[lang], { numeric: "auto" });
  const diff = Math.max(0, now - ms);
  if (diff < 60_000) return rtf.format(0, "second");
  if (diff < 3_600_000) return rtf.format(-Math.floor(diff / 60_000), "minute");
  if (diff < DAY) return rtf.format(-Math.floor(diff / 3_600_000), "hour");
  const days = Math.floor(diff / DAY);
  if (days < 14) return rtf.format(-days, "day");
  if (days < 60) return rtf.format(-Math.floor(days / 7), "week");
  return formatDate(lang, ms);
}

/* ---------------- Egyszerű jelölőnyelv: <b>…</b>, <terms>…</terms>, <privacy>…</privacy> ---------------- */

export type RichPart = { tag: string | null; text: string };

/** A szöveget sima és címkézett darabokra bontja (egymásba ágyazás nélkül). */
export function parseRich(text: string): RichPart[] {
  const parts: RichPart[] = [];
  const re = /<(\w+)>([\s\S]*?)<\/\1>/g;
  let last = 0;
  for (let m = re.exec(text); m; m = re.exec(text)) {
    if (m.index > last) parts.push({ tag: null, text: text.slice(last, m.index) });
    parts.push({ tag: m[1], text: m[2] });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({ tag: null, text: text.slice(last) });
  return parts;
}

export const stripTags = (text: string) => parseRich(text).map((p) => p.text).join("");
