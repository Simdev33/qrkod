"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogoMark } from "@/components/site/Logo";
import { api } from "@/lib/api";
import { brand } from "@/lib/site";

export function DemoCheckout({ token, codeId, title, firstCharge }: { token: string; codeId: string; title: string; firstCharge: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function pay() {
    setBusy(true);
    try {
      await api(`/api/codes/${token}/demo`, "POST", { action: "subscribe" });
      router.push(`/kezeles/${token}?fizetes=siker`);
    } catch (e) {
      setError((e as Error).message);
      setBusy(false);
    }
  }

  return (
    <main className="grid min-h-svh bg-white lg:grid-cols-2">
      <section className="flex flex-col bg-paper px-6 py-10 sm:px-12 lg:py-16">
        <Link href={`/kezeles/${token}?fizetes=megszakitva`} className="flex items-center gap-2 text-sm font-medium text-muted hover:text-ink">
          ← <LogoMark className="size-6" /> {brand.name}
        </Link>
        <div className="mt-12 lg:mt-24">
          <div className="text-muted">Előfizetés: {title || `QR-kód (${codeId})`}</div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-5xl font-bold tracking-tight">1,00 US$</span>
            <span className="text-muted">havonta</span>
          </div>
          <div className="mt-8 space-y-3 border-t border-ink/10 pt-6 text-[15px]">
            <div className="flex justify-between">
              <span>{brand.name} · QR-kód életben tartása</span>
              <span>1,00 US$/hó</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>Első terhelés</span>
              <span>{firstCharge}</span>
            </div>
            <div className="flex justify-between border-t border-ink/10 pt-3 font-semibold">
              <span>Ma fizetendő</span>
              <span>{firstCharge === "ma" ? "1,00 US$" : "0,00 US$"}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-center px-6 py-10 sm:px-12">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mx-auto w-full max-w-md">
          <div className="rounded-2xl border-2 border-dashed border-sun bg-sun-soft p-4 text-[14px] leading-relaxed">
            <b>Demó fizetés.</b> Nincs beállítva Stripe-kulcs, ezért ez a fejlesztői szimuláció helyettesíti a Stripe fizetőoldalát.
            Semmilyen kártyaadat nem kell, és nem történik terhelés.
          </div>
          <h1 className="mt-8 text-2xl font-semibold tracking-tight">Előfizetés megerősítése</h1>
          <p className="mt-2 text-muted">
            Élesben itt a Stripe biztonságos fizetőoldala jelenik meg, ahol a kártyaadatokat kéri.
          </p>
          {error && <p className="mt-4 text-sm font-medium text-coral-deep">{error}</p>}
          <button type="button" className="btn btn-primary mt-8 w-full py-4 text-base" disabled={busy} onClick={pay}>
            {busy ? "Feldolgozás…" : "Előfizetés szimulálása"}
          </button>
          <Link href={`/kezeles/${token}?fizetes=megszakitva`} className="mt-4 block text-center text-sm text-muted hover:text-ink">
            Mégse
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
