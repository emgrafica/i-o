# i-o systems

**Intelligent Operations Systems** · https://i-o.systems · Owner: emgrafica (Michael Dempsey) · Licence: proprietary, all rights reserved

i-o unifies technical systems and human systems (software, hardware, people and organisations) into one hybrid, evolving, intelligent system: a **cybernetic organism**. Generative AI now handles both the technical complexity and the natural language people use, so i-o can connect worlds that were never integrated before, in the workplace and beyond. Read the full [vision](docs/VISION.md).

This monorepo holds the i-o design system and the first **surfaces** (portal, catalog, hub), which are being rebuilt as clients of one i-o API over connected systems. See the [roadmap](docs/ROADMAP.md).

## Layout

| Path | Package | What it is | State |
|---|---|---|---|
| `packages/api` | `@i-o/api` | **The i-o API contract**: one vendor-neutral model of an organisation (people, places, assets, requests, knowledge, catalog, events, search) plus the HTTP client | v0.1 |
| `packages/connector-mock` | `@i-o/connector-mock` | Connector over the fictional **Oakline** sample organisation; runs in the browser | v0.1, 15 smoke checks |
| `packages/ui` | `@i-o/ui` | React 18 building blocks on the `--io-*` tokens | v0.1 |
| `packages/design-system` | `@i-o/design-system` | Design tokens (DTCG, Figma export) and the 63-component React 17 library with Storybook 8 | Rebuilt |
| `apps/portal` | `@i-o/portal` | **The first surface**: home, get help, requests and approvals, my technology, catalog, knowledge, search. English and German | v0.1 |
| `packages/design-system-classic` | n/a | Earlier component library; folded into the design system in phase 3 | Not built |
| `reference/` | n/a | The 2021 portal, catalog and hub, kept as design reference only | Not built |

## Run it

```bash
npm install
npm run dev                # portal on http://localhost:5173, sample organisation
npm test                   # connector smoke checks
npm run storybook          # design system on http://localhost:6006
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
