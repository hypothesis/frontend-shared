import tailwindPreset from './src/tailwind.preset.js';

export default {
  presets: [tailwindPreset],
  mode: 'jit',
  purge: {
    content: ['./src/**/*.js', './templates/**/*.mustache'],
  },
};
