#!/bin/bash
# Pravi deploy/bundle.tgz: izgrađen sajt bez slika (slike su već u public/) + bundlovan worker.
# Koristi se za postavljanje bez Node okruženja (npr. preko Cloudflare API-ja).
set -e
cd "$(dirname "$0")/.."
npm run build >/dev/null
npx esbuild worker/index.ts --bundle --format=esm --target=es2022 --outfile=.bundle/worker.js --log-level=warning
rm -rf .bundle/site && mkdir -p .bundle/site
(cd dist && find . -type f ! -name '*.jpg' ! -name '*.webp' ! -name '*.png' ! -name '_headers' | tar cf - -T - | tar xf - -C ../.bundle/site)
tar czf deploy/bundle.tgz -C .bundle .
rm -rf .bundle
ls -la deploy/bundle.tgz
