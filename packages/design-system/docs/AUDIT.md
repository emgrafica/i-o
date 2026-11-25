# Audit and modernisation record: i-o design system

**Source:** the 2021 component-library Storybook (working title retired), 940 commits, last commit 2021-11-11. Rebuilt as a fresh repository with no history carried over.

## Findings

| Area | Finding | Action |
|---|---|---|
| Toolchain | CRA 4, Storybook 6.2, node-sass 4: none install on Node 20+ | Moved to Vite 6, Storybook 8.6 and Dart Sass |
| Library build | Rollup 2 + Babel with a UMD output named "Example" | Vite library mode (ESM + CJS) |
| Dependencies | `@lumos/core` (private registry, unused); `styled-components` (unused) | Removed |
| Duplicated tokens | `src/assets/styles/scss/variable.scss` is an older, unused copy of `src/styles/scss/variable.scss` with different values | Kept for reference; **`src/styles/scss/variable.scss` is canonical**. Delete the copy after review. |
| Token bug | `$color-red` is declared twice (`#d81e5b`, then `#EF233C`); the second wins | Both kept in tokens: `danger` and `danger-alt` |
| Brand | Purple palette | Monochrome (see `COLOR_MIGRATION.md`) |
| Customer assets | Customer component, logos and Figma links | Listed in `CUSTOMER_ASSETS.md` for your review |
| Missing images | 3 references to files not in the repo | Placeholders added in `public/` |
| Secrets | None found | n/a |
| Package identity | Working-title package name, customer author and repository URL | `@i-o/design-system` |

## Not yet verified

This was written without network access to npm, so `npm install && npm run storybook` on your Mac is the first real build. Expect small fixes such as a dependency pin or a story that used a CRA-only feature.
