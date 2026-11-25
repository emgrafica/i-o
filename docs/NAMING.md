# Naming: retired working titles → i-o

The imported projects used three working titles. They're retired, and every reference was replaced on import (2026-11-25). The product is **i-o** (i-o systems, https://i-o.systems).

| Kind | Before (pattern) | After | Example |
|---|---|---|---|
| Package names | three working-title npm scopes, plus the earlier `@emgrafica/…-design-system` | `@i-o/design-system`, `@i-o/design-system-classic`, `@i-o/portal`, `@i-o/catalog`, `@i-o/hub` | n/a |
| Component and identifier prefixes | `<Title>Card`, `<Title>Dialog`, `<Title>.menu`, `Logo<Title>` | `Io…` | `IoCard`, `IoDialog`, `Io.menu.tsx`, `LogoIo` |
| Display text, including translations (12 languages) | the product names | `i-o` | "Welcome to i-o" |
| CSS classes, keys, routes, file names | lower-case titles | `io` | `.io-link-card`, `logo-io.svg` |
| Design tokens | `--up-*` | `--io-*` | `--io-color-brand-default` |
| Customer URLs that contained a title | `[stage.]<title>.<customer>.com`, two image CDNs | `[stage.]i-o.systems`, `cdn.i-o.systems`, `assets.i-o.systems` | Placeholders; they don't resolve yet |
| Figma links | `figma.com/file/<id>/<customer>-<title>-…` | `figma.com/file/<id>` | The file ID still opens the original file |

**Kept on purpose:** `myTechnologyAssets` and related GraphQL types. This is an API field meaning "my technology assets", not a product name.

**About 1,700 replacements** in total across code, text, translations and file names. `scripts/check-names.sh` (run with `npm run check:names`) fails if any title comes back.
