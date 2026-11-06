import { defineConfig } from 'astro/config';

// Statički sajt; forma za upit radi preko Cloudflare Pages Functions (/functions).
export default defineConfig({
  site: 'https://lumikids.rs',
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
