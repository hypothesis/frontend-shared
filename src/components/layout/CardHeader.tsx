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
};

type HTMLAttributes = JSX.HTMLAttributes<HTMLElement>;

export type CardHeaderProps = PresentationalProps &
  ComponentProps &
  HTMLAttributes;

/**
 * Render a header area in a Card with optional title and/or close button
 */
const CardHeaderNext = function CardHeader({
  children,
  classes,
  elementRef,

  onClose,
  title,

  ...htmlAttributes
}: CardHeaderProps) {
  return (
    <div
      {...htmlAttributes}
      className={classnames(
        'flex items-center gap-x-2 mx-3 py-2 border-b',
        classes
      )}
      ref={downcastRef(elementRef)}
      data-component="CardHeader"
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
            '-mr-3'
          )}
        >
          <CancelIcon />
        </IconButton>
      )}
    </div>
  );
};

export default CardHeaderNext;
