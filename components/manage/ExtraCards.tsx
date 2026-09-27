"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CopyButton } from "@/components/ui/CopyButton";
import { IconKey, IconTrash } from "@/components/ui/Icons";
import { api } from "@/lib/api";
import { forgetCode } from "@/lib/local-codes";
import { brand } from "@/lib/site";
import type { CodeView } from "@/lib/types";
import type { Notify } from "./ManageView";

export function ManageLinkCard({ manageUrl, shortUrl, title }: { manageUrl: string; shortUrl: string; title: string }) {
  const subject = `${brand.name} – ${title || "QR-kódom"} kezelőlinkje`;
  const body = `A QR-kódom kezelőoldala (ne oszd meg nyilvánosan):\n${manageUrl}\n\nA kód rövid linkje:\n${shortUrl}\n`;
  return (
    <div className="card p-6 sm:p-7">
      <h2 className="flex items-center gap-2.5 text-lg font-semibold tracking-tight">
        <IconKey className="size-5 text-kobalt" /> Kezelőlink
      </h2>
      <p className="mt-2 text-[15px] leading-relaxed text-muted">
        Ezzel a linkkel éred el ezt az oldalt bármelyik eszközről. Mentsd el, de ne tedd ki nyilvánosan – aki ismeri, az kezelheti a
        kódot.
      </p>
      <div className="mt-4 flex items-center gap-2 overflow-hidden rounded-2xl bg-ink py-2 pr-2 pl-4 text-paper">
        <span className="min-w-0 flex-1 truncate font-mono text-[13px] text-paper/80">{manageUrl.replace(/^https?:\/\//, "")}</span>
        <span className="rounded-full bg-paper text-ink">
          <CopyButton text={manageUrl} label="Kezelőlink másolása" compact />
        </span>
      </div>
      <a
        href={`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}
        className="mt-3 inline-block text-sm font-semibold text-kobalt underline-offset-4 hover:underline"
      >
        Elküldöm magamnak e-mailben →
      </a>
    </div>
  );
}

export function DemoTools({ token, onUpdate, notify }: { token: string; onUpdate: (c: CodeView) => void; notify: Notify }) {
  async function shift(days: number) {
    try {
      const { code } = await api(`/api/codes/${token}/demo`, "POST", { action: "shift", days });
      onUpdate(code);
      notify(days > 0 ? `Időutazás: ${days} nappal később.` : `Időutazás: ${-days} nappal korábban.`);
    } catch (e) {
      notify((e as Error).message, "error");
    }
  }
  return (
    <div className="rounded-[28px] border-2 border-dashed border-ink/20 p-5">
      <div className="text-[13px] font-semibold tracking-wider text-muted uppercase">Fejlesztői demó · időutazás</div>
      <p className="mt-1 text-[13px] text-muted">Csak Stripe-kulcs nélkül, fejlesztői módban látszik. A kód minden időpontját eltolja.</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {[-10, 10, 30].map((d) => (
          <button key={d} type="button" className="btn btn-ghost px-3.5 py-2 text-sm" onClick={() => shift(d)}>
            {d > 0 ? `+${d}` : `−${-d}`} nap
          </button>
        ))}
      </div>
    </div>
  );
}

export function DangerZone({ code, subscribed, notify }: { code: CodeView; subscribed: boolean; notify: Notify }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);

  async function remove() {
    setBusy(true);
    try {
      await api(`/api/codes/${code.token}`, "DELETE");
      forgetCode(code.token);
      router.push("/kodjaim?torolve=1");
    } catch (e) {
      notify((e as Error).message, "error");
      setBusy(false);
    }
  }

  return (
    <div className="rounded-[28px] border border-coral/30 bg-coral-soft/40 p-6 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-semibold tracking-tight">Kód törlése</h2>
          <p className="mt-1 text-[14px] text-muted">
            A kód azonnal megszűnik{subscribed ? ", és az előfizetés is leáll" : ""}. Ezt nem lehet visszavonni.
          </p>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          {confirming ? (
            <motion.div key="c" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex gap-2">
              <button type="button" className="btn bg-coral text-white hover:bg-coral-deep" disabled={busy} onClick={remove}>
                {busy ? "Törlés…" : "Igen, törlöm"}
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => setConfirming(false)}>
                Mégse
              </button>
            </motion.div>
          ) : (
            <motion.button
              key="d"
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="btn btn-ghost text-coral-deep"
              onClick={() => setConfirming(true)}
            >
              <IconTrash className="size-4" /> Törlés
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
