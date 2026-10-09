# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this workspace is

Planning and research workspace for a trust-first, AI-native matrimony platform aimed at
Indian and South Asian diaspora users (working name: TBD). There is no application code yet.
The first milestone is admission to Anthropic's Claude for Startups program
(https://claude.com/programs/startups); product build follows.

Current contents:

- `docs/research/` — market, competitor, user-complaint, verification-tech and legal research
- `docs/startup-program/` — program requirements, approval patterns, and the application draft
- `docs/product/` — feature spec, trust architecture, AI use cases

Read `docs/product/trust-architecture.md` before proposing any identity, photo or
fraud-detection feature; it records which checks must use specialised KYC vendors and
which may use Claude (see "Hard constraints" below).

## Working rules for this repo

- **Write files in appended chunks under ~15 KB.** One large response on this user's network
  path causes Claude Code API retry errors. Create the file with the first chunk, then append
  further chunks in separate tool calls. This applies to docs and code alike.
- Research documents must separate verified facts (with source URLs) from inference.
  Never state a competitor metric or a legal rule without a link.
- Keep the application draft for the startup program in sync with `docs/product/` when the
  product scope changes; the application is judged on a concrete description of what Claude
  does in the product.

## Hard constraints that shape the product (from Anthropic's Usage Policy)

These decide where Claude can and cannot sit in the architecture:

- Claude must not be used for facial recognition, biometric identification, or biometric
  categorisation (inferring religion, caste, ethnicity etc. from faces). Selfie-to-ID
  matching and liveness checks go to a dedicated KYC vendor, not to Claude.
- Claude must not infer emotions from photos or video.
- Any trust or authenticity score shown about a person requires that person's notice and
  consent. Scores are computed on the user's own profile with disclosure at signup, never
  silently on third parties.
- Any AI assistant that talks to users must disclose that it is AI.
- Compatibility scoring must not disadvantage users on protected attributes. Caste and
  religion are user-chosen filters, never AI-inferred inputs.

## Code: marketing site (`site/`)

Astro 7 static site, hand-written CSS, vanilla TS. No app code yet; this is the landing
page needed for the company-domain email requirement of the startup program.

```bash
cd site && npm install   # once
npm run dev              # localhost:4321
npm run build            # dist/
npm run preview
```

No test or lint tooling yet. Placeholders (brand name, domain, waitlist endpoint) live in
`site/src/config/site.ts`; the product copy mirrors `docs/product/trust-architecture.md`,
so update both together. See `site/README.md`.

## When app code arrives

Add build, test, lint and single-test commands here as soon as a stack is chosen. Do not
invent them before then.
