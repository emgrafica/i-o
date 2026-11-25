# i-o systems

**Intelligent Operations Systems** · https://i-o.systems · Owner: emgrafica (Michael Dempsey) · Licence: proprietary, all rights reserved

i-o unifies technical systems and human systems (software, hardware, people and organisations) into one hybrid, evolving, intelligent system: a **cybernetic organism**. Generative AI now handles both the technical complexity and the natural language people use, so i-o can connect worlds that were never integrated before, in the workplace and beyond. Read the full [vision](docs/VISION.md).

This monorepo holds the i-o design system and the first **surfaces** (portal, catalog, hub), which are being rebuilt as clients of one i-o API over connected systems. See the [roadmap](docs/ROADMAP.md).

## Layout

| Path | Package | What it is | State |
|---|---|---|---|
| `packages/design-system` | `@i-o/design-system` | 63 React components (tickets, devices, knowledge, software, outages), DTCG tokens (`--io-*`), Storybook 8, Figma token export | **Rebuilt** (Vite, Storybook 8). Run it now. |
| `packages/design-system-classic` | `@i-o/design-system-classic` | The earlier component library used by `apps/hub` (18 stories) | Imported; modernised in phase 3 |
| `apps/portal` | `@i-o/portal` | Workplace self-service portal: home, get support, orders and incidents, devices (refresh, return, lost or stolen, broken), technology, search, preferences. React + TypeScript, 12 languages | Imported; first client of the i-o API in phase 2 |
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
| [`docs/VISION.md`](docs/VISION.md) | What i-o is, why now, product principles, architecture |
| [`docs/ROADMAP.md`](docs/ROADMAP.md) | Phases: API contract → surfaces → intelligence → connectors |
| [`docs/INVENTORY.md`](docs/INVENTORY.md) | Where each part came from, size, stack, and what changed on import |
| [`docs/DESIGN_ARCHIVE.md`](docs/DESIGN_ARCHIVE.md) | Screens, flows and shared design language across the apps |
| [`docs/NAMING.md`](docs/NAMING.md) | How the retired names were replaced (rules and counts) |
| [`docs/CUSTOMER_ASSETS.md`](docs/CUSTOMER_ASSETS.md) | Customer logos, photography, URLs and text to review |
| [`packages/design-system/design/design.md`](packages/design-system/design/design.md) | Design system: principles, tokens, components, Figma mapping |
