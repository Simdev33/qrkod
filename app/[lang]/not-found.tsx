"use client";

import Link from "next/link";
import { LogoMark } from "@/components/site/Logo";
import { useI18n } from "@/lib/i18n/client";

export default function NotFound() {
  const { t, l } = useI18n();
  return (
    <main className="dot-grid flex min-h-svh flex-col items-center justify-center px-5 text-center">
      <title>{t.meta.notFound}</title>
      <LogoMark className="size-14" />
      <h1 className="display mt-8 text-[clamp(2.4rem,7vw,4.5rem)] leading-none">404</h1>
      <p className="mt-4 max-w-md text-lg text-ink-2">{t.notFound.text}</p>
      <Link href={l("/")} className="btn btn-primary mt-8">
        {t.notFound.back}
      </Link>
    </main>
  );
}
