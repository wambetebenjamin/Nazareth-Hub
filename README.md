# Nazareth Hub

**Work better. Connect deeper.**

A coworking space website for Nairobi, Kenya: hot desks, private offices and meeting
rooms, bookable online with reCAPTCHA v3, nodemailer confirmations, QR access passes
and PDF receipts.

Built on top of the Colorlib **ITSolution** Bootstrap 4 template (`itsolution-master.zip`)
without redesigning it. The full template audit is in [`AUDIT.md`](./AUDIT.md).

## Stack

Next.js 16.4.2 (App Router, Turbopack), React 19.2.0, TypeScript 5.8.3, Tailwind CSS
4.1.10, next-auth 5 (beta.28), Framer Motion 12.18.0, GSAP 3.12.7, Lenis 1.3.4,
lucide-react, react-hook-form 7.57.0, zod 3.25.67, zustand 5.0.6, qrcode, jsPDF,
html2canvas, @vercel/kv, @vercel/blob, @vercel/analytics, @vercel/speed-insights,
nodemailer 6.10.1. Node >= 24 (`.nvmrc`).

## Getting started

```bash
npm ci
cp .env.example .env.local   # then fill in what you have; everything degrades gracefully
npm run dev                  # http://localhost:3000
```

Build verification, exactly as specified:

```bash
npm ci
npx tsc --noEmit
npx next build
npm audit --audit-level=high
```

A seeded preview account exists so the member area is reachable without SMTP or KV:
`demo@nazarethhub.co.ke` / `demo1234`.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Homepage: hero, space types, stats counters, amenities, community, virtual office, events, masonry gallery, testimonials, location and hours |
| `/spaces` | Hot Desk, Dedicated Desk, Private Office, Meeting Room, Event Space with features and pricing tables |
| `/booking` | Tabs: Hot Desk, Meeting Room, Private Office Enquiry. reCAPTCHA v3 with v2 fallback |
| `/booking-confirmation` | Reference, space type, date, time, total paid, QR pass, PDF download |
| `/membership` | Day Pass, Flex, Full-Time, Team comparison |
| `/events`, `/events/[slug]` | Filterable listing (via `GET /api/events`), detail with agenda, speakers, RSVP |
| `/community` | Member directory, session required |
| `/account` | Dashboard: plan, credits, upcoming bookings, history. Session required |
| `/auth/signin`, `/auth/signup` | reCAPTCHA v3, Google OAuth, credentials |
| `/legal/privacy-policy`, `/legal/terms`, `/legal/cookie-policy` | Kenya DPA 2019 aligned |
| 404 / 500 | Branded: "This space does not exist." and Try Again with WhatsApp |

API: `POST /api/bookings/desk`, `POST /api/bookings/meeting-room`,
`GET /api/bookings/[ref]` (session gated), `GET /api/events`, `POST /api/events/rsvp`,
`POST /api/contact`, `POST /api/recaptcha/verify`, plus next-auth and signup routes.

## Template lineage (the zip is law)

- `template/itsolution-master/` holds all **172 zip files verbatim**: no renames, no
  deletions, Colorlib license and attribution untouched.
- `public/css`, `public/js`, `public/fonts`, `public/scss`, `public/images` serve the
  same assets at their original relative paths.
- `app/globals.css` reproduces, verbatim: the 28 Bootstrap `:root` custom properties,
  both Flaticon `@font-face` pairs and the glyph map, and the entire `#ftco-loader`
  block with its `loader-rotate` / `loader-dash` keyframes. The SCSS design tokens
  (`$primary #323edd`, `$secondary #ffa41b`, `$darken #090f35`, Montserrat) are exposed
  as `--nh-*` custom properties and as Tailwind theme colours.
- Template component classes rebuilt on the zip's exact values: `.wrap`, `.hero-wrap`,
  `.overlay`, `.slider-text`, `.ftco-section`, `.heading-section`, `.services-1`,
  `.block-18`, `.testimony-wrap`, `.blog-entry`, `.ftco-footer`, `.form-control`, `.btn`.

## Features required by the brief

- **Loading screen**: the zip's `#ftco-loader` reproduced, plus percentage counter,
  building outline drawn line by line, 3s cap, skip after 1s, `role="status"`, and
  plain percentage under `prefers-reduced-motion`.
- **Cookie consent**: fixed bottom banner, `localStorage` key `nazareth_hub_consent`,
  Necessary / Functional / Analytics / Marketing, Kenya DPA 2019 wording, changeable
  from the footer.
- **CAPTCHA**: reCAPTCHA v3 on every form, server side verification in
  `lib/recaptcha.ts`, v2 checkbox fallback when the score is below 0.5. Open mode when
  keys are unset so previews stay testable.
- **Voice tour**: Web Speech, rate 0.92, pitch 1.05, `en-KE`, 56x56 fixed bottom-left at
  z-index 9998, pulsing ring while speaking, tooltip "Hear what this site is about",
  replay label after the tour ends.
- **WhatsApp**: 56x56 fixed bottom-right at z-index 9998, `wa.me/254112272061` with the
  pre-filled message from the brief, entrance pulse, tooltip.
- **Animations (10)**: Lenis smooth scroll, space card hover lift, gallery masonry
  stagger, amenity icon stagger, booking tab AnimatePresence, membership hover
  highlight, event card stagger, stats counters, GSAP hero reveal, WhatsApp pulse.

## Environment variables

See `.env.example`: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_WHATSAPP_NUMBER`,
`NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY`, `NEXTAUTH_SECRET`,
`NEXTAUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `PEXELS_API_KEY`,
`KV_REST_API_URL`, `KV_REST_API_TOKEN`, `BLOB_READ_WRITE_TOKEN`, `SMTP_HOST`,
`SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`.

Without KV the booking store falls back to process memory; without SMTP, nodemailer
uses a JSON transport and logs the message; without reCAPTCHA keys, verification runs
in open mode.

## Security posture and the audit gate

`npm audit --audit-level=high` reports **4 residual findings (3 critical, 1 high)**, all
of them inside versions that STEP 3 pins exactly and that this project is required to
keep: `jspdf@3.0.1`, `nodemailer@6.10.1`, `next-auth@5.0.0-beta.28` (and its transitive
`@auth/core`). Bumping any of them would break the mandated manifest, so instead the
risk is mitigated in application code and accepted explicitly:

- **jspdf**: used only client side to render our own receipt canvas to PDF. We never
  open, parse or embed attacker controlled PDFs, and never use `addJS`, AcroForm or
  FreeText with untrusted input, which is what every jspdf advisory requires.
- **nodemailer**: subjects and recipients pass `stripHeaderInjection` (CR/LF stripped)
  in `lib/mailer.ts`; recipients are single zod validated addresses; message bodies are
  the only place user text appears. We set no `envelope.size`, no `List-*` headers and
  no OAuth2 transport, which covers the command injection and TLS advisories.
- **next-auth / @auth/core**: we use the credentials and Google providers only, never
  the email provider, so the homoglyph normalizer advisory has no reachable path.
  Session gates check `session.user.email`, which is undefined when Auth.js
  configuration errors populate the auth object, so those gates fail closed rather
  than open.
- Transitive findings that could be fixed without touching the pins **were** fixed via
  `package.json` overrides: `@fastify/busboy@3.2.2`, `undici@6.28.1`, plus
  `motion-dom@12.17.3` / `motion-utils@12.12.1` for build compatibility. That took the
  report from 7 findings to 4.

`vercel.json` security headers (X-Frame-Options, X-Content-Type-Options,
Referrer-Policy, HSTS, Permissions-Policy) are applied verbatim from STEP 4.

## Documented deviations

1. `@vercel/blob@0.29.4` does not exist on npm (the 0.x line ends at 0.27.3). Pinned to
   `0.27.3`.
2. `framer-motion@12.18.0` imports `activeAnimations` from `motion-dom`, which newer
   `motion-dom` releases removed. `package.json` overrides pin `motion-dom@12.17.3` and
   `motion-utils@12.12.1`, the exact floors framer-motion declares.
3. `next-auth@5.0.0-beta.28` declares a peer range of Next 14/15 while the brief pins
   both it and Next 16. `.npmrc` sets `legacy-peer-deps=true` so `npm ci` resolves
   reproducibly; runtime is verified working.
4. The sandbox cannot reach `images.pexels.com`, so Pexels photos were captured through
   search tooling at ~500 px and the hero was generated. See `image-credits.md`.
5. Sandbox Node is v22 while `engines` and `.nvmrc` specify 24, per the brief. `npm ci`
   prints an `EBADENGINE` warning locally; the manifest is correct for Vercel.
