import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default ({ mode }: { mode: any }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [
      react(),
      nodePolyfills({
        // Whether to polyfill `node:` protocol imports.
        protocolImports: true,
      }),
      sentryVitePlugin({
        org: "gi-diaz-solutions",
        project: "javascript-react",
        authToken: process.env.VITE_SENTRY_AUTH_TOKEN,
      }),
    ],
    build: {
      sourcemap: true,
      rollupOptions: {
        input: "./index.html",
      },
    },
    server: {
      proxy: {
        "/users": {
          target: "https://cloud.appwrite.io/v1",
          changeOrigin: true,
          secure: false,
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@assets": path.resolve(__dirname, "./src/assets"),
      },
    },
  });
};
