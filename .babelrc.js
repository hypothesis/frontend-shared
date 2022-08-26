export default {
  presets: [
    '@babel/preset-typescript',
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
            importSource: 'preact',
          },
        ],
      ],
    },
  },
};
