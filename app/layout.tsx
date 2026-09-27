import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono, Onest } from "next/font/google";
import "./globals.css";
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

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: `QR-kód készítő – 30 napig ingyen, utána havi 1 $ · ${brand.name}`,
    template: `%s · ${brand.name}`,
  },
  description:
    "Készíts egyedi, dinamikus QR-kódot pár másodperc alatt. 30 napig ingyen működik, utána havi 1 dollárért él tovább – a mögötte lévő linket pedig bármikor átírhatod.",
  keywords: ["QR-kód készítő", "QR kód generátor", "dinamikus QR-kód", "QR kód logóval", "szerkeszthető QR-kód"],
  openGraph: {
    type: "website",
    locale: "hu_HU",
    siteName: brand.name,
    title: "Nyomtasd ki egyszer, irányítsd bármikor · QR-kód készítő",
    description: "Dinamikus QR-kód: 30 napig ingyen, utána havi 1 $. Regisztráció nélkül.",
  },
};

export const viewport: Viewport = {
  themeColor: "#f3f0e8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu" className={`${archivo.variable} ${onest.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  );
}
