import { NextResponse } from "next/server";
import { TOKEN_RE } from "@/lib/ids";
import { createCheckout, portalUrl, setCancelAtPeriodEnd } from "@/lib/server/billing";
import { getByToken, toView } from "@/lib/server/codes";
import { originOf } from "@/lib/server/request";
import { langOf, readJson } from "@/lib/server/validate";
import { isSubscribed } from "@/lib/status";

// Hibánál a szótár errors-kulcsát küldjük vissza; a Stripe saját (angol) hibaüzenetét csak naplózzuk.
const KNOWN = new Set(["payments_off", "payment_failed", "no_subscription", "no_customer"]);

export async function POST(req: Request, ctx: RouteContext<"/api/codes/[token]/billing">) {
  const { token } = await ctx.params;
  const row = TOKEN_RE.test(token) ? await getByToken(token) : null;
  if (!row) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const body = await readJson(req);
  const lang = langOf(body.lang);
  const origin = originOf(req);

  try {
    switch (body.action) {
      case "checkout": {
        if (isSubscribed(row.sub_status)) return NextResponse.json({ error: "already_subscribed" }, { status: 409 });
        // Az ÁSZF elfogadása és az azonnali teljesítés kérése (elállási jog) nélkül nem indulhat fizetés.
        if (body.consent !== true) return NextResponse.json({ error: "consent_required" }, { status: 400 });
        return NextResponse.json({ url: await createCheckout(row, origin, lang) });
      }
      case "cancel":
      case "resume": {
        await setCancelAtPeriodEnd(row, body.action === "cancel");
        return NextResponse.json({ code: await toView((await getByToken(token))!) });
      }
      case "portal":
        return NextResponse.json({ url: await portalUrl(row, origin, lang) });
      default:
        return NextResponse.json({ error: "bad_request" }, { status: 400 });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "";
    if (KNOWN.has(message)) return NextResponse.json({ error: message }, { status: 502 });
    console.error("[billing]", body.action, err);
    return NextResponse.json({ error: "payment_failed" }, { status: 502 });
  }
}
