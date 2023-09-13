import classnames from 'classnames';

import { useSyncedRef } from '../../hooks/use-synced-ref';
import { useTabKeyNavigation } from '../../hooks/use-tab-key-navigation';
import { downcastRef } from '../../util/typing';
import Overlay from '../layout/Overlay';
import Dialog from './Dialog';
import type { DialogProps } from './Dialog';

type ModalWidth = 'sm' | 'md' | 'lg' | 'custom';

type ComponentProps = {
  /**
   * @deprecated  - use `size` instead
   */
  width?: ModalWidth;

  /**
   * Do not close the modal when the Escape key is pressed
   */
  disableCloseOnEscape?: boolean;

  /**
   * Disable WAI-ARIA-specific modal-dialog focus trap and tab/shift-tab
   * keyboard navigation
   */
  disableFocusTrap?: boolean;

  /**
   * Disable the restoration of focus to the previously-focused element when
   * the dialog is closed.
   */
  disableRestoreFocus?: boolean;

  /**
   * Relative size (width) of modal dialog
   */
  size?: ModalWidth;
};

export type ModalDialogProps = Omit<
  DialogProps,
  'restoreFocus' | 'closeOnEscape'
> &
  ComponentProps;

/**
 * Show a modal dialog
 */
export default function ModalDialog({
  children,
  disableCloseOnEscape = false,
  disableFocusTrap = false,
  disableRestoreFocus = false,
  size,
  width,

  classes,
  elementRef,

  // Forwarded to Dialog
  closeOnClickAway = false,
  closeOnFocusAway = false,
  initialFocus = 'auto',

  ...htmlAndPanelAttributes
}: ModalDialogProps) {
  // Prefer `size` prop but support deprecated `width` if present
  const modalSize = size ?? width ?? 'md';
  const modalRef = useSyncedRef(elementRef);

  useTabKeyNavigation(modalRef, { enabled: !disableFocusTrap });

  return (
    <Overlay data-composite-component="ModalDialog">
      <Dialog
        // Attribute defaults; can be overridden
        aria-modal
        {...htmlAndPanelAttributes}
        // Dialog props
        closeOnClickAway={closeOnClickAway}
        closeOnFocusAway={closeOnFocusAway}
        closeOnEscape={!disableCloseOnEscape}
        initialFocus={initialFocus}
        restoreFocus={!disableRestoreFocus}
        classes={classnames(
          // Column-flex layout to constrain content to max-height
          'flex flex-col',
          'max-w-[90vw] max-h-[90vh]',
          // Overlay sets up a flex layout centered on both axes. For taller
          // viewports, remove this modal container from the flex flow with
          // fixed positioning and position it 10vh from the top of the
          // viewport. This feels more balanced on taller screens. Ensure an
          // equal 10vh gap at the bottom of the screen by adjusting max-height
          // to `80vh`.
          'tall:fixed tall:max-h-[80vh] tall:top-[10vh]',
          {
            // Max-width rules will ensure actual width never exceeds 90vw
            'w-[30rem]': modalSize === 'sm',
            'w-[36rem]': modalSize === 'md', // default
            'w-[42rem]': modalSize === 'lg',
            // No width classes are added if width is 'custom'
          },
          classes,
        )}
        elementRef={downcastRef(modalRef)}
        // Testing affordance. TODO: Remove once deprecated `width` prop
        // no longer supported.
        data-modal-size={modalSize}
      >
        {children}
      </Dialog>
    </Overlay>
  );
}
