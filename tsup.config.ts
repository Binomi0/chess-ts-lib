// tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig({
  // Especifica exactamente los archivos de entrada
  entry: ["src/index.ts"], // Ajusta según tu estructura

  // Solo necesitas ESM para frontend moderno
  format: ["esm"],

  // Generar declaraciones de tipo (opcional para frontend)
  dts: true, // Puedes cambiarlo a true si necesitas tipos

  // Limpiar el directorio de salida
  clean: true,

  // Minificación para producción
  minify: true,

  // Sourcemaps para debugging
  sourcemap: process.env.NODE_ENV !== "production",

  // Plataforma específica
  platform: "browser",

  // Objetivo de transpilación
  target: "es2020",

  // Tree shaking para eliminar código muerto
  treeshake: true,

  // No incluir node_modules en el bundle (manéjalas con tu package manager)
  noExternal: [],

  // Configuración específica de esbuild
  esbuildOptions(options) {
    // Define variables de entorno
    options.define = {
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "production"
      ),
    };

    // Opcional: configurar loader para assets
    options.loader = {
      ".png": "file",
      ".jpg": "file",
      ".svg": "file",
    };
  },
});
