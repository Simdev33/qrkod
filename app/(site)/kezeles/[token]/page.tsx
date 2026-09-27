import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ManageView } from "@/components/manage/ManageView";
import { TOKEN_RE } from "@/lib/ids";
import { confirmCheckout, paymentMode } from "@/lib/server/billing";
import { getByToken, toView } from "@/lib/server/codes";
import { currentOrigin, requestTime } from "@/lib/server/request";

export const metadata: Metadata = {
  title: "QR-kód kezelése",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

type Flash = "new" | "paid" | "checkout-canceled" | null;

export default async function ManagePage({ params, searchParams }: PageProps<"/kezeles/[token]">) {
  const { token } = await params;
  const sp = await searchParams;
  if (!TOKEN_RE.test(token)) notFound();
  let row = await getByToken(token);
  if (!row) notFound();

  // Visszatérés a Stripe-ról: a webhook megérkezése előtt is friss legyen az állapot.
  if (sp.fizetes === "siker" && typeof sp.session_id === "string") {
    await confirmCheckout(sp.session_id, row);
    row = (await getByToken(token)) ?? row;
  }

  const flash: Flash =
    sp.uj === "1" ? "new" : sp.fizetes === "siker" ? "paid" : sp.fizetes === "megszakitva" ? "checkout-canceled" : null;
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
