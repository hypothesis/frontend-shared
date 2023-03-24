import classnames from 'classnames';

import { useSyncedRef } from '../../hooks/use-synced-ref';
import { useTabKeyNavigation } from '../../hooks/use-tab-key-navigation';
import { downcastRef } from '../../util/typing';
import Overlay from '../layout/Overlay';
import Dialog from './Dialog';
import type { DialogProps } from './Dialog';

type ComponentProps = {
  width?: 'sm' | 'md' | 'lg' | 'custom';

  /**
   * Disable WAI-ARIA-specific modal-dialog focus trap and tab/shift-tab
   * keyboard navigation
   */
  disableFocusTrap?: boolean;
};

export type ModalDialogProps = DialogProps & ComponentProps;

/**
 * Show a modal dialog
 */
const ModalDialogNext = function ModalDialog({
  children,
  width = 'md',
  disableFocusTrap = false,

  classes,
  elementRef,

  // Forwarded to Dialog
  closeOnEscape = true,
  closeOnClickAway = false,
  closeOnFocusAway = false,
  initialFocus = 'auto',
  restoreFocus = true,

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
        closeOnEscape={closeOnEscape}
        initialFocus={initialFocus}
        restoreFocus={restoreFocus}
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
            'w-[30rem]': width === 'sm',
            'w-[36rem]': width === 'md', // default
            'w-[42rem]': width === 'lg',
            // No width classes are added if width is 'custom'
          },
          classes
        )}
        elementRef={downcastRef(modalRef)}
      >
        {children}
      </Dialog>
    </Overlay>
  );
};

export default ModalDialogNext;
