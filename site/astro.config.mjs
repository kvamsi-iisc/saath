// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Set this to the production domain before deploying (used for canonical + OG URLs).
  site: 'https://example.com',
  output: 'static',
  compressHTML: true,
  build: { inlineStylesheets: 'auto' },
  prefetch: false,
});
