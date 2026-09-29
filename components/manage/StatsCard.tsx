"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { IconChart } from "@/components/ui/Icons";
import { useI18n } from "@/lib/i18n/client";
import type { CodeView } from "@/lib/types";

export function StatsCard({ code, now, alive }: { code: CodeView; now: number; alive: boolean }) {
  const { t, plural, number, ago, shortDate } = useI18n();
  const S = t.manage.stats;
  // A napkulcs (ÉÉÉÉ-HH-NN) délben értelmezve: így az időzóna nem tolja át a szomszéd napra.
  const dayLabel = (key: string) => shortDate(Date.parse(`${key}T12:00:00Z`));
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(1, ...code.daily.map((d) => d.count));
  const last7 = code.daily.slice(-7).reduce((s, d) => s + d.count, 0);
  const shown = hover !== null ? code.daily[hover] : null;

  return (
    <div className="card p-6 sm:p-7">
      <h2 className="flex items-center gap-2.5 text-lg font-semibold tracking-tight">
        <IconChart className="size-5 text-kobalt" /> {S.title}
      </h2>

      <div className="mt-5 grid grid-cols-3 gap-3">
        <Stat label={S.total} value={number(code.scans)} />
        <Stat label={S.last7} value={number(last7)} />
        <Stat label={S.last} value={code.lastScanAt ? ago(code.lastScanAt, now) : S.none} small />
      </div>

      <div className="mt-6">
        <div className="mb-2 flex h-5 items-center justify-between text-[12px] text-muted">
          <span>{S.last30}</span>
          {shown && <span className="font-mono text-ink">{plural(S.day, shown.count, { date: dayLabel(shown.day) })}</span>}
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
          {alive ? S.emptyAlive : S.emptyPaused}
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
