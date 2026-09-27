import Link from "next/link";
import { QrCode } from "@/components/qr/QrCode";
import { IconArrowRight } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { DEFAULT_DESIGN } from "@/lib/design";

export function CtaBand({ origin }: { origin: string }) {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-5 sm:pt-32">
      <Reveal>
        <div className="relative overflow-hidden rounded-[32px] border-[1.5px] border-ink bg-lime p-8 shadow-[0_6px_0_var(--color-ink)] sm:p-12">
          <div className="dot-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden />
          <div className="relative grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="display text-[clamp(2rem,5vw,3.8rem)] leading-[0.96]">
                Az első kódod
                <br />
                egy percbe sem telik.
              </h2>
              <p className="mt-4 max-w-lg text-lg text-ink-2">30 napig ingyen, regisztráció és kártya nélkül. Utána havi 1 $, ha kéred.</p>
              <Link href="/#keszito" className="btn btn-ink mt-8 px-6 py-4 text-base">
                QR-kód készítése <IconArrowRight className="size-5" />
              </Link>
            </div>
            <div className="mx-auto w-44 rotate-3 overflow-hidden rounded-3xl border-[1.5px] border-ink shadow-[6px_6px_0_var(--color-ink)] transition-transform duration-500 hover:rotate-0 sm:w-52">
              <QrCode text={origin} design={{ ...DEFAULT_DESIGN, eye: "#16161d" }} animate={false} className="block h-auto w-full" label="QR-kód a főoldalra" />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
