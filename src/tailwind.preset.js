import plugin from 'tailwindcss/plugin.js';

import colors from 'tailwindcss/colors.js';

import focusVisibleRing from './tailwind.focus-visible-ring.js';

// Equivalent to spacing value 11; minimum touch-target size
const minimumTouchDimension = '44px';

export default /** @type {Partial<import('tailwindcss').Config>} */ ({
  theme: {
    extend: {
      borderColor: {
        DEFAULT: '#dbdbdb',
      },
      boxShadow: {
        DEFAULT: '0 1px 1px rgba(0, 0, 0, 0.1)',
        md: '0px 2px 3px 0px rgba(0, 0, 0, 0.15)',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: colors.white,
        black: colors.black,
        grey: {
          0: '#fafafa',
          1: '#f2f2f2',
          2: '#ececec',
          3: '#dbdbdb',
          4: '#a6a6a6',
          5: '#9c9c9c',
          6: '#737373',
          7: '#595959',
          8: '#3f3f3f',
          9: '#202020',
        },
        slate: {
          0: '#f4f4f6',
          1: '#e3e3e5',
          3: '#babac4',
          5: '#9c9cab',
          7: '#575768',
          9: '#131316',
        },
        blue: {
          focus: '#59a7e8',
        },
        green: {
          success: '#00a36d',
        },
        yellow: {
          notice: '#fbc168',
        },
        red: {
          error: '#d93c3f',
        },
        brand: {
          dark: '#84141e',
          DEFAULT: '#bd1c2b',
        },
        // This naming makes color-related classnames generated from this
        // token less ambiguous. e.g. `bg-color-text` instead of `bg-text`
        'color-text': {
          DEFAULT: '#202020',
          light: '#737373',
          inverted: '#f2f2f2',
        },
      },
      minHeight: {
        'touch-minimum': minimumTouchDimension,
      },
      minWidth: {
        'touch-minimum': minimumTouchDimension,
      },
      ringColor: {
        DEFAULT: '#59a7e8',
      },
      ringOpacity: {
        // Tailwind's default ring opacity is `0.5`
        DEFAULT: '1.0',
      },
      ringWidth: {
        DEFAULT: '2px',
      },
      screens: {
        touch: { raw: '(pointer: coarse)' },
      },
      spacing: {
        em: '1em',
        'touch-minimum': minimumTouchDimension,
      },
      zIndex: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        max: '2147483647',
      },
    },
  },
  plugins: [
    // Make `.focus-visible-ring` an available utility class
    focusVisibleRing,
    plugin(({ addVariant }) => {
      // Add a custom variant such that the `theme-clean:` modifier is available
      // for all tailwind utility classes. e.g. `.theme-clean:bg-white` would
      // only apply (set the element's background color to white) if a parent
      // element had the `.theme-clean` class.
      addVariant('theme-clean', '.theme-clean &');
      // Tailwind does not provide variants for ARIA-attributes out of the box
      addVariant('aria-pressed', '&[aria-pressed="true"]');
      addVariant('aria-expanded', '&[aria-expanded="true"]');
    }),
  ],
});
