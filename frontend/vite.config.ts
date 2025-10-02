import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      external: [
        // Exclude font files from bundle
        /\.ttf$/,
        /\.otf$/,
        /\.woff$/,
        /\.woff2$/,
        /\.eot$/,
      ],
    },
  },
});
