import { NextResponse } from "next/server";
import { sanitizeDesign } from "@/lib/design";
import { cleanTitle, createCode, createdRecently, creatorKey } from "@/lib/server/codes";
import { clientIp, originOf } from "@/lib/server/request";
import { readJson, validTarget } from "@/lib/server/validate";

const HOURLY_LIMIT = 20;

export async function POST(req: Request) {
  const creator = creatorKey(clientIp(req));
  if ((await createdRecently(creator, 60 * 60 * 1000)) >= HOURLY_LIMIT) {
    return NextResponse.json({ error: "Túl sok kód készült rövid idő alatt. Próbáld újra egy óra múlva." }, { status: 429 });
  }
  const body = await readJson(req);
  const target = validTarget(body.target, originOf(req));
  if (!target.ok) return NextResponse.json({ error: target.error }, { status: 400 });

  const row = await createCode({
    target: target.url,
    title: cleanTitle(body.title),
    design: sanitizeDesign(body.design),
    proposedId: typeof body.proposedId === "string" ? body.proposedId : undefined,
    creator,
  });
  return NextResponse.json({ id: row.id, token: row.token }, { status: 201 });
}
