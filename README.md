# Kockakód – dinamikus QR-kód készítő

A QR-kód egy rövid linket tartalmaz (`/q/<kód>`), ami a megadott címre irányít tovább. Minden kód 30 napig
ingyen működik, utána havi 1 $-os Stripe-előfizetéssel él tovább; előfizetés nélkül szünetel.

Next.js 16 · Tailwind v4 · Motion · Turso (libSQL) · Stripe

## Helyi futtatás

```bash
npm install
npm run dev   # http://localhost:3244
```

Környezeti változók nélkül is fut: az adatok a `data/kockakod.db` fájlba kerülnek, a fizetés helyett pedig
demó fizetőoldal és „időutazás” gombok vannak a kezelőoldalon.

## Élesítés Vercelen

1. **Turso:** hozz létre egy adatbázist (európai régióban), és készíts hozzá tokent.
2. **Vercel → Settings → Environment Variables:** töltsd ki a [.env.example](.env.example) változóit
   (`TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`, `CREATOR_SALT`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`).
3. **Vercel → Settings → Functions → Region:** az adatbázishoz legközelebbi régió. A jelenlegi Turso-adatbázis
   `aws-eu-west-1` (Írország), ehhez a Vercel `dub1` (Dublin) régiója illik.
4. **Stripe → Webhooks:** végpont `https://<domain>/api/stripe/webhook`, az `.env.example`-ben felsorolt
   eseményekkel; a signing secret megy a `STRIPE_WEBHOOK_SECRET`-be.
5. Deploy. A táblák az első kéréskor maguktól létrejönnek.

A QR-kódokba a projekt éles domainje kerül (`VERCEL_PROJECT_PRODUCTION_URL`, a Vercel magától adja): saját
domain esetén az, különben a `*.vercel.app` cím. Ha később saját domaint kötsz be, az új kódok azt kapják, a régiek
a `vercel.app` címen működnek tovább – ezt a címet ezért ne vedd le a projektről.

## Nyelvek és jogi szövegek

- Öt nyelv: magyar, angol, német, francia, spanyol. Minden oldal `/<nyelv>/…` alatt él; a `proxy.ts` a nyelv
  nélküli címeket a látogató nyelvére irányítja (süti → böngésző nyelve → angol). A QR-kódok rövid linkjei
  (`/q/<kód>`) nyelvfüggetlenek.
- Felületi szövegek: `lib/i18n/dictionaries/` (a `hu.ts` az eredeti, a típusa kötelezővé teszi a többi nyelvben is
  ugyanazokat a kulcsokat).
- ÁSZF és Adatkezelési tájékoztató: `lib/i18n/legal/` (a magyar az irányadó). A szolgáltató adatait, az áfa-mondatot
  és a hatálybalépés dátumát a `lib/legal.ts`-ben kell kitölteni — amíg szögletes zárójeles helyőrző maradt, az
  oldalakon figyelmeztetés látszik.

