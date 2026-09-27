// Márka- és árazási alapadatok. A név és a domain egyelőre munkanév, itt egy helyen cserélhető.

/**
 * A nyilvános cím, amit a QR-kódokba írunk. Nem kell beállítani: Vercelen a projekt éles domainje
 * (VERCEL_PROJECT_PRODUCTION_URL — saját domain esetén az, különben a *.vercel.app cím). A
 * NEXT_PUBLIC_SITE_URL csak opcionális felülírás. Üres szöveg = a kérés hosztja dönt (helyi futtatás).
 */
export function configuredOrigin(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  return vercel ? `https://${vercel.replace(/^https?:\/\//, "").replace(/\/+$/, "")}` : "";
}

export const brand = {
  name: "Kockakód",
  domain: "kockakod.hu",
  url: configuredOrigin() || "http://localhost:3244",
  email: "hello@kockakod.hu",
};

export const pricing = {
  /** Az ingyenes időszak hossza napban. */
  trialDays: 30,
  /** Havidíj centben (USD). */
  monthlyCents: 100,
  currency: "usd" as const,
  label: "1 $",
};

export const DAY = 24 * 60 * 60 * 1000;
