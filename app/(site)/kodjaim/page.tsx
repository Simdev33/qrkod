import type { Metadata } from "next";
import { MyCodes } from "@/components/codes/MyCodes";
import { currentOrigin } from "@/lib/server/request";

export const metadata: Metadata = {
  title: "Kódjaim",
  robots: { index: false },
};

export default async function MyCodesPage({ searchParams }: PageProps<"/kodjaim">) {
  const { torolve } = await searchParams;
  return <MyCodes origin={await currentOrigin()} deleted={torolve === "1"} />;
}
