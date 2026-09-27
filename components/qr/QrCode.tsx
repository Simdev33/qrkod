"use client";

import { useMemo, type CSSProperties } from "react";
import type { Design } from "@/lib/design";
import { qrShape } from "@/lib/qr/geometry";

type Props = {
  text: string;
  design: Design;
  /** Felépülő „hullám” animáció, ami minden alakváltozáskor újraindul. */
  animate?: boolean;
  className?: string;
  label?: string;
};

// Determinisztikus „zaj” modulonként, hogy a hullám ne legyen gépiesen szabályos.
const jitter = (x: number, y: number) => {
  const s = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return s - Math.floor(s);
};

export function QrCode({ text, design, animate = true, className, label }: Props) {
  const hasLogo = !!design.logo;
  const shape = useMemo(
    () => qrShape(text, design, 0.02),
    // A színek nem befolyásolják a geometriát, azokat CSS-átmenet kezeli.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [text, design.dots, design.eyes, design.frame, design.frameText, hasLogo],
  );
  const replayKey = `${text}|${design.dots}|${design.eyes}|${design.frame}|${hasLogo}`;
  const overdraw = design.dots === "square" || design.dots === "liquid";

  const half = shape.count / 2;
  const reach = half * Math.SQRT2;
  const delayOf = (x: number, y: number) =>
    Math.round((Math.hypot(x + 0.5 - half, y + 0.5 - half) / reach) * 560 + jitter(x, y) * 110);

  const vars = { "--qr-fg": design.fg, "--qr-eye": design.eye, "--qr-bg": design.bg } as CSSProperties;

  return (
    <svg
      viewBox={`0 0 ${shape.width} ${shape.height}`}
      className={`qr ${animate ? "qr-anim" : ""} ${className ?? ""}`}
      style={vars}
      role="img"
      aria-label={label ?? "QR-kód"}
    >
      {shape.frame ? (
        <>
          <path d={shape.frame.outer} className="qr-frame" />
          <path d={shape.frame.inner} className="qr-bgfill" />
          <text
            x={shape.frame.textX}
            y={shape.frame.textY}
            className="qr-frame-text"
            fontFamily="Arial, Helvetica, sans-serif"
            fontWeight={700}
            fontSize={shape.frame.fontSize}
            textAnchor="middle"
            dominantBaseline="central"
            letterSpacing={0.06}
          >
            {design.frameText.toUpperCase()}
          </text>
        </>
      ) : (
        <rect width={shape.width} height={shape.height} className="qr-bgfill" />
      )}

      <g key={replayKey}>
        {shape.modules.map((m) => (
          <path
            key={`${m.x}.${m.y}`}
            d={m.d}
            className={`qr-m ${overdraw ? "qr-overdraw" : ""}`}
            style={animate ? ({ "--d": `${delayOf(m.x, m.y)}ms` } as CSSProperties) : undefined}
          />
        ))}
        {shape.eyes.map((e, i) => (
          <g
            key={i}
            className="qr-eye"
            style={animate ? ({ "--d": `${560 + i * 90}ms` } as CSSProperties) : undefined}
          >
            <path d={e.outer} fillRule="evenodd" />
            <path d={e.inner} />
          </g>
        ))}
        {shape.logo && design.logo && (
          <g className="qr-logo" style={animate ? ({ "--d": "820ms" } as CSSProperties) : undefined}>
            <rect
              x={shape.ox + shape.logo.x + 0.35}
              y={shape.oy + shape.logo.y + 0.35}
              width={shape.logo.size - 0.7}
              height={shape.logo.size - 0.7}
              rx={1}
              className="qr-bgfill"
            />
            <image
              href={design.logo}
              x={shape.ox + shape.logo.x + 0.85}
              y={shape.oy + shape.logo.y + 0.85}
              width={shape.logo.size - 1.7}
              height={shape.logo.size - 1.7}
              preserveAspectRatio="xMidYMid meet"
            />
          </g>
        )}
      </g>
    </svg>
  );
}
