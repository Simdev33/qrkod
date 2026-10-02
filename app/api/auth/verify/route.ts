import { NextResponse } from "next/server";
import { finishLogin } from "@/lib/server/login";
import { limited } from "@/lib/server/rate-limit";
import { clientIp } from "@/lib/server/request";
import { readJson } from "@/lib/server/validate";

const ERRORS = { invalid: "invalid_code", expired: "code_expired", locked: "code_locked" } as const;

/** Sign-in, step 2: checks the code and starts the session. */
export async function POST(req: Request) {
  const body = await readJson(req);
  if (limited(`verify:${clientIp(req)}`, 20, 15 * 60_000)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  try {
    const result = await finishLogin(typeof body.code === "string" ? body.code.slice(0, 20) : "");
    if (result === "ok") return NextResponse.json({ signedIn: true });
    return NextResponse.json({ error: ERRORS[result] }, { status: result === "invalid" ? 400 : 410 });
  } catch (err) {
    console.error("[auth/verify]", err);
    return NextResponse.json({ error: "login_unavailable" }, { status: 503 });
  }
}
