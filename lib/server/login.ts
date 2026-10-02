import "server-only";
import { randomInt, timingSafeEqual } from "node:crypto";
import { normalizeEmail, ourCustomerIds } from "./billing";
import { getByCustomers, type CodeRow } from "./codes";
import { one, run } from "./db";
import { sendLoginCode } from "./email";
import { clearPendingLogin, getPendingLogin, keyedHash, setPendingLogin, setSession } from "./session";
import type { Locale } from "@/lib/i18n/config";
import { SIGNIN } from "@/lib/signin";

// Password-free sign-in with a 6-digit email code. Only subscribers can sign in: their codes are the ones paid
// for by the Stripe customers with that email address. The answer to a request never reveals whether an
// address belongs to a subscriber.

export type LoginResult = "ok" | "invalid" | "expired" | "locked";

/** The codes paid for with this email address. */
export async function codesForEmail(email: string): Promise<CodeRow[]> {
  return getByCustomers(await ourCustomerIds(email));
}

export async function startLogin(rawEmail: string, lang: Locale) {
  const email = normalizeEmail(rawEmail);
  const exp = Date.now() + SIGNIN.codeMinutes * 60_000;
  if ((await codesForEmail(email)).length) {
    const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
    await run(
      `INSERT INTO login_codes (email, code_hash, expires_at, attempts) VALUES (?, ?, ?, 0)
       ON CONFLICT(email) DO UPDATE SET code_hash = excluded.code_hash, expires_at = excluded.expires_at, attempts = 0`,
      [email, keyedHash(`${email}:${code}`), exp],
    );
    await sendLoginCode(email, code, lang);
  }
  await setPendingLogin({ email, exp });
}

const same = (a: string, b: string) => a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b));

export async function finishLogin(rawCode: string): Promise<LoginResult> {
  const pending = await getPendingLogin();
  if (!pending) return "expired";
  const code = rawCode.replace(/\D/g, "");
  if (code.length !== 6) return "invalid";

  const row = await one<{ code_hash: string; expires_at: number; attempts: number }>(
    "SELECT code_hash, expires_at, attempts FROM login_codes WHERE email = ?",
    [pending.email],
  );
  // No row: the address has no codes – it looks exactly like a wrong code.
  if (!row) return "invalid";
  if (row.expires_at < Date.now()) return "expired";
  if (row.attempts >= SIGNIN.maxAttempts) return "locked";

  if (!same(keyedHash(`${pending.email}:${code}`), row.code_hash)) {
    await run("UPDATE login_codes SET attempts = attempts + 1 WHERE email = ?", [pending.email]);
    return row.attempts + 1 >= SIGNIN.maxAttempts ? "locked" : "invalid";
  }

  await run("DELETE FROM login_codes WHERE email = ?", [pending.email]);
  await setSession({ email: pending.email });
  await clearPendingLogin();
  return "ok";
}
