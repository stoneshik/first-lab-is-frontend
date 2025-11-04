import { reactRouter } from "@react-router/dev/vite";
import path from "node:path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths()],
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "${path.resolve(__dirname, "app/styles/variables.scss")}" as *;
          @use "${path.resolve(__dirname, "app/styles/mixins.scss")}" as *;
        `,
      },
    },
  },
});
