import { DAY } from "./site";
import type { CodeView } from "./types";

export type Phase = "trial" | "scheduled" | "active" | "canceling" | "expired";

type StatusInput = Pick<CodeView, "trialEndsAt" | "paidUntil" | "subStatus" | "cancelAtPeriodEnd" | "createdAt">;

export type LifeStatus = {
  phase: Phase;
  alive: boolean;
  /** Eddig működik a kód (ms). */
  activeUntil: number;
  daysLeft: number;
  subscribed: boolean;
  /** A következő terhelés időpontja, ha van élő, nem lemondott előfizetés. */
  nextCharge: number | null;
  /** Mennyi telt el az ingyenes időszakból (0–1). */
  trialProgress: number;
};

export const isSubscribed = (s: StatusInput["subStatus"]) => s === "active" || s === "trialing" || s === "past_due";

export function lifeStatus(c: StatusInput, now: number): LifeStatus {
  const subscribed = isSubscribed(c.subStatus);
  const activeUntil = Math.max(c.trialEndsAt, c.paidUntil ?? 0);
  const alive = now < activeUntil;
  const trialProgress = Math.min(1, Math.max(0, (now - c.createdAt) / (c.trialEndsAt - c.createdAt)));
  const daysLeft = alive ? Math.ceil((activeUntil - now) / DAY) : 0;

  let phase: Phase;
  if (!alive) phase = "expired";
  else if (subscribed && c.cancelAtPeriodEnd) phase = "canceling";
  else if (subscribed) phase = now < c.trialEndsAt ? "scheduled" : "active";
  else phase = now < c.trialEndsAt ? "trial" : "canceling";

  return {
    phase,
    alive,
    activeUntil,
    daysLeft,
    subscribed,
    nextCharge: subscribed && !c.cancelAtPeriodEnd && alive ? activeUntil : null,
    trialProgress,
  };
}

export const PHASE_LABEL: Record<Phase, string> = {
  trial: "Ingyenes hónap",
  scheduled: "Előfizetve",
  active: "Aktív előfizetés",
  canceling: "Lemondva",
  expired: "Szünetel",
};
