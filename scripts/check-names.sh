#!/usr/bin/env bash
# Fails if a retired working-title name comes back into the repo.
# ("myTechnology…" is a GraphQL field meaning "my technology assets", not the brand, so it's allowed.)
set -euo pipefail
cd "$(dirname "$0")/.."
PATTERN='u[p]time|h[e]lix|m[y]tech'
hits=$(grep -rniIE "$PATTERN" . --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=dist --exclude-dir=build --exclude-dir=storybook-static | grep -viE 'mytechnolog' || true)
files=$(find . \( -name node_modules -o -name .git \) -prune -o -print | grep -iE "$PATTERN" || true)
if [ -n "$hits$files" ]; then
  echo "$hits"; echo "$files"
  echo "✗ Retired working-title names found (see above). Use i-o." >&2
  exit 1
fi
echo "✓ No retired working-title names."
