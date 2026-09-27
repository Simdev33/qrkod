import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { SleepingQr } from "@/components/qr/SleepingQr";
import { LogoMark } from "@/components/site/Logo";
import { getById, isAlive } from "@/lib/server/codes";
import { currentOrigin } from "@/lib/server/request";
import { sanitizeDesign } from "@/lib/design";
import { brand } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ez a QR-kód most szünetel",
  robots: { index: false, follow: false },
};

export default async function PausedPage({ params }: PageProps<"/q/[code]/szunetel">) {
  const { code } = await params;
  const row = await getById(code.toLowerCase());
  if (!row) notFound();
  if (isAlive(row)) redirect(`/q/${row.id}`);
  const origin = await currentOrigin();

  return (
    <main className="dot-grid relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-5 py-14">
      <div className="pointer-events-none absolute top-1/4 left-1/2 size-[520px] -translate-x-1/2 rounded-full bg-sky/40 blur-3xl" aria-hidden />
      <div className="card relative w-full max-w-md p-8 text-center sm:p-10">
        <SleepingQr text={`${origin}/q/${row.id}`} design={sanitizeDesign(JSON.parse(row.design))} />
        <h1 className="display mt-8 text-[2rem] leading-[1.02]">Ez a QR-kód most szünetel.</h1>
        <p className="mt-4 leading-relaxed text-ink-2">
          A kód tulajdonosa egyelőre nem hosszabbította meg, ezért most nem tudunk továbbküldeni. Próbáld újra később, vagy
          keresd a tulajdonost más módon.
        </p>
        <div className="mt-7 rounded-2xl bg-paper p-4 text-left text-[14px] leading-relaxed text-muted">
          <b className="font-semibold text-ink">Te vagy a tulajdonos?</b> Nyisd meg a kód kezelőlinkjét, és havi 1 $-ért egy
          kattintással újraélesztheted – a nyomtatott kód ugyanaz marad.
        </div>
      </div>
      <Link href="/" className="group relative mt-8 flex items-center gap-2.5 text-sm text-muted hover:text-ink">
        <LogoMark className="size-7" />
        <span>
          Saját QR-kód? <span className="font-semibold text-ink underline-offset-4 group-hover:underline">{brand.name}</span> – 30 napig ingyen
        </span>
      </Link>
    </main>
  );
}
