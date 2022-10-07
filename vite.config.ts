import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  server: {
    proxy: {
      "/mkw": {
        target: "http://localhost:3000/",
        changeOrigin: true,
      },
      "/02": {
        target: "http://localhost:3000/",
        changeOrigin: true,
      },
      "/gal": {
        target: "http://localhost:3000/",
        changeOrigin: true,
      },
      "/gal2": {
        target: "http://localhost:3000/",
        changeOrigin: true,
      },
    },
  },
});
