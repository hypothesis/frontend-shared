import classnames from 'classnames';
import type { JSX } from 'preact';

import type { PresentationalProps } from '../../types';
import { downcastRef } from '../../util/typing';
import { CancelIcon } from '../icons';
import { IconButton } from '../input';
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
};

type HTMLAttributes = JSX.HTMLAttributes<HTMLElement>;

export type CardHeaderProps = PresentationalProps &
  ComponentProps &
  HTMLAttributes;

/**
 * Render a header area in a Card with optional title and/or close button
 */
const CardHeader = function CardHeader({
  children,
  classes,
  elementRef,

  fullWidth = false,
  onClose,
  title,

  ...htmlAttributes
}: CardHeaderProps) {
  return (
    <div
      data-component="CardHeader"
      {...htmlAttributes}
      className={classnames(
        'flex items-center gap-x-2 border-b py-2',
        { 'mx-3': !fullWidth, 'px-3': fullWidth },
        classes
      )}
      ref={downcastRef(elementRef)}
    >
      {title && <CardTitle>{title}</CardTitle>}
      {children}
      {onClose && (
        <IconButton
          onClick={onClose}
          title="Close"
          classes={classnames(
            // Pull button right such that its icon right-aligns with the
            // header's bottom border
            '-mr-2.5'
          )}
        >
          <CancelIcon />
        </IconButton>
      )}
    </div>
  );
};

export default CardHeader;
