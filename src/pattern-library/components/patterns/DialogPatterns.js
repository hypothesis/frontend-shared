import { createRef, render } from 'preact';
import { useState } from 'preact/hooks';
import { ConfirmModal, Dialog, LabeledButton, Modal } from '../../../';

import { PatternPage, Pattern } from '../PatternPage';

/**
 * Render a Dialog or Modal within the `container`, and invoke
 * `setDialogIsOpen` as needed to alert caller to state changes. Provides the
 * ability to open and close a Dialog demo. We don't want to render a Dialog
 * until it's opened because it will grab focus when it first mounts.
 *
 * @param {Object} options
 *   @param {import('preact').FunctionComponent} options.DialogComponent - Which Dialog
 *   or Dialog-wrapping component (function) to use;
 *   a reference to `Dialog`, `Modal`, `ConfirmModal`, e.g.
 *   @param {HTMLElement} options.container - Element to render the Dialog inside of
 *   @param {(isOpen: boolean) => void} options.setOpen - callback to call when
 *     the Dialog state changes: opened (true) or closed/removed (false)
 *   @param {Object} [options.props] - Extra prop(s) for Dialog component
 */
const showDialog = ({ DialogComponent, container, setOpen, props }) => {
  const initialFocusRef = createRef();

  const close = message => {
    if (message) {
      alert(message);
    }
    if (container) {
      render(null, container);
    }
    setOpen(false);
  };

  if (!container) {
    return null;
  }

  return render(
    <DialogComponent
      icon="edit"
      initialFocus={initialFocusRef}
      title="Basic dialog with icon"
      onCancel={() => close()}
      {...props}
    >
      <div>
        <p>This is an example of a dialog.</p>
        <p>
          This dialog contains an <code>input</code> which is focused when the
          dialog is opened.
        </p>
        <input
          className="hyp-u-focus-outline"
          ref={initialFocusRef}
          type="text"
        />
      </div>
    </DialogComponent>,
    container
  );
};

export default function DialogPatterns() {
  // Extra buttons to use in Dialog, Modal examples
  const buttons = [
    <LabeledButton key="maybe" onClick={() => alert('You chose maybe')}>
      Maybe
    </LabeledButton>,
    <LabeledButton
      key="yep"
      onClick={() => alert('You chose yep')}
      variant="primary"
    >
      Do it!
    </LabeledButton>,
  ];

  // Dialog/Modal state for each of the examples
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [, setModalIsOpen] = useState(false);
  const [, setConfirmModalIsOpen] = useState(false);

  const openDialog = () => {
    setDialogIsOpen(true);
    showDialog({
      DialogComponent: Dialog,
      container: /** @type {HTMLElement} */ (document.getElementById(
        'dialog1'
      )),
      setOpen: setDialogIsOpen,
      props: {
        buttons,
      },
    });
  };

  const openModal = () => {
    setModalIsOpen(true);
    showDialog({
      DialogComponent: Modal,
      container: /** @type {HTMLElement} */ (document.getElementById('modal1')),
      setOpen: setModalIsOpen,
      props: {
        buttons,
      },
    });
  };

  const openConfirmModal = () => {
    setConfirmModalIsOpen(true);
    showDialog({
      DialogComponent: ConfirmModal,
      container: /** @type {HTMLElement} */ (document.getElementById(
        'confirm-modal1'
      )),
      setOpen: setConfirmModalIsOpen,
      props: {
        confirmAction: 'Sure thing',
        message: 'Confirm modal content goes right here.',
        title: 'Confirm Modal Example',
        onConfirm: () => alert('ok'),
      },
    });
  };
  return (
    <PatternPage title="Dialogs">
      <Pattern title="Dialog">
        <div className="Example">
          <p>
            A <code>Dialog</code> prompts for user interaction and will take
            focus when opened.
          </p>
          <p>
            Use a <code>Dialog</code> when you want to route focus. Consider
            using a <code>Panel</code> for presenting panel-styled content that
            does not require grabbing focus.
          </p>
          <div className="Example__content">
            <div className="Example__usage">
              <p>
                This example shows a dismiss-able <code>Dialog</code> with an
                explicitly-provided element (<code>ref</code>) that should take
                initial focus: a text <code>input</code>. The highlighted
                outline is added here by using <code>.hyp-u-focus-outline</code>{' '}
                on the <code>input</code> element.
              </p>
              <p>
                <code>Dialogs</code> are styled using the <code>panel</code>{' '}
                pattern.
              </p>
            </div>
            <div className="Example__demo hyp-frame">
              <div>
                <div id="dialog1" />
                {!dialogIsOpen && (
                  <LabeledButton variant="primary" onClick={openDialog}>
                    Open dialog
                  </LabeledButton>
                )}
              </div>
            </div>
          </div>
        </div>
      </Pattern>

      <Pattern title="Modal">
        <div className="Example">
          <p>
            A <code>Modal</code> is a type of <code>Dialog</code> that centers
            on the screen and obscures the background with an overlay.
          </p>
          <div className="Example__content">
            <div className="Example__usage">
              <p>
                Close the modal by clicking the close (X) button, the cancel
                button or clicking anywhere outside of it.
              </p>
            </div>
            <div className="Example__demo hyp-frame">
              <div>
                <div id="modal1" />
                <LabeledButton variant="primary" onClick={openModal}>
                  Open modal
                </LabeledButton>
              </div>
            </div>
          </div>
        </div>
      </Pattern>

      <Pattern title="Confirm Modal">
        <div className="Example">
          <p>
            <code>ConfirmModal</code> is intended to mirror the functionality of{' '}
            <code>window.confirm</code>.
          </p>
          <div className="Example__content">
            <div className="Example__usage">
              <p>
                <code>ConfirmModal</code> prompts the user for a boolean yes/no
                input. Close and cancel are considered no.
              </p>
              <p>
                Handlers need to be provided for what to do on yes (
                <code>onConfirm</code>) and no/cancel (<code>onCancel</code>).
                Typically, both would (also) close the modal, though in this
                example, the <code>onConfirm</code> handler does not close the
                modal.
              </p>
            </div>
            <div className="Example__demo hyp-frame">
              <div>
                <div id="confirm-modal1" />
                <LabeledButton variant="primary" onClick={openConfirmModal}>
                  Open confirm modal
                </LabeledButton>
              </div>
            </div>
          </div>
        </div>
      </Pattern>
    </PatternPage>
  );
}
