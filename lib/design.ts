// A QR-kód megjelenése. Kliensen és szerveren is használt, ezért nincs benne semmi környezetfüggő.

export type DotStyle = "square" | "rounded" | "dots" | "liquid";
export type EyeStyle = "square" | "rounded" | "circle" | "leaf";

export type Design = {
  dots: DotStyle;
  eyes: EyeStyle;
  fg: string;
  eye: string;
  bg: string;
  /** Kicsinyített PNG data URL, vagy null. */
  logo: string | null;
  frame: boolean;
  frameText: string;
};

// A stílusok és színpárosítások neve a szótárban van (design.dots / design.eyes / design.palettes).
export const DOT_STYLES: DotStyle[] = ["square", "rounded", "dots", "liquid"];
export const EYE_STYLES: EyeStyle[] = ["square", "rounded", "circle", "leaf"];

export type PaletteId = "tinta" | "kobalt" | "korall" | "erdo" | "szilva" | "tenger" | "kave" | "citrom";

export const PALETTES: { id: PaletteId; fg: string; eye: string; bg: string }[] = [
  { id: "tinta", fg: "#16161d", eye: "#16161d", bg: "#ffffff" },
  { id: "kobalt", fg: "#1f2fd1", eye: "#16161d", bg: "#ffffff" },
  { id: "korall", fg: "#16161d", eye: "#e8452a", bg: "#fff6f0" },
  { id: "erdo", fg: "#17402e", eye: "#2c8a5e", bg: "#f4fbef" },
  { id: "szilva", fg: "#3b1a5c", eye: "#8a3ffc", bg: "#faf6ff" },
  { id: "tenger", fg: "#0c3b5e", eye: "#0a84c6", bg: "#f1f8ff" },
  { id: "kave", fg: "#3a2519", eye: "#9a5b2e", bg: "#fbf5ec" },
  { id: "citrom", fg: "#1c1c12", eye: "#1c1c12", bg: "#f3ff9e" },
];

export const DEFAULT_DESIGN: Design = {
  dots: "liquid",
  eyes: "rounded",
  fg: "#16161d",
  eye: "#1f2fd1",
  bg: "#ffffff",
  logo: null,
  frame: false,
  frameText: "Olvass be!",
};

export const FRAME_TEXT_MAX = 22;
/** A logó data URL-jének felső határa (kb. 140 KB). */
export const LOGO_MAX_CHARS = 190_000;

const HEX = /^#[0-9a-f]{6}$/i;
const hex = (v: unknown, fallback: string) => (typeof v === "string" && HEX.test(v) ? v.toLowerCase() : fallback);

/** Ismeretlen bemenetből érvényes dizájn — a szerver ezzel szűr minden mentés előtt. */
export function sanitizeDesign(input: unknown): Design {
  const d = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const dots = DOT_STYLES.includes(d.dots as DotStyle) ? (d.dots as DotStyle) : DEFAULT_DESIGN.dots;
  const eyes = EYE_STYLES.includes(d.eyes as EyeStyle) ? (d.eyes as EyeStyle) : DEFAULT_DESIGN.eyes;
  const logo =
    typeof d.logo === "string" &&
    d.logo.length <= LOGO_MAX_CHARS &&
    /^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(d.logo)
      ? d.logo
      : null;
  const frameText =
    typeof d.frameText === "string"
      ? d.frameText.replace(/[\u0000-\u001f<>]/g, "").trim().slice(0, FRAME_TEXT_MAX)
      : DEFAULT_DESIGN.frameText;
  return {
    dots,
    eyes,
    fg: hex(d.fg, DEFAULT_DESIGN.fg),
    eye: hex(d.eye, DEFAULT_DESIGN.eye),
    bg: hex(d.bg, DEFAULT_DESIGN.bg),
    logo,
    frame: d.frame === true,
    frameText: frameText || DEFAULT_DESIGN.frameText,
  };
}

/* ---------------- Kontraszt: a túl halvány kódot sok telefon nem olvassa be ---------------- */

function luminance(color: string) {
  const n = parseInt(color.slice(1), 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
}

export function contrast(a: string, b: string) {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}

export type ContrastIssue = null | "low" | "inverted";

export function contrastIssue(d: Design): ContrastIssue {
  if (luminance(d.fg) > luminance(d.bg) || luminance(d.eye) > luminance(d.bg)) return "inverted";
  if (Math.min(contrast(d.fg, d.bg), contrast(d.eye, d.bg)) < 3.2) return "low";
  return null;
}
