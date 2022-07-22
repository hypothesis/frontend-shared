import classnames from 'classnames';

import { downcastRef } from '../../util/typing';

/**
 * @typedef {import('../../types').PresentationalProps} CommonProps
 * @typedef {import('preact').JSX.HTMLAttributes<HTMLDivElement>} HTMLDivAttributes
 *
 * @typedef ScrollContainerProps
 * @prop {boolean} [borderless=false] - Remove border around container
 */

/**
 * Constrain children (which may include both scrollable and non-scrolling
 * content) to the dimensions of the immediate parent.
 *
 * @param {CommonProps & ScrollContainerProps & HTMLDivAttributes} props
 */
export default function ScrollContainer({
  children,
  classes,
  elementRef,

  borderless = false,

  ...htmlAttributes
}) {
  return (
    <div
      {...htmlAttributes}
      ref={downcastRef(elementRef)}
      className={classnames(
        'flex flex-col min-h-0 h-full w-full',
        { border: !borderless },
        classes
      )}
    >
      {children}
    </div>
  );
}
