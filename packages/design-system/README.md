# i-o design system

The **master design system** of the emgrafica portfolio: 60+ React components for workplace and IT-support portals (tickets, devices, knowledge base, software, outages), with design tokens, Storybook and a Figma token export.

**Owner:** emgrafica · **Brand:** monochrome (brand = `#000000`) · **Licence:** proprietary, all rights reserved

```bash
npm install
npm run storybook      # http://localhost:6006
npm run build          # library build → dist/
npm run tokens         # design/tokens.json → design/tokens.css
npm run check:brand    # fails if the retired purple palette reappears
```

## Docs

| | |
|---|---|
| [`design/design.md`](design/design.md) | Principles, colour, type, space, component inventory, Figma mapping |
| [`design/tokens.json`](design/tokens.json) | Design tokens (W3C DTCG), importable into Figma (Tokens Studio) |
| [`docs/BUILD.md`](docs/BUILD.md) | Build, Storybook, publishing, upgrade path |
| [`docs/AUDIT.md`](docs/AUDIT.md) | What changed from the 2021 version |
| [`docs/COLOR_MIGRATION.md`](docs/COLOR_MIGRATION.md) | Purple → black colour mapping |
| [`docs/CUSTOMER_ASSETS.md`](docs/CUSTOMER_ASSETS.md) | Customer-specific components, logos and links to review |

## Using it

```js
import * as io from '@i-o/design-system';
import '@i-o/design-system/dist/style.css';
```

SCSS users can import `src/styles/scss/variable.scss` and use `$color-brand`, `$color-brand-hover` and the other aliases. Everyone else can use the `--io-*` CSS variables from `design/tokens.css`.
