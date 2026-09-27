import Link from "next/link";
import { brand } from "@/lib/site";
import { LogoMark } from "./Logo";

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-ink text-paper">
      <div className="dot-grid-light absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <LogoMark className="size-9 [&_rect:first-child]:fill-paper [&_path]:fill-ink" />
            <span className="display text-[19px]">{brand.name}</span>
          </div>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-paper/65">
            Dinamikus QR-kódok, amiket egyszer nyomtatsz ki, és bármikor átirányíthatsz. 30 napig ingyen, utána havi 1 dollár.
          </p>
        </div>
        <div>
          <div className="mb-3 text-[13px] font-semibold tracking-wider text-paper/45 uppercase">Oldalak</div>
          <ul className="space-y-2 text-[15px]">
            <li><Link className="text-paper/80 hover:text-lime" href="/#keszito">QR-kód készítése</Link></li>
            <li><Link className="text-paper/80 hover:text-lime" href="/kodjaim">Kódjaim</Link></li>
            <li><Link className="text-paper/80 hover:text-lime" href="/#arazas">Árazás</Link></li>
            <li><Link className="text-paper/80 hover:text-lime" href="/#gyik">GYIK</Link></li>
          </ul>
        </div>
        <div>
          <div className="mb-3 text-[13px] font-semibold tracking-wider text-paper/45 uppercase">Tudnivalók</div>
          <ul className="space-y-2 text-[15px]">
            <li><Link className="text-paper/80 hover:text-lime" href="/feltetelek">Feltételek és adatvédelem</Link></li>
            <li><a className="text-paper/80 hover:text-lime" href={`mailto:${brand.email}`}>{brand.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-paper/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-5 text-[13px] text-paper/45">
          <span>© {new Date().getFullYear()} {brand.name}</span>
          <span>A fizetést a Stripe kezeli · a „QR Code” a DENSO WAVE bejegyzett védjegye</span>
        </div>
      </div>
    </footer>
  );
}
