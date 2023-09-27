/**
 * Tailwind configuration for local pattern library styles
 */
import tailwindPreset from './src/tailwind.preset.js';

export default {
  presets: [tailwindPreset],
  content: ['./src/**/*.{js,ts,tsx}', './templates/**/*.html'],

  // Pattern library specific config
  theme: {
    extend: {
      animation: {
        'slide-in-from-right': 'slide-in-from-right 0.3s forwards ease-in-out',
        'slide-out-to-right': 'slide-out-to-right 0.3s forwards ease-in-out',
      },
      keyframes: {
        'slide-in-from-right': {
          '0%': {
            opacity: '0',
            left: '100%',
          },
          '80%': {
            left: '-10px',
          },
          '100%': {
            left: '0',
            opacity: '1',
          },
        },
        'slide-out-to-right': {
          '0%': {
            left: '0',
            opacity: '1',
          },
          '20%': {
            left: '-10px',
          },
          '100%': {
            opacity: '0',
            left: '100%',
          },
        },
      },
    },
  },
};
