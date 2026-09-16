import { resolve } from "node:path";
import preact from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

const uiSource = resolve(import.meta.dirname, "../../packages/ui");

export default defineConfig({
  base: "./",
  plugins: [preact(), tailwindcss()],
  resolve: {
    alias: [
      {
        find: /^@\/(.+)\.js$/,
        replacement: `${resolve(uiSource, "src")}/$1.ts`,
      },
      {
        find: "@zovaris/sephiro/styles.css",
        replacement: resolve(uiSource, "src/styles.css"),
      },
      {
        find: "@zovaris/sephiro/package.json",
        replacement: resolve(uiSource, "package.json"),
      },
      {
        find: /^@zovaris\/sephiro$/,
        replacement: resolve(uiSource, "src/index.ts"),
      },
    ],
  },
});
