"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogoMark } from "@/components/site/Logo";
import { Rich } from "@/components/ui/Rich";
import { api, errorCode } from "@/lib/api";
import { useI18n } from "@/lib/i18n/client";
import { brand, pricing } from "@/lib/site";

export function DemoCheckout({
  token,
  codeId,
  title,
  firstChargeAt,
}: {
  token: string;
  codeId: string;
  title: string;
  /** Az első terhelés napja; null = azonnal (ma). */
  firstChargeAt: number | null;
}) {
  const router = useRouter();
  const { t, l, fill, date, usd, error: errorText } = useI18n();
  const D = t.demoPay;
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const price = usd(pricing.monthlyCents / 100);
  const back = l(`/manage/${token}?payment=canceled`);

  async function pay() {
    setBusy(true);
    try {
      await api(`/api/codes/${token}/demo`, "POST", { action: "subscribe" });
      router.push(l(`/manage/${token}?payment=success`));
    } catch (e) {
      setError(errorText(errorCode(e)));
      setBusy(false);
    }
  }

  return (
    <main className="grid min-h-svh bg-white lg:grid-cols-2">
      <section className="flex flex-col bg-paper px-6 py-10 sm:px-12 lg:py-16">
        <Link href={back} className="flex items-center gap-2 text-sm font-medium text-muted hover:text-ink">
          ← <LogoMark className="size-6" /> {brand.name}
        </Link>
        <div className="mt-12 lg:mt-24">
          <div className="text-muted">{fill(D.subscription, { name: title || fill(D.codeName, { id: codeId }) })}</div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-5xl font-bold tracking-tight">{price}</span>
            <span className="text-muted">{D.perMonth}</span>
          </div>
          <div className="mt-8 space-y-3 border-t border-ink/10 pt-6 text-[15px]">
            <div className="flex justify-between gap-4">
              <span>{fill(D.item, { brand: brand.name })}</span>
              <span className="shrink-0">{fill(D.itemPrice, { price })}</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>{D.firstCharge}</span>
              <span>{firstChargeAt ? date(firstChargeAt) : D.today}</span>
            </div>
            <div className="flex justify-between border-t border-ink/10 pt-3 font-semibold">
              <span>{D.dueToday}</span>
              <span>{firstChargeAt ? usd(0) : price}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-center px-6 py-10 sm:px-12">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mx-auto w-full max-w-md">
          <div className="rounded-2xl border-2 border-dashed border-sun bg-sun-soft p-4 text-[14px] leading-relaxed">
            <Rich text={D.notice} boldClass="font-bold" />
          </div>
          <h1 className="mt-8 text-2xl font-semibold tracking-tight">{D.title}</h1>
          <p className="mt-2 text-muted">{D.text}</p>
          {error && <p className="mt-4 text-sm font-medium text-coral-deep">{error}</p>}
          <button type="button" className="btn btn-primary mt-8 w-full py-4 text-base" disabled={busy} onClick={pay}>
            {busy ? D.processing : D.pay}
          </button>
          <Link href={back} className="mt-4 block text-center text-sm text-muted hover:text-ink">
            {t.common.cancel}
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
