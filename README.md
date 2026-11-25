# i-o systems

**https://i-o.systems** · Owner: emgrafica (Michael Dempsey) · Licence: proprietary, all rights reserved

i-o is an integrated workplace product: one experience over the systems of record a workplace already runs (IT service management, assets and devices, catalog and procurement, knowledge, identity). This monorepo holds its design system and the first workplace apps, rebuilt from earlier projects whose working titles have been retired.

## Layout

| Path | Package | What it is | State |
|---|---|---|---|
| `packages/design-system` | `@i-o/design-system` | 63 React components (tickets, devices, knowledge, software, outages), DTCG tokens (`--io-*`), Storybook 8, Figma token export | **Rebuilt** (Vite, Storybook 8). Run it now. |
| `packages/design-system-classic` | `@i-o/design-system-classic` | The earlier component library used by `apps/hub` (18 stories) | Imported; modernised in phase 3 |
| `apps/portal` | `@i-o/portal` | Workplace self-service portal: home, get support, orders and incidents, devices (refresh, return, lost or stolen, broken), technology, search, preferences. React + TypeScript, 12 languages | Imported; runs on mock data in phase 2 |
| `apps/catalog` | `@i-o/catalog` | Catalog, item pages, checkout, confirmation and approvals (GraphQL), plus the portal pages it shared. 12 languages | Imported; phase 3 |
| `apps/hub` | `@i-o/hub` | Marketplace, my devices, knowledge articles, support history and ticket details. React + Redux | Imported; phase 3 |

Only `packages/design-system` is in the npm workspace for now, so `npm install` at the root works. The apps join the workspace as each one is modernised.

## Run the design system

```bash
npm install
npm run storybook          # http://localhost:6006
npm run build:design-system
```

## Guards

```bash
npm run check:names        # fails if a retired working-title name comes back
npm run check:brand        # fails if the retired purple palette comes back
```

## Docs

| | |
|---|---|
| [`docs/ROADMAP.md`](docs/ROADMAP.md) | Phases: what's done, what's next |
| [`docs/INVENTORY.md`](docs/INVENTORY.md) | Where each part came from, size, stack, and what changed on import |
| [`docs/DESIGN_ARCHIVE.md`](docs/DESIGN_ARCHIVE.md) | Screens, flows and shared design language across the apps |
| [`docs/NAMING.md`](docs/NAMING.md) | How the retired names were replaced (rules and counts) |
| [`docs/CUSTOMER_ASSETS.md`](docs/CUSTOMER_ASSETS.md) | Customer logos, photography, URLs and text to review |
| [`packages/design-system/design/design.md`](packages/design-system/design/design.md) | Design system: principles, tokens, components, Figma mapping |
