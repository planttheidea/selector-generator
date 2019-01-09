import typescript from "rollup-plugin-typescript";
import { uglify } from "rollup-plugin-uglify";

import pkg from "./package.json";

const { assign } = Object;

const UMD_CONFIG = {
  external: ["identitate", "fast-equals", "reselect", "unchanged"],
  input: "src/index.ts",
  output: {
    exports: "named",
    file: pkg.browser,
    format: "umd",
    globals: {
      identitate: "identitate",
      "fast-equals": "fe",
      reselect: "Reselect",
      unchanged: "unchanged"
    },
    name: pkg.name,
    sourcemap: true
  },
  plugins: [typescript()]
};

const FORMATTED_CONFIG = assign({}, UMD_CONFIG, {
  output: [
    assign({}, UMD_CONFIG.output, {
      file: pkg.main,
      format: "cjs"
    }),
    assign({}, UMD_CONFIG.output, {
      file: pkg.module,
      format: "es"
    })
  ]
});

const MINIFIED_CONFIG = assign({}, UMD_CONFIG, {
  output: assign({}, UMD_CONFIG.output, {
    file: pkg.browser.replace(".js", ".min.js"),
    sourcemap: false
  }),
  plugins: UMD_CONFIG.plugins.concat([uglify()])
});

export default [UMD_CONFIG, FORMATTED_CONFIG, MINIFIED_CONFIG];
