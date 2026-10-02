"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { QrCode } from "@/components/qr/QrCode";
import { IconArrowRight, IconPlus, IconScan } from "@/components/ui/Icons";
import { api, errorCode } from "@/lib/api";
import { prettyUrl } from "@/lib/format";
import { useI18n } from "@/lib/i18n/client";
import { TOKEN_RE } from "@/lib/ids";
import { forgetCode, onLocalCodesChange, readLocalCodes, rememberCode } from "@/lib/local-codes";
import { focusSignIn, SIGN_IN_ID, SignedInBar, SignInCard } from "./Account";
import { lifeStatus, type Phase } from "@/lib/status";
import type { CodeView } from "@/lib/types";

type State = { loading: true } | { loading: false; codes: CodeView[]; now: number };
type Loaded = { codes: CodeView[]; now: number; signedOut: boolean };

const TONE: Record<Phase, string> = {
  pending: "bg-ink/10 text-ink",
  free: "bg-lime text-ink",
  intro: "bg-lime text-ink",
  active: "bg-kobalt text-white",
  canceling: "bg-sun text-ink",
  expired: "bg-coral text-white",
};

/** The codes remembered on this device, plus – when signed in – the ones paid for with the account’s email. */
async function load(account: string | null): Promise<Loaded> {
  const local = readLocalCodes();
  const [mine, remote] = await Promise.all([
    local.length
      ? api<{ codes: CodeView[]; missing: string[]; now: number }>("/api/codes/lookup", "POST", { tokens: local.map((c) => c.token) })
      : null,
    account
      ? api<{ codes: CodeView[]; now: number }>("/api/account", "GET").catch((err) => {
          if (errorCode(err) === "not_signed_in") return "signed_out" as const;
          throw err;
        })
      : null,
  ]);
  mine?.missing.forEach(forgetCode); // deleted in the meantime
  const order = new Map(local.map((c, i) => [c.token, i]));
  const codes = (mine?.codes ?? []).sort((a, b) => order.get(a.token)! - order.get(b.token)!);
  const fromAccount = remote && remote !== "signed_out" ? remote.codes : [];
  for (const code of fromAccount) if (!codes.some((c) => c.token === code.token)) codes.push(code);
  const now = (remote && remote !== "signed_out" ? remote.now : mine?.now) ?? Date.now();
  return { codes, now, signedOut: remote === "signed_out" };
}

export function MyCodes({
  origin,
  deleted,
  account: initialAccount,
  signin,
}: {
  origin: string;
  deleted: boolean;
  /** The signed-in email address (read from the session cookie on the server). */
  account: string | null;
  /** Whether signing in by email is available (Stripe, Resend and the session secret are configured). */
  signin: boolean;
}) {
  const { t, l } = useI18n();
  const M = t.myCodes;
  const [state, setState] = useState<State>({ loading: true });
  const [version, setVersion] = useState(0);
  const [account, setAccount] = useState(initialAccount);

  useEffect(() => onLocalCodesChange(() => setVersion((v) => v + 1)), []);

  useEffect(() => {
    let cancelled = false;
    load(account)
      .then((res) => {
        if (cancelled) return;
        setState({ loading: false, codes: res.codes, now: res.now });
        if (res.signedOut) setAccount(null);
      })
      .catch(() => !cancelled && setState({ loading: false, codes: [], now: Date.now() }));
    return () => {
      cancelled = true;
    };
  }, [version, account]);

  const showSignIn = signin && !account;

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
            {M.title}
          </motion.h1>
          <p className="mt-3 max-w-xl text-muted">{M.lead}</p>
        </div>
        <Link href={l("/#create")} className="btn btn-lime">
          <IconPlus className="size-5" /> {M.newCode}
        </Link>
      </div>

      {account && <SignedInBar email={account} onSignedOut={() => setAccount(null)} />}

      <AnimatePresence>
        {deleted && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-2xl bg-ink px-5 py-3 text-paper"
          >
            {M.deleted}
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
          <Empty signIn={showSignIn} />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {state.codes.map((c, i) => (
              <CodeCard key={c.token} code={c} now={state.now} origin={origin} index={i} />
            ))}
          </div>
        )}
      </div>

      <div className={`mt-12 grid grid-cols-1 gap-4 ${showSignIn ? "lg:grid-cols-2" : ""}`}>
        {showSignIn && <SignInCard onSignedIn={setAccount} />}
        <AddByLink />
      </div>
    </div>
  );
}

function CodeCard({ code, now, origin, index }: { code: CodeView; now: number; origin: string; index: number }) {
  const { t, l, fill, plural, date } = useI18n();
  const M = t.myCodes;
  const s = lifeStatus(code, now);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: Math.min(index, 8) * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={l(`/manage/${code.token}`)} className="card group flex h-full gap-4 p-4 transition-transform duration-300 hover:-translate-y-1">
        <div className={`w-[92px] shrink-0 self-start overflow-hidden rounded-2xl ring-1 ring-ink/10 ${s.alive ? "" : "opacity-50 grayscale"}`}>
          <QrCode text={`${origin}/q/${code.id}`} design={code.design} animate={false} className="block h-auto w-full" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <span className={`self-start rounded-full px-2.5 py-1 text-[12px] font-semibold ${TONE[s.phase]}`}>
            {t.status[s.phase]}
            {s.alive && s.phase !== "active" ? ` · ${plural(M.daysLeft, s.daysLeft)}` : ""}
          </span>
          <div className="mt-2 truncate text-[17px] font-semibold tracking-tight">{code.title || t.manage.untitled}</div>
          <div className="truncate font-mono text-[13px] text-muted">{prettyUrl(code.target)}</div>
          <div className="mt-auto flex items-center justify-between pt-3 text-[13px] text-muted">
            <span className="flex items-center gap-1.5">
              <IconScan className="size-4" /> {plural(M.scans, code.scans)}
            </span>
            <span className="flex items-center gap-1 font-medium text-ink opacity-0 transition-opacity group-hover:opacity-100">
              {M.manage} <IconArrowRight className="size-4" />
            </span>
          </div>
          <div className="sr-only">{fill(M.created, { date: date(code.createdAt) })}</div>
        </div>
      </Link>
    </motion.div>
  );
}

function Empty({ signIn }: { signIn: boolean }) {
  const { t, l, fill } = useI18n();
  const M = t.myCodes;
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
      <h2 className="display mt-7 text-2xl">{M.emptyTitle}</h2>
      <p className="mt-2 max-w-md text-muted">{fill(M.emptyText)}</p>
      <Link href={l("/#create")} className="btn btn-primary mt-7">
        {M.emptyCta} <IconArrowRight className="size-5" />
      </Link>
      {signIn && (
        <p className="mt-5 text-[14px] text-muted">
          {t.account.emptyPrompt}{" "}
          <a href={`#${SIGN_IN_ID}`} onClick={focusSignIn} className="font-semibold text-kobalt hover:underline">
            {t.account.emptyLink}
          </a>
        </p>
      )}
    </motion.div>
  );
}

function AddByLink() {
  const { t, error: errorText } = useI18n();
  const M = t.myCodes;
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    // Új (/manage/…) és régi (/kezeles/…) kezelőlink is jó, ahogy a puszta token is.
    const token = value.trim().split(/\/(?:manage|kezeles)\//)[1]?.split(/[?#/]/)[0] ?? value.trim();
    if (!TOKEN_RE.test(token)) {
      setError(M.notManageLink);
      return;
    }
    try {
      const { code } = await api(`/api/codes/${token}`, "GET");
      rememberCode({ id: code.id, token: code.token, title: code.title, createdAt: code.createdAt });
      setValue("");
      setError(null);
    } catch (err) {
      setError(errorText(errorCode(err)));
    }
  }

  return (
    <form onSubmit={add} className="rounded-[28px] border border-dashed border-ink/20 p-6 sm:p-7">
      <h2 className="font-semibold tracking-tight">{M.addTitle}</h2>
      <p className="mt-1 text-[14px] text-muted">{M.addText}</p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <input
          className="field font-mono text-sm"
          placeholder="https://…/manage/…"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(null);
          }}
          aria-label={M.addLabel}
        />
        <button type="submit" className="btn btn-ink">
          {M.add}
        </button>
      </div>
      {error && <p className="mt-2 text-sm font-medium text-coral-deep">{error}</p>}
    </form>
  );
}
