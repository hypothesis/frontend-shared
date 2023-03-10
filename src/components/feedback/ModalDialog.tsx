import classnames from 'classnames';

import { useSyncedRef } from '../../hooks/use-synced-ref';
import { downcastRef } from '../../util/typing';
import Overlay from '../layout/Overlay';
import Dialog from './Dialog';
import type { DialogProps } from './Dialog';

type ComponentProps = {
  size?: 'sm' | 'md' | 'lg' | 'custom';
};

export type ModalDialogProps = DialogProps & ComponentProps;

/**
 * Show a modal dialog
 */
const ModalDialogNext = function ModalDialog({
  children,
  size = 'md',

  classes,
  elementRef,

  // Forwarded to Dialog
  closeOnEscape = true,
  closeOnClickAway = false,
  closeOnFocusAway = false,
  initialFocus = 'auto',

  ...htmlAndPanelAttributes
}: ModalDialogProps) {
  const modalRef = useSyncedRef(elementRef);

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
            'w-[30rem]': size === 'sm',
            'w-[36rem]': size === 'md', // default
            'w-[42rem]': size === 'lg',
            // No width classes are added if size is 'custom'
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
