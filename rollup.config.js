import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { string } from 'rollup-plugin-string';

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
    ],
  };
}

export default [bundleConfig('pattern-library', './scripts/pattern-library')];
