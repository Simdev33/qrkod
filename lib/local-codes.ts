// Regisztráció nincs: az ezen az eszközön készült (vagy megnyitott) kódok kezelőlinkjeit a böngésző jegyzi meg.

export type LocalCode = { id: string; token: string; title: string; createdAt: number };

const KEY = "kockakod:codes";
const EVENT = "kockakod:codes";

export function readLocalCodes(): LocalCode[] {
  try {
    const raw = localStorage.getItem(KEY);
    const list = raw ? (JSON.parse(raw) as LocalCode[]) : [];
    return Array.isArray(list) ? list.filter((c) => c && typeof c.token === "string" && typeof c.id === "string") : [];
  } catch {
    return [];
  }
}

function write(list: LocalCode[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
    window.dispatchEvent(new Event(EVENT));
  } catch {
    // privát mód / letiltott tárhely: a kezelőlink ettől még működik
  }
}

export function rememberCode(code: LocalCode) {
  const list = readLocalCodes().filter((c) => c.token !== code.token);
  write([code, ...list].slice(0, 200));
}

export function forgetCode(token: string) {
  write(readLocalCodes().filter((c) => c.token !== token));
}

export function onLocalCodesChange(cb: () => void) {
  const handler = (e: Event) => {
    if (e.type === "storage" && (e as StorageEvent).key !== KEY) return;
    cb();
  };
  window.addEventListener(EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}
