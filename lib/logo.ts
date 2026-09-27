import { LOGO_MAX_CHARS } from "./design";

/** Feltöltött képből kicsinyített, négyzetbe illesztett PNG (vagy ha túl nagy, WebP) data URL. */
export async function processLogo(file: File): Promise<string> {
  if (!/^image\/(png|jpeg|webp|svg\+xml|gif)$/.test(file.type)) {
    throw new Error("PNG, JPG, WebP vagy SVG képet tölts fel.");
  }
  if (file.size > 8 * 1024 * 1024) throw new Error("A kép legfeljebb 8 MB lehet.");

  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Ezt a képet nem sikerült beolvasni."));
      img.src = url;
    });
    for (const size of [256, 200, 160]) {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d")!;
      const w = img.naturalWidth || size;
      const h = img.naturalHeight || size;
      const k = Math.min(size / w, size / h);
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, (size - w * k) / 2, (size - h * k) / 2, w * k, h * k);
      for (const [type, q] of [["image/png", undefined], ["image/webp", 0.9]] as const) {
        const data = canvas.toDataURL(type, q);
        if (data.startsWith(`data:${type}`) && data.length <= LOGO_MAX_CHARS) return data;
      }
    }
    throw new Error("A kép túl részletes, próbálj egy egyszerűbb logót.");
  } finally {
    URL.revokeObjectURL(url);
  }
}
