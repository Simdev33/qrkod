import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

// A nyelvi útvonalakon kívüli, ismeretlen címek (pl. elgépelt /q/… alútvonal) 404-oldala.
// A nyelvi 404 az app/[lang]/not-found.tsx-ben van; ide ritkán jut el bárki.

export const metadata: Metadata = { title: "404" };

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <main className="dot-grid flex min-h-svh flex-col items-center justify-center px-5 text-center">
          <h1 className="display text-[clamp(2.4rem,7vw,4.5rem)] leading-none">404</h1>
          <p className="mt-4 max-w-md text-lg text-ink-2">This page does not exist. · Ez az oldal nem létezik.</p>
          <Link href="/" className="btn btn-primary mt-8">
            Home
          </Link>
        </main>
      </body>
    </html>
  );
}
