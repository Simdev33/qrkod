import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ManageView } from "@/components/manage/ManageView";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/server";
import { TOKEN_RE } from "@/lib/ids";
import { completeCheckout, missingPaymentEnv, paymentMode, refreshSubscription } from "@/lib/server/billing";
import { getByToken, toView } from "@/lib/server/codes";
import { currentOrigin, requestTime } from "@/lib/server/request";

export async function generateMetadata({ params }: PageProps<"/[lang]/manage/[token]">): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: hasLocale(lang) ? getDictionary(lang).meta.manage : undefined,
    robots: { index: false, follow: false },
    referrer: "no-referrer",
  };
}

type Flash = "new" | "paid" | "checkout-canceled" | null;

export default async function ManagePage({ params, searchParams }: PageProps<"/[lang]/manage/[token]">) {
  const { token } = await params;
  const sp = await searchParams;
  if (!TOKEN_RE.test(token)) notFound();
  let row = await getByToken(token);
  if (!row) notFound();

  // Back from a payment method that left the page (e.g. PayPal): the subscription is written onto the
  // code before the page renders, so it is live even if the webhook has not arrived yet.
  let flash: Flash = sp.new === "1" ? "new" : null;
  if (typeof sp.checkout_session_id === "string") {
    const paid = await completeCheckout(sp.checkout_session_id, row).catch((err) => {
      console.error("[manage] checkout return", err);
      return false;
    });
    flash = paid ? "paid" : "checkout-canceled";
    row = (await getByToken(token)) ?? row;
  }
  // Back from the Stripe customer portal: a cancellation made there is picked up right away.
  if (sp.from === "portal") row = await refreshSubscription(row);
  const now = requestTime();

  const missing = missingPaymentEnv();
  if (missing.length && process.env.NODE_ENV === "production") {
    console.error(`[billing] payment form is off – missing: ${missing.join(", ")} (set them in Vercel, then redeploy)`);
  }

  return (
    <ManageView
      key={row.token}
      initial={await toView(row, now)}
      serverNow={now}
      origin={await currentOrigin()}
      mode={paymentMode()}
      flash={flash}
      stripeKey={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.trim() ?? ""}
    />
  );
}
