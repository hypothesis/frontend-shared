import { render } from 'preact';
import { createRef } from 'preact';
import type { ComponentChildren } from 'preact';

import ModalDialog from '../components/feedback/ModalDialog';
import Button from '../components/input/Button';

export type ConfirmModalProps = {
  title?: string;
  message: ComponentChildren;
  confirmAction?: string;
  cancelAction?: string;

  /**
   * Determines which of the two buttons should be initially focused.
   * Defaults to 'cancel'
   */
  initialFocus?: 'cancel' | 'confirm';
};

/**
 * Show the user a prompt asking them to confirm an action.
 *
 * This is like an async version of `window.confirm` except that:
 *
 *  - It can be used inside iframes (browsers are starting to prevent this for
 *    the native `window.confirm` dialog)
 *  - The visual style of the dialog matches the Hypothesis design system
 *
 * @return - Promise that resolves with `true` if the user confirmed the action
 *   or `false` if they canceled it.
 */
export async function confirm({
  title = 'Confirm',
  message,
  confirmAction = 'Yes',
  cancelAction = 'Cancel',
  initialFocus = 'cancel',
}: ConfirmModalProps): Promise<boolean> {
  const cancelButton = createRef<HTMLElement>();
  const confirmButton = createRef<HTMLElement>();
  const initialFocusRef =
    initialFocus === 'cancel' ? cancelButton : confirmButton;

  const container = document.createElement('div');
  container.setAttribute('data-testid', 'confirm-container');

  // Ensure dialog appears above any existing content. The Z-index value here
  // is Good Enough™ for current usage.
  container.style.position = 'relative';
  container.style.zIndex = '10';

  document.body.appendChild(container);

  return new Promise(resolve => {
    const close = (result: boolean) => {
      render(null, container);
      container.remove();
      resolve(result);
    };

    render(
      <ModalDialog
        buttons={
          <>
            <Button
              elementRef={cancelButton}
              data-testid="cancel-button"
              onClick={() => close(false)}
            >
              {cancelAction}
            </Button>
            <Button
              variant="primary"
              elementRef={confirmButton}
              data-testid="confirm-button"
              onClick={() => close(true)}
            >
              {confirmAction}
            </Button>
          </>
        }
        initialFocus={initialFocusRef}
        title={title}
        onClose={() => close(false)}
      >
        {message}
      </ModalDialog>,
      container,
    );
  });
}
