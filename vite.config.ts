import { sentryVitePlugin } from "@sentry/vite-plugin";
import builtins from "rollup-plugin-node-builtins";
import globals from "rollup-plugin-node-globals";
import { defineConfig, loadEnv, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

const muteWarningsPlugin = (warningsToIgnore: string[][]): Plugin => {
  const mutedMessages = new Set();
  return {
    name: "mute-warnings",
    enforce: "pre",
    config: (userConfig) => ({
      build: {
        rollupOptions: {
          onwarn(warning, defaultHandler) {
            if (warning.code) {
              const muted = warningsToIgnore.find(
                ([code, message]) =>
                  code == warning.code && warning.message.includes(message)
              );

              if (muted) {
                mutedMessages.add(muted.join());
                return;
              }
            }

            if (userConfig.build?.rollupOptions?.onwarn) {
              userConfig.build.rollupOptions.onwarn(warning, defaultHandler);
            } else {
              defaultHandler(warning);
            }
          },
        },
      },
    }),
    closeBundle() {
      const diff = warningsToIgnore.filter((x) => !mutedMessages.has(x.join()));
      if (diff.length > 0) {
        this.warn(
          "Some of your muted warnings never appeared during the build process:"
        );
        diff.forEach((m) => this.warn(`- ${m.join(": ")}`));
      }
    },
  };
};

// https://vitejs.dev/config/
export default ({ mode }: { mode: any }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const warningsToIgnore = [
    ["SOURCEMAP_ERROR", "Can't resolve original location of error"],
    [
      "INVALID_ANNOTATION",
      "contains an annotation that Rollup cannot interpret",
    ],
  ];

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
      muteWarningsPlugin(warningsToIgnore),
    ],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    optimizeDeps: {
      include: ["react"], // Ensure React is included in the dependency optimization
    },
    build: {
      sourcemap: true,
      commonjsOptions: {
        include: [/node_modules/], // Include node_modules to handle commonjs
        transformMixedEsModules: true, // This helps in transforming modules that use both ESM and CJS
      },
    },
  });
};
