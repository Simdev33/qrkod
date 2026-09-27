"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { QrCode } from "@/components/qr/QrCode";
import { IconArrowRight, IconPlus, IconScan } from "@/components/ui/Icons";
import { api } from "@/lib/api";
import { fmtDate, fmtNumber, prettyUrl } from "@/lib/format";
import { TOKEN_RE } from "@/lib/ids";
import { forgetCode, onLocalCodesChange, readLocalCodes, rememberCode } from "@/lib/local-codes";
import { lifeStatus, PHASE_LABEL, type Phase } from "@/lib/status";
import type { CodeView } from "@/lib/types";

type State = { loading: true } | { loading: false; codes: CodeView[]; now: number };

const TONE: Record<Phase, string> = {
  trial: "bg-lime text-ink",
  scheduled: "bg-kobalt text-white",
  active: "bg-kobalt text-white",
  canceling: "bg-sun text-ink",
  expired: "bg-coral text-white",
};

async function load(): Promise<{ codes: CodeView[]; now: number }> {
  const local = readLocalCodes();
  if (!local.length) return { codes: [], now: Date.now() };
  const res = await api<{ codes: CodeView[]; missing: string[]; now: number }>("/api/codes/lookup", "POST", {
    tokens: local.map((c) => c.token),
  });
  res.missing.forEach(forgetCode); // közben törölt kódok
  const order = new Map(local.map((c, i) => [c.token, i]));
  return { codes: res.codes.sort((a, b) => order.get(a.token)! - order.get(b.token)!), now: res.now };
}

export function MyCodes({ origin }: { origin: string }) {
  const [state, setState] = useState<State>({ loading: true });
  const [version, setVersion] = useState(0);
  const deleted = useSearchParams().get("torolve") === "1";

  useEffect(() => onLocalCodesChange(() => setVersion((v) => v + 1)), []);

  useEffect(() => {
    let cancelled = false;
    load()
      .then((res) => !cancelled && setState({ loading: false, ...res }))
      .catch(() => !cancelled && setState({ loading: false, codes: [], now: Date.now() }));
    return () => {
      cancelled = true;
    };
  }, [version]);

  return (
    <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-5 sm:pt-12">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <motion.h1
            className="display text-[clamp(2.2rem,5vw,3.8rem)] leading-none"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Kódjaim
          </motion.h1>
          <p className="mt-3 max-w-xl text-muted">
            Az ezen az eszközön készített vagy megnyitott kódok. Másik eszközön a kezelőlinkkel éred el őket.
          </p>
        </div>
        <Link href="/#keszito" className="btn btn-lime">
          <IconPlus className="size-5" /> Új QR-kód
        </Link>
      </div>

      <AnimatePresence>
        {deleted && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-2xl bg-ink px-5 py-3 text-paper"
          >
            A kódot töröltük.
          </motion.p>
        )}
      </AnimatePresence>

      <div className="mt-10">
        {state.loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="card h-[188px] animate-pulse bg-card/60" />
            ))}
          </div>
        ) : state.codes.length === 0 ? (
          <Empty />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {state.codes.map((c, i) => (
              <CodeCard key={c.token} code={c} now={state.now} origin={origin} index={i} />
            ))}
          </div>
        )}
      </div>

      <AddByLink />
    </div>
  );
}

function CodeCard({ code, now, origin, index }: { code: CodeView; now: number; origin: string; index: number }) {
  const s = lifeStatus(code, now);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: Math.min(index, 8) * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/kezeles/${code.token}`} className="card group flex h-full gap-4 p-4 transition-transform duration-300 hover:-translate-y-1">
        <div className={`w-[92px] shrink-0 self-start overflow-hidden rounded-2xl ring-1 ring-ink/10 ${s.alive ? "" : "opacity-50 grayscale"}`}>
          <QrCode text={`${origin}/q/${code.id}`} design={code.design} animate={false} className="block h-auto w-full" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <span className={`self-start rounded-full px-2.5 py-1 text-[12px] font-semibold ${TONE[s.phase]}`}>
            {PHASE_LABEL[s.phase]}
            {s.alive && s.phase !== "active" && s.phase !== "scheduled" ? ` · ${s.daysLeft} nap` : ""}
          </span>
          <div className="mt-2 truncate text-[17px] font-semibold tracking-tight">{code.title || "Névtelen QR-kód"}</div>
          <div className="truncate font-mono text-[13px] text-muted">{prettyUrl(code.target)}</div>
          <div className="mt-auto flex items-center justify-between pt-3 text-[13px] text-muted">
            <span className="flex items-center gap-1.5">
              <IconScan className="size-4" /> {fmtNumber(code.scans)} beolvasás
            </span>
            <span className="flex items-center gap-1 font-medium text-ink opacity-0 transition-opacity group-hover:opacity-100">
              Kezelés <IconArrowRight className="size-4" />
            </span>
          </div>
          <div className="sr-only">Létrehozva: {fmtDate(code.createdAt)}</div>
        </div>
      </Link>
    </motion.div>
  );
}

function Empty() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card dot-grid flex flex-col items-center bg-paper px-6 py-16 text-center"
    >
      <div className="grid grid-cols-3 gap-1.5" aria-hidden>
        {Array.from({ length: 9 }, (_, i) => (
          <motion.span
            key={i}
            className={`size-5 rounded-[5px] ${i === 4 ? "bg-lime" : "bg-ink"}`}
            animate={{ scale: [1, 0.6, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: ((i % 3) + Math.floor(i / 3)) * 0.12 }}
          />
        ))}
      </div>
      <h2 className="display mt-7 text-2xl">Még nincs itt kódod</h2>
      <p className="mt-2 max-w-md text-muted">Készítsd el az elsőt – 30 napig ingyen működik, regisztráció nélkül.</p>
      <Link href="/#keszito" className="btn btn-primary mt-7">
        QR-kód készítése <IconArrowRight className="size-5" />
      </Link>
    </motion.div>
  );
}

function AddByLink() {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    const token = value.trim().split("/kezeles/")[1]?.split(/[?#/]/)[0] ?? value.trim();
    if (!TOKEN_RE.test(token)) {
      setError("Ez nem kezelőlink. Így néz ki: …/kezeles/Xk2…");
      return;
    }
    try {
      const { code } = await api(`/api/codes/${token}`, "GET");
      rememberCode({ id: code.id, token: code.token, title: code.title, createdAt: code.createdAt });
      setValue("");
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <form onSubmit={add} className="mt-12 rounded-[28px] border border-dashed border-ink/20 p-6 sm:p-7">
      <h2 className="font-semibold tracking-tight">Másik eszközön készült kód hozzáadása</h2>
      <p className="mt-1 text-[14px] text-muted">Illeszd be a kezelőlinket, és a kód megjelenik ebben a listában.</p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <input
          className="field font-mono text-sm"
          placeholder="https://…/kezeles/…"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(null);
          }}
          aria-label="Kezelőlink"
        />
        <button type="submit" className="btn btn-ink">
          Hozzáadás
        </button>
      </div>
      {error && <p className="mt-2 text-sm font-medium text-coral-deep">{error}</p>}
    </form>
  );
}
