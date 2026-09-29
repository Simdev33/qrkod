// Támogatott nyelvek. Az URL mindig nyelvi előtaggal kezdődik (/hu, /en, …), kivéve a QR-kódokba írt
// rövid linkeket (/q/<kód>), amik nyelvfüggetlenek — azok a böngésző nyelve alapján irányítanak.

export const LOCALES = ["hu", "en", "de", "fr", "es"] as const;
export type Locale = (typeof LOCALES)[number];

/** Ha a böngésző egyik támogatott nyelvet sem kéri. */
export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_COOKIE = "NEXT_LOCALE";

export const LOCALE_NAMES: Record<Locale, string> = {
  hu: "Magyar",
  en: "English",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
};

/** Az Intl-formázók (dátum, szám) területi beállítása. */
export const INTL_LOCALE: Record<Locale, string> = {
  hu: "hu-HU",
  en: "en-GB",
  de: "de-DE",
  fr: "fr-FR",
  es: "es-ES",
};

/** Open Graph területi kód. */
export const OG_LOCALE: Record<Locale, string> = {
  hu: "hu_HU",
  en: "en_GB",
  de: "de_DE",
  fr: "fr_FR",
  es: "es_ES",
};

export const hasLocale = (value: string | undefined | null): value is Locale =>
  !!value && (LOCALES as readonly string[]).includes(value);

/** Accept-Language fejlécből a legjobban illeszkedő támogatott nyelv. */
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

/** A látogató nyelve: korábbi választás (süti) → böngésző nyelve → alapértelmezés. */
export function pickLocale(cookie: string | undefined | null, acceptLanguage: string | null | undefined): Locale {
  if (hasLocale(cookie)) return cookie;
  return matchAcceptLanguage(acceptLanguage) ?? DEFAULT_LOCALE;
}

/** Nyelvi előtaggal ellátott belső útvonal: localePath("de", "/terms") → "/de/terms". */
export function localePath(lang: Locale, path = "/") {
  if (path === "/" || path === "") return `/${lang}`;
  if (path.startsWith("#")) return `/${lang}${path}`;
  return `/${lang}${path.startsWith("/") ? path : `/${path}`}`;
}
