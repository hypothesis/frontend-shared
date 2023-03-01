import classnames from 'classnames';
import type { JSX } from 'preact';

import type { PresentationalProps } from '../../types';
import { downcastRef } from '../../util/typing';

export type CardTitleProps = PresentationalProps &
  JSX.HTMLAttributes<HTMLElement>;

/**
 * Style a title for a Card
 */
const CardTitleNext = function CardTitle({
  children,
  classes,
  elementRef,

  ...htmlAttributes
}: CardTitleProps) {
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
