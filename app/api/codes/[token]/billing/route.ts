import { NextResponse } from "next/server";
import { TOKEN_RE } from "@/lib/ids";
import { createCheckout, portalUrl, setCancelAtPeriodEnd } from "@/lib/server/billing";
import { getByToken, toView } from "@/lib/server/codes";
import { originOf } from "@/lib/server/request";
import { readJson } from "@/lib/server/validate";
import { isSubscribed } from "@/lib/status";

export async function POST(req: Request, ctx: RouteContext<"/api/codes/[token]/billing">) {
  const { token } = await ctx.params;
  const row = TOKEN_RE.test(token) ? await getByToken(token) : null;
  if (!row) return NextResponse.json({ error: "Ez a kód nem létezik." }, { status: 404 });
  const { action } = await readJson(req);
  const origin = originOf(req);

  try {
    switch (action) {
      case "checkout": {
        if (isSubscribed(row.sub_status)) {
          return NextResponse.json({ error: "Ehhez a kódhoz már van élő előfizetés." }, { status: 409 });
        }
        return NextResponse.json({ url: await createCheckout(row, origin) });
      }
      case "cancel":
      case "resume": {
        await setCancelAtPeriodEnd(row, action === "cancel");
        return NextResponse.json({ code: await toView((await getByToken(token))!) });
      }
      case "portal":
        return NextResponse.json({ url: await portalUrl(row, origin) });
      default:
        return NextResponse.json({ error: "Ismeretlen művelet." }, { status: 400 });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Váratlan hiba történt.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
