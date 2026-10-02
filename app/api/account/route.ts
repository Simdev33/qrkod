import { NextResponse } from "next/server";
import { toView } from "@/lib/server/codes";
import { codesForEmail } from "@/lib/server/login";
import { clearSession, getSession } from "@/lib/server/session";

/** The signed-in subscriber and the codes paid for with their email address. */
export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "not_signed_in" }, { status: 401 });
  try {
    const now = Date.now();
    const codes = await Promise.all((await codesForEmail(session.email)).map((row) => toView(row, now)));
    return NextResponse.json({ email: session.email, codes, now });
  } catch (err) {
    console.error("[account]", err);
    return NextResponse.json({ error: "payment_failed" }, { status: 502 });
  }
}

/** Sign out. */
export async function DELETE() {
  await clearSession();
  return NextResponse.json({ signedIn: false });
}
