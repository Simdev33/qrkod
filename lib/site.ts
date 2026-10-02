// Brand, domain and the plan – one place to change them.

/**
 * The public address written into the QR codes. Nothing to configure: on Vercel it is the project’s
 * production domain (VERCEL_PROJECT_PRODUCTION_URL – the custom domain if there is one, otherwise the
 * *.vercel.app address). NEXT_PUBLIC_SITE_URL is only an optional override. An empty string means the
 * request’s host decides (local development).
 */
export function configuredOrigin(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  return vercel ? `https://${vercel.replace(/^https?:\/\//, "").replace(/\/+$/, "")}` : "";
}

export const brand = {
  name: "GenerateMyQRCodes",
  domain: "generatemyqrcodes.com",
  url: configuredOrigin() || "http://localhost:3244",
  /** Contact address of the operator – the same for every TourCierge site. */
  email: "help@testmyabilities.com",
};

/**
 * The only plan, per QR code: {introDays} days for {introCents}, then {monthlyCents} a month
 * (a Stripe subscription with a trial and a one-off fee on its first invoice).
 */
export const PLAN = {
  introDays: 7,
  introCents: 100,
  monthlyCents: 399,
  currency: "EUR",
} as const;

/** Codes created before the paid plan had a free period; new codes get none. */
export const FREE_DAYS = 0;

export const DAY = 24 * 60 * 60 * 1000;
