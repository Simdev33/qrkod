"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/client";
import { operator } from "@/lib/legal";
import { brand } from "@/lib/site";
import { LanguageRow } from "./LanguageSwitcher";
import { LogoMark, Wordmark } from "./Logo";

export function Footer() {
  const { t, l, fill } = useI18n();
  return (
    <footer className="relative mt-24 overflow-hidden bg-ink text-paper">
      <div className="dot-grid-light absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <LogoMark className="size-9" variant="light" />
            <Wordmark className="text-[18px]" accent="text-lime" />
          </div>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-paper/65">{fill(t.footer.tagline)}</p>
          <div className="mt-6">
            <LanguageRow dark />
          </div>
        </div>
        <div>
          <div className="mb-3 text-[13px] font-semibold tracking-wider text-paper/45 uppercase">{t.footer.pages}</div>
          <ul className="space-y-2 text-[15px]">
            <li><Link className="text-paper/80 hover:text-lime" href={l("/#create")}>{t.footer.create}</Link></li>
            <li><Link className="text-paper/80 hover:text-lime" href={l("/my-codes")}>{t.nav.myCodes}</Link></li>
            <li><Link className="text-paper/80 hover:text-lime" href={l("/#pricing")}>{t.nav.pricing}</Link></li>
            <li><Link className="text-paper/80 hover:text-lime" href={l("/#faq")}>{t.nav.faq}</Link></li>
          </ul>
        </div>
        <div>
          <div className="mb-3 text-[13px] font-semibold tracking-wider text-paper/45 uppercase">{t.footer.legal}</div>
          <ul className="space-y-2 text-[15px]">
            <li><Link className="text-paper/80 hover:text-lime" href={l("/terms")}>{t.footer.terms}</Link></li>
            <li><Link className="text-paper/80 hover:text-lime" href={l("/privacy")}>{t.footer.privacy}</Link></li>
            {brand.email && (
              <li><a className="text-paper/80 hover:text-lime" href={`mailto:${brand.email}`}>{brand.email}</a></li>
            )}
          </ul>
        </div>
      </div>
      <div className="relative border-t border-paper/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-5 text-[13px] text-paper/45">
          <span>
            © {new Date().getFullYear()} {brand.name} · {fill(t.footer.operator, { operator: operator.name })}
          </span>
          <span>
            {t.footer.payments} · {t.footer.trademark}
          </span>
        </div>
      </div>
    </footer>
  );
}
