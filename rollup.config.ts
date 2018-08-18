import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import sourceMaps from "rollup-plugin-sourcemaps";
import camelCase from "lodash.camelcase";
import typescript from "rollup-plugin-typescript2";
import json from "rollup-plugin-json";
import builtins from "rollup-plugin-node-builtins";

// tslint:disable-next-line:no-var-requires
const pkg = require("./package.json");

const libraryName = "index";

export default {
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: ["react", "react-dom"],
  input: `src/${libraryName}.ts`,
  output: [
    {
      file: pkg.main,
      format: "umd",
      globals: {
        react: "React",
        "react-dom": "ReactDOM"
      },
      name: camelCase(libraryName),
      sourcemap: true
    },
    {
      file: pkg.module,
      format: "es",
      globals: {
        react: "React",
        "react-dom": "ReactDOM"
      },
      sourcemap: true
    }
  ],
  plugins: [
    builtins(),
    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript({ useTsconfigDeclarationDir: true }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs({
      exclude: ["node_modules/process-es6/**"],
      include: ["node_modules/**"],
      namedExports: {
        "node_modules/react-dom/index.js": ["render", "reactDom"],
        "node_modules/react/index.js": [
          "Children",
          "Component",
          "PropTypes",
          "createElement",
          "cloneElement"
        ]
      }
    }),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),

    // Resolve source maps to the original source
    sourceMaps()
  ],
  watch: {
    include: "src/**"
  }
};
