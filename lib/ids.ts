// Rövid kód (a QR-ben, nyilvános) és kezelő-token (titkos). Az ábécéből kimaradtak az összetéveszthető
// karakterek (0/o, 1/l/i), mert a rövid linket néha kézzel gépelik be.

export const CODE_ALPHABET = "23456789abcdefghjkmnpqrstuvwxyz";
export const CODE_LENGTH = 6;
export const CODE_RE = new RegExp(`^[${CODE_ALPHABET}]{${CODE_LENGTH}}$`);
export const TOKEN_RE = /^[A-Za-z0-9_-]{32}$/;

function randomBytes(n: number) {
  const bytes = new Uint8Array(n);
  crypto.getRandomValues(bytes);
  return bytes;
}

export function randomCode() {
  // 248 = 8 × 31: az ennél nagyobb bájtokat eldobjuk, így egyenletes az eloszlás.
  let out = "";
  while (out.length < CODE_LENGTH) {
    for (const b of randomBytes(16)) {
      if (b < 248 && out.length < CODE_LENGTH) out += CODE_ALPHABET[b % 31];
    }
  }
  return out;
}

export function randomToken() {
  const bytes = randomBytes(24);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
