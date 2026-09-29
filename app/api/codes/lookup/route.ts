import { NextResponse } from "next/server";
import { TOKEN_RE } from "@/lib/ids";
import { getByToken, toView } from "@/lib/server/codes";
import { readJson } from "@/lib/server/validate";
import type { CodeView } from "@/lib/types";

// A „Kódjaim” oldal egyszerre kérdezi le az ezen az eszközön elmentett kódokat.
export async function POST(req: Request) {
  const { tokens } = await readJson(req);
  if (!Array.isArray(tokens)) return NextResponse.json({ error: "bad_request" }, { status: 400 });
  const now = Date.now();
  const valid = [...new Set(tokens.filter((t): t is string => typeof t === "string" && TOKEN_RE.test(t)))].slice(0, 100);
  const found = await Promise.all(valid.map((t) => getByToken(t, now)));
  const codes: CodeView[] = await Promise.all(found.filter((r) => r !== null).map((r) => toView(r, now)));
  const missing = valid.filter((t) => !codes.some((c) => c.token === t));
  return NextResponse.json({ codes, missing, now });
}
