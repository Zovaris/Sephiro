<h1 align="center">Sephiro</h1>

<p align="center">
  <strong>Composable UI primitives for desktop apps.</strong>
</p>

<p align="center">
  Small, themeable React components with semantic tokens.<br />
  No global reset. No design-system lock-in.<br />
  Works with React and Preact.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@sephiro/ui">npm</a>
  ·
  <a href="https://github.com/sthlabs/Sephiro/releases">Releases</a>
  ·
  <a href="#get-it">Install</a>
</p>

---

Sephiro is a lightweight UI monorepo for desktop applications. The package provides composable primitives, semantic tokens, and scoped themes without installing a global reset. Importing the stylesheet does not touch your app's base styles, so it sits cleanly inside Tauri, Electron, or web shells.

Component styles compile with Tailwind CSS v4 `@apply`, deliberately omitting Preflight. The playground is a working Preact catalog with interactive states and theme previews.

---

## What it actually gives you

**Primitives, not pages**  
Atoms, molecules, and organisms with typed props: buttons, fields, selects, menus, dialogs, toasts, tabs, toolbars, tables, and more. Every component owns its `index.tsx`, `style.css`, and colocated test.

**No global reset**  
The stylesheet only defines component classes and token variables. Your host app keeps its own base styles.

**Semantic tokens and scoped themes**  
Components consume `var(--sph-*)` tokens, never hard-coded colors. Themes apply through `data-sephiro-theme` on any ancestor, so multiple themes can coexist on one page. Ships with `default`, `light`, `asterism`, and `soffy` presets; custom presets are a CSS block away.

**One control size contract**  
`sm` (32px), `md` (36px, default), `lg` (40px) across controls. One scale to learn.

**React-first, Preact-compatible**  
React is an optional peer dependency (`>=18`). The playground runs everything on Preact through the usual compat aliases, proving the components carry no React-only assumptions.

---

## Built for

- Desktop shells (Tauri, Electron) that need product UI without a reset
- Small teams that want themed primitives instead of a full framework
- Apps serving React or Preact from one component contract

---

## Get it

```bash
bun add @sephiro/ui
```

```tsx
import { Button, Field, Input, Select, Toggle } from "@sephiro/ui";
import "@sephiro/ui/styles.css";
```

| | |
|---|---|
| **Package** | [@sephiro/ui on npm](https://www.npmjs.com/package/@sephiro/ui) |
| **Tarballs** | [GitHub Releases](https://github.com/sthlabs/Sephiro/releases) |
| **From source** | `bun install`, then `bun run dev` |

Themed usage:

```tsx
<main data-sephiro-theme="asterism">
  <Button variant="primary">Open workspace</Button>
</main>
```

---

## Components

**Atoms**  
`Badge` · `Button` · `Checkbox` · `IconButton` · `Input` · `Separator` · `Skeleton` · `Spinner` · `Surface` · `Textarea` · `Toggle`

**Molecules**  
`Alert` (+ `Notice`) · `Card` · `Dialog` · `Field` · `FieldMessage` · `Menu` · `Popover` · `RadioGroup` · `Select` · `Tabs` · `Toast` (+ `ToastViewport`, `toast()`) · `Toolbar` · `Tooltip`

**Organisms**  
`EmptyState` · `Table`

---

## Themes

| Preset | Use |
|---|---|
| `default` | Dark, high-contrast baseline. Fallback when no theme attribute is present. |
| `light` | Neutral light surfaces for everyday product work. |
| `asterism` | Indigo product surfaces for focused, spatial tools. |
| `soffy` | Warm surfaces for friendlier product contexts. |

Custom presets scope to `data-sephiro-theme` and define the `--sph-*` tokens. See [`packages/ui/THEMING.md`](./packages/ui/THEMING.md).

---

## Architecture

- `packages/ui`: `@sephiro/ui` — the publishable component package. Source organized by composition level (`atoms`, `molecules`, `organisms`).
- `apps/playground`: `@sephiro/playground` — visual catalog and theme preview (Preact + Vite).
- Tokens live in `packages/ui/src/styles.css`; the playground's theme selector is only a preview consumer.

| Command | Does |
|---|---|
| `bun run dev` | Playground with watcher |
| `bun run check` | Typecheck UI + playground |
| `bun run test` | UI tests |
| `bun run build` | Build UI + playground |
| `bun run release <patch\|minor\|major\|x.y.z>` | Bump versions, commit, tag, push |

Pushing a `v*` tag runs the release workflow: verify, check, test, build, publish to npm, and attach the tarball to the GitHub Release.

---

<p align="center">
  <sub>MIT License</sub>
</p>
