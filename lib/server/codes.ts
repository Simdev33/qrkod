import "server-only";
import { createHash } from "node:crypto";
import { all, isUniqueViolation, one, run } from "./db";
import { paymentMode } from "./mode";
import { sanitizeDesign, type Design } from "@/lib/design";
import { dayKey } from "@/lib/format";
import { CODE_RE, randomCode, randomToken } from "@/lib/ids";
import { RETENTION_MONTHS } from "@/lib/legal";
import { DAY, pricing } from "@/lib/site";
import { lifeStatus } from "@/lib/status";
import type { CodeView, SubStatus } from "@/lib/types";

export type CodeRow = {
  id: string;
  token: string;
  title: string;
  target: string;
  design: string;
  created_at: number;
  trial_ends_at: number;
  paid_until: number | null;
  sub_id: string | null;
  sub_status: SubStatus | null;
  cancel_at_period_end: number;
  customer_id: string | null;
  scans: number;
  missed_scans: number;
  last_scan_at: number | null;
  creator: string | null;
};

const TITLE_MAX = 60;
export const cleanTitle = (t: unknown) =>
  typeof t === "string" ? t.replace(/[\u0000-\u001f]/g, "").trim().slice(0, TITLE_MAX) : "";

/* ---------------- Olvasás ---------------- */

/** A demó-előfizetés „megújulása”: a Stripe havi terhelését utánozza, amikor legközelebb ránézünk. */
async function refresh(row: CodeRow, now: number): Promise<CodeRow> {
  if (!row.sub_id?.startsWith("demo_") || row.paid_until == null || row.paid_until > now) return row;
  // Élesben egy (fejlesztésből ottmaradt) demó-előfizetés nem újulhat meg magától.
  if (paymentMode() !== "demo") return row;
  if (row.sub_status === "canceled") return row;
  if (row.cancel_at_period_end) {
    await run("UPDATE codes SET sub_status = 'canceled' WHERE id = ?", [row.id]);
    return { ...row, sub_status: "canceled" };
  }
  let until = row.paid_until;
  while (until <= now) until += 30 * DAY;
  await run("UPDATE codes SET paid_until = ?, sub_status = 'active' WHERE id = ?", [until, row.id]);
  return { ...row, paid_until: until, sub_status: "active" };
}

export async function getByToken(token: string, now = Date.now()): Promise<CodeRow | null> {
  const row = await one<CodeRow>("SELECT * FROM codes WHERE token = ?", [token]);
  return row ? refresh(row, now) : null;
}

export async function getById(id: string, now = Date.now()): Promise<CodeRow | null> {
  if (!CODE_RE.test(id)) return null;
  const row = await one<CodeRow>("SELECT * FROM codes WHERE id = ?", [id]);
  return row ? refresh(row, now) : null;
}

export function getBySubscription(subId: string): Promise<CodeRow | null> {
  return one<CodeRow>("SELECT * FROM codes WHERE sub_id = ?", [subId]);
}

export function isAlive(row: CodeRow, now = Date.now()) {
  return lifeStatus(statusInput(row), now).alive;
}

const statusInput = (row: CodeRow) => ({
  createdAt: row.created_at,
  trialEndsAt: row.trial_ends_at,
  paidUntil: row.paid_until,
  subStatus: row.sub_status,
  cancelAtPeriodEnd: !!row.cancel_at_period_end,
});

export async function toView(row: CodeRow, now = Date.now()): Promise<CodeView> {
  const days: string[] = [];
  for (let i = 29; i >= 0; i--) days.push(dayKey(now - i * DAY));
  const counts = await all<{ day: string; count: number }>(
    "SELECT day, count FROM scan_days WHERE code_id = ? AND day >= ?",
    [row.id, days[0]],
  );
  const byDay = new Map(counts.map((c) => [c.day, c.count]));
  return {
    id: row.id,
    token: row.token,
    title: row.title,
    target: row.target,
    design: sanitizeDesign(JSON.parse(row.design)),
    ...statusInput(row),
    hasCustomer: !!row.customer_id,
    scans: row.scans,
    missedScans: row.missed_scans,
    lastScanAt: row.last_scan_at,
    daily: days.map((day) => ({ day, count: byDay.get(day) ?? 0 })),
  };
}

/* ---------------- Létrehozás és korlát ---------------- */

/** Az IP-címet csak sózott hash-ként tároljuk, kizárólag a kódgyártás korlátozásához. */
export const creatorKey = (ip: string) =>
  createHash("sha256")
    .update(`${process.env.CREATOR_SALT || "kockakod"}:${ip}`)
    .digest("base64url")
    .slice(0, 22);

export async function createdRecently(creator: string, windowMs: number, now = Date.now()) {
  const row = await one<{ n: number }>("SELECT COUNT(*) AS n FROM codes WHERE creator = ? AND created_at > ?", [
    creator,
    now - windowMs,
  ]);
  return row?.n ?? 0;
}

export async function createCode(
  input: { target: string; title: string; design: Design; proposedId?: string; creator: string },
  now = Date.now(),
) {
  const token = randomToken();
  // Az előnézetben mutatott kódot próbáljuk elsőként; ütközésnél (foglalt) újat sorsolunk.
  let id = input.proposedId && CODE_RE.test(input.proposedId) ? input.proposedId : randomCode();
  for (let attempt = 0; ; attempt++) {
    try {
      await run(
        "INSERT INTO codes (id, token, title, target, design, created_at, trial_ends_at, creator) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [id, token, input.title, input.target, JSON.stringify(input.design), now, now + pricing.trialDays * DAY, input.creator],
      );
      break;
    } catch (err) {
      if (!isUniqueViolation(err) || attempt >= 8) throw err;
      id = randomCode();
    }
  }
  return (await getByToken(token, now))!;
}

/* ---------------- Módosítás ---------------- */

export async function updateCode(token: string, patch: { target?: string; title?: string; design?: Design }) {
  const fields: [string, string][] = [];
  if (patch.target !== undefined) fields.push(["target", patch.target]);
  if (patch.title !== undefined) fields.push(["title", patch.title]);
  if (patch.design !== undefined) fields.push(["design", JSON.stringify(patch.design)]);
  if (fields.length) {
    const sql = `UPDATE codes SET ${fields.map(([k]) => `${k} = ?`).join(", ")} WHERE token = ?`;
    await run(sql, [...fields.map(([, v]) => v), token]);
  }
  return getByToken(token);
}

export async function deleteCode(id: string) {
  await run("DELETE FROM scan_days WHERE code_id = ?", [id]);
  await run("DELETE FROM codes WHERE id = ?", [id]);
}

export async function recordScan(id: string, alive: boolean, now = Date.now()) {
  if (!alive) {
    await run("UPDATE codes SET missed_scans = missed_scans + 1 WHERE id = ?", [id]);
    return;
  }
  await run("UPDATE codes SET scans = scans + 1, last_scan_at = ? WHERE id = ?", [now, id]);
  await run(
    "INSERT INTO scan_days (code_id, day, count) VALUES (?, ?, 1) ON CONFLICT(code_id, day) DO UPDATE SET count = count + 1",
    [id, dayKey(now)],
  );
}

/** Előfizetés-állapot beírása (Stripe-ból vagy a demóból). A kifizetett időszak vége sosem csökken. */
export async function applySubscription(
  id: string,
  sub: { id: string; status: SubStatus; periodEnd: number | null; cancelAtPeriodEnd: boolean; customer?: string | null },
) {
  const row = await one<Pick<CodeRow, "paid_until" | "customer_id">>(
    "SELECT paid_until, customer_id FROM codes WHERE id = ?",
    [id],
  );
  if (!row) return;
  let paidUntil = row.paid_until;
  if ((sub.status === "active" || sub.status === "trialing") && sub.periodEnd) {
    paidUntil = Math.max(paidUntil ?? 0, sub.periodEnd);
  }
  await run(
    "UPDATE codes SET sub_id = ?, sub_status = ?, cancel_at_period_end = ?, paid_until = ?, customer_id = ? WHERE id = ?",
    [sub.id, sub.status, sub.cancelAtPeriodEnd ? 1 : 0, paidUntil, sub.customer ?? row.customer_id, id],
  );
}

/** Csak fejlesztéshez: a kód összes időpontját eltolja, mintha `days` nappal korábban készült volna. */
export async function shiftDays(id: string, days: number) {
  const ms = days * DAY;
  await run(
    "UPDATE codes SET created_at = created_at - ?, trial_ends_at = trial_ends_at - ?, paid_until = CASE WHEN paid_until IS NULL THEN NULL ELSE paid_until - ? END WHERE id = ?",
    [ms, ms, ms, id],
  );
}

/* ---------------- Megőrzési idő ---------------- */

const g = globalThis as unknown as { __kockakodPurgedAt?: number };

/**
 * A megőrzési időn túl szünetelő kódok végleges törlése (Adatkezelési tájékoztató: {retentionMonths}
 * hónap). Példányonként legfeljebb 12 óránként fut le, a kódkészítés után a háttérben.
 */
export async function purgeExpired(now = Date.now()) {
  if (g.__kockakodPurgedAt && now - g.__kockakodPurgedAt < 12 * 60 * 60 * 1000) return;
  g.__kockakodPurgedAt = now;
  const cutoff = now - RETENTION_MONTHS * 30 * DAY;
  const stale = `SELECT id FROM codes WHERE MAX(trial_ends_at, COALESCE(paid_until, 0)) < ?
    AND (sub_status IS NULL OR sub_status NOT IN ('active', 'trialing', 'past_due'))`;
  await run(`DELETE FROM scan_days WHERE code_id IN (${stale})`, [cutoff]);
  await run(`DELETE FROM codes WHERE id IN (${stale})`, [cutoff]);
}
