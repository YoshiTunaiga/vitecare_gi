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
    // optimizeDeps: {
    //   exclude: ["fs"],
    // },
    build: {
      sourcemap: true,
      rollupOptions: {
        input: "./index.html",
        // external: ["fs"],
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@assets": path.resolve(__dirname, "./src/assets"),
        // fs: "node-stdlib-browser/helpers/fs.js",
      },
    },
  });
};

// import { sentryVitePlugin } from "@sentry/vite-plugin";
// import builtins from "rollup-plugin-node-builtins";
// import globals from "rollup-plugin-node-globals";
// import { defineConfig, Plugin } from "vite";
// import react from "@vitejs/plugin-react";
// import reactSwc from "@vitejs/plugin-react-swc";
// import { resolve } from "path";
// import { config as dotEnvConfig } from "dotenv";
// import { nodePolyfills } from "vite-plugin-node-polyfills";
// import commonjs from "@rollup/plugin-commonjs";
// import svgr from "vite-plugin-svgr";
// import fs from "fs";

// const muteWarningsPlugin = (warningsToIgnore: string[][]): Plugin => {
//   const mutedMessages = new Set();
//   return {
//     name: "mute-warnings",
//     enforce: "pre",
//     config: (userConfig) => ({
//       build: {
//         sourcemap: true,
//         commonjsOptions: {
//           include: [/node_modules/], // Include node_modules to handle commonjs
//           transformMixedEsModules: true, // This helps in transforming modules that use both ESM and CJS
//         },
//         rollupOptions: {
//           onwarn(warning, defaultHandler) {
//             if (warning.code) {
//               const muted = warningsToIgnore.find(
//                 ([code, message]) =>
//                   code == warning.code && warning.message.includes(message)
//               );

//               if (muted) {
//                 mutedMessages.add(muted.join());
//                 return;
//               }
//             }

//             if (userConfig.build?.rollupOptions?.onwarn) {
//               userConfig.build.rollupOptions.onwarn(warning, defaultHandler);
//             } else {
//               defaultHandler(warning);
//             }
//           },
//         },
//       },
//     }),
//     closeBundle() {
//       const diff = warningsToIgnore.filter((x) => !mutedMessages.has(x.join()));
//       if (diff.length > 0) {
//         this.warn(
//           "Some of your muted warnings never appeared during the build process:"
//         );
//         diff.forEach((m) => this.warn(`- ${m.join(": ")}`));
//       }
//     },
//   };
// };

// // Load environment variables
// dotEnvConfig();

// function setupEnv(rootPath: string) {
//   const envpath = resolve(rootPath, "./env");
//   const stat = fs.statSync(envpath, { throwIfNoEntry: false }); // just checking if folder exists

//   if (typeof stat === "undefined") {
//     return console.log("no env directory");
//   }

//   if (!stat.isDirectory()) {
//     return console.log("no env directory");
//   }

//   const isClient = /.*-client-.*/;
//   const isShared = /\.shared\./;
//   const isEnv = /.*\.env/;
//   const files = fs.readdirSync(envpath);

//   files.forEach((file) => {
//     if (!isEnv.test(file)) return;
//     if (!isClient.test(file) && !isShared.test(file)) return;
//     const filePath = resolve(envpath, file);
//     dotEnvConfig({ path: filePath });
//   });
// }

// // Pass the root path as a string
// setupEnv(process.cwd());

// // https://vitejs.dev/config/
// export default ({ mode }: { mode: any }) => {
//   // process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
//   const warningsToIgnore = [
//     ["SOURCEMAP_ERROR", "Can't resolve original location of error"],
//     [
//       "INVALID_ANNOTATION",
//       "contains an annotation that Rollup cannot interpret",
//     ],
//   ];

//   return defineConfig({
//     plugins: [
//       react(),
//       reactSwc(),
//       nodePolyfills(),
//       sentryVitePlugin({
//         org: "gi-diaz-solutions",
//         project: "javascript-react",
//         authToken: process.env.VITE_SENTRY_AUTH_TOKEN,
//       }),
//       svgr({
//         svgrOptions: {
//           // SVGR options
//         },
//       }),
//       {
//         ...builtins(),
//         name: "builtins",
//       },
//       {
//         ...globals(),
//         name: "globals",
//       },
//       commonjs({
//         include: /node_modules/,
//         requireReturnsDefault: "auto",
//         exclude: ["mermaid"], // Exclude mermaid from being processed by commonjs
//         transformMixedEsModules: true, // Add this line to handle mixed ES modules
//       }),
//       muteWarningsPlugin(warningsToIgnore),
//     ],

//     resolve: {
//       alias: {
//         "@": resolve(__dirname, "./src"),
//         react: resolve(__dirname, "node_modules/react"),
//       },
//       extensions: [".tsx", ".ts", ".js", "jsx"],
//       preserveSymlinks: true,
//     },
//     build: {
//       outDir: "dist",
//       rollupOptions: {
//         input: "./index.html", // Specify the correct path for index.html
//         output: {
//           entryFileNames: "hidden.build.js",
//           manualChunks(id) {
//             if (id.includes("node_modules")) {
//               return id
//                 .toString()
//                 .split("node_modules/")[1]
//                 .split("/")[0]
//                 .toString();
//             }
//           },
//         },
//         external: [
//           "fsevents", // Externalize the fsevents module
//           "path", // Externalize Node.js built-in modules
//           "fs",
//           "os",
//           "util",
//           "events",
//           "stream",
//           "http",
//           "https",
//           "url",
//           "zlib",
//           "querystring",
//           "assert",
//           "buffer",
//           "child_process",
//           "cluster",
//           "dgram",
//           "dns",
//           "domain",
//           "net",
//           "readline",
//           "repl",
//           "tls",
//           "tty",
//           "v8",
//           "vm",
//           "worker_threads",
//           "mermaid",
//           "react",
//         ],
//       },
//     },
//     define: {
//       "process.env": process.env, // Inline environment variables
//     },
//     optimizeDeps: {
//       include: ["react", "react-router-dom", "react/jsx-runtime"], // Ensure React is included in the dependency optimization
//     },
//     assetsInclude: ["**/*.node"],
//   });
// };
