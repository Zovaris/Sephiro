# @zovaris/sephiro

Composable UI primitives for desktop apps. Small, themeable React components with semantic tokens. No global reset. Works with React and Preact.

## Install

```bash
bun add @zovaris/sephiro
```

```tsx
import { Button, Field, Input, Select, Toggle } from "@zovaris/sephiro";
import "@zovaris/sephiro/styles.css";
```

`styles.css` is the complete, backwards-compatible bundle. It contains the
Sephiro theme tokens and every component rule, but no reset, global Tailwind
layer, or universal selector.

Tailwind 4 consumers can also keep the two concerns explicit:

```tsx
import "@zovaris/sephiro/themes.css";
import "@zovaris/sephiro/components.css";
```

Import only `components.css` when the host defines the `--sph-*` token contract
itself. The published CSS is already compiled; consumers do not need to add
Sephiro to Tailwind's source scan.

## Themed usage

```tsx
<main data-sephiro-theme="asterism">
  <Button variant="primary">Open workspace</Button>
</main>
```

Available presets: `dark`, `light`, `asterism`, `fizza`, and `soffy`. The legacy `default` value remains an alias for `dark`. Multiple themes can coexist on one page through `data-sephiro-theme` on any ancestor. Dark and light share Sephiro's restrained green/neutral palette. Soffy is light by default and follows `data-theme="dark"` from its own element or an ancestor.

## Sizing

One control size contract: `sm` (32px), `md` (36px, default), `lg` (40px).

## Docs

Full documentation, component catalog, and theming guide: [zovaris/sephiro](https://github.com/zovaris/sephiro).

MIT License.
