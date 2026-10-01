// Supported languages. English is the main language and lives at the root without a prefix (/, /terms,
// /manage/…); the others have a prefix (/hu, /de/terms…). Internally every page is served from /<lang>/…,
// the proxy rewrites the unprefixed addresses to /en/…. The QR codes’ short links (/q/<code>) are
// language-independent.

export const LOCALES = ["en", "hu", "de", "fr", "es"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_COOKIE = "NEXT_LOCALE";

export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  hu: "Magyar",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
};

/** Locale of the Intl formatters (dates, numbers, money). */
export const INTL_LOCALE: Record<Locale, string> = {
  en: "en-GB",
  hu: "hu-HU",
  de: "de-DE",
  fr: "fr-FR",
  es: "es-ES",
};

/** Open Graph locale. */
export const OG_LOCALE: Record<Locale, string> = {
  en: "en_GB",
  hu: "hu_HU",
  de: "de_DE",
  fr: "fr_FR",
  es: "es_ES",
};

export const hasLocale = (value: string | undefined | null): value is Locale =>
  !!value && (LOCALES as readonly string[]).includes(value);

/** The best supported language for an Accept-Language header. */
export function matchAcceptLanguage(header: string | null | undefined): Locale | null {
  if (!header) return null;
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return { tag: tag.trim().toLowerCase(), q: q ? Number(q.trim().slice(2)) || 0 : 1 };
    })
    .filter((x) => x.tag && x.q > 0)
    .sort((a, b) => b.q - a.q);
  for (const { tag } of ranked) {
    const base = tag.split("-")[0];
    if (hasLocale(base)) return base;
  }
  return null;
}

/** The visitor’s language: earlier choice (cookie) → browser language → English. */
export function pickLocale(cookie: string | undefined | null, acceptLanguage: string | null | undefined): Locale {
  if (hasLocale(cookie)) return cookie;
  return matchAcceptLanguage(acceptLanguage) ?? DEFAULT_LOCALE;
}

/**
 * An internal path in a language: English without a prefix, the others with one.
 * localePath("de", "/terms") → "/de/terms"; localePath("en", "/terms") → "/terms"; localePath("hu", "/#faq") → "/hu#faq".
 */
export function localePath(lang: Locale, path = "/") {
  let p = path || "/";
  if (p.startsWith("#") || p.startsWith("?")) p = `/${p}`;
  if (!p.startsWith("/")) p = `/${p}`;
  if (lang === DEFAULT_LOCALE) return p;
  if (p === "/") return `/${lang}`;
  if (p.startsWith("/#") || p.startsWith("/?")) return `/${lang}${p.slice(1)}`;
  return `/${lang}${p}`;
}

/** The path without its language prefix (the English form of the address). */
export function stripLocale(pathname: string) {
  const first = pathname.split("/")[1];
  return hasLocale(first) ? pathname.slice(first.length + 1) || "/" : pathname;
}
