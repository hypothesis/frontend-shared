/* global process */
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import virtual from '@rollup/plugin-virtual';
import { string } from 'rollup-plugin-string';

const isProd = process.env.NODE_ENV === 'production';
const prodPlugins = [];
if (isProd) {
  // Minify output.
  prodPlugins.push(
    terser({
      format: {
        // Strip *all* comments from minified output. This works around an issue
        // with column numbers in stack traces in Safari. See
        // https://bugs.webkit.org/show_bug.cgi?id=221548 and
        // https://github.com/hypothesis/client/issues/4045.
        comments: false,

        // Limit length of lines in output. This makes the minfied output easier
        // to examine in tools that struggle with long lines and limits the
        // impact of an issue with stack trace column numbers in Firefox.
        // See https://github.com/hypothesis/client/issues/4045.
        max_line_len: 1024,
      },
    }),
  );

  // Eliminate debug-only imports.
  prodPlugins.push(
    virtual({
      'preact/debug': '',
    }),
  );
}

function bundleConfig(name, entryFile) {
  return {
    input: {
      [name]: entryFile,
    },
    output: {
      dir: 'build/scripts/',
      format: 'es',
      chunkFileNames: '[name].bundle.js',
      entryFileNames: '[name].bundle.js',
    },

    // Suppress a warning (https://rollupjs.org/guide/en/#error-this-is-undefined)
    // due to https://github.com/babel/babel/issues/9149.
    //
    // Any code string other than "undefined" which evaluates to `undefined` will work here.
    context: 'void(0)',

    plugins: [
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        extensions: ['.js', '.ts', '.tsx'],
      }),
      dynamicImportVars(),
      nodeResolve({ extensions: ['.js', '.ts', '.tsx'] }),
      commonjs({ include: 'node_modules/**' }),
      string({
        include: '**/*.svg',
      }),
      ...prodPlugins,
    ],
  };
}

export default [bundleConfig('pattern-library', './scripts/pattern-library')];
