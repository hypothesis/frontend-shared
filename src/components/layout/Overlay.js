import classnames from 'classnames';

import { downcastRef } from '../../util/typing';

/**
 * @typedef {import('../../types').PresentationalProps} CommonProps
 * @typedef {import('preact').JSX.HTMLAttributes<HTMLElement>} HTMLAttributes
 *
 * @typedef OverlayProps
 * @prop {boolean} [open=true] - Overlay won't render if not open
 * @prop {'dark'|'light'} [variant='dark']
 */

/**
 * A full-screen fixed backdrop overlay
 *
 * @param {CommonProps & OverlayProps & HTMLAttributes} props
 */
const OverlayNext = function Overlay({
  children,
  classes,
  elementRef,

  open = true,
  variant = 'dark',

  ...htmlAttributes
}) {
  if (!open) {
    return null;
  }

  return (
    <div
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
      data-component="Overlay"
    >
      {children}
    </div>
  );
};

export default OverlayNext;
