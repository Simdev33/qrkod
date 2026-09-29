// Nyelvfüggetlen segédek. A dátum- és számformázás nyelvfüggő, az a lib/i18n/format.ts-ben van.

/** A cél-URL rövid, olvasható alakja: séma és „www.” nélkül. */
export function prettyUrl(url: string) {
  return url.replace(/^https?:\/\//i, "").replace(/^www\./i, "").replace(/\/$/, "");
}

/** Felhasználói bemenetből URL: hiányzó sémánál https:// elé. Érvénytelen bemenetre null. */
export function normalizeUrl(raw: string): string | null {
  const v = raw.trim();
  if (!v || /\s/.test(v)) return null;
  const withScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(v) ? v : `https://${v}`;
  try {
    const u = new URL(withScheme);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    const host = u.hostname;
    if (!host || (!host.includes(".") && host !== "localhost") || host.endsWith(".")) return null;
    if (withScheme.length > 2048) return null;
    return u.toString();
  } catch {
    return null;
  }
}

/** A napokat a budapesti naptár szerint számoljuk (a statisztika napjaihoz). */
export function dayKey(ms: number) {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Budapest" }).format(ms);
}
