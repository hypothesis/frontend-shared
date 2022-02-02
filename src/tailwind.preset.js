import plugin from 'tailwindcss/plugin.js';

import colors from 'tailwindcss/colors.js';

export default {
  theme: {
    extend: {
      borderColor: {
        DEFAULT: '#dbdbdb',
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
          //0: '#f4f4f6', Proposed
          1: '#e3e3e5',
          3: '#babac4',
          //5: '#9c9cab', Proposed
          7: '#595969',
          //9: '#131316', Proposed
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
        },
      },
      spacing: {
        'touch-minimum': '44px', // Equivalent to spacing 11; minimum touch-target size
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      // Add a custom variant such that the `theme-clean:` modifier is available
      // for all tailwind utility classes. e.g. `.theme-clean:bg-white` would
      // only apply (set the element's background color to white) if a parent
      // element had the `.theme-clean` class.
      addVariant('theme-clean', '.theme-clean &');
    }),
  ],
};
