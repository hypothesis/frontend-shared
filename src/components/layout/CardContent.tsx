import classnames from 'classnames';
import type { JSX } from 'preact';

import type { PresentationalProps, Size } from '../../types';
import { downcastRef } from '../../util/typing';

type ComponentProps = {
  size?: Size;
};

export type CardContentProps = PresentationalProps &
  ComponentProps &
  Omit<JSX.HTMLAttributes<HTMLElement>, 'size'>;

/**
 * Apply consistent spacing and padding for actions content inside a Card
 */
export default function CardContent({
  children,
  classes,
  elementRef,

  size = 'md',

  ...htmlAttributes
}: CardContentProps) {
  return (
    <div
      data-component="CardContent"
      {...htmlAttributes}
      ref={downcastRef(elementRef)}
      className={classnames(
        {
          'p-3 space-y-4': size === 'md', // Default
          'p-2 space-y-3': size === 'sm',
          'p-6 space-y-6': size === 'lg',
        },
        classes,
      )}
    >
      {children}
    </div>
  );
}
