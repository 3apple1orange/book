# Meet Me in the Backyard — Book Landing Page

Next.js 14 (App Router), TypeScript, Tailwind CSS, zero extra UI dependencies.
Single scrolling page: Hero → Synopsis → Themes → About the Author → Praise (auto-hides until real quotes exist) → CTA → Footer.

## 1. Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## 2. Edit ALL copy in one place

Everything text-based — titles, synopsis, bio, theme labels, CTA copy, meta description,
even the JSON-LD schema fields — comes from:

```
lib/content.ts
```

Every placeholder is marked `[PLACEHOLDER]`. Replace those, save, done. You should not need
to touch any component file to update copy. Types (`ThemeItem`, `PraiseQuote`, `BookStatus`)
are defined at the top of the same file.

## 3. Add real images

See `public/PLACE_IMAGES_HERE.txt` for the exact list (cover, author portrait, OG share image,
favicon) and recommended dimensions. Update the matching path in `lib/content.ts` if you rename
any file.

## 4. Before launch checklist

- [ ] Replace every `[PLACEHOLDER]` in `lib/content.ts`
- [ ] Add real cover image, author portrait, OG image, favicon (see public/ note)
- [ ] Confirm `site.domain` in `lib/content.ts` matches the live domain
- [ ] Confirm `cta.email` is a real, monitored inbox
- [ ] Only fill `praise.quotes` with genuine attributed quotes — leave empty otherwise
- [ ] Update `book.status` / `book.statusLabel` once purchase status is final
- [ ] Fill `book.isbn` / `publisher` / `datePublished` / `bookFormat` only once each is verified — leave blank until then, they're auto-omitted from schema when empty
- [ ] Add `site.googleSiteVerification` once you set up Search Console for the domain
- [ ] Add `site.ga4MeasurementId` once GA4 is set up (analytics stays off until this is filled in)
- [ ] Run `npm run build` locally once to confirm no errors before deploying

## 5. SEO already wired in

- Full `<title>`, meta description, canonical URL, Open Graph, Twitter card, `authors` — all driven by `lib/content.ts`
- `Book` + `Person` + `WebSite` JSON-LD structured data in `app/layout.tsx`, with the author
  `Person` `@id` pointing at `https://www.manansingla.com/#person` — this links the book to the
  same entity being built on the portfolio site, per the SEO brief's entity-architecture approach
- Book schema's `isbn`/`publisher`/`datePublished`/`bookFormat` fields are only emitted once you
  fill them in — never publishes an unverified claim (per the brief's verification rule)
- Auto-generated `sitemap.xml` and `robots.txt` (`app/sitemap.ts`, `app/robots.ts`)
- **Non-production deploys (Vercel previews, local dev) are automatically set to `noindex`** —
  only the real production domain gets indexed, per the brief's "no dev/staging URL indexed" rule
- Google Search Console verification tag ready — just drop the code into `site.googleSiteVerification`
- GA4 wired but dormant until `site.ga4MeasurementId` is set, and only ever fires on production
- Semantic single `<h1>` in Hero, logical heading hierarchy throughout
- `next/image` for automatic AVIF/WebP + lazy loading, self-hosted fonts via `next/font` (no render-blocking font requests)
- No client-side JS beyond a tiny scroll-reveal observer — fast Core Web Vitals by default

## 6. Deploy to Vercel

```bash
npm install -g vercel   # if you don't have it
vercel
```

Or push this folder to a GitHub repo and import it at vercel.com/new. Set the custom domain
(e.g. meetmeinthebackyard.com) in the Vercel project's Domains settings once DNS is ready.

## 7. Project structure

```
app/
  layout.tsx      ← fonts, metadata, JSON-LD
  page.tsx        ← assembles all sections
  sitemap.ts       robots.ts
  globals.css     ← design tokens, grain texture, reveal animation CSS
components/
  Hero.tsx  Synopsis.tsx  Themes.tsx  About.tsx  Praise.tsx  CTA.tsx  Footer.tsx
  Reveal.tsx      ← scroll-reveal wrapper, no external animation library
lib/
  content.ts      ← ALL copy + SEO fields + types, single source of truth
public/           ← images go here
```
