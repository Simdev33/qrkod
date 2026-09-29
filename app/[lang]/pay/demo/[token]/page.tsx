import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DemoCheckout } from "@/components/manage/DemoCheckout";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/server";
import { TOKEN_RE } from "@/lib/ids";
import { paymentMode, trialHasLead } from "@/lib/server/billing";
import { getByToken } from "@/lib/server/codes";

export async function generateMetadata({ params }: PageProps<"/[lang]/pay/demo/[token]">): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: hasLocale(lang) ? getDictionary(lang).meta.demoPay : undefined,
    robots: { index: false, follow: false },
  };
}

// Csak Stripe-kulcs nélkül, fejlesztői módban: a Stripe Checkout helyett.
export default async function DemoCheckoutPage({ params }: PageProps<"/[lang]/pay/demo/[token]">) {
  if (paymentMode() !== "demo") notFound();
  const { token } = await params;
  const row = TOKEN_RE.test(token) ? await getByToken(token) : null;
  if (!row) notFound();
  return (
    <DemoCheckout
      token={row.token}
      codeId={row.id}
      title={row.title}
      firstChargeAt={trialHasLead(row) ? row.trial_ends_at : null}
    />
  );
}
