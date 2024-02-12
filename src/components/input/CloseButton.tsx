import { useContext } from 'preact/hooks';

import { downcastRef } from '../../util/typing';
import CloseableContext from '../CloseableContext';
import { CancelIcon } from '../icons';
import IconButton from './IconButton';
import type { IconButtonProps } from './IconButton';

type ComponentProps = {
  /** Optional button title */
  title?: string;
};

export type CloseButtonProps = Omit<IconButtonProps, 'title'> & ComponentProps;

/**
 * Render a close button. Use provided `onClick` or check for a CloseableContext
 * with a close handler.
 */
export default function CloseButton({
  children,
  classes,
  elementRef,

  title,
  onClick,
  ...iconButtonProps
}: CloseButtonProps) {
  const closeableContext = useContext(CloseableContext);
  // Provided `title` and `onClick` are prioritized, but fall back to values
  // from the `CloseableContext`
  const buttonTitle = title ?? closeableContext?.title ?? 'Close';
  const closeHandler = onClick ?? closeableContext?.onClose;

  return (
    <IconButton
      data-component="CloseButton"
      elementRef={downcastRef(elementRef)}
      icon={CancelIcon}
      title={buttonTitle}
      classes={classes}
      {...iconButtonProps}
      onClick={closeHandler}
    >
      {children}
    </IconButton>
  );
}
