"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { IconExternal, IconLink, IconPencil } from "@/components/ui/Icons";
import { api } from "@/lib/api";
import { normalizeUrl, prettyUrl } from "@/lib/format";
import type { CodeView } from "@/lib/types";
import type { Notify } from "./ManageView";

export function TargetCard({ code, onUpdate, notify }: { code: CodeView; onUpdate: (c: CodeView) => void; notify: Notify }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(code.target);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    const url = normalizeUrl(value);
    if (!url) {
      setError("Ez nem tűnik érvényes webcímnek. Például: pelda.hu/menu");
      return;
    }
    setBusy(true);
    try {
      const { code: next } = await api(`/api/codes/${code.token}`, "PATCH", { target: url });
      onUpdate(next);
      setEditing(false);
      setError(null);
      notify("Cél átírva – a kód mostantól ide visz. Újranyomtatni nem kell.");
    } catch (err) {
      setError((err as Error).message);
    }
    setBusy(false);
  }

  return (
    <div className="card p-6 sm:p-7">
      <div className="flex items-center justify-between gap-4">
        <h2 className="flex items-center gap-2.5 text-lg font-semibold tracking-tight">
          <IconLink className="size-5 text-kobalt" /> Hová visz a kód?
        </h2>
        {!editing && (
          <button
            type="button"
            className="btn btn-ghost px-3.5 py-2 text-sm"
            onClick={() => {
              setValue(code.target);
              setEditing(true);
            }}
          >
            <IconPencil className="size-4" /> Átírás
          </button>
        )}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {editing ? (
          <motion.form
            key="edit"
            onSubmit={save}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mt-4"
            noValidate
          >
            <input
              autoFocus
              className={`field ${error ? "border-coral" : ""}`}
              value={value}
              inputMode="url"
              spellCheck={false}
              onChange={(e) => {
                setValue(e.target.value);
                setError(null);
              }}
              aria-label="Új cél webcím"
            />
            {error && <p className="mt-2 text-sm font-medium text-coral-deep">{error}</p>}
            <div className="mt-3 flex gap-2">
              <button type="submit" className="btn btn-primary" disabled={busy}>
                {busy ? "Mentés…" : "Cél mentése"}
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => setEditing(false)}>
                Mégse
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.a
            key={code.target}
            href={code.target}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="group mt-4 flex items-center gap-3 rounded-2xl border border-ink/10 bg-paper px-4 py-3.5 transition-colors hover:border-ink/25"
          >
            <span className="min-w-0 flex-1 truncate font-mono text-[15px]">{prettyUrl(code.target)}</span>
            <IconExternal className="size-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        )}
      </AnimatePresence>
      <p className="mt-3 text-[13px] leading-relaxed text-muted">A célt bármikor, akárhányszor átírhatod – a kinyomtatott kód ugyanaz marad.</p>
    </div>
  );
}
