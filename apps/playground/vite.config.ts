import { resolve } from "node:path";
import preact from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

const uiSource = resolve(import.meta.dirname, "../../packages/ui");

export default defineConfig({
  plugins: [preact(), tailwindcss()],
  resolve: {
    alias: [
      {
        find: /^@\/(.+)\.js$/,
        replacement: `${resolve(uiSource, "src")}/$1.ts`,
      },
      {
        find: "@sthlabs/sephiro-ui/styles.css",
        replacement: resolve(uiSource, "src/styles.css"),
      },
      {
        find: "@sthlabs/sephiro-ui/package.json",
        replacement: resolve(uiSource, "package.json"),
      },
      {
        find: /^@sthlabs\/sephiro-ui$/,
        replacement: resolve(uiSource, "src/index.ts"),
      },
    ],
  },
});
