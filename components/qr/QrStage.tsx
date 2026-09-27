"use client";

import type { Design } from "@/lib/design";
import { QrCode } from "./QrCode";

/** A QR-kód „keresőben”: sarokjelölők és egy lassan pásztázó lézer. */
export function QrStage({
  text,
  design,
  scanning = true,
  className = "",
}: {
  text: string;
  design: Design;
  scanning?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Corner className="top-0 left-0" />
      <Corner className="top-0 right-0 rotate-90" />
      <Corner className="right-0 bottom-0 rotate-180" />
      <Corner className="bottom-0 left-0 -rotate-90" />
      <div className="relative m-[7%] overflow-hidden rounded-[18px] shadow-[0_1px_0_rgb(22_22_29/0.05),0_18px_40px_-22px_rgb(22_22_29/0.45)] ring-1 ring-ink/8">
        <QrCode text={text} design={design} className="block h-auto w-full" />
        {scanning && (
          <div className="laser-track" aria-hidden>
            <div className="laser" />
          </div>
        )}
      </div>
    </div>
  );
}

function Corner({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 40 40" className={`absolute h-[13%] w-[13%] text-ink ${className}`} aria-hidden>
      <path d="M3 30V12a9 9 0 0 1 9-9h18" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
    </svg>
  );
}
