import classnames from 'classnames';
import type { JSX } from 'preact';

import type { PresentationalProps } from '../../types';
import { downcastRef } from '../../util/typing';

type ComponentProps = {
  underline?: 'always' | 'hover' | 'none';

  // Styling API
  variant?: 'brand' | 'text-light' | 'text' | 'custom';
  unstyled?: boolean;
};

export type LinkProps = PresentationalProps &
  ComponentProps &
  JSX.AnchorHTMLAttributes<HTMLAnchorElement>;

/**
 * Styled component for a link (`<a>` element).
 */
export default function Link({
  children,
  classes,
  elementRef,

  underline = 'none',
  unstyled = false,
  variant = 'brand',

  ...htmlAttributes
}: LinkProps) {
  const styled = !unstyled;
  const themed = styled && variant !== 'custom';

  return (
    <a
      data-component="Link"
      rel="noopener noreferrer"
      {...htmlAttributes}
      className={classnames(
        styled && {
          'focus-visible:ring focus-visible:outline-none rounded': true,
          // underline
          // TODO: Underline should be controlled by `variant` and should default
          // to `always`
          'no-underline hover:no-underline': underline === 'none', // default
          'underline hover:underline': underline === 'always',
          'no-underline hover:underline': underline === 'hover',
        },
        themed && {
          // color
          'text-brand hover:text-brand-dark': variant === 'brand', // default
          'text-color-text-light hover:text-brand': variant === 'text-light',
          'text-color-text hover:text-brand-dark': variant === 'text',
        },
        classes,
      )}
      ref={downcastRef(elementRef)}
    >
      {children}
    </a>
  );
}
