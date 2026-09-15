# Sephiro

Reusable, restrained UI primitives for desktop apps built with React or Preact.

## First release

- `Button`
- `Input`
- `Select`
- `Toggle`
- CSS tokens with dark and light themes

Application-specific shells, Tauri window controls, charts, and page skeletons intentionally stay outside this package.

## Install locally

```json
{
  "dependencies": {
    "@sephiro/ui": "file:../Sephiro"
  }
}
```

```tsx
import { Button, Input, Select, Toggle } from "@sephiro/ui";
import "@sephiro/ui/styles.css";
```

Override any `--sph-*` custom property at the application root to brand an app. Add `data-sephiro-theme="light"` to a parent element to enable the bundled light theme.

Interactive controls use one size contract: `sm` (32px), `md` (36px, default), and `lg` (40px). The Input and Select use a deliberately subtle 0.5px outlined treatment by default; their focus state remains visible for keyboard users.

## Tailwind CSS v4

Sephiro compiles its component classes with Tailwind v4 `@apply`. Its published stylesheet is self-contained: consumers only need to import `@sephiro/ui/styles.css` and do not need Tailwind in their application.

The build imports Tailwind's theme and utilities layers but deliberately omits Preflight, so installing Sephiro never resets a Tauri or web application's existing styles. The `sph-*` CSS variables remain the stable customization surface.

## Preact

Sephiro uses the React-compatible component contract. In Preact projects, alias React to `preact/compat` in Vite:

```ts
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

export default defineConfig({
  plugins: [preact()],
  resolve: {
    alias: {
      react: "preact/compat",
      "react-dom": "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react/jsx-runtime": "preact/jsx-runtime",
    },
  },
});
```

## Development

```bash
bun install
bun run check
bun run build
```

The package is private while its API settles. Remove `private: true` only when naming, licensing, and publishing are decided.
