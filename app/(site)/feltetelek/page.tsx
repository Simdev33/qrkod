import type { Metadata } from "next";
import { brand, pricing } from "@/lib/site";

export const metadata: Metadata = {
  title: "Feltételek és adatvédelem",
};

// Összefoglaló tájékoztató. Éles indulás előtt jogásszal véglegesítendő (cégadatok, ÁSZF, adatkezelési tájékoztató).
const SECTIONS = [
  {
    t: "A szolgáltatás",
    p: [
      `A(z) ${brand.name} dinamikus QR-kódokat készít: a kód egy rövid linket tartalmaz, ami a megadott webcímre irányít tovább. A célt a kód kezelőoldalán bármikor módosíthatod.`,
    ],
  },
  {
    t: "Ingyenes időszak és előfizetés",
    p: [
      `Minden új kód a létrehozásától számított ${pricing.trialDays} napig ingyenesen működik. Ehhez nem kell regisztráció és bankkártya.`,
      `Az ingyenes időszak után a kód havi 1 USD előfizetési díjért működik tovább. Az előfizetés havonta automatikusan megújul, amíg le nem mondod. Ha az ingyenes időszak alatt fizetsz elő, az első díjat az ingyenes időszak végén terheljük.`,
      "Ha nincs élő előfizetés, a kód szünetel: a beolvasók egy tájékoztató oldalt látnak, a továbbítás nem működik. Előfizetéssel a kód bármikor újraéleszthető.",
    ],
  },
  {
    t: "Lemondás",
    p: [
      "Az előfizetést a kód kezelőoldalán bármikor lemondhatod. A lemondás a kifizetett időszak végén lép életbe, addig a kód működik. Hűségidő nincs; a már megkezdett hónap díját nem térítjük vissza.",
    ],
  },
  {
    t: "Tiltott felhasználás",
    p: [
      "A kód nem mutathat jogsértő, megtévesztő (pl. adathalász) vagy kártékony tartalomra. Ilyen esetben a kódot értesítés nélkül felfüggesztjük.",
    ],
  },
  {
    t: "Adatkezelés",
    p: [
      "Regisztráció nincs. A kódhoz a megadott célcímet, a megnevezést, a megjelenési beállításokat és a beolvasások napi darabszámát tároljuk. A beolvasókról személyes adatot (IP-cím, eszköz) nem mentünk. A kód létrehozójának IP-címét csak sózott, visszafejthetetlen hash-ként tároljuk, kizárólag a tömeges kódgyártás korlátozására.",
      "A fizetést a Stripe, Inc. kezeli; a kártyaadatok hozzánk nem jutnak el. A Stripe-tól csak az előfizetés állapotát és azonosítóját kapjuk meg.",
      "A kezelőlink a kódod kulcsa: aki ismeri, az kezelheti a kódot. A böngésződ a kezelőlinkeket helyben (localStorage) jegyzi meg, hogy a „Kódjaim” oldalon megtaláld őket.",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-10 sm:px-5 sm:pt-16">
      <h1 className="display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02]">Feltételek és adatvédelem</h1>
      <p className="mt-4 text-muted">Röviden és érthetően arról, hogyan működik a szolgáltatás és mit tárolunk.</p>
      <div className="mt-10 space-y-5">
        {SECTIONS.map((s) => (
          <section key={s.t} className="card p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-tight">{s.t}</h2>
            {s.p.map((p) => (
              <p key={p} className="mt-3 leading-relaxed text-ink-2">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>
      <p className="mt-8 text-sm text-muted">
        Kérdésed van? Írj nekünk: <a className="font-semibold text-ink" href={`mailto:${brand.email}`}>{brand.email}</a>
      </p>
    </div>
  );
}
