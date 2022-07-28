import classnames from 'classnames';

import { downcastRef } from '../../util/typing';

/**
 * @typedef {import('../../types').PresentationalProps} CommonProps
 * @typedef {import('preact').JSX.HTMLAttributes<HTMLElement>} HTMLAttributes
 *
 * @typedef ScrollProps
 * @prop {'raised'|'flat'} [variant='raised'] - Render with scroll-hinting
 *   shadows ('raised') or without ('flat')
 */

/**
 * Render a fluid container that scrolls on overflow.
 *
 * @param {CommonProps & ScrollProps & HTMLAttributes} props
 */
export default function Scroll({
  children,
  classes,
  elementRef,

  variant = 'raised',

  ...htmlAttributes
}) {
  return (
    <div
      {...htmlAttributes}
      ref={downcastRef(elementRef)}
      className={classnames(
        // Prevent overflow by overriding `min-height: auto`.
        // See https://stackoverflow.com/a/66689926/434243.
        'min-h-0',
        'h-full w-full overflow-auto',
        { 'scroll-shadows': variant === 'raised' },
        classes
      )}
      data-component="Scroll"
    >
      {children}
    </div>
  );
}
