# Roadmap

The order follows [`VISION.md`](VISION.md): build the organism's core (one API over connected systems), then make the surfaces its clients, then add the intelligence layer that lets people use it in their own words.

## Phase 1: monorepo and import ✓ (2026-11-25)

- `emgrafica/i-o` monorepo; `@i-o/design-system` rebuilt (Vite 6, Storybook 8.6, monochrome tokens `--io-*`).
- First surfaces imported: `apps/portal`, `apps/catalog`, `apps/hub`, plus `packages/design-system-classic`.
- Retired working-title names removed (`NAMING.md`, `npm run check:names`). Secrets, customer CI and private-registry lockfiles left out.

## Phase 2: the i-o API contract and the portal as its first client ✓ v0.1 (2026-11-25)

Done: `@i-o/api` (contract + HTTP client), `@i-o/connector-mock` (Oakline sample organisation), `@i-o/ui` (React 18 components on the tokens), and a **new** `apps/portal` built from scratch (the 2021 portal depended on a private third-party UI library, so it stays in `reference/` as the design reference). Still to do: an OpenAPI document for the contract, the remaining 10 languages, and accessibility and visual QA.

Plan as written:


1. **`packages/api`**: the i-o domain model and contract (TypeScript types + OpenAPI): **people, assets, requests (orders and incidents), knowledge, catalog, places, events**. It's vendor-neutral: no ITSM-, identity- or cloud-specific shapes leak through.
2. **`packages/connectors/mock`**: the first connector. It implements the contract with realistic sample data (built from the portal's existing mock data, with customer names removed), so every surface runs offline.
3. **`apps/portal` on Vite 6 + React 18 + TypeScript 5**, talking only to the i-o API client. The old Azure API Management, Okta / Azure AD and GraphQL calls are removed.
4. Components move onto `@i-o/design-system`; the 12 languages are kept.
5. Root workspace: `npm run dev -w @i-o/portal`.

## Phase 3: more surfaces on the same API

- `apps/catalog`: catalog, checkout and approvals as API clients (requests + catalog domains). Apollo GraphQL is removed.
- `apps/hub`: marketplace, devices, knowledge and tickets as API clients; the Redux app is moved to Vite.
- `design-system-classic` folded into `@i-o/design-system`, then retired.
- A shared **shell** (navigation, sign-in, search) so the three apps read as one product.

## Phase 4: the intelligence layer

- **`packages/intelligence`**: natural-language intent → plan → actions over the i-o API, with policies (what may run unattended), **human approval** for consequential actions, and a full **audit trail**.
- Design-system components for it: conversation, agent activity and plan, approval request, action receipt, audit timeline.
- A **conversation surface** in the shell: "my laptop is broken", "order a monitor for Ana", "why is the Dublin office network slow?"

## Phase 5: real connectors and sensing

- Connectors for the common systems of record: ITSM (e.g. ServiceNow, Jira Service Management), identity (Entra ID, Okta), HR, asset and procurement, knowledge.
- An **events** stream (device telemetry, IoT, building and network signals) that the intelligence layer watches, so the organism notices and acts as well as answers.
- Per-customer tenancy, theming through tokens, and policy configuration.

## Phase 6: beyond the workplace

The same core for government, education and industry: new connector packs and surfaces on the same API, intelligence and design language.
