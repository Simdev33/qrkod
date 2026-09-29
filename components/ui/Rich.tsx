import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { parseRich } from "@/lib/i18n/format";

type Renderers = Record<string, (text: string, key: number) => ReactNode>;

/**
 * Szótárszöveg megjelenítése a benne lévő egyszerű jelölésekkel: <b>…</b> kiemelés, illetve a
 * `links`-ben megadott címkék (pl. <terms>…</terms>) linkként.
 */
export function Rich({
  text,
  links,
  boldClass = "font-semibold text-ink",
  linkClass = "font-semibold text-ink underline decoration-ink/30 underline-offset-2 hover:decoration-ink",
  renderers,
}: {
  text: string;
  links?: Record<string, string>;
  boldClass?: string;
  linkClass?: string;
  renderers?: Renderers;
}) {
  return (
    <>
      {parseRich(text).map((part, i) => {
        if (!part.tag) return <Fragment key={i}>{part.text}</Fragment>;
        if (renderers?.[part.tag]) return renderers[part.tag](part.text, i);
        if (links?.[part.tag]) {
          return (
            <Link key={i} href={links[part.tag]} className={linkClass}>
              {part.text}
            </Link>
          );
        }
        if (part.tag === "b") {
          return (
            <strong key={i} className={boldClass}>
              {part.text}
            </strong>
          );
        }
        return <Fragment key={i}>{part.text}</Fragment>;
      })}
    </>
  );
}
