import classnames from 'classnames';
import type { JSX } from 'preact';

import type { PresentationalProps } from '../../types';
import { downcastRef } from '../../util/typing';

type ComponentProps = {
  /** Wrap the title with this HTML heading tag  */
  tagName?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

  variant?: 'primary' | 'secondary';
};

export type CardTitleProps = PresentationalProps &
  ComponentProps &
  JSX.HTMLAttributes<HTMLElement>;

/**
 * Style a title for a Card
 */
const CardTitle = function CardTitle({
  children,
  classes,
  elementRef,

  tagName = 'h1',
  variant = 'primary',

  ...htmlAttributes
}: CardTitleProps) {
  const WrapperElement = tagName;
  return (
    <div
      data-component="CardTitle"
      {...htmlAttributes}
      className={classnames(
        {
          'text-lg text-brand font-semibold': variant === 'primary',
          'text-xl text-slate-7 font-normal': variant === 'secondary',
        },
        classes,
      )}
      ref={downcastRef(elementRef)}
    >
      <WrapperElement data-testid="card-title-heading">
        {children}
      </WrapperElement>
    </div>
  );
};

export default CardTitle;
