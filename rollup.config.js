/* eslint-disable @typescript-eslint/no-require-imports */
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import { eslint } from "rollup-plugin-eslint";
import { terser } from "rollup-plugin-terser";
import run from "@rollup/plugin-run";
import sucrase from "@rollup/plugin-sucrase";
import replace from "@rollup/plugin-replace";
import pkg from "./package.json";

require("dotenv-flow").config();

const isDev = process.env.ROLLUP_WATCH === "true";

const external = Object.keys(pkg.dependencies || {}).concat(
  require("module").builtinModules || Object.keys(process.binding("natives"))
);

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "cjs",
    preferConst: true,
    sourcemap: false,
  },
  external,
  context: "global",
  cache: isDev,
  plugins: [
    replace({
      MUSIC_API_HOST: process.env.MUSIC_API_HOST || "http://localhost:4343",
    }),
    eslint({
      fix: true,
      throwOnError: !isDev,
      include: "src/*",
    }),
    commonjs({
      include: "node_modules/**",
      sourceMap: false,
    }),
    json(),
    resolve({
      extensions: [".js", ".ts"],
    }),
    isDev && run(),
    sucrase({ exclude: ["node_modules/**"], transforms: ["typescript"] }),
    !isDev && terser(),
  ],
};
