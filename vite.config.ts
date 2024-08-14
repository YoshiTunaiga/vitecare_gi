import { sentryVitePlugin } from "@sentry/vite-plugin";
import builtins from "rollup-plugin-node-builtins";
import globals from "rollup-plugin-node-globals";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default ({ mode }: { mode: any }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [
      globals(),
      builtins(),
      react(),
      sentryVitePlugin({
        org: "gi-diaz-solutions",
        project: "javascript-react",
        authToken: process.env.VITE_SENTRY_AUTH_TOKEN,
      }),
    ],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    build: {
      sourcemap: true,
    },
  });
};
