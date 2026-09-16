import { beforeAll, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const packageRoot = fileURLToPath(new URL("..", import.meta.url));

function readOutput(name: string) {
  return readFileSync(new URL(`../dist/${name}`, import.meta.url), "utf8");
}

beforeAll(() => {
  const result = Bun.spawnSync(["bun", "run", "build:css"], {
    cwd: packageRoot,
    stdout: "pipe",
    stderr: "pipe",
  });

  expect(result.exitCode, result.stderr.toString()).toBe(0);
});

test("published component CSS is complete and host-safe", () => {
  const components = readOutput("components.css");

  expect(components).toContain(".sph-select__trigger");
  expect(components).toContain(".sph-toggle__track");
  expect(components).toContain(':where([class^="sph-"], [class*=" sph-"])');
  expect(components).not.toContain("@layer");
  expect(components).not.toContain("@property");
  expect(components).not.toContain(":root");
  expect(components).not.toContain(":host");
  expect(components).not.toContain("*, ::before");
  expect(components).not.toContain("data-sephiro-theme");
});

test("published bundles separate themes and components", () => {
  const components = readOutput("components.css");
  const themes = readOutput("themes.css");
  const complete = readOutput("index.css");

  expect(themes).toContain('[data-sephiro-theme="dark"]');
  expect(themes).toContain('[data-sephiro-theme="light"]');
  expect(themes).not.toContain(".sph-select__trigger");
  expect(complete).toContain(components.trim());
  expect(complete).toContain(themes.trim());
});
