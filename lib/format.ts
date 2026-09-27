import { DAY } from "./site";

const TZ = "Europe/Budapest";

const longDate = new Intl.DateTimeFormat("hu-HU", { year: "numeric", month: "long", day: "numeric", timeZone: TZ });
const shortDate = new Intl.DateTimeFormat("hu-HU", { month: "short", day: "numeric", timeZone: TZ });
const dateTime = new Intl.DateTimeFormat("hu-HU", {
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: TZ,
});
const number = new Intl.NumberFormat("hu-HU");

export const fmtDate = (ms: number) => longDate.format(ms);
export const fmtShort = (ms: number) => shortDate.format(ms);
export const fmtDateTime = (ms: number) => dateTime.format(ms);
export const fmtNumber = (n: number) => number.format(n);

/** „ma”, „tegnap”, „5 napja”, „3 hete”… */
export function fmtAgo(ms: number, now: number) {
  const diff = now - ms;
  if (diff < 60_000) return "épp most";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)} perce`;
  if (diff < DAY) return `${Math.floor(diff / 3_600_000)} órája`;
  const days = Math.floor(diff / DAY);
  if (days === 1) return "tegnap";
  if (days < 14) return `${days} napja`;
  if (days < 60) return `${Math.floor(days / 7)} hete`;
  return fmtDate(ms);
}

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
  return new Intl.DateTimeFormat("sv-SE", { timeZone: TZ }).format(ms);
}
