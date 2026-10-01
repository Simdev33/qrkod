// Structure of the legal documents. The texts contain {key} placeholders that are filled from lib/legal.ts
// (operator, processors) and from the plan (prices) when the page is rendered.
//
// Placeholders: {brand} {siteUrl} {operatorName} {operatorAddress} {operatorRegistry} {operatorTax}
// {operatorEmail} {hosting} {database} {payments} {paymentsPrivacy} {authority} {adr} {intro} {monthly}
// {days} {next} {retentionMonths} {pendingDays} {hourlyLimit} {date}

export type LegalSection = {
  /** Section title (without number – the page adds it). */
  h: string;
  /** Paragraphs. <b>…</b> gives bold emphasis. */
  p?: string[];
  /** A list after the paragraphs. */
  list?: string[];
  /** Paragraphs after the list. */
  after?: string[];
};

export type LegalDoc = {
  title: string;
  lead: string;
  sections: LegalSection[];
};

export type LegalTexts = {
  terms: LegalDoc;
  privacy: LegalDoc;
  ui: {
    /** e.g. "Effective: {date}" */
    effective: string;
    toc: string;
    /** Note at the top of the translations (empty in the English original). */
    translationNote: string;
    /** Notice shown while some operator detail is still missing. */
    placeholderNote: string;
  };
};
