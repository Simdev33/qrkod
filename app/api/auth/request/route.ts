import { NextResponse } from "next/server";
import { isEmail, normalizeEmail } from "@/lib/server/billing";
import { startLogin } from "@/lib/server/login";
import { limited } from "@/lib/server/rate-limit";
import { clientIp } from "@/lib/server/request";
import { langOf, readJson } from "@/lib/server/validate";

const KNOWN = new Set(["login_unavailable", "email_failed", "payments_off"]);

/** Sign-in, step 1: a code by email (subscribers only – the answer is the same either way). */
export async function POST(req: Request) {
  const body = await readJson(req);
  const email = typeof body.email === "string" ? normalizeEmail(body.email) : "";
  if (!isEmail(email)) return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  if (limited(`login:${clientIp(req)}`, 10, 15 * 60_000) || limited(`login:${email}`, 4, 15 * 60_000)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }
  try {
    await startLogin(email, langOf(body.lang));
    return NextResponse.json({ sent: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "";
    console.error("[auth/request]", err);
    const code = message === "payments_off" ? "login_unavailable" : KNOWN.has(message) ? message : "generic";
    return NextResponse.json({ error: code }, { status: 503 });
  }
}
