import type { Metadata } from "next";
import { MyCodes } from "@/components/codes/MyCodes";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/server";
import { currentOrigin } from "@/lib/server/request";

export async function generateMetadata({ params }: PageProps<"/[lang]/my-codes">): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: hasLocale(lang) ? getDictionary(lang).meta.myCodes : undefined,
    robots: { index: false },
  };
}

export default async function MyCodesPage({ searchParams }: PageProps<"/[lang]/my-codes">) {
  const { deleted } = await searchParams;
  return <MyCodes origin={await currentOrigin()} deleted={deleted === "1"} />;
}
