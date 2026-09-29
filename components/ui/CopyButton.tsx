"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useI18n } from "@/lib/i18n/client";
import { IconCheck, IconCopy } from "./Icons";

async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Régebbi böngésző / nem biztonságos környezet (pl. http-s helyi hálós cím)
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  }
}

export function CopyButton({ text, label, compact = false }: { text: string; label: string; compact?: boolean }) {
  const { t } = useI18n();
  const [done, setDone] = useState(false);

  async function onClick() {
    if (await copy(text)) {
      setDone(true);
      setTimeout(() => setDone(false), 1800);
    }
  }

  const icon = (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={done ? "ok" : "copy"}
        initial={{ scale: 0.4, opacity: 0, rotate: -30 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        exit={{ scale: 0.4, opacity: 0 }}
        transition={{ duration: 0.18 }}
        className="grid place-items-center"
      >
        {done ? <IconCheck className="size-4" strokeWidth={2.6} /> : <IconCopy className="size-4" />}
      </motion.span>
    </AnimatePresence>
  );

  if (compact) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        title={label}
        className={`grid size-7 place-items-center rounded-full transition-colors ${done ? "bg-lime text-ink" : "text-muted hover:bg-ink/5 hover:text-ink"}`}
      >
        {icon}
      </button>
    );
  }
  return (
    <button type="button" onClick={onClick} className="btn btn-ghost px-4 py-2.5 text-sm">
      {icon}
      {done ? t.common.copied : label}
    </button>
  );
}
