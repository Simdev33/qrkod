// Jogi dokumentumok szerkezete. A szövegekben {kulcs} alakú helyőrzők állnak, ezeket a
// lib/legal.ts adatai (szolgáltató, adatfeldolgozók, ár) töltik ki megjelenítéskor.
//
// Használható helyőrzők: {brand} {siteUrl} {operatorName} {operatorAddress} {operatorRegistry}
// {operatorTax} {operatorEmail} {vatNote} {hosting} {database} {payments} {trialDays} {price}
// {effectiveDate} {retentionMonths} {hourlyLimit}

export type LegalSection = {
  /** Szakaszcím (számozás nélkül, azt a megjelenítés adja). */
  h: string;
  /** Bekezdések. A <b>…</b> félkövér kiemelést ad. */
  p?: string[];
  /** Felsorolás a bekezdések után. */
  list?: string[];
  /** Bekezdések a felsorolás után. */
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
    /** pl. „Hatályos: {date}” */
    effective: string;
    toc: string;
    /** Megjegyzés a nem magyar változatok tetején (a magyar változatban üres). */
    translationNote: string;
    /** Figyelmeztetés, ha a szolgáltatói adatok még kitöltetlenek. */
    placeholderNote: string;
  };
};
