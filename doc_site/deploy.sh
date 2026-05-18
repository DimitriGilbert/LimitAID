#!/usr/bin/env bash
set -euo pipefail

echo "Building LimitAID docs..."
pnpm run build

echo "Deploying to GitHub Pages..."
npx gh-pages -d .output/public --nojekyll

echo "Deploy complete!"
