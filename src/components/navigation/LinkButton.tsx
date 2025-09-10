import classnames from 'classnames';
import type { JSX } from 'preact';

import type { PresentationalProps } from '../../types';
import { downcastRef } from '../../util/typing';
import Button from '../input/Button';
import type { ButtonProps } from '../input/Button';

type ComponentProps = {
  inline?: boolean;
  underline?: 'always' | 'hover' | 'none';
  variant?: 'brand' | 'text-light' | 'text' | 'custom';
  unstyled?: boolean;
};

export type LinkButtonProps = PresentationalProps &
  Omit<ButtonProps, 'variant'> &
  ComponentProps &
  JSX.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Style a button as a link
 */
export default function LinkButton({
  children,
  classes,
  elementRef,

  inline = false,
  underline = 'none',
  variant = 'brand',
  unstyled = false,

  ...htmlAttributes
}: LinkButtonProps) {
  const styled = !unstyled;
  const themed = styled && variant !== 'custom';

  return (
    <Button
      data-component="LinkButton"
      {...htmlAttributes}
      elementRef={downcastRef(elementRef)}
      classes={classnames(
        styled && {
          'focus-visible:ring focus-visible:outline-none transition-colors whitespace-nowrap rounded': true,
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
          'text-brand enabled:hover:text-brand-dark': variant === 'brand', // default
          'text-color-text enabled:hover:text-brand-dark': variant === 'text',
          'text-color-text-light enabled:hover:text-brand':
            variant === 'text-light',
        },

        classes,
      )}
      unstyled
    >
      {children}
    </Button>
  );
}
