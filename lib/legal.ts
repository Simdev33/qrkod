// Data that goes into the legal documents (Terms of Service, Privacy Policy) in every language.
// Values in square brackets are placeholders: while any remains, the documents show a notice and the
// missing value is highlighted.

import { brand } from "./site";

/** The operator – same company as GetProCV, DoneSignIn and ConvertPDFNow. */
export const operator = {
  name: "TourCierge s. r. o.",
  address: "Karpatské námestie 10A, 831 06 Bratislava – mestská časť Rača, Slovenská republika",
  registry: "IČO 57383898 · Obchodný register Mestského súdu Bratislava III, oddiel Sro, vložka č. 194953/B",
  taxNumber: "DIČ 2122693199",
  /** Not provided yet – while empty, the legal pages show a "to be completed" marker. */
  email: brand.email,
};

/** Processors and other parties named in the documents. */
export const parties = {
  hosting: "Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA (https://vercel.com)",
  database: "ChiselStrike, Inc. – Turso (https://turso.tech)",
  payments: "Stripe Payments Europe, Ltd., 1 Grand Canal Street Lower, Grand Canal Dock, Dublin, D02 H210, Ireland",
  paymentsPrivacy: "https://stripe.com/privacy",
  authority: "Úrad na ochranu osobných údajov Slovenskej republiky, Hraničná 12, 820 07 Bratislava 27 (https://dataprotection.gov.sk)",
  adr: "Slovenská obchodná inšpekcia (https://www.soi.sk)",
};

/** Date from which the current documents apply (YYYY-MM-DD). Update it whenever their content changes. */
export const LEGAL_EFFECTIVE_DATE = "2026-10-01";

/** Paused codes are kept this long, then deleted (lib/server/codes.ts → purgeExpired). */
export const RETENTION_MONTHS = 12;

/** Codes that were never activated are deleted after this many days. */
export const PENDING_DAYS = 30;

/** At most this many new codes per hour from one address. */
export const HOURLY_CREATE_LIMIT = 20;

const TO_BE_COMPLETED = "[to be completed]";

export const isPlaceholder = (value: string) => /^\[.*\]$/.test(value.trim());

export function legalVars(siteUrl: string, prices: Record<string, string | number>) {
  return {
    brand: brand.name,
    siteUrl,
    operatorName: operator.name,
    operatorAddress: operator.address,
    operatorRegistry: operator.registry,
    operatorTax: operator.taxNumber,
    operatorEmail: operator.email || TO_BE_COMPLETED,
    ...parties,
    ...prices,
    retentionMonths: RETENTION_MONTHS,
    pendingDays: PENDING_DAYS,
    hourlyLimit: HOURLY_CREATE_LIMIT,
  };
}

/** True while some operator detail is still missing. */
export const legalIncomplete = () => !operator.email || Object.values(operator).some((v) => isPlaceholder(v));
