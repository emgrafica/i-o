# i-o design system

**Owner:** emgrafica (Michael Dempsey) · **Package:** `@i-o/design-system` · **Tokens:** [`tokens.json`](./tokens.json) (W3C DTCG) → [`tokens.css`](./tokens.css) (`--io-*`) · **Version:** 2.0.0

This is the **design system of i-o systems** (i-o.systems), the integrated workplace product built over systems of record. It's a component library for workplace and IT-support experiences: tickets, devices, knowledge base, software, outages and shortcuts, across desktop and mobile. The apps in this monorepo (`apps/portal`, `apps/catalog`, `apps/hub`) use it.

**2026 rebrand:** the original purple brand palette is now **monochrome**, and all earlier working-title names have been removed. Brand = `#000000`, and the purple tints became a neutral grey ramp. Feedback colours (green, orange, red, blue) are unchanged. See [`../docs/COLOR_MIGRATION.md`](../docs/COLOR_MIGRATION.md).

---

## 1. Principles

1. **Task first.** Every component answers "what's wrong, what's next?": status, a single primary action, then detail.
2. **Calm surfaces.** White cards on a near-white container (`neutral.container`), with 4px-based spacing and quiet 1px borders.
3. **One accent.** The brand colour (black) marks the primary action, the selected state and the active navigation, and nothing else. Semantic colour is reserved for status.
4. **Responsive type.** Two type scales (desktop at 960px and above, mobile below) share one set of names.

## 2. Colour

| Group | Token | Value | Use |
|---|---|---|---|
| Brand | `color.brand.default` | `#000000` | Primary buttons, links, active nav, focus |
| | `color.brand.strong` | `#000000` | Pressed and emphasis |
| | `color.brand.hover` | `#333333` | Hover, secondary icons |
| | `color.brand.plum` | `#4D4D4D` | Secondary accent |
| | `color.brand.muted` | `#666666` | Illustration accent |
| | `color.brand.tint` | `#EBEBEB` | Selected rows and chips |
| | `color.brand.subtle` | `#E5E5E5` | Borders on brand-tinted elements |
| | `color.brand.wash` | `#F5F5F5` | Section backgrounds |
| Neutral | `color.neutral.black` | `#1F2020` | Body text |
| | `color.neutral.gray-dark` | `#737373` | Secondary text |
| | `color.neutral.gray-medium` | `#CACACA` | Dividers, disabled |
| | `color.neutral.gray-light` | `#F0F0F0` | Input fills |
| | `color.neutral.container` | `#F5F5F5` | Page background |
| Feedback | `success` / `-tint` | `#62C370` / `#E0F3E2` | Resolved, online |
| | `warning` / `-tint` | `#F57803` / `#FFE5CD` | Expiring, degraded |
| | `danger` / `-tint` | `#EF233C` / `#FDDEE2` | Errors, outages, lost/stolen |
| | `info` / `info-strong` | `#197FE5` / `#07539F` | Informational |
| Surface | `surface.header` | `#000000` | Top navigation bar |
| | `surface.footer` | `#222823` | Footer |

**Accessibility:** black on white is 21:1 and white on black is 21:1. Check status colours on white before using them for text: `success` #62C370 is 2.3:1, so use it for icons and fills, never for body text.

## 3. Typography

Family: **Open Sans** (the `$font-gtwalsheim_pro_*` slots in the source all fall back to Open Sans; a licensed GT Walsheim Pro can be dropped in later).

| Style | Desktop size / line | Mobile size / line | Tracking |
|---|---|---|---|
| H1 | 64 / 68 | 40 / 44 | −0.5px |
| H2 | 40 / 46 | 32 / 36 | −0.5px |
| H3 | 32 / 40 | 26 / 30 | −0.5px |
| H4 | 24 / 28 | 20 / 24 | 0 |
| H5 | 20 / 22 | 20 / 24 | 0 |
| H6 | 16 / 20 | 16 / 20 | 0 |
| Eyebrow | 10 / 16 | 10 / 16 | 0.2px, uppercase |
| Body | 14 / 22 | 14 / 20 | 0 |
| Caption | 12 / 18 | 12 / 18 | 0 |
| Button / link | 14 / 20 | 14 / 20 | 0 |

## 4. Space and layout

- **Spacing scale** (`space.*`): 2 · 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80 px. The names keep the original `dls-sNN-N` numbering, e.g. `space.s03-0` = 16px.
- **Breakpoints:** `sm-1` 608 · `md-1` 768 · `md-2` 959 · `lg-1` 960 · `lg-2` 1023 · `xlg` 1024 · `xxlg` 1440. The type scale switches at 960.
- **Elevation:** a single soft shadow, `0 2px 8px rgba(0,0,0,0.06)`, on cards. Dialogs use Material UI defaults.

## 5. Component inventory (63 stories)

| Family | Components |
|---|---|
| **Inputs** | Button, Search, Select, MultipleSelect, AutoComplete, RadioGroup, SelectTree, DateTimePicker, Upload, Attachment |
| **Cards** | GeneralCard, DeviceCard, PcCard, DeliveryCard, ContactCard, SupportCard, SupportArticle, RelatedArticle, AnnouncementsCard, OutageCard, OpenIssuesCard, SingleIssuesCard, MyOpenCard, AcknowledgeCard, RefreshStatusCard, SecretKeyExpiringCard, SecretKeyExpiredCard, UserInfoCard |
| **Tickets** | TicketRequest, TicketRequestMini, TicketDetail, Timeline, Comment, Comments, EditComment, Reopen, Resolved |
| **Devices** | Device, Devices, MyDevicesDetail, UnlistedDevices, ConfirmDevice, DetailLostAndStolen, PcAddress |
| **Knowledge** | KbDetail, KbFlagHelpful, Accordion, AccordionDetails |
| **Software** | YourSoftware, Shortcut |
| **Feedback and overlays** | GeneralDialog, AcknowledgeDialog, DeleteCommentDialog, DeleteAttachmentModal, Overlay, LoadingWithBackdrop, PilotMode |
| **Navigation and chrome** | TopNav, Footer, EyeBrow, RotateFloatButton |
| **Customer-specific (to review)** | DxcGear: see [`../docs/CUSTOMER_ASSETS.md`](../docs/CUSTOMER_ASSETS.md) |

Built on **Material UI v4** (`makeStyles` / `withStyles` in 10 places) plus SCSS modules that import `src/styles/scss/variable.scss` and `mixin.scss`.

## 6. Figma

Import `design/tokens.json` with **Tokens Studio** (or any DTCG-to-Variables importer):

| Token group | Figma collection | Modes |
|---|---|---|
| `color.*` | i-o / Color | Light |
| `font.size.*`, `font.lineHeight.*` | i-o / Type | Desktop, Mobile (the two sub-groups become modes) |
| `space.*`, `breakpoint.*` | i-o / Dimension | Default |

Suggested pages in the browsing file: **Cover → Foundations → Inputs → Cards → Tickets → Devices → Knowledge → Overlays → Navigation → Themes → Assets.** Some stories link to the original Figma production files through `parameters.design`; those links are listed in `CUSTOMER_ASSETS.md`.

## 7. Theming other projects

Each sibling project gets its own `tokens.<theme>.json` that overrides only `color.*` (and, if needed, `font.family`). Component code reads `--io-*` variables and SCSS `$color-brand*` aliases, so a theme is a token swap, not a fork.
