import classnames from 'classnames';
import type { JSX } from 'preact';

import type { PresentationalProps } from '../../types';
import { downcastRef } from '../../util/typing';

type ComponentProps = {
  /** When true, the Card will be styled to appear as if hovered ("active") */
  active?: boolean;

  /**
   * The "raised" default variant adds dimensionality with shadows; those
   * shadows intensify on hover. "Flat" variant does not have any dimensionality
   * or hover.
   */
  variant?: 'raised' | 'flat';
  /** When `custom`, user should set desired width using `classes` prop */
  width?: 'full' | 'auto' | 'custom';
};

export type CardProps = PresentationalProps &
  ComponentProps &
  Omit<JSX.HTMLAttributes<HTMLElement>, 'width'>;

/**
 * Render content in a card-like frame
 */
const Card = function Card({
  children,
  classes,
  elementRef,

  active = false,
  variant = 'raised',
  width = 'full',

  ...htmlAttributes
}: CardProps) {
  return (
    <div
      data-component="Card"
      {...htmlAttributes}
      ref={downcastRef(elementRef)}
      className={classnames(
        'rounded border bg-white',
        {
          'shadow hover:shadow-md': variant === 'raised', // default
          'shadow-md': active && variant === 'raised',
        },
        {
          'w-full': width === 'full', // default
          'w-auto': width === 'auto',
          // No width is set if `width === 'custom'`
        },
        classes,
      )}
    >
      {children}
    </div>
  );
};

export default Card;
