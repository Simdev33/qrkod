import { after, NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE, pickLocale } from "@/lib/i18n/config";
import { getById, isAlive, recordScan } from "@/lib/server/codes";
import { originOf } from "@/lib/server/request";

// A QR-kódba írt rövid link. Élő kódnál azonnal továbbít a célra, a beolvasást a válasz után számoljuk.
// A 302 + no-store fontos: a böngésző nem jegyezheti meg a célt, hiszen az bármikor átírható.
// Szünetelő vagy ismeretlen kódnál a látogató nyelvén mutatjuk a tájékoztató oldalt.

const noStore = { "Cache-Control": "no-store, max-age=0" };

export async function GET(req: NextRequest, ctx: RouteContext<"/q/[code]">) {
  const { code } = await ctx.params;
  const row = await getById(code.toLowerCase());
  const lang = pickLocale(req.cookies.get(LOCALE_COOKIE)?.value, req.headers.get("accept-language"));
  const paused = (id: string) =>
    NextResponse.redirect(new URL(`/${lang}/paused/${encodeURIComponent(id)}`, originOf(req)), { status: 302, headers: noStore });

  if (!row) return paused(code);

  const alive = isAlive(row);
  // HEAD-kérést (linkelőnézetek, ellenőrzők) nem számolunk beolvasásnak.
  if (req.method !== "HEAD") after(() => recordScan(row.id, alive));

  if (!alive) return paused(row.id);
  return NextResponse.redirect(row.target, { status: 302, headers: noStore });
}
