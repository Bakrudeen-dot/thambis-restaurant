# Thambis Restaurant & Cafe — website

Static, multilingual (English · தமிழ் · العربية with full RTL) restaurant website.
Next.js 15 (App Router) · TypeScript · Tailwind CSS 3 · Lucide · Next/Image. No backend.

## Run
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```
Static hosting (cPanel/S3/Netlify): uncomment `output: "export"` + `images.unoptimized` in `next.config.mjs`, then `npm run build` → upload `out/`.

## Where to edit things
| What | File |
|---|---|
| Phone, WhatsApp, address, Google Maps, opening hours, social links, domain | `data/restaurantConfig.ts` (single source of truth) |
| Menu categories, dishes, prices (`price: null` shows "SAR XX") | `data/menu.ts` |
| Signature / non-veg / cafe / gallery content | `data/menu.ts` |
| All interface text in 3 languages | `data/translations.ts` |
| Real customer reviews | `reviews` array in `components/Reviews.tsx` |
| Colours & fonts | `app/globals.css` (CSS variables) + `tailwind.config.ts` |
| Photos | `public/images/` — see `IMAGE-GUIDE.md` |

## Waiting on the restaurant (placeholders in place, nothing invented)
- [ ] Real food, interior and dining photos
- [ ] Final menu + prices
- [ ] Opening hours
- [ ] Google Maps share link + embed URL + review link
- [ ] Instagram / TikTok / Facebook URLs
- [ ] Real customer reviews (with permission)
- [ ] Logo file (text wordmark used until then — `components/Logo.tsx`)
- [ ] Domain (`siteUrl`, used for canonical URLs, sitemap, structured data)
- [ ] Native-speaker review of Tamil and Arabic copy

## Language system
- Selected language is saved in the browser; `?lang=ar` / `?lang=ta` also works for sharing links.
- A tiny inline script sets `lang`/`dir` before paint so Arabic doesn't flash LTR.
- Layout uses logical properties (`ms-`, `me-`, `start-`, `end-`), so RTL mirrors naturally; directional arrows flip via `.flip-rtl`, brand icons and phone numbers stay LTR.
- Future SEO upgrade: move to `/[lang]/…` routes so each language is indexed separately. Data files are already keyed by language.

## SEO
Metadata per page, Open Graph + Twitter cards, `Restaurant`/`LocalBusiness` JSON-LD (root layout), `Menu` JSON-LD (/menu, prices omitted until confirmed), `robots.txt`, `sitemap.xml`.
Opening hours and geo are added to structured data automatically once filled in `restaurantConfig.ts`.

## Adding a backend later
Components read from `data/*` only. Replace those exports with fetchers (CMS / API) and keep the same shapes (`MenuItem`, `Review`, `OpeningHoursEntry`).
