# Claude for Startups: requirements and fit (verified 2026-10-08)

Source of truth: https://claude.com/programs/startups (fetched 2026-10-08). The program was
expanded on 2026-10-06 during SF Tech Week
([TechCrunch](https://techcrunch.com/2026/10/06/anthropic-gives-startups-a-free-year-of-enterprise-service-and-1000-in-token-credits/),
[CNBC](https://www.cnbc.com/2026/10/06/anthropic-claude-startups-program.html),
[Runtime Wire](https://runtimewire.com/article/anthropic-expands-claude-startups-founder-support)).

## Eligibility (verified)

| Requirement | Detail | Our status |
|---|---|---|
| Company age | Founded in the last 5 years, or funded in the last 2 | OK once incorporated |
| Funding stage | Bootstrapped, pre-seed and VC-backed all eligible | Bootstrapped: OK |
| Claude Console account | platform.claude.com org account | To create |
| Company email | Must match the domain of the company website | **Blocker: need domain + live website** |
| Product description | Short, concrete description of what Claude does in the product | Draft in `application-draft.md` |
| Policy compliance | Must comply with Anthropic's supportability and usage policies | See constraints below |

Not required: revenue, a shipped product, VC backing, a team, or a pitch deck. The page says
"apply when you are ready to build" (third-party paraphrase, creditforstartups.com).

## Benefits (verified, October 2026)

| Benefit | Value | Notes |
|---|---|---|
| Claude API credits | $1,000 | Expire 6 months after grant. First-party API only, not Bedrock or Vertex |
| Claude Team | 1 year free, up to 5 Premium seats | Only for orgs new to Team. Anthropic values this at $6,000 |
| Startup Stack | Partner offers "up to $45K" | ClickHouse $5K, ElevenLabs 12 months + 33M chars, Firecrawl 2.5x credits, Granola, Hex, Gamma, Augment Code, Attention, Emergent and more |
| Office hours | 45-min sessions with Applied AI team, every other week | Useful for the fraud-detection pipeline design |
| Events | Founder House, hackathons, meetups | Mostly SF-centred |
| Rate limits | Higher API rate limits for credit recipients | |
| Partner-VC bonus | Up to $100K extra API credits via partner VC | Not applicable while bootstrapped |

## Process (verified)

1. Sign in to the Claude Console with the company-domain email and complete the in-Console form.
2. Most decisions arrive within minutes. Manual review takes 2-3 business days.
   Applying from Gmail or a non-matching domain is the most common cause of manual review.
3. Acceptance email links to the Claude Startups page in the Console to claim Team and credits.
4. Stack offers are redeemed with codes in the Console.

## Usage Policy constraints that matter for a matrimony product (verified)

From https://www.anthropic.com/legal/aup, fetched 2026-10-08:

- **No facial recognition or biometric identification with Claude.** The policy prohibits using
  the models for facial recognition and for "any biometric categorization system" that infers
  race, religion, political opinion etc. from biometric data. Selfie liveness and face-to-ID
  matching must run on a specialised KYC vendor. Claude can reason over the vendor's result.
- **No emotion inference** from photos or video, "except for medical or safety reasons".
- **Trust scores need notice and consent.** Prohibited: assigning "scores or ratings to
  individuals based on an assessment of their trustworthiness or social behavior without
  notification or their consent". We score only a user's own submitted profile, with
  disclosure at signup. We never score a person who has not joined.
- **No discrimination on protected attributes.** Compatibility models must not use caste,
  religion, ethnicity etc. as model inputs. Those remain explicit user-chosen filters.
- **AI disclosure.** Any assistant that converses with users must say it is AI.
- **Dating and matchmaking is not a listed High-Risk Use Case**, so the human-in-the-loop
  requirement does not formally apply. We adopt it anyway for any account rejection.

## Fit assessment

The idea fits the program's only real criteria: a young company building on Claude. The
page does not restrict sector; consumer products are eligible. The three things that will
decide the outcome are:

1. A company domain with a live website (even a one-page landing page) before applying.
2. A description that says concretely what Claude does, not "AI-powered matrimony".
   The draft in `application-draft.md` names the specific Claude workloads.
3. Staying inside the biometric and trust-score rules above. Mentioning a KYC vendor for
   face matching in the application shows the policy has been read.
