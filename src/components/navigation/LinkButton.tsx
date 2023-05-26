import classnames from 'classnames';
import type { JSX } from 'preact';

import type { PresentationalProps } from '../../types';
import { downcastRef } from '../../util/typing';
import Button from '../input/Button';
import type { ButtonProps } from '../input/Button';

type ComponentProps = {
  /** @deprecated use `variant` instead */
  color?: 'brand' | 'text' | 'text-light';

  inline?: boolean;
  underline?: 'always' | 'hover' | 'none';

  variant?: 'brand' | 'text-light' | 'text' | 'custom';
  unstyled?: boolean;
};

export type LinkButtonProps = PresentationalProps &
  Omit<ButtonProps, 'variant'> &
  ComponentProps &
  JSX.HTMLAttributes<HTMLButtonElement>;

/**
 * Style a button as a link
 */
const LinkButton = function LinkButton({
  children,
  classes,
  elementRef,

  color,
  inline = false,
  underline = 'none',
  variant = 'brand',
  unstyled = false,

  ...htmlAttributes
}: LinkButtonProps) {
  // Map from deprecated `color` prop to `variant` if `color` is present
  const theme = typeof color === 'string' ? color : variant;
  const styled = !unstyled;
  const themed = styled && variant !== 'custom';

  return (
    <Button
      data-component="LinkButton"
      {...htmlAttributes}
      elementRef={downcastRef(elementRef)}
      classes={classnames(
        styled && {
          'focus-visible-ring transition-colors whitespace-nowrap rounded-sm':
            true,
          inline: inline,
          'flex items-center': !inline,
        },
        styled && {
          // underline
          'no-underline hover:no-underline': underline === 'none', // default
          'underline enabled:hover:underline': underline === 'always',
          'no-underline enabled:hover:underline': underline === 'hover',
        },
        themed && {
          'aria-pressed:font-semibold aria-expanded:font-semibold': true,
          'text-brand enabled:hover:text-brand-dark': theme === 'brand', // default
          'text-color-text enabled:hover:text-brand-dark': theme === 'text',
          'text-color-text-light enabled:hover:text-brand':
            theme === 'text-light',
        },

        classes
      )}
      unstyled
    >
      {children}
    </Button>
  );
};

export default LinkButton;
