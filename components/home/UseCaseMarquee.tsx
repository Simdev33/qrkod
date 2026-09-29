"use client";

import { useI18n } from "@/lib/i18n/client";

export function UseCaseMarquee() {
  const { t } = useI18n();
  const items = t.marquee;
  const row = [...items, ...items];
  return (
    <div className="relative mt-16 overflow-hidden py-6 sm:mt-20" aria-label={t.marqueeLabel}>
      <div className="-mx-10 -rotate-[1.2deg] bg-ink py-4 text-paper">
        <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap">
          {row.map((item, i) => (
            <span key={i} className="flex items-center gap-8" aria-hidden={i >= items.length}>
              <span className="display text-[22px] leading-none sm:text-[26px]">{item}</span>
              <span className={`block size-3.5 rounded-[4px] ${["bg-lime", "bg-coral", "bg-sky", "bg-sun"][i % 4]}`} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
