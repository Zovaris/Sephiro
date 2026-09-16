import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("themes.css", import.meta.url), "utf8");

function themeSlice(start: string, end?: string) {
  const startIndex = css.indexOf(start);
  expect(startIndex).toBeGreaterThan(-1);
  const endIndex = end
    ? css.indexOf(end, startIndex + start.length)
    : css.length;
  return css.slice(startIndex, endIndex);
}

function token(block: string, name: string) {
  const value = block.match(new RegExp(`${name}:\\s*(#[0-9a-f]{6})`, "i"))?.[1];
  expect(value, `${name} should be a hex color`).toBeDefined();
  return value as string;
}

function luminance(hex: string) {
  const channels = [1, 3, 5].map(
    (index) => Number.parseInt(hex.slice(index, index + 2), 16) / 255,
  );
  const [red, green, blue] = channels.map((value) =>
    value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrast(foreground: string, background: string) {
  const lighter = Math.max(luminance(foreground), luminance(background));
  const darker = Math.min(luminance(foreground), luminance(background));
  return (lighter + 0.05) / (darker + 0.05);
}

function expectAccessiblePalette(block: string) {
  const background = token(block, "--sph-bg");
  const surface = token(block, "--sph-surface");
  const onAccent = token(block, "--sph-on-accent");

  expect(
    contrast(token(block, "--sph-text"), background),
  ).toBeGreaterThanOrEqual(4.5);
  expect(
    contrast(token(block, "--sph-text-muted"), background),
  ).toBeGreaterThanOrEqual(4.5);
  expect(
    contrast(token(block, "--sph-accent"), surface),
  ).toBeGreaterThanOrEqual(3);

  for (const state of [
    "--sph-accent",
    "--sph-accent-hover",
    "--sph-accent-pressed",
  ]) {
    expect(contrast(onAccent, token(block, state))).toBeGreaterThanOrEqual(4.5);
  }
}

test("dark and light presets meet their contrast contracts", () => {
  const dark = themeSlice(
    ':where(:root, [data-sephiro-theme="default"], [data-sephiro-theme="dark"])',
    ':where([data-sephiro-theme="default"], [data-sephiro-theme="dark"])',
  );
  const light = themeSlice(
    '[data-sephiro-theme="light"]',
    '[data-sephiro-theme="asterism"]',
  );

  expectAccessiblePalette(dark);
  expectAccessiblePalette(light);

  expect(css).toContain("color-scheme: dark");
  expect(light).toContain("color-scheme: light");
});

test("Soffy follows the consumer light and dark mode", () => {
  const light = themeSlice(
    '[data-sephiro-theme="soffy"]',
    '[data-theme="dark"][data-sephiro-theme="soffy"]',
  );
  const dark = themeSlice(
    '[data-theme="dark"][data-sephiro-theme="soffy"]',
    "@media (prefers-reduced-motion: reduce)",
  );

  expectAccessiblePalette(light);
  expectAccessiblePalette(dark);
  expect(light).toContain("color-scheme: light");
  expect(dark).toContain("color-scheme: dark");
  expect(css).toContain('[data-theme="dark"] [data-sephiro-theme="soffy"]');
});
