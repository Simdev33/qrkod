import { NextResponse } from "next/server";
import { sanitizeDesign } from "@/lib/design";
import { TOKEN_RE } from "@/lib/ids";
import { cancelImmediately } from "@/lib/server/billing";
import { cleanTitle, deleteCode, getByToken, toView, updateCode } from "@/lib/server/codes";
import { originOf } from "@/lib/server/request";
import { readJson, validTarget } from "@/lib/server/validate";

const notFound = () => NextResponse.json({ error: "Ez a kód nem létezik, vagy törölték." }, { status: 404 });

export async function GET(_req: Request, ctx: RouteContext<"/api/codes/[token]">) {
  const { token } = await ctx.params;
  const row = TOKEN_RE.test(token) ? await getByToken(token) : null;
  return row ? NextResponse.json({ code: await toView(row) }) : notFound();
}

export async function PATCH(req: Request, ctx: RouteContext<"/api/codes/[token]">) {
  const { token } = await ctx.params;
  if (!TOKEN_RE.test(token) || !(await getByToken(token))) return notFound();
  const body = await readJson(req);
  const patch: Parameters<typeof updateCode>[1] = {};
  if ("target" in body) {
    const t = validTarget(body.target, originOf(req));
    if (!t.ok) return NextResponse.json({ error: t.error }, { status: 400 });
    patch.target = t.url;
  }
  if ("title" in body) patch.title = cleanTitle(body.title);
  if ("design" in body) patch.design = sanitizeDesign(body.design);
  const row = await updateCode(token, patch);
  return row ? NextResponse.json({ code: await toView(row) }) : notFound();
}

export async function DELETE(_req: Request, ctx: RouteContext<"/api/codes/[token]">) {
  const { token } = await ctx.params;
  const row = TOKEN_RE.test(token) ? await getByToken(token) : null;
  if (!row) return notFound();
  try {
    await cancelImmediately(row);
  } catch {
    return NextResponse.json(
      { error: "Az előfizetést nem sikerült leállítani, ezért a kódot sem töröltük. Próbáld újra később." },
      { status: 502 },
    );
  }
  await deleteCode(row.id);
  return NextResponse.json({ ok: true });
}
