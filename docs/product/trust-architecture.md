# Trust architecture: how we make "no fake profiles" real

Principle: **verification is free and mandatory; depth of verification is the premium.**
Every live profile has passed the Tier 0 gate. Higher tiers add badges the other side can
see. No service is ever denied for declining an optional check (this is also a condition of
the Aadhaar route, see `docs/research/verification-tech-and-law.md`).

Second principle: **no single signal rejects a human.** Detectors mislabel 13% or more of
real photos. Every automated "fail" routes to a live selfie retry and then to a human
reviewer. The user always sees why and what to do next.

Third principle: **Claude reasons, specialised vendors recognise.** Anthropic's Usage Policy
forbids using Claude for facial recognition, biometric identification or categorisation,
and emotion inference. Face matching, liveness and face-vector dedupe run on a KYC vendor.
Claude consumes their structured results plus everything textual and documentary.

## Verification tiers

| Tier | Name | What it proves | How | Cost per user (est.) | Required? |
|---|---|---|---|---|---|
| 0 | Real person | A live human who matches their photos, one account per face | Vendor liveness plus selfie-to-photo match (HyperVerge in India, Veriff or Persona abroad); irreversible face vector stored for dedupe, video deleted within days | 3 to 10 rupees India, ~$1 abroad | Yes, before profile goes live |
| 1 | Real identity | Legal name, date of birth, photo on a government ID | Aadhaar offline XML via DigiLocker, or PAN, driving licence, passport (NFC read for NRIs); ID image deleted after extraction, only hashed fields kept | 5 to 25 rupees, ~$1 to 3 abroad | Yes |
| 2 | Real photos | Photos are of this person, unedited beyond light filters, not AI-generated, not found elsewhere online | Perceptual hash against our base, TinEye reverse search, Hive or Reality Defender AI-detection score, C2PA credential read when present, then Claude-written explanation of the result for the user | ~1 rupee | Yes; "heavily edited" photos are allowed but labelled |
| 3 | Real work and income | Employer, tenure, income band | EPFO UAN consent lookup; payslip, Form 16 or ITR via Account Aggregator; work-email domain check; Claude cross-checks documents against stated profile | 20 to 60 rupees | Optional, premium badge |
| 4 | Real education | Degree and institution | National Academic Depository via DigiLocker; fallback manual check (AuthBridge, SpringVerify) | 10 to 300 rupees | Optional, premium badge |
| 5 | Real marital status | Never married, divorced with decree, widowed | Decree or certificate upload; Claude extracts fields; human confirms | Human minutes | Optional, but **mandatory to claim "divorced"** so the status is never hidden |
| 6 | Clean record | No criminal record | User-initiated only: AuthBridge or LegalCheck in India, Basic DBS in UK, RCMP in Canada, Checkr Personal in US; we verify the certificate's authenticity | 500 to 2,000 rupees | Optional, premium badge |
| 7 | Family-vouched | A named family member has verified Tier 0 and vouches | Family member passes Tier 0 and 1 on their own account, linked | Same as Tier 0 | Optional |

Badges are shown as a trust ladder on the profile card. Users can filter matches by the
minimum tier they will engage with.

## The fraud graph (continuous, not one-time)

Signals collected at signup and every session, combined into a risk score the user is told
about at signup (consent and notice are Usage Policy requirements for any trust scoring):

- Device: emulator, rooted device, GPS spoofing, device-ID resets (Fingerprint or SEON SDK).
- Phone: SIM swap, recent port, VoIP or virtual number, carrier risk (Telesign PhoneID).
- Email: disposable domains, account age (IPQS).
- Network: shared devices, shared payment instruments, shared photos across accounts
  (face vector and perceptual hash), shared bio text.
- Behaviour: message velocity, copy-paste ratio, time-to-first-contact-request, repeated
  requests to move off-platform, money or gift mentions.

## Where Claude sits

Claude is the reasoning layer across all of the above. Concrete workloads, each a distinct
API call pattern:

1. **Profile coherence check.** Claude reads the full profile (free text, structured fields,
   extracted document fields, vendor results) and flags contradictions: stated age versus ID
   date of birth, "software engineer in Bangalore" with payslips from a Dubai employer,
   "never married" with a child mentioned in the bio, a 2019 degree with a 2015 job start at
   a senior title. Output is a structured list of discrepancies with severity and the user-
   facing question we ask to resolve each one. This is the highest-value Claude workload:
   fakes rarely fail one check, they fail consistency.

2. **Biodata ingestion.** Users upload the PDF or image biodata families already circulate.
   Claude extracts every field into our schema, flags what it could not read, and drafts
   the profile for the user to confirm. Cuts signup from 40 minutes to 5.

3. **Image-forensics explainer.** Vendor detectors return scores. Claude turns them into
   plain-language advice for the uploader ("this photo carries a Content Credential from a
   Pixel 9, verified; this one has been through a beauty filter, we'll label it") and
   decides the routing: pass, re-shoot, or human review. Claude never looks at faces to
   identify anyone; it reasons over the vendor's numbers and the image's non-biometric
   properties.

4. **Conversation safety.** With both parties' consent at signup, Claude scans messages
   for known scam scripts (NRI groom needing money, customs fees, investment tips, urgent
   medical emergencies), pressure to move off-platform in the first exchanges, and
   harassment. It produces a warning to the recipient and a case file for the trust team.
   It is disclosed as AI. It never infers emotion.

5. **Document verification assistant.** For decrees, certificates and payslips Claude
   extracts fields, checks internal consistency (seal, dates, court name format), and
   prepares the human reviewer's checklist. The human decides.

6. **Compatibility report** (see `feature-spec.md`). Claude writes the report from
   structured questionnaire answers and stated preferences. Caste, religion and ethnicity
   are never model inputs; they are user filters applied before matching.

7. **Trust-team copilot.** Appeals, reviewer summaries, pattern reports across the fraud
   graph ("14 accounts this week share a bio paragraph and a payment card").

8. **Grievance handling.** The IT Rules require a 7-day grievance resolution. Claude triages,
   drafts responses and tracks the legal clock.

## What we deliberately do not do

- No face search across the open web (PimEyes-style). Reverse image search is limited to
  exact and near-exact match engines.
- No scoring of people who have not joined the platform.
- No inference of caste, religion, ethnicity, health or sexuality from photos or text.
- No AI-written bios presented as the user's own words. AI drafts are labelled, in line with
  the 2026 IT Rules on synthetic content and with what users say they want.
- No storing of raw ID images or selfie videos beyond the vendor's processing window.

## Human review capacity

Assume 3 to 5% of signups hit human review after the automated layers. One reviewer handles
about 150 cases per day with Claude-prepared checklists. At 10,000 signups a month that is
under one full-time reviewer.

## Open items to confirm before build

- Legal basis for third-party EPFO UAN lookups (no official EPFO API policy found).
- National Academic Depository onboarding terms and pricing.
- Whether DigiLocker's Passport Verification Record is exposed via the Requester API.
- Which state will sponsor our Aadhaar authentication application once we have traction.

## Scope update, 2026-10-09 (reflected on the marketing site first)

The landing site in `site/` was rebranded to **Saath** and its positioning changed. The
sections above still describe the India-first matrimony plan; the following supersedes them
where they differ and needs to be folded into the tables and the application draft:

- **Two intents, one gate.** The product serves both matrimony and dating. The user chooses
  at signup; the questionnaire, profile fields and the AI compatibility report differ by
  intent. Photo, live-person and identity checks are identical for both.
- **Photo authenticity is the headline USP, not government ID.** Tier 0 on the site is now
  "Real photos": our own detection models score every upload for AI generation, face-swap
  and deepfake artefacts, heavy retouching and reshaping, plus perceptual-hash dedupe,
  reverse-image search and a Content Credential read. Generated and swapped faces are
  rejected; heavily edited photos are labelled and discouraged. The old Tier 0/1/2 become
  Tiers 1 (real person) and 2 (real identity).
- **Generic identity rails.** Public copy says "passport, national ID or driving licence";
  Aadhaar, DigiLocker, EPFO and NAD are regional implementations, not the pitch.
- **Vendor-neutral wording in public.** The site says "AI" and "our detection models" and
  never names Claude or Anthropic. This document and the application draft may still name
  Claude; the Usage Policy constraints in "What we deliberately do not do" are unchanged.
- **Global evidence.** The site's problem statistics now cite the FTC, FBI IC3, City of
  London Police, GASA and a Sumsub-commissioned UK survey (all linked in
  `site/src/components/Problem.astro`).
