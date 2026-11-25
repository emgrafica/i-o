# Customer assets to review

These came from customer projects. Working-title names are already gone (see `NAMING.md`); the items below are the **customer's own** names, logos, photography and endpoints, which you're reviewing yourself. Nothing here has been removed yet.

## Mentions by part

| Part | "DXC" | GE / GE Capital | ServiceNow tenant URLs |
|---|---|---|---|
| `apps/portal` | 284 | 15 | 1 |
| `apps/catalog` | 0 | 238 | 0 |
| `apps/hub` | 59 | 0 | 2 |
| `packages/design-system-classic` | 27 | 2 | 0 |
| `packages/design-system` | 129 | 0 | 1 |

Find them with `grep -rniE 'dxc|gecapital|\bGE\b|service-now.com' apps packages`.

## Logo files

- `apps/hub/src/assets/icons/dxc-icon.gif`
- `apps/hub/public/logo_dxc_logo.png`
- `apps/portal/src/assets/images/homePage/HomeDxcBlur.jpg`
- `apps/portal/src/assets/images/homePage/HomeDxc.jpg`
- `apps/portal/src/assets/images/branding/logo_dxc_logo_horizontal.png`
- `apps/portal/src/assets/images/branding/DXC Logo_White RGB.png`
- `apps/portal/src/assets/images/branding/DXC Logo_Purple+Black RGB.png`
- `apps/portal/src/assets/images/getSupport/dxcImage-white.png`
- `apps/portal/src/assets/images/getSupport/dxcImage.png`
- `packages/design-system/src/assets/images/logo_dxc_logo_horizontal.png`
- `packages/design-system/src/assets/images/dxcbrand.png`
- `packages/design-system/src/assets/icons/dxc-blacklogo.svg`
- `packages/design-system/src/component/dxcGear/dxcGear.scss`
- `packages/design-system/src/component/dxcGear/dxcGear.stories.js`
- `packages/design-system/src/component/dxcGear/dxcGear.js`
- `packages/design-system-classic/src/assets/images/logo_dxc_logo_horizontal.png`
- `packages/design-system-classic/src/assets/icons/dxc-icon.gif`
- `packages/design-system-classic/src/assets/icons/dxc-blacklogo.svg`
- `packages/design-system-classic/src/assets/icons/dxc-logo.svg`

## Customer photography (large files)

- `apps/portal/src/assets/images/homePage/BottomBackgroundXS.png`
- `apps/portal/src/assets/images/homePage/HomeDxcBlur.jpg`
- `apps/portal/src/assets/images/homePage/BottomBackgroundM.png`
- `apps/portal/src/assets/images/homePage/HomeHero.jpg`
- `apps/portal/src/assets/images/homePage/TechnologyBackgorundLG.png`
- `apps/portal/src/assets/images/homePage/TechnologyBackgorundM.png`
- `apps/portal/src/assets/images/homePage/blueM.png`
- `apps/portal/src/assets/images/homePage/HomeDxc.jpg`
- `apps/portal/src/assets/images/homePage/TechnologyBackgorundXL.png`
- `apps/portal/src/assets/images/homePage/TechnologyBackgorundXS.png`
- `apps/portal/src/assets/images/homePage/BottomBackgroundXL.png`
- `apps/portal/src/assets/images/homePage/blueXL.png`
- `apps/portal/src/assets/images/homePage/BottomBackgroundL.png`
- `apps/portal/src/assets/images/homePage/blueSM.png`
- `apps/portal/src/assets/images/comingSoon/group1.png`
- `apps/portal/src/assets/images/comingSoon/group2_ultra_wide.png`
- `apps/portal/src/assets/images/comingSoon/group2.png`
- `apps/portal/src/assets/images/comingSoon/teams.png`
- `apps/portal/src/assets/images/comingSoon/group3.png`
- `apps/portal/src/assets/images/comingSoon/group3_ultra_wide.png`
- `apps/portal/src/assets/images/comingSoon/box.png`
- `apps/portal/src/assets/images/comingSoon/group1_ultra_wide.png`
- `apps/portal/src/assets/images/pageNotFound/404Boxes.jpg`
- `apps/portal/src/assets/images/errorBoundary/chairsWat.png`

## Components

- `packages/design-system/src/component/dxcGear/`: customer product promotion card. Remove it, or turn it into a generic "Featured service" card.

## Endpoints and content to replace in phase 2

- ServiceNow tenant links (`csc.service-now.com`) and knowledge-article sys_ids in mock data
- Carrier tracking links (FedEx, DHL) and Dell product images in mock data: fine as sample data, but replace before any public demo
- `public/ie.html` in portal and catalog: a saved copy of the old customer site's "unsupported browser" page
- Design-system details: see `packages/design-system/docs/CUSTOMER_ASSETS.md`
