import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { string } from 'rollup-plugin-string';
import virtual from '@rollup/plugin-virtual';

export default {
  input: 'build/scripts/test-inputs.js', // Input file generated by gulp task
  output: {
    file: 'build/scripts/tests.bundle.js',
    format: 'es',
    sourcemap: true,
  },
  treeshake: false,
  plugins: [
    // Replace some problematic dependencies which are imported but not actually
    // used with stubs. Per @rollup/plugin-virtual's docs, this must be listed
    // first.
    virtual({
      // Enzyme dependency used in its "Static Rendering" mode, which we don't use.
      'cheerio/lib/utils': '',
      cheerio: '',

      // Node modules that are not available in the browser.
      crypto: '',
      util: '',
    }),
    nodeResolve({
      browser: true,

      // Disallow use of browser polyfills for Node builtin modules. We're
      // trying to avoid dependencies which rely on these.
      //
      // There are a couple of references to Node builtins that are stubbed by
      // configuration for the `virtual` plugin above.
      preferBuiltins: false,
    }),
    commonjs({
      include: 'node_modules/**',
    }),
    string({
      include: '**/*.{html,svg}',
    }),

    // The Babel transform generates additional code for code coverage.
    // Place it last to minimize amount of code parsed by subsequent plugins.
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: [
        [
          '@babel/preset-react',
          {
            // Turn off the `development` setting in tests to prevent warnings
            // about `this`. See https://github.com/babel/babel/issues/9149.
            development: false,
            runtime: 'automatic',
            importSource: 'preact',
          },
        ],
      ],
      plugins: [
        'mockable-imports',
        [
          'babel-plugin-istanbul',
          {
            exclude: ['**/test/**/*.js', '**/test-util/**'],
          },
        ],
      ],
    }),
  ],
};
