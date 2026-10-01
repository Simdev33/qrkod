import Link from "next/link";

/**
 * The GenerateMyQRCodes mark: the three finder patterns of a QR code and a lime spark in the fourth corner.
 * The same drawing is app/icon.svg (favicon, app icons – `npm run icons`).
 */
export function LogoMark({ className = "size-9", variant = "dark" }: { className?: string; variant?: "dark" | "light" }) {
  const bg = variant === "dark" ? "#16161d" : "#f3f0e8";
  const fg = variant === "dark" ? "#f3f0e8" : "#16161d";
  const spark = variant === "dark" ? "#c6f03c" : "#2f45ff";
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <rect width="64" height="64" rx="16" fill={bg} />
      <g fill="none" stroke={fg} strokeWidth="4.5">
        <rect x="12" y="12" width="15" height="15" rx="4.5" />
        <rect x="37" y="12" width="15" height="15" rx="4.5" />
        <rect x="12" y="37" width="15" height="15" rx="4.5" />
      </g>
      <g fill={fg}>
        <rect x="17" y="17" width="5" height="5" rx="1.5" />
        <rect x="42" y="17" width="5" height="5" rx="1.5" />
        <rect x="17" y="42" width="5" height="5" rx="1.5" />
      </g>
      <path
        d="M44.5 33.5c.9 6.4 3.2 8.7 9.6 9.6-6.4.9-8.7 3.2-9.6 9.6-.9-6.4-3.2-8.7-9.6-9.6 6.4-.9 8.7-3.2 9.6-9.6Z"
        fill={spark}
        className="origin-center transition-transform duration-500 [transform-box:fill-box] group-hover:rotate-90"
      />
    </svg>
  );
}

/** The wordmark: “GenerateMy” + “QR” in the accent colour + “Codes”. */
export function Wordmark({ className = "", accent = "text-kobalt" }: { className?: string; accent?: string }) {
  return (
    <span className={`display leading-none tracking-[-0.03em] ${className}`}>
      GenerateMy<span className={accent}>QR</span>Codes
    </span>
  );
}

export function Logo({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="group flex min-w-0 items-center gap-2.5" aria-label={label}>
      <LogoMark className="size-9 shrink-0" />
      <Wordmark className="truncate text-[15px] sm:text-[18px]" />
    </Link>
  );
}
