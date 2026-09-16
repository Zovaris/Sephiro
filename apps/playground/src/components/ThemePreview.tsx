import { Select } from "@sthlabs/sephiro-ui";

export type ThemeName = "default" | "light" | "asterism" | "soffy";

export const themes: {
  value: ThemeName;
  label: string;
  description: string;
}[] = [
  {
    value: "default",
    label: "Default / Night",
    description: "Quiet contrast for desktop work",
  },
  {
    value: "light",
    label: "Light",
    description: "Neutral surfaces for everyday product work",
  },
  {
    value: "asterism",
    label: "Asterism",
    description: "Indigo space for focused surfaces",
  },
  {
    value: "soffy",
    label: "Soffy",
    description: "Warm clarity for friendly tools",
  },
];

type ThemePreviewProps = {
  theme: ThemeName;
  onThemeChange: (theme: ThemeName) => void;
};

export function ThemePreview({ theme, onThemeChange }: ThemePreviewProps) {
  const activeTheme = themes.find((item) => item.value === theme) ?? themes[0];

  return (
    <div className="theme-switcher">
      <span className="theme-switcher__label">Preview theme</span>
      <Select
        ariaLabel="Preview theme"
        value={theme}
        options={themes.map(({ value, label }) => ({ value, label }))}
        onValueChange={(value) => onThemeChange(value as ThemeName)}
        size="lg"
      />
      <div className="theme-switcher__detail">
        <span
          className={`theme-swatch theme-swatch--${theme}`}
          aria-hidden="true"
        />
        <span>{activeTheme.description}</span>
      </div>
    </div>
  );
}
