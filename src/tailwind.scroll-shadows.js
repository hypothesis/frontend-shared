import plugin from 'tailwindcss/plugin.js';

/**
 * Utility class to show scroll-hint shadows at the top and bottom of a
 * scrollable frame element if:
 *  - The content height exceeds the frame height: i.e. can be scrolled, and
 *  - The content is scrollable in the shadow's direction (up or down)
 *
 * Shadows are not visible once the frame has been scrolled all the way in the
 * shadow's direction. Shadows are not visible if the height of the content
 * does not overflow the frame (is not scrollable).
 *
 * The shadow hinting is handled by four positioned background gradients:
 *   - One gradient each at top and bottom of frame that obscure the shadow hints
 *     (shadow covers). These use `background-attachment: local`, which makes
 *     their position fixed to the _content_ within the scrollbox.
 *   - One gradient each at the top and the bottom of the frame that are the
 *     shadow hints (shadows). These use `background-attachment: scroll` such
 *     that they are always positioned at the top and the bottom of the
 *     _scrollbox_ frame. When these positions align with the positions of the
 *     shadow covers--at the top and the bottom of the overflowing content--
 *     they will be obscured by those shadow covers.
 *
 * See https://lea.verou.me/2012/04/background-attachment-local/
 *
 * Safari's behavior can be different because of a bug with
 * `background-attachment: local`.
 * See https://bugs.webkit.org/show_bug.cgi?id=219324
 * In Safari < 15.4:
 *   - Scroll-hint shadows do not appear if content does not overflow (this is
 *     consistent with other browsers)
 *   - Only the bottom scroll-hint shadow appears if content overflows
 *   - The bottom scroll-hint shadow is always present, even if content is
 *     fully scrolled
 */
export default plugin(({ addUtilities }) => {
  // These "shadow covers" scroll with the content. They align with and
  // obscure the shadows when an element is scrolled all the way in one
  // direction. If there is no overflow (nothing to scroll), these covers keep
  // any shadows from showing.
  const topShadowCover =
    'linear-gradient(white 30%, rgba(255, 255, 255, 0)) 0 0';
  const bottomShadowCover =
    'linear-gradient(rgba(255, 255, 255, 0), white 70%) 0 100%';

  // The shadows are in a fixed position (`background-attachment: scroll`)
  // relative to the scrolling container.
  const topShadow =
    'linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.05) 5px, rgba(255, 255, 255, 0) 70%) 0 0';
  const bottomShadow =
    'linear-gradient(to top, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.05) 5px, rgba(255, 255, 255, 0) 70%) 0 100%';

  addUtilities({
    '.scroll-shadows': {
      background: `${topShadowCover}, ${bottomShadowCover}, ${topShadow}, ${bottomShadow}`,
      backgroundRepeat: 'no-repeat',
      backgroundColor: 'white',
      backgroundSize: '100% 40px, 100% 40px, 100% 14px, 100% 14px',
      backgroundAttachment: 'local, local, scroll, scroll',
    },
  });
});
