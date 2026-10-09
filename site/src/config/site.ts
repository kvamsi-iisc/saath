/**
 * Single place for everything that is still a placeholder.
 * Brand: "Saath" (Hindi/Urdu: together, alongside).
 * Swap `domain` and `waitlistEndpoint` when the real ones exist.
 */
export const SITE = {
  name: 'Saath',
  wordmark: 'saath',
  tagline: 'Real people. Real photos. Real beginnings.',
  domain: 'example.com',
  description:
    'Saath is a trust-first platform for matrimony and dating. Our own detection models screen every photo for AI generation, deepfakes, heavy editing and stolen images before a profile exists; AI then checks the story for credibility and matches people on what actually matters.',
  // Form endpoint for the waitlist (Formspree, Tally, Basin, a Cloudflare Worker, ...).
  // Leave empty to run the form in "local demo" mode (shows success without sending).
  waitlistEndpoint: '',
  contactEmail: 'hello@example.com',
  social: {
    x: '',
    linkedin: '',
  },
} as const;

export const NAV = [
  { href: '#problem', label: 'Why' },
  { href: '#trust', label: 'Verification' },
  { href: '#ai', label: 'How AI helps' },
  { href: '#compat', label: 'Compatibility' },
  { href: '#principles', label: 'Principles' },
] as const;
