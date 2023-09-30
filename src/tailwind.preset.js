import colors from 'tailwindcss/colors.js';
import plugin from 'tailwindcss/plugin.js';

import { focusVisibleRing } from './tailwind.focus-visible-ring.js';
import { scrollShadows } from './tailwind.scroll-shadows.js';

// Equivalent to spacing value 11; minimum touch-target size
const minimumTouchDimension = '44px';

export default /** @type {Partial<import('tailwindcss').Config>} */ ({
  theme: {
    extend: {
      animation: {
        'fade-in': 'fade-in 0.3s forwards',
        'fade-out': 'fade-out 0.3s forwards',
      },
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
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        'fade-out': {
          '0%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
          },
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
        tall: { raw: '(min-height: 32rem)' },
        touch: { raw: '(pointer: coarse)' },
      },
      spacing: {
        em: '1em',
        '2em': '2em',
        '4em': '4em',
        'touch-minimum': minimumTouchDimension,
      },
      zIndex: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        10: '10',
        max: '2147483647',
      },
    },
  },
  plugins: [
    // Make `.focus-visible-ring` an available utility class
    focusVisibleRing,
    // Add `.scroll-shadows` for use by Scroll components
    scrollShadows,
    plugin(({ addVariant }) => {
      // Add a custom variant to mark an element to serve as a container for
      // a set of grouped input components. This is the same functionality
      // as Tailwind's built-in "group" variant, but with a different name for
      // clarity of purpose.
      // See https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-parent-state
      addVariant('input-group', '.input-group &');
    }),
  ],
});
