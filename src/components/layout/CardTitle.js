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
const CardTitleNext = function CardTitle({
  children,
  classes,
  elementRef,

  ...htmlAttributes
}) {
  return (
    <div
      data-component="CardTitle"
      {...htmlAttributes}
      className={classnames('grow text-lg text-brand font-semibold', classes)}
      ref={downcastRef(elementRef)}
    >
      {children}
    </div>
  );
};

export default CardTitleNext;
