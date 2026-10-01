import type { MetadataRoute } from "next";
import { brand } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: brand.name,
    short_name: "MyQRCodes",
    description: "Dynamic QR codes you print once and redirect anytime.",
    start_url: "/",
    display: "standalone",
    background_color: "#f3f0e8",
    theme_color: "#16161d",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
