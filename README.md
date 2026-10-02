# GenerateMyQRCodes – dynamic QR codes

generatemyqrcodes.com · operated by TourCierge s. r. o.

Every QR code contains a short link (`/q/<code>`) that forwards to the destination you set – the destination can
be changed at any time. Designing and previewing a code are free; to make it work (and to download it) it is
activated with its own Stripe subscription: **€1 for the first 7 days, then €3.99 a month per code**. Without a
live subscription the code pauses.

Next.js 16 · Tailwind v4 · Motion · Turso (libSQL) · Stripe (Checkout Sessions, `ui_mode: "elements"`)

## Local development

```bash
npm install
npm run dev   # http://localhost:3244
```

Without environment variables it still runs: data goes to `data/kockakod.db`, and instead of the payment form a
demo activation and “time travel” buttons appear on the management page. With Stripe test keys in `.env.local`,
the real payment form is used (test card 4242 4242 4242 4242).

## Going live on Vercel

1. **Turso:** a database (ideally in an EU region) and a token.
2. **Vercel → Settings → Environment Variables:** see [.env.example](.env.example) (`TURSO_DATABASE_URL`,
   `TURSO_AUTH_TOKEN`, `CREATOR_SALT`, `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`,
   `STRIPE_WEBHOOK_SECRET`, `SESSION_SECRET`, `RESEND_API_KEY`, `EMAIL_FROM`).
3. **Vercel → Settings → Functions → Region:** the region closest to the database (Turso `aws-eu-west-1` →
   Vercel `dub1`).
4. **Stripe → Webhooks (optional):** without it, renewals and endings are read from Stripe when a code’s paid
   period has passed. Endpoint `https://generatemyqrcodes.com/api/stripe/webhook` with the events listed in
   `.env.example`; its signing secret goes into `STRIPE_WEBHOOK_SECRET`.
5. **Stripe → Settings → Payment methods:** register the domain for Apple Pay / Google Pay (the express buttons
   only appear over HTTPS on a registered domain).
6. **Resend:** verify the domain (generatemyqrcodes.com) for the sender address in `EMAIL_FROM`.

## Signing in

There are no accounts: every code is managed through its private link, and the browser remembers the codes
created or opened on it. Subscribers can also sign in on the “My codes” page with a 6-digit code sent by email
(Resend); they then see every code paid for with that address, on any device. The codes are found through the
Stripe customers with that email address (`metadata.app = "generatemyqrcodes"`), so no user table is needed –
only `login_codes` (hashed codes, 10 minutes, 5 attempts) and a signed, httpOnly session cookie (180 days).
Without `RESEND_API_KEY`, in development the code is printed to the server log.

The QR codes contain the project’s production domain (`VERCEL_PROJECT_PRODUCTION_URL`, set by Vercel): the custom
domain if there is one, otherwise the `*.vercel.app` address. Codes created on the `vercel.app` address keep working
there – don’t remove that address from the project.

## Languages and legal texts

- English is the main language, without a prefix (`/`, `/terms`, `/manage/…`); Hungarian, German, French and
  Spanish live under `/hu`, `/de`, `/fr`, `/es`. `proxy.ts` rewrites the unprefixed addresses to `/en/…`, and `/`
  follows the language switcher’s cookie or the browser language on the first visit.
- UI texts: `lib/i18n/dictionaries/` (`en.ts` is the source and defines the `Dictionary` type). Prices are
  placeholders (`{intro}`, `{monthly}`, `{days}`, `{next}`), formatted per language from `PLAN` in `lib/site.ts`.
- Terms of Service and Privacy Policy: `lib/i18n/legal/` (the English text is the source and prevails). Operator,
  processors and the effective date are in `lib/legal.ts` – **the contact email is still missing** (the pages show
  “to be completed” until it is set in `lib/site.ts` → `brand.email`).
- Icons: `app/icon.svg` is the source; `npm run icons` regenerates `favicon.ico`, `apple-icon.png` and the manifest
  icons.
