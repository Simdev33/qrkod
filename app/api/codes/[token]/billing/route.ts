import { NextResponse } from "next/server";
import { TOKEN_RE } from "@/lib/ids";
import { completeCheckout, openCheckout, portalUrl, setCancelAtPeriodEnd } from "@/lib/server/billing";
import { getByToken, toView } from "@/lib/server/codes";
import { limited } from "@/lib/server/rate-limit";
import { clientIp, originOf } from "@/lib/server/request";
import { langOf, readJson } from "@/lib/server/validate";
import { isSubscribed } from "@/lib/status";

// Errors are sent back as dictionary keys (errors.*); Stripe’s own messages are only logged.
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
      // The payment form, opened with the page: the code's Checkout Session (the email is typed into the form).
      // If its last payment was never recorded, it is recorded now and the activated code comes back instead.
      case "checkout": {
        if (isSubscribed(row.sub_status)) return NextResponse.json({ error: "already_subscribed" }, { status: 409 });
        if (limited(`checkout:${clientIp(req)}`, 30, 15 * 60_000)) {
          return NextResponse.json({ error: "rate_limited" }, { status: 429 });
        }
        const result = await openCheckout(row, origin, lang);
        if ("completed" in result) return NextResponse.json({ code: await toView((await getByToken(token))!) });
        return NextResponse.json({ clientSecret: result.clientSecret });
      }
      // After a successful payment: the subscription is written onto the code right away (the webhook also does it).
      case "complete": {
        const sessionId = typeof body.sessionId === "string" ? body.sessionId : "";
        if (!(await completeCheckout(sessionId, row))) {
          return NextResponse.json({ error: "payment_incomplete" }, { status: 402 });
        }
        return NextResponse.json({ code: await toView((await getByToken(token))!) });
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
