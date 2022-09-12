import classnames from 'classnames';
import { useCallback, useEffect, useRef } from 'preact/hooks';

import { useFocusCapture } from '../../hooks/keyboard-navigation';
import { useClickAwayListener } from '../../hooks/use-click-away-listener';
import { useSyncedRef } from '../../hooks/use-synced-ref';
import { downcastRef } from '../../util/typing';

import { CancelIcon } from '../icons';
import IconButton from '../input/IconButton';
import { CardTitle, CardContent, CardActions } from '../layout';
import Overlay from '../layout/Overlay';
import ScrollBox from '../data/ScrollBox';

/**
 * @typedef {import('../../types').CompositeProps} CompositeProps
 * @typedef {Omit<import('preact').JSX.HTMLAttributes<HTMLElement>, 'size'|'icon'|'ref'>} HTMLAttributes
 *
 * @typedef DialogProps
 * @prop {import('preact').ComponentChildren} [buttons] - Action buttons to
 *   render in footer area of Dialog
 * @prop {boolean} [disableClickAwayClose=false] - Disable closing the modal
 *   when user interacts with elements outside of it
 * @prop {boolean} [disableFocusCapture=false] - Disable routing and capture of
 *  focus in modal dialog.
 *  @prop {import('preact').RefObject<HTMLElement>} [focusRef] - Ref for the
 *  element that should receive focus when the dialog is opened. Ignored if
 *  `disableFocusCapture` is true
 * @prop {boolean} [fullHeight=false] - Set height to 100% (of maxHeight)
 * @prop {boolean} [fullWidth=true] - Set width to 100% (of maxWidth)
 * @prop {'full'|string} [maxHeight] - Maximum height the dialog should take up
 *   as a CSS length string (e.g. '200px') or 'full' to allow 100%
 * @prop {'sm'|'md'|'lg'|'full'|string} [maxWidth="md"] - Maximum width the
 *   dialog should use, as set of consistent sizes sm-lg (default 'md'), or
 *   'full' (100%), or a custom CSS length string (e.g. '222px')
 * @prop {boolean} [open]
 * @prop {() => void} [onClose]
 * @prop {string} title - Required title is also used for a default
 * `aria-label`; however, `aria-label` may be overridden
 *
 */

/**
 * Render a dialog with a full-screen overlay backdrop.
 *
 * @param {CompositeProps & DialogProps & HTMLAttributes} props
 */
const DialogNext = function Dialog({
  children,
  elementRef,

  buttons,
  disableClickAwayClose = false,
  disableFocusCapture = false,
  focusRef,
  fullHeight = false,
  fullWidth = true,
  maxHeight = 'full',
  maxWidth = 'md',
  onClose,
  open = true,
  title,

  ...htmlAttributes
}) {
  const isOpen = useRef(false);
  const isModal = !!onClose && !disableFocusCapture;

  const containerRef = useSyncedRef(elementRef);
  // Set a tabindex of -1 on the container element if a focusRef wasn't provided,
  // such that the dialog itself receives initial focus. Otherwise, the dialog
  // container does not need to be interactive/navigable.
  const tabIndex = focusRef ? undefined : -1;

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  useClickAwayListener(
    containerRef,
    open && isModal && !disableClickAwayClose /* active */,
    handleClose
  );

  useFocusCapture(containerRef, isModal && open, {
    autofocusRef: focusRef,
  });

  useEffect(() => {
    const onKeyDown = event => {
      if (event.key === 'Escape') {
        onClose?.();
        event.preventDefault();
      }
    };

    if (open && isOpen.current === false) {
      document.addEventListener('keydown', onKeyDown);
    }
    isOpen.current = open;
    return () => {
      if (!open) {
        document.removeEventListener('keydown', onKeyDown);
      }
    };
  }, [open, onClose]);

  const widths = {
    sm: '448px', // 28rem
    md: '576px', // 36rem (default)
    lg: '672px', // 42rem
    full: '100%',
  };
  const maxWidthStyle = widths[maxWidth] ?? maxWidth;
  const maxHeightStyle =
    maxHeight === 'full' ? '80vh' : `min(80vh, ${maxHeight})`;

  if (!open) {
    return null;
  }

  return (
    <Overlay>
      <div
        aria-label={title}
        aria-modal={isModal}
        className={classnames(
          'focus-visible-ring',
          // The containing Overlay establishes a flex-column layout with
          // items centered on both axes. Setting `align-self: start` here
          // allows the Dialog to position itself vertically starting from
          // the top of the viewport (instead of the middle).
          'self-start',
          'flex flex-col mx-8 my-[10vh] rounded-sm border bg-white min-h-0',
          {
            hidden: !open,
            'w-full': fullWidth,
            'h-full': fullHeight,
          }
        )}
        data-component="Dialog"
        role="dialog"
        style={{ maxWidth: maxWidthStyle, maxHeight: maxHeightStyle }}
        tabIndex={tabIndex}
        {...htmlAttributes}
        ref={downcastRef(containerRef)}
      >
        <div className="flex items-center gap-x-2 p-3 border-b">
          <CardTitle>{title}</CardTitle>
          {onClose && (
            <IconButton onClick={onClose} title="Close">
              <CancelIcon />
            </IconButton>
          )}
        </div>
        <div className="grow overflow-auto">
          <ScrollBox borderless>{children}</ScrollBox>
        </div>
        <CardContent>
          {buttons && <CardActions>{buttons}</CardActions>}
        </CardContent>
      </div>
    </Overlay>
  );
};

export default DialogNext;
