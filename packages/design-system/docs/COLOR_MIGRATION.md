# Colour migration: purple brand → monochrome

**Decision (2026-11-23, Michael Dempsey):** the former brand purple becomes **#000000**. The rest of the purple family moves to a neutral grey ramp so hierarchy, hover and selected states still read. Status colours (green, orange, red, blue) are unchanged.

| Original | Role in the source | New |
|---|---|---|
| `#5F249F` | `$color-purple-main`, the brand purple (33 uses) | `#000000` |
| `#4B30B5` | `$main` | `#000000` |
| `#330072`, `#3E037D` | `$color-purple-tone` (pressed) | `#000000` |
| `#3726B0` | `$bg-header` | `#000000` |
| `#512593`, `#5821AC` | Inline dark purples | `#1A1A1A` |
| `#7229C0` | `$color-purple-light-1` (hover/secondary, 12 uses) | `#333333` |
| `#BE68D5` | `$bg-header-gradient` | `#333333` |
| `#9D50C0` | `$color-purple-plum` | `#4D4D4D` |
| `#977DFF` | `$color-purple-light-2` (illustrations) | `#666666` |
| `#E5DEEF` | `$color-purple-light-3` | `#E5E5E5` |
| `#E9E0F7` | `$color-purple-tint` | `#EBEBEB` |
| `#F6F3FC` | `$color-purple-light-4` | `#F5F5F5` |
| `#F5F5FF` | `$color-gray-container` (purple-tinted) | `#F5F5F5` |
| `#FAFAFF` | `$color-white-tone` (purple-tinted) | `#FAFAFA` |
| `rgb(95, 36, 159)` | Inline | `rgb(0, 0, 0)` |
| `rgba(36, 14, 47, 0.06)` | Purple-tinted card shadow (11 uses) | `rgba(0, 0, 0, 0.06)` |

191 replacements in 49 files (SCSS, JS, SVG). The per-file counts are in `.recolor-log.json`.

**Compatibility:** the `$color-purple-*` SCSS variable names are kept as aliases so components compile unchanged. New code should use `$color-brand`, `$color-brand-hover`, `$color-brand-tint` and so on (end of `src/styles/scss/variable.scss`) or the `--io-color-brand-*` CSS variables.

**Guard:** `npm run check:brand` fails if any retired purple value reappears.

**Things to check by eye once Storybook runs:**
- Anything that was purple text on the dark `$body-bg-color` (`#1D2028`) is now black on near-black. Switch those to `color.neutral.white`.
- The header gradient (`#000000` → `#333333`) is now subtle; consider a flat black header.
- Illustrations (SVG icons) that used `#977DFF` / `#E5DEEF` are now grey and may look flat.
