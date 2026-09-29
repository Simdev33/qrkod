"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CopyButton } from "@/components/ui/CopyButton";
import { IconKey, IconTrash } from "@/components/ui/Icons";
import { api, errorCode } from "@/lib/api";
import { useI18n } from "@/lib/i18n/client";
import { forgetCode } from "@/lib/local-codes";
import type { CodeView } from "@/lib/types";
import type { Notify } from "./ManageView";

export function ManageLinkCard({ manageUrl, shortUrl, title }: { manageUrl: string; shortUrl: string; title: string }) {
  const { t, fill } = useI18n();
  const L = t.manage.link;
  const subject = fill(L.mailSubject, { title: title || L.mailTitleFallback });
  const body = fill(L.mailBody, { manage: manageUrl, short: shortUrl });
  return (
    <div className="card p-6 sm:p-7">
      <h2 className="flex items-center gap-2.5 text-lg font-semibold tracking-tight">
        <IconKey className="size-5 text-kobalt" /> {L.title}
      </h2>
      <p className="mt-2 text-[15px] leading-relaxed text-muted">{L.text}</p>
      <div className="mt-4 flex items-center gap-2 overflow-hidden rounded-2xl bg-ink py-2 pr-2 pl-4 text-paper">
        <span className="min-w-0 flex-1 truncate font-mono text-[13px] text-paper/80">{manageUrl.replace(/^https?:\/\//, "")}</span>
        <span className="rounded-full bg-paper text-ink">
          <CopyButton text={manageUrl} label={L.copy} compact />
        </span>
      </div>
      <a
        href={`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}
        className="mt-3 inline-block text-sm font-semibold text-kobalt underline-offset-4 hover:underline"
      >
        {L.email}
      </a>
    </div>
  );
}

export function DemoTools({ token, onUpdate, notify }: { token: string; onUpdate: (c: CodeView) => void; notify: Notify }) {
  const { t, fill, error: errorText } = useI18n();
  const D = t.manage.demo;
  async function shift(days: number) {
    try {
      const { code } = await api(`/api/codes/${token}/demo`, "POST", { action: "shift", days });
      onUpdate(code);
      notify(fill(days > 0 ? D.later : D.earlier, { n: Math.abs(days) }));
    } catch (e) {
      notify(errorText(errorCode(e)), "error");
    }
  }
  return (
    <div className="rounded-[28px] border-2 border-dashed border-ink/20 p-5">
      <div className="text-[13px] font-semibold tracking-wider text-muted uppercase">{D.title}</div>
      <p className="mt-1 text-[13px] text-muted">{D.text}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {[-10, 10, 30].map((d) => (
          <button key={d} type="button" className="btn btn-ghost px-3.5 py-2 text-sm" onClick={() => shift(d)}>
            {fill(D.button, { n: d > 0 ? `+${d}` : `−${-d}` })}
          </button>
        ))}
      </div>
    </div>
  );
}

export function DangerZone({ code, subscribed, notify }: { code: CodeView; subscribed: boolean; notify: Notify }) {
  const router = useRouter();
  const { t, l, error: errorText } = useI18n();
  const D = t.manage.danger;
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);

  async function remove() {
    setBusy(true);
    try {
      await api(`/api/codes/${code.token}`, "DELETE");
      forgetCode(code.token);
      router.push(l("/my-codes?deleted=1"));
    } catch (e) {
      notify(errorText(errorCode(e)), "error");
      setBusy(false);
    }
  }

  return (
    <div className="rounded-[28px] border border-coral/30 bg-coral-soft/40 p-6 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-semibold tracking-tight">{D.title}</h2>
          <p className="mt-1 text-[14px] text-muted">{subscribed ? D.textSubscribed : D.text}</p>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          {confirming ? (
            <motion.div key="c" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex gap-2">
              <button type="button" className="btn bg-coral text-white hover:bg-coral-deep" disabled={busy} onClick={remove}>
                {busy ? D.deleting : D.confirm}
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => setConfirming(false)}>
                {t.common.cancel}
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
              <IconTrash className="size-4" /> {D.delete}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
