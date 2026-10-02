import type { Metadata } from "next";
import { MyCodes } from "@/components/codes/MyCodes";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/server";
import { emailConfigured } from "@/lib/server/email";
import { paymentMode } from "@/lib/server/mode";
import { currentOrigin } from "@/lib/server/request";
import { getSession, signinAvailable } from "@/lib/server/session";

export async function generateMetadata({ params }: PageProps<"/[lang]/my-codes">): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: hasLocale(lang) ? getDictionary(lang).meta.myCodes : undefined,
    robots: { index: false },
  };
}

export default async function MyCodesPage({ searchParams }: PageProps<"/[lang]/my-codes">) {
  const { deleted } = await searchParams;
  // Signing in needs Stripe (the codes are found through the customers), email sending and the session key.
  const signin = paymentMode() === "stripe" && emailConfigured() && signinAvailable();
  const session = signin ? await getSession() : null;
  return <MyCodes origin={await currentOrigin()} deleted={deleted === "1"} account={session?.email ?? null} signin={signin} />;
}
