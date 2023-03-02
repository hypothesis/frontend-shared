import classnames from 'classnames';
import type { JSX } from 'preact';

import type { PresentationalProps } from '../../types';
import { downcastRef } from '../../util/typing';

type ComponentProps = {
  /** relative internal spacing */
  size?: 'sm' | 'md' | 'lg';
};

export type CardContentProps = PresentationalProps &
  ComponentProps &
  Omit<JSX.HTMLAttributes<HTMLElement>, 'size'>;

/**
 * Apply consistent spacing and padding for actions content inside a Card
 */
const CardContentNext = function CardContent({
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
          'p-4 space-y-6': size === 'lg',
        },
        classes
      )}
    >
      {children}
    </div>
  );
};

export default CardContentNext;
