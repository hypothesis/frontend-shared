import classnames from 'classnames';

import { downcastRef } from '../../util/typing';

/**
 * @typedef {import('../../types').PresentationalProps} CommonProps
 * @typedef {import('preact').JSX.HTMLAttributes<HTMLElement>} HTMLAttributes
 *
 * @typedef CardContentProps
 * @prop {'sm'|'md'|'lg'} [size='md'] - Relative spacing sizing
 */

/**
 * Apply consistent spacing and padding for content inside a Card
 *
 * @param {CommonProps & CardContentProps & Omit<HTMLAttributes, 'size'>} props
 */
const CardContentNext = function CardContent({
  children,
  classes,
  elementRef,

  size = 'md',

  ...htmlAttributes
}) {
  return (
    <div
      {...htmlAttributes}
      ref={downcastRef(elementRef)}
      className={classnames(
        {
          'p-3 space-y-4': size === 'md', // Default
          'p-2 space-y-3': size === 'sm',
          'p-4 space-y-6': size === 'lg',
        },
        classes
      )}
      data-component="CardContent"
    >
      {children}
    </div>
  );
};

export default CardContentNext;
