import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: '@root-entry-name: default;',
      },
    },
  },
  server: {
    proxy: {
      "/mkw": {
        target: "https://dev.shinnku.com/",
        changeOrigin: true,
      },
      "/02": {
        target: "https://dev.shinnku.com/",
        changeOrigin: true,
      },
      "/gal": {
        target: "https://dev.shinnku.com/",
        changeOrigin: true,
      },
      "/gal2": {
        target: "https://dev.shinnku.com/",
        changeOrigin: true,
      },
    },
  },
});
