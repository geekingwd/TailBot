import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import tailwindcss from "tailwindcss";

export default defineConfig({
  plugins: [react()],
  base: "/", // ✅ ensures assets resolve correctly on Netlify
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // ✅ fix alias imports like "@/components/..."
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
