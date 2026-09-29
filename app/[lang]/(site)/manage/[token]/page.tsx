import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ManageView } from "@/components/manage/ManageView";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/server";
import { TOKEN_RE } from "@/lib/ids";
import { confirmCheckout, paymentMode } from "@/lib/server/billing";
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

  // Visszatérés a Stripe-ról: a webhook megérkezése előtt is friss legyen az állapot.
  if (sp.payment === "success" && typeof sp.session_id === "string") {
    await confirmCheckout(sp.session_id, row);
    row = (await getByToken(token)) ?? row;
  }

  const flash: Flash =
    sp.new === "1" ? "new" : sp.payment === "success" ? "paid" : sp.payment === "canceled" ? "checkout-canceled" : null;
  const now = requestTime();

  return (
    <ManageView
      key={row.token}
      initial={await toView(row, now)}
      serverNow={now}
      origin={await currentOrigin()}
      mode={paymentMode()}
      flash={flash}
    />
  );
}
