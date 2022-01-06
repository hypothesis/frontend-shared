import tailwindPreset from './src/tailwind.preset.js';

export default {
  presets: [tailwindPreset],
  content: ['./src/**/*.js', './templates/**/*.mustache'],
  corePlugins: {
    preflight: false,
  },
};
