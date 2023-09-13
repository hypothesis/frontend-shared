import classnames from 'classnames';
import type { JSX } from 'preact';

import type { PresentationalProps } from '../../types';
import { downcastRef } from '../../util/typing';

export type CardActionsProps = PresentationalProps &
  JSX.HTMLAttributes<HTMLElement>;

/**
 * Render a group of buttons or interactive elements inside a Card
 */
export default function CardActions({
  children,
  classes,
  elementRef,

  ...htmlAttributes
}: CardActionsProps) {
  return (
    <div
      data-component="CardActions"
      {...htmlAttributes}
      className={classnames('flex items-center justify-end space-x-3', classes)}
      ref={downcastRef(elementRef)}
    >
      {children}
    </div>
  );
}
