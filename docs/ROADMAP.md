# Roadmap

## Phase 1: monorepo and import ✓ (2026-11-25)

- `emgrafica/i-o` monorepo with npm workspaces.
- `@i-o/design-system`: the rebuilt design system (Vite 6, Storybook 8.6, monochrome tokens), renamed with tokens `--io-*`.
- Four earlier projects imported as `apps/portal`, `apps/catalog`, `apps/hub` and `packages/design-system-classic`. Fresh git history.
- Retired working-title names removed from code, text, translations, file names, package names and URLs (see `NAMING.md`). `npm run check:names` guards it.
- Left out on import: `.env` files (live Azure API subscription keys, Okta and Azure app IDs, an Application Insights key), an npm auth-token file, CI pipelines (`azure-pipelines.yml`), Dockerfiles, credential-scanner configs, lockfiles that pointed at private registries, and 9 superseded copies of a vendored chat widget.
- Old logos replaced with neutral i-o placeholders.

## Phase 2: `apps/portal` running in the browser

1. Swap the private Create React App fork for **Vite 6 + React 18** (TypeScript 5).
2. Replace the backends that are gone (Azure API Management, Okta / Azure AD sign-in, GraphQL gateway, ServiceNow chat) with a **mock service layer**, using the mock data already in `src/mockData` and `src/services/mockdata`, so every screen works offline.
3. Move components onto `@i-o/design-system`; keep `styled-components`; move Material UI v4 to MUI v6 where the portal uses it directly.
4. Keep the 11 languages (i18next).
5. Add `apps/portal` to the workspace: `npm run dev -w @i-o/portal`.

## Phase 3: `apps/catalog`, `apps/hub`, `design-system-classic`

- `catalog`: same toolchain as the portal. Apollo Client 2 moves to Apollo Client 3 against a mock GraphQL schema built from `src/gqlTypes`.
- `hub`: Redux + saga app. Move to Vite; replace the Okta and Microsoft Graph calls with the same mock layer.
- `design-system-classic`: fold its 18 components into `@i-o/design-system` (most already have newer versions there), then retire it.

## Phase 4: one product

- A shared shell (navigation, sign-in, search) with portal, catalog and hub as modules.
- A connector layer for systems of record (ITSM, asset management, procurement, identity, knowledge) behind one i-o API.
- Theming per customer through tokens (`@i-o/design-system` → Figma Variables).
