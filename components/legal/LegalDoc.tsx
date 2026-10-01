import Link from "next/link";
import { Rich } from "@/components/ui/Rich";
import { localePath, type Locale } from "@/lib/i18n/config";
import { fill, formatDate, priceVars } from "@/lib/i18n/format";
import { getDictionary, getLegal } from "@/lib/i18n/server";
import { isPlaceholder, LEGAL_EFFECTIVE_DATE, legalIncomplete, legalVars, operator } from "@/lib/legal";

type Kind = "terms" | "privacy";

export function LegalDoc({ lang, kind, siteUrl }: { lang: Locale; kind: Kind; siteUrl: string }) {
  const legal = getLegal(lang);
  const dict = getDictionary(lang);
  const doc = legal[kind];

  // A kitöltetlen szolgáltatói adatokat <ph> jelöléssel kiemeljük.
  const raw = legalVars(siteUrl.replace(/^https?:\/\//, ""), priceVars(lang));
  const vars = Object.fromEntries(
    Object.entries(raw).map(([k, v]) => [k, typeof v === "string" && isPlaceholder(v) ? `<ph>${v}</ph>` : v]),
  );
  const hasPlaceholders = legalIncomplete();
  const text = (s: string) => (
    <Rich
      text={fill(s, vars)}
      renderers={{
        ph: (t, key) => (
          <mark key={key} className="rounded bg-sun-soft px-1 text-ink">
            {t}
          </mark>
        ),
      }}
    />
  );

  const other: Kind = kind === "terms" ? "privacy" : "terms";

  return (
    <article className="mx-auto max-w-3xl px-4 pt-10 sm:px-5 sm:pt-16">
      <h1 className="display text-[clamp(2rem,5vw,3.4rem)] leading-[1.04]">{doc.title}</h1>
      <p className="mt-3 text-sm text-muted">
        {fill(legal.ui.effective, { date: formatDate(lang, Date.parse(`${LEGAL_EFFECTIVE_DATE}T12:00:00Z`)) })}
      </p>

      {legal.ui.translationNote && (
        <p className="mt-6 rounded-2xl border border-ink/10 bg-card px-5 py-4 text-[15px] text-ink-2">{legal.ui.translationNote}</p>
      )}
      {hasPlaceholders && (
        <p className="mt-4 rounded-2xl border-2 border-dashed border-sun bg-sun-soft px-5 py-4 text-[15px] text-ink">
          {legal.ui.placeholderNote}
        </p>
      )}

      <p className="mt-8 text-lg leading-relaxed text-ink-2">{text(doc.lead)}</p>

      <nav className="card mt-10 p-6 sm:p-7" aria-label={legal.ui.toc}>
        <div className="text-[13px] font-semibold tracking-wider text-muted uppercase">{legal.ui.toc}</div>
        <ol className="mt-3 grid gap-x-8 gap-y-1.5 text-[15px] sm:grid-cols-2">
          {doc.sections.map((s, i) => (
            <li key={s.h}>
              <a href={`#s${i + 1}`} className="text-ink-2 hover:text-kobalt">
                <span className="font-mono text-muted">{i + 1}.</span> {s.h}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-10 space-y-10">
        {doc.sections.map((s, i) => (
          <section key={s.h} id={`s${i + 1}`} className="scroll-mt-28">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              <span className="font-mono text-kobalt">{i + 1}.</span> {s.h}
            </h2>
            {s.p?.map((p, j) => (
              <p key={j} className="mt-3 leading-relaxed text-ink-2">
                {text(p)}
              </p>
            ))}
            {s.list && (
              <ul className="mt-3 space-y-2">
                {s.list.map((item, j) => (
                  <li key={j} className="flex gap-3 leading-relaxed text-ink-2">
                    <span className="mt-[0.6em] size-1.5 shrink-0 rounded-[2px] bg-kobalt" aria-hidden />
                    <span>{text(item)}</span>
                  </li>
                ))}
              </ul>
            )}
            {s.after?.map((p, j) => (
              <p key={j} className="mt-3 leading-relaxed text-ink-2">
                {text(p)}
              </p>
            ))}
          </section>
        ))}
      </div>

      <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-6 text-sm">
        {operator.email ? (
          <a href={`mailto:${operator.email}`} className="font-semibold text-ink">
            {operator.email}
          </a>
        ) : (
          <span className="text-muted">{operator.name}</span>
        )}
        <Link href={localePath(lang, `/${other}`)} className="font-semibold text-kobalt hover:underline">
          {dict.meta[other]} →
        </Link>
      </div>
    </article>
  );
}
