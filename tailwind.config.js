/**
 * Tailwind configuration for local pattern library styles
 */
import tailwindPreset from './src/tailwind.preset.js';

export default {
  presets: [tailwindPreset],
  content: ['./src/**/*.{js,ts,tsx}', './templates/**/*.html'],
};
