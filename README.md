# Sephiro

Sephiro is a lightweight UI monorepo for desktop applications built with React or Preact. The package is intentionally small: it provides composable primitives, semantic tokens, and scoped themes without installing a global reset.

## Workspace

```text
packages/ui       @sephiro/ui — publishable component package
apps/playground   @sephiro/playground — visual catalog and theme preview
```

The UI source is organized by composition level. Every component owns an `index.tsx`, `style.css`, and colocated test:

- `atoms`: `Button`, `Input`, `Textarea`, `Checkbox`, `Toggle`, `Badge`, `Spinner`, `Skeleton`
- `molecules`: `Field`, `FieldMessage`, `Select`

The existing `Button`, `Input`, `Select`, and `Toggle` APIs remain available from the package root. New props such as `Button.loading` and `Input.invalid` are additive.

## Run locally

```bash
bun install
bun run dev
```

The playground opens a catalog with interactive states and three scoped themes: `default`, `Asterism`, and `Soffy`. To build or validate everything:

```bash
bun run check
bun run test
bun run build
```

You can run the package and app separately with `bun run dev:ui`, `bun run dev:playground`, `bun run build:ui`, and `bun run build:playground`.

## Use the package

```tsx
import { Button, Field, Input, Select, Toggle } from "@sephiro/ui";
import "@sephiro/ui/styles.css";
```

Sephiro uses one control size contract: `sm` (32px), `md` (36px, default), and `lg` (40px). It compiles component classes with Tailwind CSS v4 `@apply`, but deliberately omits Preflight. Importing `@sephiro/ui/styles.css` therefore does not reset a Tauri or web application.

## Themes and tokens

Theme variables are scoped to a parent element, so multiple themes can coexist on a page:

```tsx
<div data-sephiro-theme="asterism">
  <Button variant="primary">Open workspace</Button>
</div>
```

Available scopes are `default`, `light`, `asterism`, and `soffy`. Override the semantic `--sph-*` custom properties on an application root to brand a surface. Motion uses `--sph-motion-fast`, `--sph-motion-normal`, and `--sph-motion-slow`, and automatically collapses under `prefers-reduced-motion: reduce`.

## Preact

The package exposes React-compatible contracts and can be consumed by Preact through the usual compatibility aliases. The playground is a working Preact example using Vite:

```ts
resolve: {
  alias: {
    react: "preact/compat",
    "react-dom": "preact/compat",
    "react/jsx-runtime": "preact/jsx-runtime",
  },
}
```

The package remains private while its API settles. Remove `private: true` only when naming, licensing, and publishing are decided.
