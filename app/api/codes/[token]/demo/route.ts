import { NextResponse } from "next/server";
import { TOKEN_RE } from "@/lib/ids";
import { demoSubscribe, paymentMode } from "@/lib/server/billing";
import { getByToken, shiftDays, toView } from "@/lib/server/codes";
import { readJson } from "@/lib/server/validate";

// Csak fejlesztői módban, Stripe-kulcs nélkül: szimulált előfizetés és „időutazás” a próbaidő végére.

export async function POST(req: Request, ctx: RouteContext<"/api/codes/[token]/demo">) {
  if (paymentMode() !== "demo") return NextResponse.json({ error: "not_found" }, { status: 404 });
  const { token } = await ctx.params;
  const row = TOKEN_RE.test(token) ? await getByToken(token) : null;
  if (!row) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const { action, days } = await readJson(req);

  if (action === "subscribe") await demoSubscribe(row);
  else if (action === "shift" && typeof days === "number" && Math.abs(days) <= 400) await shiftDays(row.id, days);
  else return NextResponse.json({ error: "bad_request" }, { status: 400 });

  return NextResponse.json({ code: await toView((await getByToken(token))!) });
}
