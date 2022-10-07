import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import themePreprocessorPlugin from "@zougt/vite-plugin-theme-preprocessor";

export default defineConfig({
  plugins: [
    react(),
    themePreprocessorPlugin({
      less: {
        // 各个主题文件的位置
        multipleScopeVars: [
          {
            scopeName: "theme-default",
            path: path.resolve("src/theme/default.less"),
          },
          {
            scopeName: "theme-green",
            path: path.resolve("src/theme/green.less"),
          },
        ],
      },
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: "@root-entry-name: default;",
        // modifyVars: {
        //   "primary-color": "#1DA57A",
        //   "link-color": "#1DA57A",
        //   "border-radius-base": "2px",
        // },
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
