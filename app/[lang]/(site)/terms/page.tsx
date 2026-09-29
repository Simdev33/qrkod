import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalDoc } from "@/components/legal/LegalDoc";
import { hasLocale } from "@/lib/i18n/config";
import { alternates } from "@/lib/i18n/meta";
import { getLegal } from "@/lib/i18n/server";
import { currentOrigin } from "@/lib/server/request";

export async function generateMetadata({ params }: PageProps<"/[lang]/terms">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { title: getLegal(lang).terms.title, alternates: alternates(lang, "/terms") };
}

export default async function TermsPage({ params }: PageProps<"/[lang]/terms">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <LegalDoc lang={lang} kind="terms" siteUrl={await currentOrigin()} />;
}
