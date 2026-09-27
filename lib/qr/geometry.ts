import QRCode from "qrcode";
import type { Design, DotStyle, EyeStyle } from "@/lib/design";

// Minden koordináta modulegységben van (1 = egy QR-modul). A rajzolás (animált React-komponens és
// letölthető SVG) ugyanezekből a path-okból dolgozik, így az előnézet és a letöltés pixelre egyezik.

export type Module = { x: number; y: number; d: string };
export type Eye = { x: number; y: number; corner: 0 | 1 | 2; outer: string; inner: string };
export type LogoBox = { x: number; y: number; size: number };

export type QrShape = {
  count: number;
  modules: Module[];
  eyes: Eye[];
  logo: LogoBox | null;
  /** A teljes kép mérete és a kód bal felső sarka (modulegységben), keret és csendes zóna együtt. */
  width: number;
  height: number;
  ox: number;
  oy: number;
  frame: null | { outer: string; inner: string; textX: number; textY: number; fontSize: number };
};

const f = (n: number) => Math.round(n * 1000) / 1000;

/** Téglalap sarkonként megadható lekerekítéssel: [bal felső, jobb felső, jobb alsó, bal alsó]. */
export function roundedRect(x: number, y: number, w: number, h: number, r: number | [number, number, number, number]) {
  const [tl, tr, br, bl] = typeof r === "number" ? [r, r, r, r] : r;
  let d = `M${f(x + tl)} ${f(y)}H${f(x + w - tr)}`;
  if (tr) d += `A${f(tr)} ${f(tr)} 0 0 1 ${f(x + w)} ${f(y + tr)}`;
  d += `V${f(y + h - br)}`;
  if (br) d += `A${f(br)} ${f(br)} 0 0 1 ${f(x + w - br)} ${f(y + h)}`;
  d += `H${f(x + bl)}`;
  if (bl) d += `A${f(bl)} ${f(bl)} 0 0 1 ${f(x)} ${f(y + h - bl)}`;
  d += `V${f(y + tl)}`;
  if (tl) d += `A${f(tl)} ${f(tl)} 0 0 1 ${f(x + tl)} ${f(y)}`;
  return d + "Z";
}

export function circle(cx: number, cy: number, r: number) {
  return `M${f(cx - r)} ${f(cy)}a${f(r)} ${f(r)} 0 1 0 ${f(2 * r)} 0a${f(r)} ${f(r)} 0 1 0 ${f(-2 * r)} 0Z`;
}

type Neighbours = { t: boolean; r: boolean; b: boolean; l: boolean };

/** Egy adatmodul alakja. Az `overdraw` a szomszédos négyzetek közti hajszálvékony rést tünteti el. */
export function dotPath(style: DotStyle, x: number, y: number, nb: Neighbours, overdraw = 0) {
  switch (style) {
    case "square":
      return roundedRect(x - overdraw, y - overdraw, 1 + 2 * overdraw, 1 + 2 * overdraw, 0);
    case "rounded":
      return roundedRect(x + 0.07, y + 0.07, 0.86, 0.86, 0.32);
    case "dots":
      return circle(x + 0.5, y + 0.5, 0.43);
    case "liquid": {
      const r = 0.5;
      const e = overdraw;
      return roundedRect(x - e, y - e, 1 + 2 * e, 1 + 2 * e, [
        !nb.t && !nb.l ? r : 0,
        !nb.t && !nb.r ? r : 0,
        !nb.b && !nb.r ? r : 0,
        !nb.b && !nb.l ? r : 0,
      ]);
    }
  }
}

/** Pozícionáló „szem”: külső gyűrű (evenodd kitöltéssel) és belső mag. corner: 0 = bal felső, 1 = jobb felső, 2 = bal alsó. */
export function eyePaths(style: EyeStyle, x: number, y: number, corner: 0 | 1 | 2) {
  switch (style) {
    case "square":
      return {
        outer: roundedRect(x, y, 7, 7, 0) + roundedRect(x + 1, y + 1, 5, 5, 0),
        inner: roundedRect(x + 2, y + 2, 3, 3, 0),
      };
    case "rounded":
      return {
        outer: roundedRect(x, y, 7, 7, 2.2) + roundedRect(x + 1, y + 1, 5, 5, 1.3),
        inner: roundedRect(x + 2, y + 2, 3, 3, 0.9),
      };
    case "circle":
      return {
        outer: circle(x + 3.5, y + 3.5, 3.5) + circle(x + 3.5, y + 3.5, 2.5),
        inner: circle(x + 3.5, y + 3.5, 1.5),
      };
    case "leaf": {
      // A levél hegye mindig a kód közepe felé néz.
      const k = (R: number): [number, number, number, number] => (corner === 0 ? [R, 0, R, 0] : [0, R, 0, R]);
      return {
        outer: roundedRect(x, y, 7, 7, k(3)) + roundedRect(x + 1, y + 1, 5, 5, k(2)),
        inner: roundedRect(x + 2, y + 2, 3, 3, k(1.3)),
      };
    }
  }
}

export function qrShape(text: string, design: Design, overdraw = 0): QrShape {
  const withLogo = !!design.logo;
  const qr = QRCode.create(text, { errorCorrectionLevel: withLogo ? "H" : "Q" });
  const n = qr.modules.size;
  const data = qr.modules.data;

  const isEye = (x: number, y: number) => (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7);

  let logo: LogoBox | null = null;
  if (withLogo) {
    let s = Math.round(n * 0.25);
    if ((n - s) % 2) s += 1; // páratlan oldalhossz, hogy pontosan középre essen a rácson
    logo = { x: (n - s) / 2, y: (n - s) / 2, size: s };
  }
  const inLogo = (x: number, y: number) =>
    !!logo && x >= logo.x && x < logo.x + logo.size && y >= logo.y && y < logo.y + logo.size;

  const on = (x: number, y: number) =>
    x >= 0 && y >= 0 && x < n && y < n && !!data[y * n + x] && !isEye(x, y) && !inLogo(x, y);

  // Keret nélkül 4 modulnyi csendes zóna (szabvány), kerettel 3 + maga a keret.
  const frame = design.frame;
  const quiet = frame ? 3 : 4;
  const pad = 1.4;
  const band = 6.2;
  const inner = n + 2 * quiet;
  const width = frame ? inner + 2 * pad : inner;
  const height = frame ? pad + inner + band : inner;
  const ox = (frame ? pad : 0) + quiet;
  const oy = ox;

  const modules: Module[] = [];
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (!on(x, y)) continue;
      const nb = { t: on(x, y - 1), r: on(x + 1, y), b: on(x, y + 1), l: on(x - 1, y) };
      modules.push({ x, y, d: dotPath(design.dots, ox + x, oy + y, nb, overdraw) });
    }
  }

  const corners: [number, number, 0 | 1 | 2][] = [
    [0, 0, 0],
    [n - 7, 0, 1],
    [0, n - 7, 2],
  ];
  const eyes: Eye[] = corners.map(([x, y, corner]) => ({ x, y, corner, ...eyePaths(design.eyes, ox + x, oy + y, corner) }));

  let frameShape: QrShape["frame"] = null;
  if (frame) {
    const len = Math.max(design.frameText.length, 5);
    frameShape = {
      outer: roundedRect(0, 0, width, height, 2.6),
      inner: roundedRect(pad, pad, inner, inner, 1.5),
      textX: width / 2,
      textY: pad + inner + band / 2,
      fontSize: Math.min(3, (width - 5) / (len * 0.62)),
    };
  }

  return { count: n, modules, eyes, logo, width, height, ox, oy, frame: frameShape };
}
