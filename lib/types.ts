import type { Design } from "./design";

/** Amit a kliens egy kódról láthat (a kezelőoldalon és a „Kódjaim” listában). */
export type CodeView = {
  id: string;
  token: string;
  title: string;
  target: string;
  design: Design;
  createdAt: number;
  trialEndsAt: number;
  paidUntil: number | null;
  subStatus: SubStatus | null;
  cancelAtPeriodEnd: boolean;
  hasCustomer: boolean;
  scans: number;
  missedScans: number;
  lastScanAt: number | null;
  /** Az utolsó 30 nap beolvasásai naponként, a legrégebbivel kezdve. */
  daily: { day: string; count: number }[];
};

export type SubStatus = "active" | "trialing" | "past_due" | "unpaid" | "canceled" | "incomplete" | "incomplete_expired" | "paused";

export type PaymentMode = "stripe" | "demo" | "off";
