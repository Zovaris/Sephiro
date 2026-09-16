import type { JSX } from "preact";

export type InkTokens = {
  name: string;
  accent: string;
  stock: string;
  surface: string;
  rule: string;
  ink: string;
  muted: string;
  radius: number;
};

export const STARTING_INK: InkTokens = {
  name: "my-theme",
  accent: "#d71921",
  stock: "#111111",
  surface: "#191919",
  rule: "#303030",
  ink: "#eeeeee",
  muted: "#a4a4a4",
  radius: 6,
};

export const INK_FIELDS: Array<{
  key: keyof Omit<InkTokens, "name" | "radius">;
  label: string;
}> = [
  { key: "accent", label: "Register" },
  { key: "stock", label: "Stock" },
  { key: "surface", label: "Surface" },
  { key: "rule", label: "Rule" },
  { key: "ink", label: "Ink" },
  { key: "muted", label: "Second ink" },
];

export function inkVars(tokens: InkTokens, scheme: "light" | "dark") {
  return {
    "--sph-bg": tokens.stock,
    "--sph-surface": tokens.surface,
    "--sph-surface-elevated": tokens.surface,
    "--sph-raised": `color-mix(in srgb, ${tokens.ink} 8%, ${tokens.surface})`,
    "--sph-border": tokens.rule,
    "--sph-border-strong": `color-mix(in srgb, ${tokens.ink} 34%, ${tokens.rule})`,
    "--sph-text": tokens.ink,
    "--sph-text-muted": tokens.muted,
    "--sph-accent": tokens.accent,
    "--sph-accent-hover": `color-mix(in srgb, ${tokens.accent} 82%, ${tokens.ink})`,
    "--sph-accent-pressed": `color-mix(in srgb, ${tokens.accent} 78%, ${tokens.stock})`,
    "--sph-accent-strong": `color-mix(in srgb, ${tokens.accent} 62%, ${tokens.ink})`,
    "--sph-accent-soft": `color-mix(in srgb, ${tokens.accent} 16%, transparent)`,
    "--sph-focus": `color-mix(in srgb, ${tokens.accent} 42%, transparent)`,
    "--sph-focus-ring": `color-mix(in srgb, ${tokens.accent} 16%, transparent)`,
    "--sph-radius-xs": `${Math.max(2, tokens.radius - 2)}px`,
    "--sph-radius-sm": `${tokens.radius}px`,
    "--sph-radius-md": `${tokens.radius + 4}px`,
    colorScheme: scheme,
  } as JSX.CSSProperties;
}

export function presetBlock(tokens: InkTokens, scheme: "light" | "dark") {
  const radius = tokens.radius;

  return `[data-sephiro-theme="${tokens.name}"] {
  --sph-bg: ${tokens.stock};
  --sph-surface: ${tokens.surface};
  --sph-border: ${tokens.rule};
  --sph-text: ${tokens.ink};
  --sph-text-muted: ${tokens.muted};
  --sph-accent: ${tokens.accent};
  --sph-accent-soft: color-mix(in srgb, ${tokens.accent} 16%, transparent);
  --sph-focus: color-mix(in srgb, ${tokens.accent} 42%, transparent);
  --sph-radius-xs: ${Math.max(2, radius - 2)}px;
  --sph-radius-sm: ${radius}px;
  --sph-radius-md: ${radius + 4}px;
  color-scheme: ${scheme};
}`;
}

function channel(value: number) {
  const v = value / 255;
  return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string) {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;

  const value = Number.parseInt(full.slice(0, 6), 16);
  if (Number.isNaN(value)) return null;

  const r = channel((value >> 16) & 255);
  const g = channel((value >> 8) & 255);
  const b = channel(value & 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(foreground: string, background: string) {
  const a = luminance(foreground);
  const b = luminance(background);
  if (a === null || b === null) return null;
  const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  return Math.round(ratio * 100) / 100;
}

export function isLight(hex: string) {
  const value = luminance(hex);
  return value !== null && value > 0.42;
}
