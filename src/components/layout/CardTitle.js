import classnames from 'classnames';

import { downcastRef } from '../../util/typing';

/**
 * @typedef {import('../../types').PresentationalProps} CommonProps
 * @typedef {import('preact').JSX.HTMLAttributes<HTMLElement>} HTMLAttributes
 *
 */

/**
 * Style a title for a Card
 *
 * @param {CommonProps & HTMLAttributes} props
 */
export default function CardTitle({
  children,
  classes,
  elementRef,

  ...htmlAttributes
}) {
  return (
    <div
      {...htmlAttributes}
      className={classnames('grow text-lg text-brand font-semibold', classes)}
      ref={downcastRef(elementRef)}
      data-component="CardTitle"
    >
      {children}
    </div>
  );
}
