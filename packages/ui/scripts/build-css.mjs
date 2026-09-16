import { spawnSync } from "node:child_process";
import { readFileSync, watch, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import postcss from "postcss";

const packageRoot = fileURLToPath(new URL("..", import.meta.url));
const componentOutput = fileURLToPath(
  new URL("../dist/components.css", import.meta.url),
);
const themeOutput = fileURLToPath(
  new URL("../dist/themes.css", import.meta.url),
);
const completeOutput = fileURLToPath(
  new URL("../dist/index.css", import.meta.url),
);

function compile(input, output) {
  const result = spawnSync(
    "tailwindcss",
    ["--input", input, "--output", output],
    { cwd: packageRoot, encoding: "utf8" },
  );

  if (result.status !== 0) {
    process.stderr.write(result.stdout);
    process.stderr.write(result.stderr);
    process.exit(result.status ?? 1);
  }
}

function isolateComponentCss(css) {
  const root = postcss.parse(css);
  const fallbackDeclarations = [];

  root.walkRules((rule) => {
    if (rule.selector === "*, ::before, ::after, ::backdrop") {
      fallbackDeclarations.push(...rule.nodes.map((node) => node.clone()));
    }
  });

  root.walkAtRules("property", (rule) => rule.remove());
  root.walkAtRules("layer", (layer) => {
    if (layer.params.trim() === "components" && layer.nodes) {
      layer.replaceWith(...layer.nodes);
      return;
    }

    layer.remove();
  });

  if (fallbackDeclarations.length > 0) {
    root.prepend(
      postcss.rule({
        selector: ':where([class^="sph-"], [class*=" sph-"])',
        nodes: fallbackDeclarations,
      }),
    );
  }

  const result = root.toString();
  const forbidden = ["@layer", "@property", ":host", "*, ::before"];

  for (const marker of forbidden) {
    if (result.includes(marker)) {
      throw new Error(`Generated component CSS still contains ${marker}`);
    }
  }

  return result;
}

function build() {
  compile("src/components.css", "dist/components.css");
  compile("src/themes.css", "dist/themes.css");

  const components = isolateComponentCss(readFileSync(componentOutput, "utf8"));
  const themes = readFileSync(themeOutput, "utf8");

  writeFileSync(componentOutput, components);
  writeFileSync(completeOutput, `${themes.trim()}\n\n${components.trim()}\n`);
}

build();

if (process.argv.includes("--watch")) {
  let timer;

  console.log("Watching Sephiro CSS sources...");
  watch(
    new URL("../src", import.meta.url),
    { recursive: true },
    (_, filename) => {
      if (!filename?.endsWith(".css")) return;

      clearTimeout(timer);
      timer = setTimeout(() => {
        try {
          build();
          console.log(`Rebuilt CSS after ${filename}`);
        } catch (error) {
          console.error(error);
        }
      }, 80);
    },
  );
}
