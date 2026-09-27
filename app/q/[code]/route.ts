import { after, NextResponse } from "next/server";
import { getById, isAlive, recordScan } from "@/lib/server/codes";
import { originOf } from "@/lib/server/request";

// A QR-kódba írt rövid link. Élő kódnál azonnal továbbít a célra, a beolvasást a válasz után számoljuk.
// A 302 + no-store fontos: a böngésző nem jegyezheti meg a célt, hiszen az bármikor átírható.

const noStore = { "Cache-Control": "no-store, max-age=0" };

export async function GET(req: Request, ctx: RouteContext<"/q/[code]">) {
  const { code } = await ctx.params;
  const row = await getById(code.toLowerCase());
  if (!row) {
    return NextResponse.redirect(new URL(`/q/${encodeURIComponent(code)}/szunetel`, originOf(req)), { status: 302, headers: noStore });
  }

  const alive = isAlive(row);
  // HEAD-kérést (linkelőnézetek, ellenőrzők) nem számolunk beolvasásnak.
  if (req.method !== "HEAD") after(() => recordScan(row.id, alive));

  if (!alive) return NextResponse.redirect(new URL(`/q/${row.id}/szunetel`, originOf(req)), { status: 302, headers: noStore });
  return NextResponse.redirect(row.target, { status: 302, headers: noStore });
}
