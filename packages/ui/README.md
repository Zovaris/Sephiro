# @sthlabs/sephiro-ui

Composable UI primitives for desktop apps. Small, themeable React components with semantic tokens. No global reset. Works with React and Preact.

## Install

```bash
bun add @sthlabs/sephiro-ui
```

```tsx
import { Button, Field, Input, Select, Toggle } from "@sthlabs/sephiro-ui";
import "@sthlabs/sephiro-ui/styles.css";
```

The stylesheet only defines component classes and token variables — it does not reset your app's base styles.

## Themed usage

```tsx
<main data-sephiro-theme="asterism">
  <Button variant="primary">Open workspace</Button>
</main>
```

Available presets: `default` (dark baseline), `light`, `asterism`, `soffy`. Multiple themes can coexist on one page through `data-sephiro-theme` on any ancestor.

## Sizing

One control size contract: `sm` (32px), `md` (36px, default), `lg` (40px).

## Docs

Full documentation, component catalog, and theming guide: [sthlabs/Sephiro](https://github.com/sthlabs/Sephiro).

MIT License.
