import classnames from 'classnames';
import type { JSX } from 'preact';

import type { PresentationalProps } from '../../types';
import { downcastRef } from '../../util/typing';

type ComponentProps = {
  /** Overlay won't render if not open */
  open?: boolean;
  variant?: 'dark' | 'light';
};

export type OverlayProps = PresentationalProps &
  ComponentProps &
  Omit<JSX.HTMLAttributes<HTMLElement>, 'open'>;

/**
 * A full-screen fixed backdrop overlay
 */
const OverlayNext = function Overlay({
  children,
  classes,
  elementRef,

  open = true,
  variant = 'dark',

  ...htmlAttributes
}: OverlayProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      data-component="Overlay"
      {...htmlAttributes}
      ref={downcastRef(elementRef)}
      className={classnames(
        'fixed top-0 left-0 w-full h-full z-10 flex items-center justify-center',
        {
          'bg-black/50': variant === 'dark', // default
          'bg-white/50': variant === 'light',
        },
        classes
      )}
    >
      {children}
    </div>
  );
};

export default OverlayNext;
