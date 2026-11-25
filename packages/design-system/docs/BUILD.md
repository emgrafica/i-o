# Build and run: i-o design system

## Requirements

- Node.js 20.11 or later (https://nodejs.org, LTS)

## Storybook

```bash
npm install
npm run storybook           # dev server on :6006
npm run build-storybook     # static site → storybook-static/ (host anywhere)
```

## Library build

```bash
npm run build               # dist/io.js (ESM), dist/io.cjs, dist/style.css
```

React, React DOM and every runtime dependency are left external, so consuming apps provide them.

## What changed in the toolchain

| Was (2021) | Now |
|---|---|
| Create React App 4 + `@storybook/preset-create-react-app` | Vite 6 + `@storybook/react-vite` 8 |
| Storybook 6.2 | Storybook 8.6 (`main.js`/`preview.js` rewritten) |
| `storybook-addon-designs` 6 | `@storybook/addon-designs` 8 (same `parameters.design` API) |
| `node-sass` 4 (native, doesn't build on current Node) | `sass` (Dart Sass) |
| Rollup 2 + Babel library build | Vite library mode |
| `npm-install-peers` in scripts | Removed (React is a devDependency for Storybook) |
| React 16.13 | React 17.0.2 (the highest version Material UI v4 supports) |

## Upgrade path (next steps, optional)

1. **Material UI v4 → MUI v6** (unlocks React 18/19): run `npx @mui/codemod@latest v5.0.0/preset-safe src`, then replace `makeStyles`/`withStyles` (10 uses) with `styled()` or `sx`.
2. **SCSS `@import` → `@use`**: run `npx sass-migrator module --migrate-deps src/**/*.scss`. Deprecation warnings are silenced in `vite.config.js` until then.
3. **moment → date-fns or Temporal** to cut bundle size.
