import { defineConfig } from "next";

const nextConfig = defineConfig({
  experimental: {
    appDir: true, // App Router
  },
  output: "standalone", // Required for Cloudflare Functions
});

export default nextConfig;