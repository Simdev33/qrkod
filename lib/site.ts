// Márka- és árazási alapadatok. A név és a domain egyelőre munkanév, itt egy helyen cserélhető.

export const brand = {
  name: "Kockakód",
  domain: "kockakod.hu",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || "http://localhost:3244",
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
