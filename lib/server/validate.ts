import "server-only";
import { normalizeUrl } from "@/lib/format";

/** Cél-URL ellenőrzése: csak http(s), és nem mutathat vissza a saját rövid linkjeinkre (végtelen kör). */
export function validTarget(raw: unknown, origin: string): { ok: true; url: string } | { ok: false; error: string } {
  if (typeof raw !== "string") return { ok: false, error: "Add meg a linket, ahová a kód vezessen." };
  const url = normalizeUrl(raw);
  if (!url) return { ok: false, error: "Ez nem tűnik érvényes webcímnek. Például: pelda.hu/menu" };
  const u = new URL(url);
  if (u.hostname === "localhost" && process.env.NODE_ENV === "production") {
    return { ok: false, error: "Helyi címre nem mutathat a kód." };
  }
  const own = new URL(origin);
  if (u.host === own.host && u.pathname.startsWith("/q/")) {
    return { ok: false, error: "A kód nem mutathat egy másik Kockakód rövid linkre." };
  }
  return { ok: true, url };
}

export async function readJson(req: Request): Promise<Record<string, unknown>> {
  try {
    const body = await req.json();
    return body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}
