'use strict';

module.exports = {
  presets: [
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
        importSource: 'preact',
      },
    ],
    [
      '@babel/preset-env',
      {
        bugfixes: true,
        modules: false, // Produce ES module output
        targets: {
          chrome: '70',
          firefox: '70',
          safari: '11.1',
          edge: '79',
        },
      },
    ],
  ],
  env: {
    development: {
      presets: [
        [
          '@babel/preset-react',
          {
            development: true,
            runtime: 'automatic',
            // Use `preact/compat/jsx-dev-runtime` which is an alias for `preact/jsx-runtime`.
            // See https://github.com/preactjs/preact/issues/2974.
            importSource: 'preact/compat',
          },
        ],
      ],
    },
  },
};
