import type { Design } from "@/lib/design";
import { qrShape, roundedRect } from "./geometry";

// Letölthető SVG és PNG. A kódot egyetlen path-ba vonjuk össze, így nincs rés a szomszédos modulok között.

const FONT = "Arial, Helvetica, sans-serif";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function buildSvg(text: string, design: Design, pixelWidth = 1024) {
  const s = qrShape(text, design);
  const pixelHeight = Math.round((pixelWidth * s.height) / s.width);
  const parts: string[] = [];
  parts.push(
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${pixelWidth}" height="${pixelHeight}" viewBox="0 0 ${s.width} ${s.height}">`,
  );
  if (s.frame) {
    parts.push(`<path d="${s.frame.outer}" fill="${design.eye}"/>`);
    parts.push(`<path d="${s.frame.inner}" fill="${design.bg}"/>`);
    parts.push(
      `<text x="${s.frame.textX}" y="${s.frame.textY}" fill="${design.bg}" font-family="${FONT}" font-weight="700" font-size="${s.frame.fontSize.toFixed(2)}" text-anchor="middle" dominant-baseline="central" letter-spacing="0.06">${esc(design.frameText.toUpperCase())}</text>`,
    );
  } else {
    parts.push(`<rect width="${s.width}" height="${s.height}" fill="${design.bg}"/>`);
  }
  parts.push(`<path d="${s.modules.map((m) => m.d).join("")}" fill="${design.fg}"/>`);
  for (const e of s.eyes) {
    parts.push(`<path d="${e.outer}" fill="${design.eye}" fill-rule="evenodd"/>`);
    parts.push(`<path d="${e.inner}" fill="${design.eye}"/>`);
  }
  if (s.logo && design.logo) {
    const x = s.ox + s.logo.x;
    const y = s.oy + s.logo.y;
    const k = s.logo.size;
    parts.push(`<path d="${roundedRect(x + 0.35, y + 0.35, k - 0.7, k - 0.7, 1)}" fill="${design.bg}"/>`);
    parts.push(
      `<image x="${x + 0.85}" y="${y + 0.85}" width="${k - 1.7}" height="${k - 1.7}" preserveAspectRatio="xMidYMid meet" href="${design.logo}" xlink:href="${design.logo}"/>`,
    );
  }
  parts.push("</svg>");
  return { svg: parts.join(""), width: pixelWidth, height: pixelHeight };
}

export async function svgToPngBlob(svg: string, width: number, height: number): Promise<Blob> {
  const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  const img = new Image();
  img.decoding = "async";
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("A kép nem rajzolható ki."));
    img.src = url;
  });
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("A böngésző nem támogatja a vásznat.");
  ctx.drawImage(img, 0, 0, width, height);
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("A PNG nem készült el."))), "image/png"),
  );
}

export function saveBlob(blob: Blob, filename: string) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}

export async function downloadQr(text: string, design: Design, format: "png" | "svg", name: string, px = 1200) {
  const { svg, width, height } = buildSvg(text, design, px);
  if (format === "svg") {
    saveBlob(new Blob([svg], { type: "image/svg+xml" }), `${name}.svg`);
    return;
  }
  saveBlob(await svgToPngBlob(svg, width, height), `${name}.png`);
}
