# Feature spec v0.1: a trust-first, AI-native matrimony platform

Positioning in one line: **the only matrimony platform where every profile is a verified
real person, every claim is checkable, and AI helps you decide instead of helping you swipe.**

Target users, in priority order:
1. Self-driven searchers, 26 to 36, metro India and diaspora. 77% of profiles are now
   self-managed (Jeevansathi 2026). They want honesty, speed and privacy, and will pay.
2. Their families, as invited participants with scoped access, not as proxies who run the
   account. This is the structural fix for "the profile was written by the mother".
3. Remarriage seekers (16% and growing) and late-30s professionals, whom incumbents push
   into separate second-class brands.

See `trust-architecture.md` for the verification stack and `../research/` for the evidence.

## A. Trust and verification (the USP)

| Feature | Detail | Tier |
|---|---|---|
| Verified-only directory | No profile is visible until it passes liveness, ID and photo checks. There is no unverified class of profile | Free |
| Trust ladder badges | Identity, Photos, Work, Education, Marital status, Clean record, Family-vouched. Each shows what was checked and when. Filter matches by minimum tier | Free to see, premium to add Tier 3 and up |
| Photo authenticity report | For each photo: provenance (Content Credential), edit level, AI-generated score, found-elsewhere check. Plain-language result written by Claude. Heavily filtered photos are allowed but labelled | Free for own photos; premium adds a detailed forensics report and re-check on demand |
| Consistency check | Claude cross-reads the entire profile and documents and asks the user to resolve contradictions before going live | Free |
| Mandatory marital-status proof | Anyone claiming divorced or widowed uploads the decree or certificate. Never-married is a declaration backed by the Tier 1 ID. Hiding a prior marriage is grounds for permanent removal | Free |
| Scam-script detection in chat | Consent-based. Claude flags known scam patterns, off-platform pressure and money asks, and warns the recipient. Disclosed as AI | Free |
| Continuous fraud graph | Device, phone, email, shared-asset and behaviour signals. Risk changes trigger re-verification, not silent shadow-bans | Free |
| Report with teeth | One-tap report with reason. Confirmed fakes are removed, the face vector is blocked, and the reporter is told the outcome within 7 days (the IT Rules grievance clock) | Free |
| Public trust statistics | Monthly published numbers: profiles rejected at gate, removed after reports, median resolution time. Incumbents publish nothing | Free |

## B. Profile and discovery

| Feature | Detail |
|---|---|
| Biodata import | Upload the PDF or photo biodata the family already has. Claude extracts fields and drafts the profile. Confirm, do not type |
| Human-written, AI-checked bios | Users write; Claude offers clarity suggestions and flags vagueness. Any AI-drafted sentence is labelled, per the 2026 synthetic-content rules and user preference research |
| Structured honesty fields | Income band (verified or self-declared, shown differently), relocation willingness, timeline to marry, children wanted, living with parents after marriage, dietary and religious practice level, dual-career expectations. These are the questions people wish they could ask on day one |
| Video and voice prompts | 20-second answers to three prompts, recorded in-app (liveness-checked). Optional, but profiles with them get priority in discovery |
| Optional caste and religion filters | Present, user-chosen, never inferred. "Caste no bar" is a first-class choice, not a hidden toggle |
| Deliberate discovery, not swiping | A daily set of 5 to 10 compatible profiles with the reasons for each. No infinite feed. Over 75% of Gen Z report swipe fatigue |
| Mutual-interest contact release | Contact details are released only on mutual acceptance. No paying to see phone numbers |
| Privacy by default | Photos blurred to non-matches, watermarked with the viewer's ID on screenshots where the OS allows, hidden from search engines, full deletion within 30 days of account closure with a confirmation |

## C. AI compatibility report (premium)

Written by Claude from both users' structured answers and stated preferences, after both
have expressed interest. Caste, religion and ethnicity are never inputs; they were already
applied as the user's own filters. Each dimension gets a short, specific paragraph with the
underlying answers shown, so the report is explainable and the user can disagree with it.

Dimensions, beyond the usual hobbies and horoscope:

1. **Life logistics.** City and relocation willingness, timeline to marry, living
   arrangement with parents, joint versus separate finances, children and when.
2. **Career and money.** Dual-career expectations, who moves for whose job, attitude to the
   partner earning more (only 15% of women accept a husband earning less; 87% of men accept
   a wife earning more), spending versus saving, debt disclosure.
3. **Family involvement.** How much the two families expect to be involved day to day,
   festivals and rituals, care for ageing parents.
4. **Faith in practice.** Not the label but the practice level: daily, festival-only, none.
   Dietary rules. Expectations of the partner's practice. Users answer about themselves and
   what they want; the model compares, it never infers.
5. **Conflict and communication style.** Short validated questionnaire items drawn from
   published pre-marital inventories, adapted and credited. Report says how the two styles
   interact and what to talk about.
6. **Health and lifestyle disclosure.** Smoking, drinking, chronic conditions the user
   chooses to disclose, fitness. Shown only with explicit consent per item.
7. **Values and ambition.** Risk appetite, importance of career versus family time, travel,
   social life, politics only if both opt in.
8. **Horoscope module (optional).** Kundli matching via a licensed astrology API for users
   who want it, presented alongside, never instead of, the above. Demand is real: over half
   of Gen Z surveyed sought astrological guidance on relationships.
9. **Red-flag and green-flag summary.** The three things most likely to cause friction and
   the three strongest shared foundations, with the specific answers that drove each.
10. **Questions to ask on your first call.** Generated from the gaps and mismatches, so the
    first conversation is useful.

## D. Family mode

Families matter, but they should not impersonate. A user can invite a parent or sibling
with a scoped role: view shortlisted profiles, add notes, suggest matches, join a video
call. Family members verify at Tier 0 and 1 on their own account, which also earns the
user a "Family-vouched" badge. The family never messages a match as the user.

## E. Assisted tier (premium plus)

A human matchmaker for the diaspora and time-poor professionals, augmented by Claude:
shortlists with reasons, pre-call briefs, follow-up tracking, and a partial success fee.
This is where incumbents charge $520 to $935 per quarter and where the diaspora already
pays. We match their price with a far better product.

## F. Safety at the first meeting

Share-my-meeting with a trusted contact, in-app video call before any number exchange,
and a post-meeting check-in. User-initiated background checks (Tier 6) are promoted
before the first in-person meeting.

## G. Pricing and dark-pattern commitments

- No auto-renewal without a reminder email 7 days before, and one-tap cancel in-app.
- No telesales. No calls unless the user books one.
- No "profile viewed by 47 people" nudges. No fake activity signals.
- Published refund policy with a 7-day no-questions window on first purchase.
- Pricing per `../research/market-trends.md`: free verified tier, subscription at 5,000 to
  12,000 rupees per year, assisted tier at 15,000 to 50,000 rupees with partial success fee.

## H. What we ship first (MVP, 12 weeks)

1. Tier 0 to 2 verification with one KYC vendor for India and one for abroad.
2. Biodata import and profile builder with consistency check.
3. Daily deliberate discovery, mutual contact release, in-app chat with scam detection.
4. Compatibility report v1 with dimensions 1 to 5, 9 and 10.
5. Trust statistics page and grievance workflow.
Everything else follows on evidence from the first 1,000 verified users.
