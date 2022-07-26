import classnames from 'classnames';

import { downcastRef } from '../../util/typing';

/**
 * @typedef {import('../../types').PresentationalProps} CommonProps
 * @typedef {import('preact').JSX.HTMLAttributes<HTMLElement>} HTMLAttributes
 */

/**
 * Render a group of buttons or interactive elements inside a Card
 *
 * @param {CommonProps & HTMLAttributes} props
 */
export default function CardActions({
  children,
  classes,
  elementRef,

  ...htmlAttributes
}) {
  return (
    <div
      {...htmlAttributes}
      className={classnames('flex items-center justify-end space-x-3', classes)}
      ref={downcastRef(elementRef)}
      data-component="CardActions"
    >
      {children}
    </div>
  );
}
