import classnames from 'classnames';
import type { JSX } from 'preact';
import { useContext } from 'preact/hooks';

import type { PresentationalProps } from '../../types';
import { downcastRef } from '../../util/typing';
import CloseableContext from '../CloseableContext';
import CloseButton from '../input/CloseButton';
import CardTitle from './CardTitle';

type ComponentProps = {
  title?: string;

  /**
   * Optional callback for close-button click. When present, a close button
   * will be rendered.
   */
  onClose?: () => void;

  /**
   * Make the header take the full width of the Card, with a full-width border
   */
  fullWidth?: boolean;

  variant?: 'primary' | 'secondary';
};

type HTMLAttributes = JSX.HTMLAttributes<HTMLElement>;

export type CardHeaderProps = PresentationalProps &
  ComponentProps &
  HTMLAttributes;

/**
 * Render a header area in a Card with optional title and/or close button
 */
export default function CardHeader({
  children,
  classes,
  elementRef,

  fullWidth = false,
  onClose,
  title,
  variant = 'primary',

  ...htmlAttributes
}: CardHeaderProps) {
  const closeableContext = useContext(CloseableContext);
  // Provided `onClose` is prioritized, but also check to see if there is
  // a close handler provided by a `CloseableContext`
  const closeHandler = onClose ?? closeableContext?.onClose;
  return (
    <div
      data-component="CardHeader"
      {...htmlAttributes}
      className={classnames(
        'flex items-center gap-x-2 border-b py-2',
        {
          'bg-slate-0 border-slate-5': variant === 'secondary',
          'mx-3': !fullWidth && variant === 'primary',
          'px-3': fullWidth || variant === 'secondary',
        },
        classes,
      )}
      ref={downcastRef(elementRef)}
    >
      {title && <CardTitle variant={variant}>{title}</CardTitle>}
      {children}
      <div className="grow" />
      {closeHandler && (
        <CloseButton
          onClick={closeHandler}
          classes={classnames(
            // Pull button right such that its icon right-aligns with the
            // header's bottom border
            '-mr-2.5',
            // Button icons render at 1em square. In this context, the icon
            // should always be exactly 16px square, so set font size to make
            // this happen.
            'text-[16px]',
          )}
        />
      )}
    </div>
  );
}
