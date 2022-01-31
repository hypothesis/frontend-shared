import tailwindPreset from './src/tailwind.preset.mjs';

export default {
  presets: [tailwindPreset],
  content: ['./src/**/*.js', './templates/**/*.mustache'],
};
