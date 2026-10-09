# Who gets into Claude for Startups: evidence from X and the web (2026-10-08)

Method: x.com direct fetches were blocked (HTTP 402), so posts were recovered through
search-engine snippets and the public fxtwitter JSON endpoint, which also returns the
account's verification status and follower count. LinkedIn, Hacker News, Reddit and Product
Hunt were searched too. All acceptance claims below are self-reported by the founders.

## Program history that matters

- **May 2026 to 5 Oct 2026 (old rules):** credits required "equity funding from an
  institutional investor", company founded within 4 years, no prior Anthropic credits.
  Unfunded founders could join the community but got no credits. Three independent pages
  quoted that wording (klymentiev.com, explainx.ai, worthview.com).
- **6 Oct 2026 (expanded rules):** the institutional-funding gate was removed. CNBC reports
  "thousands of participating companies" already. Anthropic's Head of Startups, Beth
  Robertson, and Head of Startup Marketing, Sarah Wolf, framed the redesign around
  "tokens, time with the team, support and connection".
- The official terms (last updated 2025-05-22) list the evaluation factors as
  **"business traction, investment and funding, Claude integration and usage"**, and say
  Anthropic may reject without giving reasons. Awardees may be asked to sign an affidavit
  and publicity release within 14 days. Anthropic may use the company name and logo.
- A program addendum (reported by Startup Fortune, not fetched directly) says Anthropic
  may use "information, ideas, know-how, and techniques of a general nature" and may
  "independently develop similar or competitive technology". Standard for such programs,
  but note it before sharing anything you consider a trade secret in office hours.

## Founders who reported acceptance after the 6 Oct expansion

| Handle (X unless noted) | Verified | Company and product | Stage | Benefit reported | Time to decision |
|---|---|---|---|---|---|
| @AdityaShipsHQ | Yes | NudgeBell, escalating reminders with an MCP connector for coding agents | No registered company, no funding, zero sales | 1 yr Team + $1K credits | under 3 min |
| @tejas3732 | Yes, 16K followers | Solo founder, SaaS portfolio (PartnershipIntel, DirectoryIdeas.ai) | Bootstrapped | Team (2 seats) + $1K | about 1 min |
| @cursorvers | Yes | Cursorvers Inc., medical AI governance, Japan | Founder-led | 1 yr Team + credits | not stated |
| @erhanmeydan | Yes, 22K followers | YouTuber, applied with "a project I wanted to build" | Pre-product | 12 mo Team, $1K, office hours | immediate |
| @adriamatz | Yes, 13K followers | Bootstrapped iOS apps, Barcelona | Bootstrapped, no VC | Team, credits, rate limits, Stack | about 5 min |
| @janwhyy | Yes, 11K followers | SKIPD, a skincare brand at waitlist stage | Pre-launch consumer, non-tech | Team for 12 months | about 2 min |
| @Tarun_Davuluri | No | Not stated | Not stated | $1K, office hours, Stack but no Team offer shown | not stated |
| Aryan Patel (LinkedIn) | n/a | VelocityFly AI, India, first paid sub at 299 rupees | Bootstrapped, pre-expansion era (Dec 2025) | Accepted; benefit not stated | n/a |

Post links are in the Sources section. No acceptance posts were found on Hacker News,
Reddit, Product Hunt or IndieHackers.

## Rejections and friction

- One anonymous reply under @adriamatz's post: "Took me 5 minutes to be rejected LOL". No reason given.
- @AdityaShipsHQ, second-hand: "agencies and studios that just use Claude as a tool seem to get declined".
- Several approved founders saw different Team seat counts (2 vs 5) or no Team offer at all,
  and one reported an error claiming Team. Looks like rollout bugs or the "new to Team" exclusion.
- Gmail or a non-matching email domain is the most-cited reason for landing in manual review.
- @borrhensaidi warned founders about the addendum clause on Anthropic developing similar technology.

## What the pattern says about our application (inference)

1. **Sector is not a filter.** A skincare brand, an iOS indie, a medical-AI consultancy and a
   devtool were all approved within minutes. A consumer matrimony platform is no harder.
2. **Stage is not a filter.** An unincorporated project with zero sales was approved. We do
   not need to wait for a product, revenue or a team.
3. **The one visible rejection pattern is "uses Claude as a tool" versus "builds on Claude".**
   The application must describe product features that call the Claude API, not internal
   productivity use. Our fraud-reasoning pipeline, compatibility reports and biodata
   extraction are exactly that.
4. **Automated screening dominates.** Decisions in 1 to 5 minutes imply a rules-plus-model
   classifier reading the description and checking the email domain. Write the description
   for a reader with 30 seconds: product, user, what Claude does, why Claude specifically.
5. **Company-domain email is the practical gate.** Buy the domain and put up a landing page
   before applying. Applying from Gmail is the most common path into manual review.
6. **Expect the base package, not the $100K.** The VC uplift needs a partner VC. Anthropic
   publishes no partner list; the only confirmed mechanism is Menlo's Anthology Fund.
   Reports of $500K credits for YC companies are uncorroborated.

## Stacking with other programs (figures from official pages where fetchable)

| Program | Base, no VC | With partner VC | Pays for Claude? |
|---|---|---|---|
| Claude for Startups | $1K API + 1 yr Team + Stack offers | up to $100K via partner VC | Yes, first-party API only |
| AWS Activate | $1K, select up to $5K | up to $200K via Activate Provider | Yes, Claude on Bedrock |
| Google for Startups Cloud | $2K Start tier (founded under 24 months, MVP) | up to $350K AI tier, needs institutional funding | No, Claude on Vertex is excluded |
| Microsoft for Startups | $1K + $4K after verification | up to $150K with referral | No, Anthropic models excluded |
| OpenAI for Startups | no self-serve credits | via partner VCs, amount undisclosed | No |

Anthropic credits and AWS Activate are complementary: Anthropic credits cannot be spent on
Bedrock, and Activate credits can. Apply to both.

## Sources

Official: https://claude.com/programs/startups ·
https://claude.com/resources/articles/were-expanding-the-claude-startups-program-to-help-founders-build ·
https://platform.claude.com/offers/startups-application ·
https://claude.com/contact-sales/vc-partner ·
https://www.anthropic.com/startup-program-official-terms ·
https://www.anthropic.com/legal/credit-terms ·
https://x.com/claudeai/status/2107513494493179954 ·
https://x.com/sarahzorah/status/2107519092383166891 ·
https://menlovc.com/anthology-fund

Press: https://techcrunch.com/2026/10/06/anthropic-gives-startups-a-free-year-of-enterprise-service-and-1000-in-token-credits/ ·
https://www.cnbc.com/2026/10/06/anthropic-claude-startups-program.html ·
https://www.inc.com/aaron-mok/anthropic-is-offering-more-than-50000-in-claude-perks-for-entrepreneurs-heres-how-to-get-them/91415278 ·
https://startupfortune.com/anthropic-startup-program-credits-founders-accept-it-may-build-something-similar/ ·
https://www.worthview.com/anthropic-opens-claude-startups-to-bootstrapped-founders-what-indias-builders-get/

Founder posts: https://x.com/AdityaShipsHQ/status/2107796573552062478 ·
https://x.com/tejas3732/status/2107742472084537724 ·
https://x.com/cursorvers/status/2107809048934703474 ·
https://x.com/erhanmeydan/status/2107539979379601608 ·
https://x.com/adriamatz/status/2107713444862423073 ·
https://x.com/janwhyy/status/2107799906098495519 ·
https://x.com/borrhensaidi/status/2107763587053666600 ·
https://www.linkedin.com/in/aryan-patel-97396524b/

Other programs: https://aws.amazon.com/startups/credits ·
https://www.microsoft.com/en-us/startups ·
https://creditforstartups.com/companies/openai ·
https://klymentiev.com/blog/free-google-cloud-credits
