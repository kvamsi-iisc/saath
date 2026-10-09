# Trust and verification technology, and the law around it (researched 2026-10-08)

Legend: **[V]** verified against a primary or reputable secondary source. **[S]** secondary,
vendor or SEO source, directional only. **[I]** inference.

## 1. AI-generated and manipulated photo detection

### What the market actually looks like
- Match Group had Reality Defender audit a representative sample of Tinder and Hinge photos
  (Feb 2025). **99.4% showed no concerning AI manipulation.** Of the manipulated ones,
  **over 88% were real users using face-tune and filters**, not malicious deepfakes. [V]
- **[I] Implication:** the day-one problem is heavy editing and stolen photos, not deepfakes.
  A "heavily edited" policy and a stolen-photo pipeline matter more than deepfake policing.
  Deepfake detection still belongs in the stack because it is cheap and is the marketing story.

### Vendors
| Vendor | Pricing | Notes |
|---|---|---|
| Hive Moderation | ~$6 per 1,000 images [V] | Only vendor with published per-unit pricing. Claims under 0.01% false positives, unaudited. Caught 73% of heavily manipulated images in a 45-image test. [S] |
| Reality Defender | Free tier 50 scans; ~$399/mo for 1,000; enterprise custom [S] | Used by Match Group. Public API since 2025. |
| Sensity AI | Quote only | Claims 98% on public datasets, no published limits. [S] |
| Google SynthID Detector | Free, ~10 checks/day/account, opened 2026-10-06 [S] | Reads watermarks from Google, OpenAI, Nvidia, Kakao. A negative is inconclusive. |
| C2PA Content Credentials | Free standard | Pixel, Samsung, Sony, Nikon, Canon, OpenAI images carry it. Stripped by screenshots and most re-uploads. Proves provenance when present, never absence. [S] |

### Accuracy limits that must shape the product
- Academic benchmark of 12 open detectors on smartphone photos: none exceeded AUC 0.624 on
  modern generators. Refit for modern content they flag **17% to 91% of real photos**. [S]
- Five-detector test: real photos mislabelled as AI 13.3% of the time on average. [S]
- SynthID detection on GPT-Image-2 output swung 0% to 100% day to day in one preprint. [S]
- **[I] Rule: never auto-reject on a single detector verdict.** Detectors are a routing
  signal into a mandatory live video selfie and, if still doubtful, human review.

## 2. Liveness, selfie-to-ID, and India KYC rails

### Global identity-verification vendors [S unless noted]
| Vendor | Price hint | Used by |
|---|---|---|
| Veriff | from ~$0.80 per verification, no minimum | Bumble's optional government-ID check in 11 countries incl. India since Mar 2025 [V] |
| Sumsub | ~$1.35 to 1.85, $149/mo minimum | |
| Persona | free up to ~500/mo, then ~$1 to 3 | LinkedIn outside India and North America [V] |
| Onfido, Jumio | quote only, ~$2 to 5, annual contracts | |
| FaceTec | enterprise | Tinder Face Check liveness |

### India vendors [S]
HyperVerge (face match and liveness on low-end phones; powers LinkedIn India's Aadhaar and
DigiLocker verification), Signzy (no-code KYC incl. video KYC), IDfy (KYC plus background
verification), Digio (Aadhaar eSign and KYC since 2016), Perfios, and API aggregators
Surepass, Setu, Sandbox, Decentro.

Per-call hints from 2026 lending guides, conflicting between sources: Aadhaar offline XML
3 to 8 rupees, face match plus liveness 3 to 10 rupees, PAN 2 to 5 rupees, bundled KYC
completion 25 to 80 rupees.

### Aadhaar: what a private matrimony company may legally do
- The Supreme Court struck down section 57 of the Aadhaar Act in 2018, barring private-company
  authentication. [V]
- The **Aadhaar Authentication for Good Governance Amendment Rules, 2025** (notified
  2025-01-31) let private entities apply, via a ministry, then MeitY, then UIDAI review, for
  voluntary Aadhaar authentication for "good governance, ease of living, innovation". [V]
- **Direct precedent: Tamil Nadu notified Matrimony.com on 2026-08-28** (gazette 2026-09-16)
  to offer voluntary Yes/No and eKYC authentication and show a "verified user" indicator.
  Conditions: consent, alternatives offered (driving licence, passport, PAN), and **no service
  may be denied for refusing to authenticate**. Stated purpose: "enhance trust, prevent
  impersonation, curb matrimony-related fraud". Shaadi.com and Jeevansathi policies do not
  mention Aadhaar authentication. [V, Medianama]
- **[I] Our route:** the incumbent has just validated the regulatory path for our USP. Budget
  6 to 12 months and a state sponsor for live authentication. Until then use **Aadhaar
  offline paperless eKYC (XML or QR via DigiLocker)**, which does not touch the central
  database and is what most lenders use. Never store Aadhaar numbers; mask and tokenise.

### DigiLocker, PAN, passport
- **DigiLocker Requester API** (via API Setu) pulls a user's issued documents with consent:
  Aadhaar, PAN, driving licence, degrees. [V]
- **Passport Verification Record** became a DigiLocker document in Dec 2025. Whether the
  Requester API exposes it is unconfirmed. [V for existence, gap flagged]
- **PAN**: online verification is run by Protean for authorised entities, with onward-sharing
  limits. Aggregators (Setu, Sandbox, Surepass) wrap it with consent flags. [V]
- **Passport for NRIs**: no public Passport Seva API. Practical route is document capture,
  MRZ and NFC chip read (Persona, Veriff and Sumsub support e-passport NFC) plus liveness. [V/S]

## 3. Employment, income, education, marital status, criminal checks

| Check | India route | Limits |
|---|---|---|
| Employment | EPFO UAN lookup via aggregators (Surepass, Bureau, Protean) after OTP consent: employer, joining and exit dates [S] | No coverage of self-employed, gig or informal workers. No official EPFO third-party API policy found; confirm legal basis before launch |
| Income | Account Aggregator framework (bank statements, ITR, consent-based), payslip and Form 16 OCR via Perfios or HyperVerge [S] | PF wage base is not gross pay. No Indian equivalent of The Work Number [V by absence] |
| Education | National Academic Depository on DigiLocker explicitly lists employers and overseas verifiers; access via API Setu with student consent [V] | Pricing and onboarding not public. Fallback: AuthBridge, SpringVerify, IDfy manual university checks |
| Marital status | No national database; registration is a state subject. Decree or certificate upload, human-checked. RTI to the Registrar is a documented route [V/S] | Concealment supports bigamy and cheating charges under BNS 82 and 318 |
| Criminal, India | Consent-based court-record search: AuthBridge (claims 20 crore records), SpringVerify, IDfy, eCourtsIndia LegalCheck (private, launched Sep 2026) [V/S] | Name-collision false matches are the main risk. Police CCTNS access for private firms is contested |
| Criminal, US | Platform may not pull reports on a match (FCRA permissible purpose). Model is user-initiated: Match's Garbo partnership, Checkr Personal [V] | Design as "bring your own certificate" |
| Criminal, UK | Basic DBS, 21.50 pounds, applicant-held, shareable by code [V] | England and Wales only |
| Criminal, Canada | RCMP certified check with fingerprints, third-party consent form [V] | |

**LinkedIn's model is the benchmark users know:** India verification uses Aadhaar via
DigiLocker plus HyperVerge selfie match, and LinkedIn never receives the Aadhaar number.
The badge verifies identity and work email, not job title. [V]

## 4. Stolen-photo and cross-profile fraud tooling
- **Reverse image search**: TinEye API (~$200/yr, exact match), Bing Visual Search. Weak
  against crops, mirrors and filters. Google Lens has no official public API. [S]
- **PimEyes**: face search with documented stalking harms and a Polish regulator fine.
  **Do not use.** Indefensible under DPDP and GDPR for a matrimony product. [V/I]
- **Perceptual hashing** (pHash, Hamming distance under 5) catches re-uploads and light edits
  across our own user base. Vulnerable to adversarial perturbation. [V/S]
- **Fraud graph signals**: device intelligence (Fingerprint, SEON, IPQS detect emulators, GPS
  spoofing, ID resets), phone intelligence (Telesign PhoneID risk score, SIM-swap and porting
  checks, Prove), email age and disposable detection (IPQS, SEON). [V vendor docs]
- Tinder stores a "non-reversible encrypted face map" to block duplicate accounts. [V, TechCrunch]

## 5. What dating apps shipped in 2025 and 2026 (the bar users now expect)

| App | Feature | Status and reported effect |
|---|---|---|
| Tinder | Face Check: video selfie liveness plus likeness to profile photos (FaceTec) | Mandatory for new users in US, **India (Oct 2025)**, Canada, Australia, UK; extended to existing US and UK users Sep 2026. Company-reported: over 60% drop in exposure to bad actors, over 40% fewer bad-actor reports [V, company figures] |
| Tinder | Chemistry: questionnaire plus optional camera-roll analysis, few daily picks | US and Canada Mar 2026; privacy pushback; ~$14M revenue headwind projected [V] |
| Bumble | Photo Verification (random pose selfie) | Mandatory in US, optional elsewhere [V] |
| Bumble | Deception Detector (ML spam and scam blocker) | Blocked 95% of spam accounts in test, reports down 45% in 2 months, company figures [V] |
| Bumble | Bee, an AI matchmaker replacing browsing | 2026, mixed reviews [S] |
| Hinge | Selfie Verification badge; Hidden Words keyword filter; Prompt Feedback (coaches, does not write); Convo Starters | Hinge payers up 15% to 2M, revenue up 28% in Q1 2026 [V] |
| Muzz | Mandatory selfie verification since 2016, optional ID layer, **opt-in chaperone in chats**, voice and video | Member counts 10 to 19M, inconsistent [S] |
| Match Group overall | Payers down 6% YoY to 13.3M in Q2 2026, revenue per payer up 6% to $21.13 | Stock fell ~10% on guidance [V, 8-K] |

**Reception of AI in dating (app-commissioned surveys, [S]):** 83% of US daters are put off by
AI-crafted profiles, 32% call it a dealbreaker. 62% of Gen Z and 70% of millennials dislike
AI-written early messages. 88% uncomfortable with AI-generated photos (Hinge-cited).
**[I] Pattern: AI that screens, verifies and coaches is tolerated. AI that writes a person's
identity (bio, photos, messages) is penalised.** Market as "AI verifies, humans write" and
label any AI-assisted content.

## 6. Legal and regulatory constraints

### India: DPDP Act 2023 and DPDP Rules 2025 [V, rule tracker]
- Rules notified 2025-11-13. Consent Manager registration from 2026-11-14. Notice, security,
  breach, retention, parental consent and cross-border rules take effect **2027-05-14**.
  MeitY floated compressing to Nov 2026; not notified.
- Child means under 18. Verifiable parental consent needs DigiLocker-style tokens, not a
  checkbox. An 18-plus gate removes most of this exposure.
- Erase data when the purpose is served. Cross-border transfer is allowed unless restricted.
- Significant Data Fiduciaries need an India-resident DPO, annual DPIA and audit, and
  algorithm due diligence.
- Penalties up to 250 crore rupees (security) and 200 crore (children). [S]
- **[I] For us:** granular consent per verification type, a published retention schedule for
  ID images and selfie videos (Tinder's "delete video shortly, keep an irreversible vector"
  is a good template), data-processing agreements with every vendor.

### India: IT Rules 2021 as amended 2026-02-10, effective 2026-02-20 [V, Medianama]
- Synthetically generated information must carry a prominent label and, where feasible,
  permanent provenance metadata. Intermediaries must not let users strip labels.
- Platforms with over 50 lakh users must collect user declarations on synthetic content and
  deploy tools to verify them.
- Takedown on court or government order shortened to 3 hours; non-consensual intimate
  imagery 2 hours. Grievance resolution 7 days. A Grievance Officer remains mandatory.
- **[I] For us:** every AI-assisted bio or photo edit gets a visible label. This aligns the
  product with the law and with what users say they want.

### Aadhaar and RBI
Aadhaar authentication only via the 2025 Rules route above. RBI KYC directions do not
apply unless we become a regulated entity. [V/I]

### EU and UK, for NRI users [V via law-firm summaries]
- A photo is not biometric data; an extracted face template is special-category data.
  Explicit consent is effectively the only lawful basis. DPIA required. Transfers to India
  need standard contractual clauses.
- Dating apps are user-to-user services under the UK Online Safety Act. Ofcom and ICO
  issued a joint statement on "highly effective" age assurance in March 2026.
- **[I] For us:** offer a non-biometric fallback (document plus human review) and template
  deletion on request for EU and UK users.

## Sources
Detection: https://mtch.com/news/1022-2/ · https://thehive.ai/models/hive/ai-generated-and-deepfake-content-detection · https://www.insightface.ai/blog/september-2026-deepfake-detection-papers · https://arxiv.org/pdf/2510.16556 · https://contentauthenticity.org/blog/the-state-of-content-authenticity-in-2026 · https://www.engadget.com/2279565/google-synth-id-detector-ai-detection-website-is-now-available/ · https://arxiv.org/pdf/2607.05434 · https://www.prnewswire.com/news-releases/reality-defender-launches-public-api-and-free-tier-to-bring-enterprise-grade-deepfake-detection-to-every-developer-302517503.html

KYC and Aadhaar: https://www.legal500.com/intelligence/india/privacy/aadhaar-authentication-for-private-entities-navigating-the-2025-amendment · https://www.livelaw.in/top-stories/centre-allows-private-entities-to-use-aadhaar-for-authentication-notifies-aadhaar-amendment-rules-282714 · https://www.medianama.com/2026/09/223-tamil-nadu-matrimony-aadhaar-user-verification/ · https://www.pib.gov.in/PressReleasePage.aspx?PRID=2198743&reg=3&lang=1 · https://tinpan.proteantech.in/downloads/online-pan-verification/Terms%20and%20conditions.pdf · https://docs.setu.co/data/pan/quickstart · https://roopya.money/kyc-api-and-fraud-check-apis-for-indian-lenders/ · https://support.bumble.com/hc/en-us/articles/28949738572829-Verifying-your-photos

Background checks: https://surepass.io/uan-verification-api/ · https://nad.digilocker.gov.in/Verifier · https://www.linkedin.com/help/linkedin/answer/a1458457 · https://blogs.ecourtsindia.com/2026/09/14/legalcheck-launch-india-legal-background-check/ · https://authbridge.com/employee-background-verification-screening/ · https://checkr.com/resources/articles/dating-background-checks · https://techcrunch.com/2022/07/13/match-expands-tinders-free-background-checks-to-two-more-dating-apps/ · https://www.apply-basic-criminal-record-check.service.gov.uk/terms-and-conditions?lang=en · https://rcmp.ca/en/criminal-records/criminal-record-checks

Fraud tooling: https://gangw.cs.illinois.edu/PHashing.pdf · https://www.business-humanrights.org/en/latest-news/controversial-facial-recognition-technology-pimeyes-continues-to-raise-privacy-concerns-incl-company-comments/ · https://www.telesign.com/products/intelligence · https://docs.seon.io/integration/device-intelligence · https://fingerprint.com/products/fingerprint-pro/

Dating apps: https://www.tinderpressroom.com/2025-10-22-Tinder-to-Expand-Facial-Verification-Feature-Across-the-U-S-,-Setting-a-New-Standard-for-Dating-Safety · https://www.business-standard.com/companies/news/tinder-face-check-selfie-verification-india-ai-fake-profiles-safety-125100801167_1.html · https://onlinepersonalswatch.com/2026/09/tinder-expands-face-checks-to-existing-users/ · https://support.bumble.com/hc/en-us/articles/32668070996509-Deception-Detector · https://techcrunch.com/2025/01/15/hinge-new-ai-feature-determines-if-your-prompt-response-is-too-basic/ · https://techcrunch.com/2026/02/04/tinder-looks-to-ai-to-help-fight-swipe-fatigue-and-dating-app-burnout/ · https://www.sec.gov/Archives/edgar/data/0000891103/000089110326000128/mtch8-k20260804ex992.htm · https://www.pymnts.com/news/artificial-intelligence/2026/bumble-replaces-the-swipe-with-an-ai-matchmaker/ · https://en.wikipedia.org/wiki/Muzz_(dating_app) · https://www.fastcompany.com/91437403/ai-dating-chat-bot-survey · https://www.bloomberg.com/news/articles/2025-07-14/gen-z-s-skeptical-of-ai-in-dating-apps-like-tinder-and-hinge-survey-finds

Law: https://dpdpa.dcomply.in/rules/ · https://www.consently.in/blog/dpdp-rules-2025-implementation-timeline-india · https://www.medianama.com/2026/02/223-meity-amendments-it-rules-synthetic-media-deepfakes/ · https://www.hlc.com/en/publications/india-introduces-mandatory-labelling-for-ai-and-3hour-takedown-for-illegal-content · https://www.ropesgray.com/en/insights/viewpoints/102j5cq/ico-publishes-biometric-data-guidance · https://www.insideglobaltech.com/2026/03/27/ofcom-and-ico-issue-joint-statement-on-age-assurance/

Unresolved gaps: official EPFO third-party API policy; NAD and API Setu pricing; whether
DigiLocker's Passport Verification Record is exposed to the Requester API; final DPDP
penalty schedule text.
