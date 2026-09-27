import Link from "next/link";
import { LogoMark } from "@/components/site/Logo";

export default function NotFound() {
  return (
    <main className="dot-grid flex min-h-svh flex-col items-center justify-center px-5 text-center">
      <LogoMark className="size-14" />
      <h1 className="display mt-8 text-[clamp(2.4rem,7vw,4.5rem)] leading-none">404</h1>
      <p className="mt-4 max-w-md text-lg text-ink-2">Ez az oldal vagy QR-kód nem létezik – lehet, hogy elírták, vagy a tulajdonosa törölte.</p>
      <Link href="/" className="btn btn-primary mt-8">
        Vissza a főoldalra
      </Link>
    </main>
  );
}
