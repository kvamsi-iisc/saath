# Claude for Startups application: draft and checklist

## Pre-application checklist

- [ ] Choose a company name and register a domain. The application email **must** match
      the website domain. Gmail is the most common route into manual review.
- [ ] Put up a one-page landing page on that domain: product name, one-line positioning,
      the trust ladder, a waitlist form. Nothing more is needed.
- [ ] Create a Claude Console org at platform.claude.com with the company-domain email.
      Make sure the org has never had Claude Team, or the Team year is forfeited.
- [ ] Decide incorporation. Not required (an unregistered project was approved on
      2026-10-07), but the official terms may ask for an affidavit and publicity release
      within 14 days of acceptance, so a legal entity name is useful.
- [ ] Apply at https://platform.claude.com/offers/startups-application
- [ ] After acceptance: claim Team, claim API credits (6-month expiry starts at grant, so
      claim when ready to build), claim only Stack offers we will use (ClickHouse credits
      for the fraud-graph analytics, ElevenLabs if we do voice prompts, Firecrawl not needed).
- [ ] Apply to AWS Activate in parallel; its credits pay for Claude on Bedrock, which the
      Anthropic credits cannot.

## The form, field by field (researched 2026-10-08)

The official page (https://claude.com/programs/startups) lists only three requirements: a
Console account, a company email matching the website domain, and "a short description of
what you're building". The field list below comes from one applicant's walkthrough dated
2026-10-07 (https://note.com/gensekikobo/n/nd374e7a399a8). That source is secondary, so
check the live form at https://platform.claude.com/offers/startups-application before
pasting.

| Field | Type | Our answer |
|---|---|---|
| Name, company name, job title | Text | Founder name; registered company name; "Founder" |
| Website | Text | The live landing page on the company domain (`site/`) |
| Country, city | Text | Where the company is registered |
| Date of establishment | Date | Incorporation date, or the date work started if not yet incorporated |
| Funding status | Options | Bootstrapped |
| Percentage of AI spending on Claude | Options | The true share. Claude is the only LLM in the design, so this should be the highest band. Vendor detector fees are not LLM spend |
| Industry | Options | Closest consumer or trust-and-safety option the list offers |
| **What are you building?** | Text, **50 to 500 characters** | See below |
| What kind of support are you seeking from Anthropic? | Text, limit not reported | See below |
| Notification emails / Terms of Service | Checkboxes | Terms required |

**Inference:** decisions in minutes and a 500-character box mean the screen reads one
paragraph. It must name the user, the problem, and concrete product features that call the
Claude API. The earlier 170-word draft no longer fits and is replaced here.

### Positioning

Our USP is stopping fake, stolen and AI-generated profiles, including deepfake photos used
to lure users into scams. Claude is the multi-step validation layer: it reasons over every
signal and decides, explains and escalates. Specialised detectors and the KYC vendor produce
the raw signals (AI-generation score, Content Credential, reverse-image hits, liveness). We
never claim Claude itself detects AI images or matches faces. That would be inaccurate, and
face matching on Claude is prohibited by the Usage Policy.

### "What are you building?" (458 characters with "[Name]")

> [Name] is a matrimony app for Indian and diaspora families where fake and AI-generated
> profiles never go live. Matrimony scams run on stolen photos, deepfakes and invented
> backstories. Claude is our validation layer: it cross-checks every profile, ID document
> and photo-forensics result for contradictions, routes suspect images to re-shoot or human
> review, and flags scam scripts in consented chats. Face matching runs on a KYC vendor, per
> Anthropic policy.

Alternative (470 characters), if we want "bootstrapped, building on the API" in the text:

> Matrimony app for South Asian families that blocks fake, stolen and AI-generated profiles
> before anyone sees them. Claude runs multi-step validation on every signup: it reasons over
> photo-forensics and Content Credential results, cross-checks profiles against ID and
> documents for contradictions, explains each decision to the user, and warns users about
> scam scripts in chat. Biometric matching stays with a KYC vendor. Bootstrapped, building the
> MVP on the Claude API.

Paste as one paragraph; the line breaks above are only for readability.

### "What kind of support are you seeking from Anthropic?" (393 characters)

> Office hours on our validation pipeline: prompt and schema design for the
> profile-consistency check, how to evaluate false positives so real users are never wrongly
> rejected, and model routing (Haiku for high-volume photo and chat checks, Sonnet or Opus for
> full profile reasoning) with prompt caching. API credits fund the MVP pipeline; higher rate
> limits cover verification bursts at launch.

### What not to write

- "Claude detects deepfakes" or "Claude verifies faces". The first is inaccurate, and the
  second is prohibited.
- "We use Claude to build our own detection model". This is the internal-tool framing behind
  the one visible rejection pattern, and credits cannot pay for model training.
- Paper citations, user numbers, funding or partners we do not have. Awardees may be asked
  to sign an affidavit.

## How Claude benefits us, for our own clarity and for office hours

| Need | Why Claude specifically |
|---|---|
| Cross-document reasoning over messy, multilingual inputs (biodatas in English, Hindi, Tamil, Telugu; payslips; decrees) | Long context and strong document understanding. One call reads the whole profile plus attachments and returns a structured discrepancy list |
| Explainable outputs users can argue with | The compatibility report and the forensics explainer are written for humans. Claude's writing quality is the product surface |
| Structured output reliability | Tool use and JSON schemas for discrepancy lists, extraction, routing decisions |
| Safety behaviour by default | Refuses to infer protected attributes, which matches our own rules; easier to keep the product inside DPDP and the Usage Policy |
| Cost control | Haiku-class model for extraction and chat scanning at volume; Sonnet or Opus-class for the consistency check and reports; prompt caching on the per-user profile context |
| Agentic trust-team tooling | Claude Code and the Agent SDK to build the reviewer copilot and the grievance workflow quickly as a solo founder |

## What the program gives us, concretely

| Benefit | Use |
|---|---|
| $1,000 API credits, 6 months | Enough for the MVP: at Haiku-class pricing, tens of thousands of biodata extractions and chat scans; at Sonnet-class, thousands of full consistency checks and reports |
| Claude Team, 5 seats, 1 year | Founder plus first hires on Claude Code and projects, valued at $6,000 |
| Office hours with Applied AI | Review the consistency-check prompt design and the scam-detection classifier; ask about prompt caching for per-user context |
| ClickHouse $5K | Fraud-graph analytics store |
| Higher rate limits | Needed for burst verification at launch |
| Founder newsletter feature | Free distribution to the diaspora founder community |

## Risks and how we answer them

- **"Dating apps are crowded."** We are not a dating app. Matrimony is a 1,200 to 1,400
  crore online market inside a 13,000 crore total, with an incumbent whose paid users are
  shrinking while it spends 38% of revenue on marketing. The offline broker market is three
  to four times online and runs entirely on trust, which is what we digitise.
- **"Verification kills signups."** Tinder made Face Check mandatory in India in Oct 2025
  and reports a 60% drop in bad-actor exposure. The incumbent just obtained Aadhaar
  authentication approval. The market has moved; we start where they are heading.
- **"Biometrics and the Usage Policy."** Already designed around: vendors do faces, Claude
  does reasoning. We say so in the application.

## Sync note, 2026-10-09

The marketing site (`site/`) now carries the brand **Saath**, serves matrimony **and
dating**, and leads with our own detection models for AI-generated, deepfaked and heavily
edited photos (see "Scope update" in `docs/product/trust-architecture.md`). The answers
above still say "[Name]", "matrimony" and India-specific rails; update them to match before
submitting. The division of labour is unchanged and still accurate for the application:
detection models and the KYC vendor produce image and biometric signals, Claude reasons over
them, the documents and the profile text, writes the compatibility report, and never
identifies faces.
