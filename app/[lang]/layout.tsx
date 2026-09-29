import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono, Onest } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { I18nProvider } from "@/lib/i18n/client";
import { hasLocale, LOCALES, OG_LOCALE } from "@/lib/i18n/config";
import { alternates } from "@/lib/i18n/meta";
import { getDictionary } from "@/lib/i18n/server";
import { brand } from "@/lib/site";

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});
const onest = Onest({
  subsets: ["latin", "latin-ext"],
  variable: "--font-onest",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang).meta;
  return {
    metadataBase: new URL(brand.url),
    title: { default: `${t.title} · ${brand.name}`, template: `%s · ${brand.name}` },
    description: t.description,
    keywords: t.keywords,
    alternates: alternates(lang, "/"),
    openGraph: {
      type: "website",
      locale: OG_LOCALE[lang],
      siteName: brand.name,
      title: t.ogTitle,
      description: t.ogDescription,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#f3f0e8",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <html lang={lang} className={`${archivo.variable} ${onest.variable} ${jetbrains.variable}`}>
      <body>
        <I18nProvider lang={lang} dict={getDictionary(lang)}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
