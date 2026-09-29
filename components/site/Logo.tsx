import Link from "next/link";
import { brand } from "@/lib/site";

export function LogoMark({ className = "size-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" className={className} aria-hidden>
      <rect x="1" y="1" width="34" height="34" rx="10" fill="#16161d" />
      <path
        d="M9 13.5A4.5 4.5 0 0 1 13.5 9h9a4.5 4.5 0 0 1 4.5 4.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 9 22.5v-9Zm3 .5v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2Z"
        fill="#f3f0e8"
      />
      <rect
        x="14.5"
        y="14.5"
        width="7"
        height="7"
        rx="2"
        fill="#c6f03c"
        className="origin-center transition-transform duration-500 [transform-box:fill-box] group-hover:rotate-90"
      />
    </svg>
  );
}

export function Logo({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="group flex items-center gap-2.5" aria-label={label}>
      <LogoMark />
      <span className="display text-[19px] leading-none">{brand.name}</span>
    </Link>
  );
}
