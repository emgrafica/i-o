#!/usr/bin/env bash
# Fails if the retired DXC purple palette reappears in source.
set -euo pipefail
cd "$(dirname "$0")/.."
if grep -rniE '#(5f249f|4b30b5|330072|3e037d|3726b0|512593|5821ac|7229c0|be68d5|9d50c0|977dff|e5deef|e9e0f7|f6f3fc|f5f5ff|fafaff)\b|95, ?36, ?159|36, ?14, ?47' src design .storybook --include=*.{js,jsx,scss,css,svg,json,mdx}; then
  echo "✗ Retired purple palette found (see above). Brand colour is #000000." >&2; exit 1
fi
echo "✓ Monochrome brand palette only."
