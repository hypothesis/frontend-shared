import { createRef, render } from 'preact';
import { useState } from 'preact/hooks';
import { Dialog, LabeledButton } from '../../../';

import { PatternPage, Pattern } from '../PatternPage';

/**
 * Render a Dialog within the `container`, and invoke
 * `setDialogIsOpen` as needed to alert caller to state changes. Provides the
 * ability to open and close a Dialog demo. We don't want to render a Dialog
 * until it's opened because it will grab focus when it first mounts.
 *
 * @param {Object} options
 *   @prop {HTMLElement} container - Element to render the Dialog inside of
 *   @prop {(isOpen: boolean) => void} setDialogIsOpen - callback to call when
 *     the Dialog state changes: opened (true) or closed/removed (false)
 */
const showDialog = ({ container, setDialogIsOpen }) => {
  const initialFocusRef = createRef();

  const close = message => {
    if (message) {
      alert(message);
    }
    render(null, container);
    setDialogIsOpen(false);
  };

  const extraButtons = [
    <LabeledButton key="maybe" onClick={() => close('You chose maybe!')}>
      Maybe
    </LabeledButton>,
    <LabeledButton
      key="yep"
      onClick={() => close('You chose "Do it!"')}
      variant="primary"
    >
      Do it!
    </LabeledButton>,
  ];

  render(
    <Dialog
      buttons={extraButtons}
      icon="edit"
      initialFocus={initialFocusRef}
      title="Basic dialog with icon"
      onCancel={() => close()}
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
    </Dialog>,
    container
  );
};

export default function DialogPatterns() {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const openDialog = () => {
    setDialogIsOpen(true);
    showDialog({
      container: document.getElementById('#dialog1'),
      setDialogIsOpen,
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
                <div id="#dialog1" />
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
    </PatternPage>
  );
}
