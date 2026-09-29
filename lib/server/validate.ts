import "server-only";
import { normalizeUrl } from "@/lib/format";
import { DEFAULT_LOCALE, hasLocale, type Locale } from "@/lib/i18n/config";

/**
 * Cél-URL ellenőrzése: csak http(s), és nem mutathat vissza a saját rövid linkjeinkre (végtelen kör).
 * Hibánál a szótár errors-kulcsát adja vissza, a felület ezt fordítja le.
 */
export function validTarget(raw: unknown, origin: string): { ok: true; url: string } | { ok: false; error: string } {
  if (typeof raw !== "string" || !raw.trim()) return { ok: false, error: "missing_target" };
  const url = normalizeUrl(raw);
  if (!url) return { ok: false, error: "invalid_url" };
  const u = new URL(url);
  if (u.hostname === "localhost" && process.env.NODE_ENV === "production") return { ok: false, error: "local_target" };
  const own = new URL(origin);
  if (u.host === own.host && u.pathname.startsWith("/q/")) return { ok: false, error: "loop_target" };
  return { ok: true, url };
}

/** A kérésben küldött nyelv (Stripe-oldal nyelve, visszatérési cím); ismeretlennél angol. */
export const langOf = (value: unknown): Locale => (typeof value === "string" && hasLocale(value) ? value : DEFAULT_LOCALE);

export async function readJson(req: Request): Promise<Record<string, unknown>> {
  try {
    const body = await req.json();
    return body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}
