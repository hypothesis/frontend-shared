import classnames from 'classnames';

import { downcastRef } from '../../util/typing';

/**
 * @typedef {import('../../types').PresentationalProps} CommonProps
 * @typedef {import('preact').JSX.HTMLAttributes<HTMLDivElement>} HTMLDivAttributes
 */

/**
 * Apply consistent padding and spacing to content within a Scroll
 *
 * @param {CommonProps & HTMLDivAttributes} props
 */
export default function ScrollContent({
  children,
  classes,
  elementRef,
  ...htmlAttributes
}) {
  return (
    <div
      {...htmlAttributes}
      ref={downcastRef(elementRef)}
      className={classnames('px-3 py-2', classes)}
    >
      {children}
    </div>
  );
}
