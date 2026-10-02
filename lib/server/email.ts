import "server-only";
import type { Locale } from "@/lib/i18n/config";
import { fill } from "@/lib/i18n/format";
import { getDictionary } from "@/lib/i18n/server";
import { SIGNIN } from "@/lib/signin";
import { brand } from "@/lib/site";

// Transactional email (sign-in codes) through the Resend HTTP API. Without RESEND_API_KEY, in development the
// code is written to the server log; in production signing in is switched off.

const escape = (text: string) =>
  text.replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[char]!);

export const emailConfigured = () => !!process.env.RESEND_API_KEY?.trim() || process.env.NODE_ENV !== "production";

export async function sendLoginCode(to: string, code: string, lang: Locale) {
  const E = getDictionary(lang).email;
  const vars = { brand: brand.name, code, minutes: SIGNIN.codeMinutes };
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) {
    if (process.env.NODE_ENV === "production") throw new Error("login_unavailable");
    console.info(`[login] code for ${to}: ${code} (set RESEND_API_KEY to send it by email)`);
    return;
  }

  const [intro, validity, ignore] = [E.intro, E.validity, E.ignore].map((text) => fill(text, vars));
  const html = `<div style="background:#f3f0e8;padding:32px 16px;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif">
<div style="max-width:440px;margin:0 auto;background:#ffffff;border-radius:20px;padding:32px;color:#16161d;font-size:15px;line-height:1.6">
<p style="margin:0 0 20px;font-weight:700;font-size:17px">GenerateMy<span style="color:#2f45ff">QR</span>Codes</p>
<p style="margin:0">${escape(intro)}</p>
<p style="margin:20px 0;padding:14px 0;border-radius:14px;background:#effbc8;text-align:center;font-size:32px;font-weight:700;letter-spacing:8px">${code}</p>
<p style="margin:0">${escape(validity)}</p>
<p style="margin:16px 0 0;color:#6b6975;font-size:13px">${escape(ignore)}</p>
</div>
</div>`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM?.trim() || `${brand.name} <no-reply@${brand.domain}>`,
      to: [to],
      subject: fill(E.subject, vars),
      text: [intro, code, validity, ignore].join("\n\n"),
      html,
    }),
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) {
    console.error("[email] Resend", response.status, await response.text().catch(() => ""));
    throw new Error("email_failed");
  }
}
