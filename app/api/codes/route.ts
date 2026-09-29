import { after, NextResponse } from "next/server";
import { sanitizeDesign } from "@/lib/design";
import { HOURLY_CREATE_LIMIT } from "@/lib/legal";
import { cleanTitle, createCode, createdRecently, creatorKey, purgeExpired } from "@/lib/server/codes";
import { clientIp, originOf } from "@/lib/server/request";
import { readJson, validTarget } from "@/lib/server/validate";

export async function POST(req: Request) {
  const creator = creatorKey(clientIp(req));
  if ((await createdRecently(creator, 60 * 60 * 1000)) >= HOURLY_CREATE_LIMIT) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
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
  // A régóta szünetelő kódok törlése (az Adatkezelési tájékoztatóban vállalt megőrzési idő után).
  after(() => purgeExpired());
  return NextResponse.json({ id: row.id, token: row.token }, { status: 201 });
}
