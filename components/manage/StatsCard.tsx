"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { IconChart } from "@/components/ui/Icons";
import { fmtAgo, fmtNumber } from "@/lib/format";
import type { CodeView } from "@/lib/types";

const dayLabel = (key: string) => {
  const [, m, d] = key.split("-").map(Number);
  return `${m}. ${d}.`;
};

export function StatsCard({ code, now, alive }: { code: CodeView; now: number; alive: boolean }) {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(1, ...code.daily.map((d) => d.count));
  const last7 = code.daily.slice(-7).reduce((s, d) => s + d.count, 0);
  const shown = hover !== null ? code.daily[hover] : null;

  return (
    <div className="card p-6 sm:p-7">
      <h2 className="flex items-center gap-2.5 text-lg font-semibold tracking-tight">
        <IconChart className="size-5 text-kobalt" /> Beolvasások
      </h2>

      <div className="mt-5 grid grid-cols-3 gap-3">
        <Stat label="Összesen" value={fmtNumber(code.scans)} />
        <Stat label="Utolsó 7 nap" value={fmtNumber(last7)} />
        <Stat label="Utolsó beolvasás" value={code.lastScanAt ? fmtAgo(code.lastScanAt, now) : "még nincs"} small />
      </div>

      <div className="mt-6">
        <div className="mb-2 flex h-5 items-center justify-between text-[12px] text-muted">
          <span>Utolsó 30 nap</span>
          {shown && (
            <span className="font-mono text-ink">
              {dayLabel(shown.day)} · {shown.count} beolvasás
            </span>
          )}
        </div>
        <div className="flex h-28 items-end gap-[3px]" onMouseLeave={() => setHover(null)}>
          {code.daily.map((d, i) => (
            <div key={d.day} className="flex h-full flex-1 items-end" onMouseEnter={() => setHover(i)}>
              <motion.span
                className={`block w-full rounded-t-[4px] ${
                  d.count === 0 ? "bg-ink/8" : hover === i ? "bg-ink" : i === code.daily.length - 1 ? "bg-kobalt" : "bg-kobalt/35"
                }`}
                initial={{ height: 0 }}
                animate={{ height: d.count === 0 ? 4 : `${Math.max(6, (d.count / max) * 100)}%` }}
                transition={{ duration: 0.6, delay: 0.25 + i * 0.015, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          ))}
        </div>
      </div>
      {code.scans === 0 && (
        <p className="mt-4 text-[13px] text-muted">
          {alive
            ? "Olvasd be a kódot a telefonoddal – az első beolvasás itt azonnal megjelenik."
            : "Szünetelés alatt a beolvasásokat nem számoljuk."}
        </p>
      )}
    </div>
  );
}

function Stat({ label, value, small = false }: { label: string; value: string; small?: boolean }) {
  return (
    <div className="rounded-2xl bg-paper px-3.5 py-3">
      <div className="text-[12px] text-muted">{label}</div>
      <div className={`mt-1 font-semibold tracking-tight ${small ? "text-[15px] leading-6" : "display text-2xl"}`}>{value}</div>
    </div>
  );
}
