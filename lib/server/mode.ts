import "server-only";
import type { PaymentMode } from "@/lib/types";

/** Stripe-kulccsal valódi fizetés; nélküle fejlesztéskor demó, élesben kikapcsolva. */
export const paymentMode = (): PaymentMode =>
  process.env.STRIPE_SECRET_KEY?.trim() ? "stripe" : process.env.NODE_ENV !== "production" ? "demo" : "off";
