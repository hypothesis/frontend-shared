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

  title = 'Close',

  onClick,
  ...iconButtonProps
}: CloseButtonProps) {
  const closeableContext = useContext(CloseableContext);
  // Any provided `onClick` is prioritized, but also check to see if there is a
  // close handler provided by a `CloseableContext`
  const closeHandler = onClick ?? closeableContext?.onClose;

  return (
    <IconButton
      data-component="CloseButton"
      elementRef={downcastRef(elementRef)}
      icon={CancelIcon}
      title={title}
      classes={classes}
      {...iconButtonProps}
      onClick={closeHandler}
    >
      {children}
    </IconButton>
  );
}
