import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dotenv from "dotenv";
import { nodePolyfills } from "vite-plugin-node-polyfills";

dotenv.config();
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
    ],
    build: {
      sourcemap: true,
      rollupOptions: {
        input: "./index.html",
      },
    },
    server: {
      // TODO: CORS ACCESS BLOCKED
      proxy: {
        "/users": {
          target: "https://cloud.appwrite.io/v1",
          changeOrigin: true,
          secure: false,
        },
        "/api": "http://localhost:8000",
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
