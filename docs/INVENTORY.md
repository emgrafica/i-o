# Inventory

| Part | Came from (2021 source; the folder mapping is in the local archive's `INVENTORY.md`) | Original stack | Code files | Last commit | Notes on import |
|---|---|---|---|---|---|
| `packages/design-system` | the 2021 component-library Storybook, rebuilt on 2026-11-23 | Storybook 6, CRA, node-sass → **Vite 6, Storybook 8.6, Dart Sass** | 63 stories | 2021-11-11 (source) | Brand purple → black; tokens `--up-*` → `--io-*`; package `@i-o/design-system` |
| `packages/design-system-classic` | the earlier component-library Storybook | Storybook 6, CRA | 54 | 2021-08-05 | Package `@i-o/design-system-classic` |
| `apps/portal` | `portal-web` | React 16, TypeScript 3.8, private CRA fork, styled-components, MUI v4, Okta + MSAL, Azure APIM, i18next | 407 | 2021-11-12 (1,371 commits) | Newest portal; includes mock data |
| `apps/catalog` | portal v3 (GraphQL edition) | React 16, TypeScript, Apollo GraphQL 2, MSAL, i18next | 689 | 2021-07-26 | Catalog / checkout / approvals |
| `apps/hub` | the JavaScript/Redux portal | React 16 (JS), Redux + saga, Okta, MSAL, Microsoft Graph, Ant Design + Bootstrap | ~220 | 2021-07-20 (2,101 commits) | The repo's nested Storybook copy was left out (duplicate of `design-system-classic`) |

## Left out on import

| Item | Where | Why |
|---|---|---|
| `.env` | hub | Live-looking Azure API subscription keys, Okta client ID, Azure app ID, Application Insights key |
| `npmrc…` token file | catalog | npm registry auth token |
| `azure-pipelines.yml`, `credscan-exclusion.json`, `Dockerfile`, `nginx.conf` | all | Customer CI/CD and hosting; new ones come with phase 2 |
| `package-lock.json` | apps, classic | Pinned to a private registry and private packages |
| `libs/…chat-widget-1.0.0 … 1.1.2.tgz` (9 files) | portal | Superseded copies; `1.1.3` (the version in use) is kept |
| `node_modules`, `build`, `.git` | all | Generated / history (fresh history) |

**Rotate or revoke** any keys from those `.env` files that may still be live. They're still in the original folders and their old git history.

## Missing in the sources

| Referenced file | Where | Action |
|---|---|---|
| `assets/images/branding/io_logo.png` (was a product logo) | portal, catalog | Placeholder i-o wordmark added |
| `./… Portal_files/*` (vms.js, gtm.js, bc.vm) | `public/ie.html` in portal and catalog | A saved copy of an old "unsupported browser" page; its assets were never committed. Replace the page in phase 2. |
| Device photos on the old image CDN (`cdn.i-o.systems`, `assets.i-o.systems` placeholders) | hub, design system mock data | Placeholders in phase 2 mock data |
