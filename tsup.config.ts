import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "iife"], // iife para navegador
  globalName: "ChessTsLib", // Para formato iife
  dts: true,
  clean: true,
  minify: true,
  sourcemap: true,
  target: "es2020",
  platform: "browser",
  esbuildOptions(options) {
    options.define = {
      "process.env.NODE_ENV": JSON.stringify("production"),
    };
  },
});
