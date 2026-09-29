import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { SleepingQr } from "@/components/qr/SleepingQr";
import { LogoMark } from "@/components/site/Logo";
import { sanitizeDesign } from "@/lib/design";
import { hasLocale, localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/server";
import { getById, isAlive } from "@/lib/server/codes";
import { currentOrigin } from "@/lib/server/request";
import { brand } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/paused/[code]">): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: hasLocale(lang) ? getDictionary(lang).meta.paused : undefined,
    robots: { index: false, follow: false },
  };
}

// A szünetelő kódot beolvasó látogató ide érkezik (a /q/<kód> irányítja a böngésző nyelvén).
export default async function PausedPage({ params }: PageProps<"/[lang]/paused/[code]">) {
  const { lang, code } = await params;
  if (!hasLocale(lang)) notFound();
  const row = await getById(code.toLowerCase());
  if (!row) notFound();
  if (isAlive(row)) redirect(`/q/${row.id}`);
  const origin = await currentOrigin();
  const t = getDictionary(lang).paused;

  return (
    <main className="dot-grid relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-5 py-14">
      <div className="pointer-events-none absolute top-1/4 left-1/2 size-[520px] -translate-x-1/2 rounded-full bg-sky/40 blur-3xl" aria-hidden />
      <div className="card relative w-full max-w-md p-8 text-center sm:p-10">
        <SleepingQr text={`${origin}/q/${row.id}`} design={sanitizeDesign(JSON.parse(row.design))} label={t.qrLabel} />
        <h1 className="display mt-8 text-[2rem] leading-[1.02]">{t.title}</h1>
        <p className="mt-4 leading-relaxed text-ink-2">{t.text}</p>
        <div className="mt-7 rounded-2xl bg-paper p-4 text-left text-[14px] leading-relaxed text-muted">
          <b className="font-semibold text-ink">{t.ownerTitle}</b> {t.ownerText}
        </div>
      </div>
      <Link href={localePath(lang)} className="group relative mt-8 flex items-center gap-2.5 text-sm text-muted hover:text-ink">
        <LogoMark className="size-7" />
        <span>
          {t.promo} <span className="font-semibold text-ink underline-offset-4 group-hover:underline">{brand.name}</span> – {t.promoSuffix}
        </span>
      </Link>
    </main>
  );
}
