import { NextResponse } from "next/server";
import { TOKEN_RE } from "@/lib/ids";
import { getByTokens, toListView } from "@/lib/server/codes";
import { readJson } from "@/lib/server/validate";
import type { CodeView } from "@/lib/types";

// A „Kódjaim” oldal egyszerre kérdezi le az ezen az eszközön elmentett kódokat.
export async function POST(req: Request) {
  const { tokens } = await readJson(req);
  if (!Array.isArray(tokens)) return NextResponse.json({ error: "bad_request" }, { status: 400 });
  const now = Date.now();
  const valid = [...new Set(tokens.filter((t): t is string => typeof t === "string" && TOKEN_RE.test(t)))].slice(0, 100);
  const codes: CodeView[] = (await getByTokens(valid, now)).map(toListView);
  const missing = valid.filter((t) => !codes.some((c) => c.token === t));
  return NextResponse.json({ codes, missing, now });
}
