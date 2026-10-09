# Saath — marketing site

Static one-page site for Saath, a trust-first matrimony and dating platform whose first
promise is that fake, AI-generated, deepfaked and heavily edited photos never reach a profile.
Built with [Astro](https://astro.build) 7, hand-written CSS (no UI kit, no Tailwind) and
about 6 KB of vanilla TypeScript for progressive enhancement. Fonts: Instrument Serif,
DM Sans, DM Mono via Google Fonts.

## Commands

```bash
npm install        # once
npm run dev        # http://localhost:4321 with hot reload
npm run build      # static output in dist/
npm run preview    # serve dist/ locally
```

## Before going live

1. `src/config/site.ts`: set `domain`, `contactEmail`, and `waitlistEndpoint`
   (Formspree, Tally, Basin or your own endpoint; empty = demo mode that only shows success).
2. `astro.config.mjs`: set `site` to the real https URL (used for canonical and OG tags).
3. Deploy `dist/` to Cloudflare Pages, Netlify, Vercel or GitHub Pages. All of them detect
   Astro automatically; build command `npm run build`, output directory `dist`.

## Structure

```
public/
  img/hero-couple.jpg        hero illustration (cropped from the Saath design reference)
  img/profiles/              example card photos; see SOURCES.md for licences and which are AI
  media/saath-verification.mp4 + poster   product-flow film (muted autoplay on scroll)
src/
  config/site.ts         brand name, nav, endpoints (all placeholders live here)
  layouts/Base.astro     <head>, fonts, nav, footer, script include
  styles/global.css      design tokens, reset, type scale, shared primitives
  scripts/main.ts        scroll reveal, profile deck, showreel, tier tabs, demo, toggle, form
  components/
    Logo.astro           the heart-leaf mark
    Hero.astro           three-line serif headline, USP lede, arched illustration
    ProfileDeck.astro    swipeable verified / flagged / rejected example cards
    Problem.astro        sourced global fraud statistics and the three failures of incumbents
    ShowReel.astro       the verification film with scroll-triggered playback (#trust)
    TrustLadder.astro    8 verification tiers (tablist) + three design rules
    AiLayer.astro        credibility-check demo, 8 AI workloads, why reasoning AI
    Compatibility.astro  sample report with a marriage / dating toggle
    Principles.astro     what we refuse to build
    Pricing.astro        free vs premium principle
    Waitlist.astro       form (email, marriage/dating, who for, country) + store status
```

Content is kept in sync with `../docs/product/trust-architecture.md`. Every number in the
Problem section carries a footnoted source URL; keep that rule when editing.

## Design notes

- Palette from the Saath reference: cream `#f7f5ed`, deep green `#203528`, one rust accent
  `#b74b31`. Dark bands are deep green, opt-in via `.is-dark`, which re-maps the tokens.
- Display type is Instrument Serif with italics in rust; body is DM Sans.
- The site never names a specific AI vendor; copy says "AI" and "our detection models".
- Motion: scroll reveals, the card deck tick-in, the film and the two demos, all disabled
  under `prefers-reduced-motion`. The page is complete with JavaScript off (the film keeps
  native controls).
- Faces appear only in the example deck and are labelled: real photos are licensed
  Unsplash portraits, rejected cards use StyleGAN faces of people who do not exist.
