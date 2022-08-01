import classnames from 'classnames';

import { downcastRef } from '../../util/typing';

/**
 * @typedef {import('../../types').PresentationalProps} CommonProps
 * @typedef {import('preact').JSX.HTMLAttributes<HTMLElement>} HTMLAttributes
 *
 * @typedef CardProps
 * @prop {boolean} [active=false] - When true, the Card will be styled to
 *   appear as if hovered ("active")
 * @prop {'raised'|'flat'} [variant='raised'] - The "raised" default variant
 *   adds dimensionality with shadows; those shadows intensify on hover. "Flat"
 *   variant does not have any dimensionality or hover.
 * @prop {'full'|'auto'|'custom'} [width='full'] - When `custom`, user should
 *   set desired width using `classes` prop
 */

/**
 * Render content in a card-like frame
 *
 * @param {CommonProps & CardProps & Omit<HTMLAttributes, 'width'>} props
 */
const CardNext = function Card({
  children,
  classes,
  elementRef,

  active = false,
  variant = 'raised',
  width = 'full',

  ...htmlAttributes
}) {
  return (
    <div
      {...htmlAttributes}
      ref={downcastRef(elementRef)}
      className={classnames(
        'rounded-sm border bg-white',
        {
          'shadow hover:shadow-md': variant === 'raised', // default
          'shadow-md': active && variant === 'raised',
        },
        {
          'w-full': width === 'full', // default
          'w-auto': width === 'auto',
          // No width is set if `width === 'custom'`
        },
        classes
      )}
      data-component="Card"
    >
      {children}
    </div>
  );
};

export default CardNext;
