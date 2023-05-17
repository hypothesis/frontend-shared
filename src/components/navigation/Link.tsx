import classnames from 'classnames';
import type { JSX } from 'preact';

import type { PresentationalProps } from '../../types';
import { downcastRef } from '../../util/typing';

type ComponentProps = {
  underline?: 'always' | 'hover' | 'none';

  /** @deprecated use `variant` instead */
  color?: 'brand' | 'text-light' | 'text';

  // Styling API
  variant?: 'brand' | 'text-light' | 'text' | 'custom';
  unstyled?: boolean;
};

export type LinkProps = PresentationalProps &
  ComponentProps &
  JSX.HTMLAttributes<HTMLAnchorElement>;

/**
 * Styled component for a link (`<a>` element).
 */
const Link = function Link({
  children,
  classes,
  elementRef,

  underline = 'none',
  color,
  unstyled = false,
  variant = 'brand',

  ...htmlAttributes
}: LinkProps) {
  // Map from deprecated `color` prop to `variant` if `color` is present
  const theme = typeof color === 'string' ? color : variant;
  const styled = !unstyled;
  const themed = styled && theme !== 'custom';

  return (
    <a
      data-component="Link"
      rel="noopener noreferrer"
      {...htmlAttributes}
      className={classnames(
        {
          'focus-visible-ring rounded-sm': styled,
          // underline
          // TODO: Underline should be controlled by `variant` and should default
          // to `always`
          'no-underline hover:no-underline': styled && underline === 'none', // default
          'underline hover:underline': styled && underline === 'always',
          'no-underline hover:underline': styled && underline === 'hover',
        },
        {
          // color
          'text-brand hover:text-brand-dark': themed && theme === 'brand', // default
          'text-color-text-light hover:text-brand':
            themed && theme === 'text-light',
          'text-color-text hover:text-brand-dark': themed && theme === 'text',
        },
        classes
      )}
      ref={downcastRef(elementRef)}
    >
      {children}
    </a>
  );
};

export default Link;
