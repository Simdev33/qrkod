// A jogi dokumentumokba (ÁSZF, Adatkezelési tájékoztató) kerülő adatok. A szögletes zárójeles
// értékeket élesítés előtt ki kell tölteni — amíg ilyen maradt, a dokumentumok tetején figyelmeztetés
// jelenik meg, és a hiányzó adat kiemelve látszik.

import { brand, pricing } from "./site";

export const operator = {
  /** Cégnév vagy egyéni vállalkozó neve. */
  name: "[Szolgáltató neve]",
  /** Székhely (egyéni vállalkozónál a vállalkozás címe). */
  address: "[Székhely címe]",
  /** Cégjegyzékszám vagy egyéni vállalkozói nyilvántartási szám. */
  registry: "[Nyilvántartási szám]",
  taxNumber: "[Adószám]",
  email: brand.email,
  /**
   * Áfa-tájékoztató mondat az ár után, pl. „Az ár tartalmazza az általános forgalmi adót.” vagy
   * „A Szolgáltató alanyi adómentes, az ár áfát nem tartalmaz.” — könyvelővel egyeztetendő.
   */
  vatNote: "[Áfa-tájékoztatás]",
};

/** Adatfeldolgozók / közreműködők, ahogy a dokumentumokban megjelennek. */
export const processors = {
  hosting: "Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA (vercel.com)",
  database: "Turso – ChiselStrike, Inc. (turso.tech)",
  payments: "Stripe Payments Europe, Limited, 1 Grand Canal Street Lower, Grand Canal Dock, Dublin, D02 H210, Ireland (stripe.com)",
};

/** A jelenlegi dokumentumok hatálybalépése (ÉÉÉÉ-HH-NN). Tartalmi változáskor frissítsd! */
export const LEGAL_EFFECTIVE_DATE = "2026-09-29";

/** Ennyi hónapig őrizzük meg a szünetelő kódokat (a törlést a lib/server/codes.ts végzi). */
export const RETENTION_MONTHS = 12;

/** Óránként ennyi új kód hozható létre egy címről. */
export const HOURLY_CREATE_LIMIT = 20;

export const isPlaceholder = (value: string) => /^\[.*\]$/.test(value.trim());

export function legalVars(siteUrl: string, price: string) {
  return {
    brand: brand.name,
    siteUrl,
    operatorName: operator.name,
    operatorAddress: operator.address,
    operatorRegistry: operator.registry,
    operatorTax: operator.taxNumber,
    operatorEmail: operator.email,
    vatNote: operator.vatNote,
    hosting: processors.hosting,
    database: processors.database,
    payments: processors.payments,
    trialDays: pricing.trialDays,
    price,
    retentionMonths: RETENTION_MONTHS,
    hourlyLimit: HOURLY_CREATE_LIMIT,
  };
}
