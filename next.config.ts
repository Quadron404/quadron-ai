// next.config.ts
import { defineConfig } from "next";

export default defineConfig({
  experimental: { appDir: true },
  output: "standalone",
});