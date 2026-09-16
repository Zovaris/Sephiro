import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  alias: { "@": "./src" },
  external: ["react", "react/jsx-runtime", "sonner", "@phosphor-icons/react"],
});
