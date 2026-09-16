import {
  Badge,
  Button,
  Input,
  Select,
  Slider,
  toast,
} from "@sthlabs/sephiro-ui";
import type { JSX } from "preact";
import { useState } from "preact/hooks";
import { CatalogSection } from "./CatalogSection";

type StudioTokens = {
  accent: string;
  bg: string;
  surface: string;
  border: string;
  text: string;
  textMuted: string;
  radius: number;
};

const presetTokens: Record<string, StudioTokens> = {
  default: {
    accent: "#d71921",
    bg: "#111111",
    surface: "#191919",
    border: "#303030",
    text: "#eeeeee",
    textMuted: "#a4a4a4",
    radius: 6,
  },
  light: {
    accent: "#c01820",
    bg: "#f3f3f3",
    surface: "#ffffff",
    border: "#d6d6d6",
    text: "#171717",
    textMuted: "#5b5b5b",
    radius: 6,
  },
  asterism: {
    accent: "#7c82ff",
    bg: "#10121f",
    surface: "#171a2d",
    border: "#353c64",
    text: "#f1f3ff",
    textMuted: "#a9b2d6",
    radius: 10,
  },
  soffy: {
    accent: "#e36b54",
    bg: "#f8f3ec",
    surface: "#fffdf9",
    border: "#ddcfc0",
    text: "#302b2a",
    textMuted: "#756967",
    radius: 10,
  },
};

const presetOptions = Object.keys(presetTokens).map((value) => ({
  value,
  label: value,
}));

const hexPattern = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;

function isLightBackground(hex: string) {
  const value = hex.replace("#", "");
  const full =
    value.length === 3
      ? value
          .split("")
          .map((char) => char + char)
          .join("")
      : value;
  const red = parseInt(full.slice(0, 2), 16) / 255;
  const green = parseInt(full.slice(2, 4), 16) / 255;
  const blue = parseInt(full.slice(4, 6), 16) / 255;
  const channel = (component: number) =>
    component <= 0.03928
      ? component / 12.92
      : ((component + 0.055) / 1.055) ** 2.4;
  return (
    0.2126 * channel(red) + 0.7152 * channel(green) + 0.0722 * channel(blue) >
    0.4
  );
}

function presetCss(name: string, tokens: StudioTokens) {
  const scheme = isLightBackground(tokens.bg) ? "light" : "dark";
  return `[data-sephiro-theme="${name}"] {
  --sph-bg: ${tokens.bg};
  --sph-surface: ${tokens.surface};
  --sph-border: ${tokens.border};
  --sph-text: ${tokens.text};
  --sph-text-muted: ${tokens.textMuted};
  --sph-accent: ${tokens.accent};
  --sph-accent-soft: color-mix(in srgb, ${tokens.accent} 16%, transparent);
  --sph-focus: color-mix(in srgb, ${tokens.accent} 42%, transparent);
  --sph-radius-xs: ${Math.max(2, tokens.radius - 2)}px;
  --sph-radius-sm: ${tokens.radius}px;
  --sph-radius-md: ${tokens.radius + 4}px;
  color-scheme: ${scheme};
}`;
}

function Swatch({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="studio__swatch">
      <label className="studio__chip" htmlFor={id} title={label}>
        <span
          aria-hidden="true"
          className="studio__chip-fill"
          style={{ background: value }}
        />
        <input
          id={id}
          type="color"
          value={value}
          onChange={(event) => onChange(event.currentTarget.value)}
        />
      </label>
      <label className="studio__swatch-meta">
        <span className="studio__swatch-label">{label}</span>
        <input
          className="studio__hex"
          type="text"
          value={value}
          maxLength={7}
          spellcheck={false}
          aria-label={`${label} hex`}
          onChange={(event) => {
            const next = event.currentTarget.value;
            if (hexPattern.test(next)) onChange(next.toLowerCase());
          }}
        />
      </label>
    </div>
  );
}

export function ThemeStudio() {
  const [name, setName] = useState("my-theme");
  const [tokens, setTokens] = useState<StudioTokens>(presetTokens.default);
  const themeName = name.trim() || "my-theme";

  const update = (patch: Partial<StudioTokens>) =>
    setTokens((current) => ({ ...current, ...patch }));

  const basePreset =
    Object.keys(presetTokens).find((key) => presetTokens[key] === tokens) ?? "";

  const css = presetCss(themeName, tokens);

  const tokenStyle = {
    "--sph-accent": tokens.accent,
    "--sph-accent-hover": tokens.accent,
    "--sph-accent-soft": `color-mix(in srgb, ${tokens.accent} 16%, transparent)`,
    "--sph-bg": tokens.bg,
    "--sph-surface": tokens.surface,
    "--sph-border": tokens.border,
    "--sph-text": tokens.text,
    "--sph-text-muted": tokens.textMuted,
    "--sph-radius-xs": `${Math.max(2, tokens.radius - 2)}px`,
    "--sph-radius-sm": `${tokens.radius}px`,
    "--sph-radius-md": `${tokens.radius + 4}px`,
    colorScheme: isLightBackground(tokens.bg) ? "light" : "dark",
  } as JSX.CSSProperties;

  const copy = () => {
    navigator.clipboard.writeText(css).then(() => {
      toast.success("Preset copied", {
        description: `Paste the ${themeName} block into your stylesheet.`,
      });
    });
  };

  return (
    <CatalogSection
      id="theme-studio"
      index="07"
      title="Theme studio"
      description="Tune the semantic tokens and take the CSS with you — the same contract the built-in presets use."
      count="Live preview · copiable preset"
    >
      <div className="studio">
        <div className="studio__panel">
          <div className="studio__row">
            <label className="studio__label" htmlFor="studio-base">
              Base preset
            </label>
            <Select
              id="studio-base"
              size="sm"
              value={basePreset}
              ariaLabel="Base preset"
              placeholder="Custom"
              options={presetOptions}
              onValueChange={(value) => setTokens(presetTokens[value])}
            />
          </div>

          <div className="studio__row">
            <label className="studio__label" htmlFor="studio-name">
              Theme name
            </label>
            <Input
              id="studio-name"
              size="sm"
              value={name}
              onInput={(event) => setName(event.currentTarget.value)}
            />
          </div>

          <div className="studio__swatches">
            <Swatch
              id="studio-accent"
              label="Accent"
              value={tokens.accent}
              onChange={(accent) => update({ accent })}
            />
            <Swatch
              id="studio-bg"
              label="Bg"
              value={tokens.bg}
              onChange={(bg) => update({ bg })}
            />
            <Swatch
              id="studio-surface"
              label="Surface"
              value={tokens.surface}
              onChange={(surface) => update({ surface })}
            />
            <Swatch
              id="studio-border"
              label="Border"
              value={tokens.border}
              onChange={(border) => update({ border })}
            />
            <Swatch
              id="studio-text"
              label="Text"
              value={tokens.text}
              onChange={(text) => update({ text })}
            />
            <Swatch
              id="studio-muted"
              label="Muted"
              value={tokens.textMuted}
              onChange={(textMuted) => update({ textMuted })}
            />
          </div>

          <div className="studio__row">
            <Slider
              label="Radius"
              min={0}
              max={16}
              value={tokens.radius}
              valueLabel={`${tokens.radius}px`}
              onValueChange={(radius) => update({ radius })}
            />
          </div>
        </div>

        <div className="studio__stage">
          <div
            className="studio__surface"
            data-sephiro-theme={themeName}
            style={tokenStyle}
          >
            <div className="studio__surface-head">
              <strong>Workspace</strong>
              <Badge variant="accent">Live preview</Badge>
            </div>
            <p className="demo-copy">
              Components inherit every token from the closest themed ancestor.
            </p>
            <Input
              size="sm"
              defaultValue="Asterism"
              aria-label="Workspace name"
            />
            <div className="button-row">
              <Button variant="primary" size="sm">
                Primary
              </Button>
              <Button variant="secondary" size="sm">
                Secondary
              </Button>
            </div>
          </div>

          <div className="studio__code">
            <div className="studio__code-head">
              <span>{themeName}.css</span>
              <Button variant="quiet" size="sm" onClick={copy}>
                Copy
              </Button>
            </div>
            <pre>{css}</pre>
          </div>
        </div>
      </div>
    </CatalogSection>
  );
}
