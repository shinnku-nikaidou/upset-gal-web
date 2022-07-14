import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/mkw": {
        target: "https://shinnku.com/",
        changeOrigin: true,
      },
      "/02": {
        target: "https://shinnku.com/",
        changeOrigin: true,
      },
      "/gal": {
        target: "https://shinnku.com/",
        changeOrigin: true,
      },
      "/gal2": {
        target: "https://shinnku.com/",
        changeOrigin: true,
      },
    },
  },
});
