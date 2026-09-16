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
  <a href="https://www.npmjs.com/package/@zovaris/sephiro">npm</a>
  ·
  <a href="https://github.com/zovaris/sephiro/releases">Releases</a>
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
Components consume `var(--sph-*)` tokens, never hard-coded colors. Themes apply through `data-sephiro-theme` on any ancestor, so multiple themes can coexist on one page. Ships with `dark`, `light`, `asterism`, `fizza`, and `soffy` presets; custom presets are a CSS block away.

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
bun add @zovaris/sephiro
```

```tsx
import { Button, Field, Input, Select, Toggle } from "@zovaris/sephiro";
import "@zovaris/sephiro/styles.css";
```

| | |
|---|---|
| **Package** | [@zovaris/sephiro on npm](https://www.npmjs.com/package/@zovaris/sephiro) |
| **Tarballs** | [GitHub Releases](https://github.com/zovaris/sephiro/releases) |
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
`Badge` · `Button` · `Checkbox` · `IconButton` · `Input` · `Separator` · `Skeleton` · `Slider` · `Spinner` · `Surface` · `Textarea` · `Toggle`

**Molecules**  
`Alert` (+ `Notice`) · `Card` · `Dialog` · `Field` · `FieldMessage` · `Menu` · `Popover` · `RadioGroup` · `Select` · `Tabs` · `Toast` (+ `ToastViewport`, `toast()`) · `Toolbar` · `Tooltip`

**Organisms**  
`EmptyState` · `Table`

---

## Themes

| Preset | Use |
|---|---|
| `dark` | Sephiro's neutral dark preset and the fallback when no theme attribute is present. |
| `light` | Warm neutral light surfaces for everyday product work. |
| `asterism` | Asterism's charcoal surfaces and signature red accent. |
| `fizza` | Fizza's black surfaces and electric-violet accent. |
| `soffy` | A provisional warm preset while Soffy's identity is in development. |

The legacy `default` value remains an alias for `dark`.

Custom presets scope to `data-sephiro-theme` and define the `--sph-*` tokens. See [`packages/ui/THEMING.md`](./packages/ui/THEMING.md).

---

## Architecture

- `packages/ui`: `@zovaris/sephiro` — the publishable component package. Source organized by composition level (`atoms`, `molecules`, `organisms`).
- `apps/playground`: `@zovaris/playground` — visual catalog and theme preview (Preact + Vite).
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
