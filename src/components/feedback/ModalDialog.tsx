import classnames from 'classnames';

import { useSyncedRef } from '../../hooks/use-synced-ref';
import { useTabKeyNavigation } from '../../hooks/use-tab-key-navigation';
import type { Size } from '../../types';
import { downcastRef } from '../../util/typing';
import Overlay from '../layout/Overlay';
import Dialog from './Dialog';
import type { CustomDialogProps, PanelDialogProps } from './Dialog';

export type ModalSize = Size | 'custom' | 'none';

type ComponentProps = {
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
  size?: ModalSize;
};

export type PanelModalDialogProps = Omit<
  PanelDialogProps,
  'restoreFocus' | 'closeOnEscape'
> &
  ComponentProps;

export type CustomModalDialogProps = Omit<
  CustomDialogProps,
  'restoreFocus' | 'closeOnEscape'
> &
  ComponentProps;

export type ModalDialogProps = PanelModalDialogProps | CustomModalDialogProps;

/**
 * Show a modal dialog
 */
export default function ModalDialog({
  children,
  disableCloseOnEscape = false,
  disableFocusTrap = false,
  disableRestoreFocus = false,
  size = 'md',

  classes,
  elementRef,

  // Forwarded to Dialog
  closeOnClickAway = false,
  closeOnFocusAway = false,
  initialFocus = 'auto',

  ...htmlAndPanelAttributes
}: ModalDialogProps) {
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
          size !== 'custom' && 'max-w-[90vw] max-h-[90vh]',
          // Overlay sets up a flex layout centered on both axes. For taller
          // viewports, remove this modal container from the flex flow with
          // fixed positioning and position it 10vh from the top of the
          // viewport. This feels more balanced on taller screens. Ensure an
          // equal 10vh gap at the bottom of the screen by adjusting max-height
          // to `80vh`.
          size !== 'custom' && 'tall:fixed tall:max-h-[80vh] tall:top-[10vh]',
          {
            // Max-width rules will ensure actual width never exceeds 90vw
            'w-[30rem]': size === 'sm',
            'w-[36rem]': size === 'md', // default
            'w-[42rem]': size === 'lg',
            // No width classes are added if `size` is 'custom'
          },
          classes,
        )}
        elementRef={downcastRef(modalRef)}
        data-modal-size={size}
      >
        {children}
      </Dialog>
    </Overlay>
  );
}
