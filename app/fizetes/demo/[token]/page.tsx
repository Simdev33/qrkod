import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DemoCheckout } from "@/components/manage/DemoCheckout";
import { TOKEN_RE } from "@/lib/ids";
import { paymentMode, trialHasLead } from "@/lib/server/billing";
import { getByToken } from "@/lib/server/codes";
import { fmtDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Demó fizetés",
  robots: { index: false, follow: false },
};

// Csak Stripe-kulcs nélkül, fejlesztői módban: a Stripe Checkout helyett.
export default async function DemoCheckoutPage({ params }: PageProps<"/fizetes/demo/[token]">) {
  if (paymentMode() !== "demo") notFound();
  const { token } = await params;
  const row = TOKEN_RE.test(token) ? await getByToken(token) : null;
  if (!row) notFound();
  const inTrial = trialHasLead(row);
  return (
    <DemoCheckout
      token={row.token}
      codeId={row.id}
      title={row.title}
      firstCharge={inTrial ? fmtDate(row.trial_ends_at) : "ma"}
    />
  );
}
