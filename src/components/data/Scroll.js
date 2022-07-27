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
        // Prevent vertical flex or grid blowout: keep this contained vertically
        // to parent by setting a min width
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
