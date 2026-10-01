import { DAY, PLAN } from "./site";
import type { CodeView } from "./types";

/**
 * - pending: created, never activated (it doesn’t forward yet);
 * - free: the free period of codes created before the paid plan;
 * - intro: subscribed, in the paid introductory days;
 * - active: subscribed, monthly;
 * - canceling: cancelled (or the subscription ended), but still live until the paid period ends;
 * - expired: was live once, now paused.
 */
export type Phase = "pending" | "free" | "intro" | "active" | "canceling" | "expired";

type StatusInput = Pick<CodeView, "trialEndsAt" | "paidUntil" | "subStatus" | "cancelAtPeriodEnd" | "createdAt">;

export type LifeStatus = {
  phase: Phase;
  alive: boolean;
  /** The code works until this time (ms). */
  activeUntil: number;
  daysLeft: number;
  subscribed: boolean;
  /** The time of the next charge, if there is a live subscription that is not cancelled. */
  nextCharge: number | null;
  /** Length of the current period (ms) – for the progress ring. */
  periodLength: number;
  /** True if the code was never live: activating it includes the introductory days. */
  firstActivation: boolean;
};

export const isSubscribed = (s: StatusInput["subStatus"]) => s === "active" || s === "trialing" || s === "past_due";

export function lifeStatus(c: StatusInput, now: number): LifeStatus {
  const subscribed = isSubscribed(c.subStatus);
  const activeUntil = Math.max(c.trialEndsAt, c.paidUntil ?? 0);
  const alive = now < activeUntil;
  const hadFreePeriod = c.trialEndsAt > c.createdAt;
  const firstActivation = c.paidUntil == null;
  const daysLeft = alive ? Math.ceil((activeUntil - now) / DAY) : 0;

  let phase: Phase;
  if (!alive) phase = firstActivation && !hadFreePeriod ? "pending" : "expired";
  else if (subscribed && c.cancelAtPeriodEnd) phase = "canceling";
  else if (subscribed) phase = c.subStatus === "trialing" ? "intro" : "active";
  else phase = now < c.trialEndsAt ? "free" : "canceling";

  const periodLength = phase === "intro" ? PLAN.introDays * DAY : phase === "free" ? c.trialEndsAt - c.createdAt : 30 * DAY;

  return {
    phase,
    alive,
    activeUntil,
    daysLeft,
    subscribed,
    nextCharge: subscribed && !c.cancelAtPeriodEnd && alive ? activeUntil : null,
    periodLength: Math.max(DAY, periodLength),
    firstActivation,
  };
}
