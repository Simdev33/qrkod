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
   (`TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`, `NEXT_PUBLIC_SITE_URL`, `STRIPE_SECRET_KEY`,
   `STRIPE_WEBHOOK_SECRET`, `CREATOR_SALT`).
3. **Vercel → Settings → Functions → Region:** az adatbázishoz legközelebbi régió. A jelenlegi Turso-adatbázis
   `aws-eu-west-1` (Írország), ehhez a Vercel `dub1` (Dublin) régiója illik.
4. **Stripe → Webhooks:** végpont `https://<domain>/api/stripe/webhook`, az `.env.example`-ben felsorolt
   eseményekkel; a signing secret megy a `STRIPE_WEBHOOK_SECRET`-be.
5. Deploy. A táblák az első kéréskor maguktól létrejönnek.

A `NEXT_PUBLIC_SITE_URL`-t a végleges domainre állítsd, mielőtt bárki kinyomtatna egy kódot – a QR-kódok ezt
a címet tartalmazzák.
