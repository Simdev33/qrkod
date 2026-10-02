import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { SIGNIN } from "@/lib/signin";

// Signed, httpOnly cookies instead of user accounts: the session only holds the email address, and the codes
// are looked up through the Stripe customers with that address (lib/server/login.ts).

export type Session = { email: string };
export type PendingLogin = { email: string; exp: number };

/** The signing key; without SESSION_SECRET in production, signing in is switched off. */
function secret() {
  const value = process.env.SESSION_SECRET?.trim();
  if (value && value.length >= 16) return value;
  if (process.env.NODE_ENV === "production") return null;
  return "development-only-session-secret";
}

function mac(body: string) {
  const key = secret();
  if (!key) throw new Error("login_unavailable");
  return createHmac("sha256", key).update(body).digest("base64url");
}

function sign(payload: object) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${mac(body)}`;
}

function unsign<T>(token: string | undefined): T | null {
  if (!token || !secret()) return null;
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;
  const expected = Buffer.from(mac(body));
  const actual = Buffer.from(signature);
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null;
  try {
    return JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as T;
  } catch {
    return null;
  }
}

export const signinAvailable = () => secret() !== null;

/** Keyed hash for values we never store in plain form (sign-in codes). */
export function keyedHash(value: string) {
  return mac(`code:${value}`);
}

const base = { path: "/", sameSite: "lax" as const, httpOnly: true, secure: process.env.NODE_ENV === "production" };

export async function getSession(): Promise<Session | null> {
  const session = unsign<Session>((await cookies()).get(SIGNIN.cookies.session)?.value);
  return session?.email ? session : null;
}

export async function setSession(session: Session) {
  (await cookies()).set(SIGNIN.cookies.session, sign(session), { ...base, maxAge: SIGNIN.sessionDays * 24 * 60 * 60 });
}

export async function clearSession() {
  (await cookies()).delete(SIGNIN.cookies.session);
}

export async function getPendingLogin(): Promise<PendingLogin | null> {
  const pending = unsign<PendingLogin>((await cookies()).get(SIGNIN.cookies.login)?.value);
  return pending && pending.exp > Date.now() ? pending : null;
}

export async function setPendingLogin(pending: PendingLogin) {
  (await cookies()).set(SIGNIN.cookies.login, sign(pending), {
    ...base,
    maxAge: Math.ceil((pending.exp - Date.now()) / 1000),
  });
}

export async function clearPendingLogin() {
  (await cookies()).delete(SIGNIN.cookies.login);
}
