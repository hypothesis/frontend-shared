import classnames from 'classnames';
import type { JSX } from 'preact';

import type { PresentationalProps } from '../../types';
import { downcastRef } from '../../util/typing';
import ButtonBase from '../input/ButtonBase';
import type { ButtonCommonProps } from '../input/ButtonBase';

type ComponentProps = {
  color?: 'brand' | 'text' | 'text-light';
  inline?: boolean;
  underline?: 'always' | 'hover' | 'none';
  variant?: 'secondary' | 'primary';
};

export type LinkButtonProps = PresentationalProps &
  ButtonCommonProps &
  ComponentProps &
  JSX.HTMLAttributes<HTMLButtonElement>;

/**
 * Style a button as a link
 */
const LinkButtonNext = function LinkButton({
  children,
  classes,
  elementRef,

  color = 'brand',
  inline = false,
  underline = 'none',
  variant = 'secondary',

  ...htmlAttributes
}: LinkButtonProps) {
  return (
    <ButtonBase
      data-component="LinkButton"
      {...htmlAttributes}
      elementRef={downcastRef(elementRef)}
      classes={classnames(
        'focus-visible-ring transition-colors whitespace-nowrap',
        'aria-pressed:font-semibold aria-expanded:font-semibold rounded-sm',
        {
          // inline
          inline: inline,
          'flex items-center': !inline,
        },
        {
          // color
          'text-brand enabled:hover:text-brand-dark': color === 'brand', // default
          'text-color-text enabled:hover:text-brand-dark': color === 'text',
          'text-color-text-light enabled:hover:text-brand':
            color === 'text-light',
        },
        {
          // underline
          'no-underline hover:no-underline': underline === 'none', // default
          'underline enabled:hover:underline': underline === 'always',
          'no-underline enabled:hover:underline': underline === 'hover',
        },
        {
          // variant
          // no exta styling for default 'secondary' variant
          'font-semibold': variant === 'primary',
        },
        classes
      )}
      unstyled
    >
      {children}
    </ButtonBase>
  );
};

export default LinkButtonNext;
