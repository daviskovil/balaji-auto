# Balaji Auto – Website

Website for **Balaji Auto – Car Service, Car Wash & Body Shop**, Rahatani, Pune. Replaces the old WordPress site at balajiauto.in.

Built with Next.js 15 (App Router), Tailwind CSS v4 and lucide icons. All pages are static, so it deploys to Vercel with no extra setup.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Where to edit things

| What | File |
| --- | --- |
| Phone, WhatsApp, emails, address, hours, services, FAQs | `src/lib/site.ts` |
| Eva chatbot answers | `src/lib/eva.ts` |
| Eva chat window | `src/components/Eva.tsx` |
| Pages | `src/app/page.tsx`, `services/`, `about/`, `contact/` |
| Brand colours and fonts | `src/app/globals.css` (`@theme`) |
| Logos | `public/images/` |

Eva is rule-based: she only answers from the data in `site.ts`, so update that file and her answers update too. She needs no API key and has no running cost.

The booking form doesn't need a server. It opens WhatsApp with the customer's details filled in, addressed to the number in `site.ts`.

## Deploy

1. Push this repo to GitHub (`daviskovil/balaji-auto`).
2. In Vercel, **Add New → Project** and import the repo. The default settings work.
3. In Vercel **Settings → Domains**, add `balajiauto.in` and `www.balajiauto.in`.
4. In Hostinger DNS for balajiauto.in, set the records Vercel shows (usually an `A` record `@ → 76.76.21.21` and a `CNAME` `www → cname.vercel-dns.com`).
