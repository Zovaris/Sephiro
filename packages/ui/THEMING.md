# Sephiro themes

Sephiro themes are CSS custom-property presets. The UI package owns the token contract; host apps choose a preset by setting `data-sephiro-theme` on a root element.

## Use a built-in theme

Import the complete package stylesheet once, then put the theme attribute on the app shell or another ancestor of the components:

```tsx
import "@zovaris/sephiro/styles.css";

export function App() {
  return (
    <main data-sephiro-theme="light">
      {/* Sephiro components inherit the theme here. */}
    </main>
  );
}
```

Available presets:

| Preset | Use |
| --- | --- |
| `dark` | Charcoal surfaces, warm light text, and a desaturated forest-green accent. |
| `light` | Subtle cream-gray surfaces, charcoal text, and the same green accent family. |
| `asterism` | Asterism's charcoal surfaces and signature red accent. |
| `fizza` | Fizza's black surfaces and electric-violet accent. |
| `soffy` | Adaptive neutral surfaces and a forest-green accent. Light by default; follows `data-theme="dark"`. |

Dark remains the token fallback when no theme attribute is present. The legacy `default` name is retained as an alias for `dark`. Set `data-sephiro-theme="dark"` or `data-sephiro-theme="light"` explicitly when native form controls should inherit the corresponding `color-scheme`. Project names are kept intentionally: they prove the system can carry real product identities.

Soffy keeps its product preset while following the host's light/dark state. The
attributes may live on the same shell or `data-theme` may be on an ancestor:

```tsx
<main data-sephiro-theme="soffy" data-theme={theme}>
  <Button variant="primary">Continue</Button>
</main>
```

## Choose a CSS entry point

`@zovaris/sephiro/styles.css` is the complete bundle and remains the default.
It combines the following host-safe entry points:

- `@zovaris/sephiro/themes.css` — namespaced `--sph-*` tokens and presets.
- `@zovaris/sephiro/components.css` — compiled `.sph-*` component rules only.

The component bundle contains no Preflight reset, Tailwind layer declaration,
global `@property`, `:root`, `:host`, or universal selector. Tailwind is a build
tool for Sephiro, not a runtime styling dependency of consuming applications.

## Add a custom theme

Add a selector to `packages/ui/src/styles.css`. Keep the selector scoped to `data-sephiro-theme` and define the semantic tokens used by components:

```css
[data-sephiro-theme="my-theme"] {
  --sph-bg: #101318;
  --sph-surface: #171b22;
  --sph-surface-elevated: #202631;
  --sph-raised: #293241;
  --sph-border: #394454;
  --sph-border-strong: #5c6b80;
  --sph-text: #f5f7fa;
  --sph-text-muted: #abb6c5;
  --sph-accent: #8ab4f8;
  --sph-accent-hover: #a6c7fb;
  --sph-accent-pressed: #6f9fe8;
  --sph-accent-strong: #c4dcff;
  --sph-accent-soft: color-mix(in srgb, var(--sph-accent) 16%, transparent);
  --sph-on-accent: #101318;
  --sph-success: #6bd6a0;
  --sph-success-soft: color-mix(in srgb, var(--sph-success) 15%, transparent);
  --sph-warning: #f3c56f;
  --sph-warning-soft: color-mix(in srgb, var(--sph-warning) 15%, transparent);
  --sph-danger: #ff8d96;
  --sph-danger-soft: color-mix(in srgb, var(--sph-danger) 15%, transparent);
  --sph-focus: color-mix(in srgb, var(--sph-accent) 42%, transparent);
  --sph-focus-ring: color-mix(in srgb, var(--sph-accent) 16%, transparent);
  --sph-shadow-popover: 0 14px 36px rgb(0 0 0 / 0.38);
  color-scheme: dark;
}
```

Use `color-scheme: light` for a light preset so native controls match the surface. Keep component styles semantic: consume `var(--sph-*)` rather than hard-coding a theme color in an individual component. Choose `--sph-on-accent` so text keeps at least 4.5:1 contrast against the accent, hover, and pressed colors.

After changing the package tokens, rebuild the package:

```sh
bun --cwd packages/ui build
```

The playground's theme selector is only a preview consumer. Add a custom preset there only when the playground should expose it as a documented example; the source of truth remains `packages/ui/src/styles.css`.
