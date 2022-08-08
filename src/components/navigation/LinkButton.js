import classnames from 'classnames';

import { downcastRef } from '../../util/typing';

import ButtonBase from '../input/ButtonBase';

/**
 * @typedef {import('../../types').PresentationalProps} CommonProps
 * @typedef {import('preact').JSX.HTMLAttributes<HTMLButtonElement>} HTMLAttributes
 * @typedef {import('../input/ButtonBase').ButtonCommonProps} ButtonCommonProps
 *
 * @typedef LinkButtonProps
 * @prop {'brand'|'text'|'text-light'} [color='brand']
 * @prop {boolean} [inline=false]
 * @prop {'always'|'hover'|'none'} [underline='hover']
 * @prop {'secondary'|'primary'} [variant='secondary']
 */

/**
 * Style a button as a link
 *
 * @param {CommonProps & ButtonCommonProps & LinkButtonProps & HTMLAttributes} props
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
}) {
  return (
    <ButtonBase
      {...htmlAttributes}
      elementRef={downcastRef(elementRef)}
      className={classnames(
        'focus-visible-ring transition-colors whitespace-nowrap rounded-sm',
        'aria-pressed:font-semibold aria-expanded:font-semibold',
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
      data-component="LinkButton"
    >
      {children}
    </ButtonBase>
  );
};

export default LinkButtonNext;
