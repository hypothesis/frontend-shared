import plugin from 'tailwindcss/plugin.js';

/**
 * Provide the `.focus-visible-ring` utility class.
 *
 * Add a utility class that will render a focus ring on a focused element
 * only when it has keyboard focus, or otherwise has `:focus-visible`. Do not
 * show a focus ring if the element has focus but is not `:focus-visible`.
 *
 * This plugin should only be necessary until such a time that we feel browser
 * support for :focus-visible is acceptable. At that time, what this plugin
 * does should be achievable with a few standard tailwind utility classes.
 *
 * This styling requires the browser to support the :focus-visible
 * pseudo-selector [1] or for the JS polyfill [2] to be loaded.
 *
 * [1] https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible
 * [2] https://github.com/WICG/focus-visible
 *
 * This can be combined with other Tailwind utility classes to customize.
 * Example Usage:
 *  - <button className="focus-visible-ring">Click me</button>
 *    Show a focus-visible ring in the theme's `ringColor`
 * -  <button className="ring-inset focus-visible-ring">No, click me</button>
 *    Same as above, but explicitly inset
 * -  <button className="ring-offset-4 focus-visible-ring">Click!</button>
 *    Set ring shadow offset
 * -  <button className="ring-grey-3 focus-visible-ring">Click click</button>
 *    Set ring color
 *
 * Ring width is this theme's `ringWidth.DEFAULT`
 */
export default plugin(({ addUtilities, theme }) => {
  const ringWidth = theme('ringWidth.DEFAULT');
  // Based on TW ring/shadow rules https://tailwindcss.com/docs/ring-width
  const focusRing = `var(--tw-ring-inset) 0 0 0 calc(${ringWidth} + var(--tw-ring-offset-width)) var(--tw-ring-color)`;

  addUtilities({
    '.focus-visible-ring': {
      // 1. set a visible focus ring if this element has focus (fallback)
      '&:focus': {
        boxShadow: focusRing,
        outline: 'none',
      },
      // 2. set a visible focus ring if this element has `:focus-visible`
      '&:focus-visible': {
        boxShadow: focusRing,
        outline: 'none',
      },
      // 3. Remove focus ring if element is focused but does not have
      //    `:focus-visible` (in browsers that support `:focus-visible`)
      '&:focus:not(:focus-visible)': {
        boxShadow: 'none',
      },
      // 4. Remove focus ring if element is focused but does not have
      //    a focus-visible class set by the polyfill
      '.js-focus-visible &:focus:not(.focus-visible)': {
        boxShadow: 'none',
      },
    },
  });
});
