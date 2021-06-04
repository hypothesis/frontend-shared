import { useRef } from 'preact/hooks';

import { useElementShouldClose } from '../hooks/use-element-should-close';
import { Dialog } from './Dialog';
import { LabeledButton } from './buttons';

/**
 * @typedef {import('./Dialog').DialogProps} DialogProps
 */

/**
 * @typedef ModalBaseProps
 * @prop {() => void} onCancel - `onCancel` is required for Modals
 */

/**
 * @typedef {DialogProps & ModalBaseProps} ModalProps
 */

/**
 * A modal dialog. Presents a dialog with an overlay background. Will close
 * if user clicks/taps outside of it.
 *
 * @param {ModalProps} props
 */
export function Modal({ children, onCancel, ...restProps }) {
  const modalContainerRef = useRef(/** @type {HTMLDivElement | null} */ (null));

  useElementShouldClose(modalContainerRef, true /* isOpen */, () => {
    if (onCancel) {
      onCancel();
    }
  });

  return (
    <>
      <div className="Hyp-Modal__overlay" />
      <div className="Hyp-Modal" ref={modalContainerRef}>
        <Dialog onCancel={onCancel} {...restProps}>
          {children}
        </Dialog>
      </div>
    </>
  );
}

/**
 * @typedef ConfirmModalBaseProps
 * @prop {string} message - Main text of the modal message
 * @prop {string} confirmAction - Label for the "Confirm" button
 * @prop {() => void} onConfirm - Callback invoked if the user clicks the "Confirm" button
 * @prop {() => void} onCancel - Callback invoked if the user cancels
 *
 * @typedef {Omit<ModalProps, 'buttons' | 'children'> & ConfirmModalBaseProps} ConfirmModalProps
 */

/**
 * A modal that emulates a `window.confirm` interface:
 * request a boolean yes/no confirmation from the user.
 *
 * @param {ConfirmModalProps} props
 */
export function ConfirmModal({
  message,
  confirmAction,
  onConfirm,
  onCancel,
  ...restProps
}) {
  return (
    <Modal
      onCancel={onCancel}
      buttons={[
        <LabeledButton
          key="ok"
          onClick={onConfirm}
          variant="primary"
          data-testid="confirm-button"
        >
          {confirmAction}
        </LabeledButton>,
      ]}
      {...restProps}
    >
      <p>{message}</p>
    </Modal>
  );
}
