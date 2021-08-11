import { createRef } from 'preact';
import { useState } from 'preact/hooks';
import {
  ConfirmModal,
  Dialog,
  LabeledButton,
  Modal,
  TextInputWithButton,
  TextInput,
  IconButton,
} from '../../../';

import Library from '../Library';

import { LoremIpsum } from './samples';

function DialogExample() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const focusRef = createRef();

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

  if (!dialogOpen) {
    return (
      <LabeledButton
        onClick={() => setDialogOpen(!dialogOpen)}
        variant="primary"
      >
        Show Dialog Example
      </LabeledButton>
    );
  } else {
    return (
      <Dialog
        buttons={buttons}
        icon="edit"
        initialFocus={focusRef}
        onCancel={() => setDialogOpen(false)}
        title="This is a Dialog"
      >
        <p>
          This is a <code>Dialog</code>, with initial focus on a{' '}
          <code>TextInputWithButton</code> component input.
        </p>
        <TextInputWithButton>
          <TextInput name="my-input" inputRef={focusRef} />
          <IconButton icon="arrow-right" variant="dark" title="go" />
        </TextInputWithButton>
      </Dialog>
    );
  }
}

function ModalExample() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const focusRef = createRef();

  const buttons = [
    <LabeledButton
      key="yep"
      onClick={() => alert('You chose Save')}
      variant="primary"
    >
      Save
    </LabeledButton>,
  ];

  if (!dialogOpen) {
    return (
      <LabeledButton
        onClick={() => setDialogOpen(!dialogOpen)}
        variant="primary"
      >
        Show Modal Example
      </LabeledButton>
    );
  } else {
    return (
      <Modal
        buttons={buttons}
        initialFocus={focusRef}
        onCancel={() => setDialogOpen(false)}
        title="Sample Modal"
      >
        <p>
          This is a <code>Modal</code>, with initial focus on a{' '}
          <code>TextInputWithButton</code> component input.
        </p>
        <TextInputWithButton>
          <TextInput name="my-input" inputRef={focusRef} />
          <IconButton icon="arrow-right" variant="dark" title="go" />
        </TextInputWithButton>
      </Modal>
    );
  }
}

function LongModalExample() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const buttons = [
    <LabeledButton
      key="yep"
      onClick={() => alert('You chose Save')}
      variant="primary"
    >
      Save
    </LabeledButton>,
  ];

  if (!dialogOpen) {
    return (
      <LabeledButton
        onClick={() => setDialogOpen(!dialogOpen)}
        variant="primary"
      >
        Show Long Modal
      </LabeledButton>
    );
  } else {
    return (
      <Modal
        buttons={buttons}
        onCancel={() => setDialogOpen(false)}
        title="Modal with overflowing content"
      >
        <div className="hyp-scrollbox">
          <LoremIpsum />
        </div>
      </Modal>
    );
  }
}

function ConfirmModalExample() {
  const [dialogOpen, setDialogOpen] = useState(false);

  if (!dialogOpen) {
    return (
      <LabeledButton
        onClick={() => setDialogOpen(!dialogOpen)}
        variant="primary"
      >
        Show ConfirmModal Example
      </LabeledButton>
    );
  } else {
    return (
      <ConfirmModal
        confirmAction="OK"
        message="Are you sure you want to take out a second mortgage?"
        onCancel={() => setDialogOpen(false)}
        onConfirm={() => alert('ok')}
        title="Confirm this"
      />
    );
  }
}

export default function DialogComponents() {
  return (
    <Library.Page title="Dialogs">
      <Library.Pattern title="Dialog">
        <p>
          A <code>Dialog</code> prompts for user interaction and will take focus
          when opened.
        </p>
        <p>
          Use a <code>Dialog</code> when you want to route focus. Consider using
          a <code>Panel</code> for presenting panel-styled content that does not
          require grabbing focus.
        </p>
        <p>
          <code>Dialogs</code> are styled using the <code>panel</code> pattern.
        </p>
        <Library.Example title="Setting initial focus">
          <p>
            This example shows a dismiss-able <code>Dialog</code> with an
            explicitly-provided element (<code>ref</code>) that should take
            initial focus: a text <code>input</code>. The highlighted outline is
            added here by using <code>.hyp-u-focus-outline</code> on the{' '}
            <code>input</code> element.
          </p>
          <p>
            In some cases, you might need finer control over which element is
            focused when the <code>Dialog</code> or <code>Modal</code> is
            opened. This might arise if you have nested components within a{' '}
            <code>Modal</code> or <code>Dialog</code>, or there is complex logic
            about focus. Setting the <code>initialFocus</code> prop to{' '}
            <code>null</code> will opt out of automatic focus handling.
          </p>

          <Library.Demo>
            <DialogExample />
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>

      <Library.Pattern title="Modal">
        <p>
          A <code>Modal</code> is a type of <code>Dialog</code> that centers on
          the screen and obscures the background with an overlay.
        </p>
        <Library.Example title="Basic usage">
          <p>
            Close the modal by clicking the close (X) button, the cancel button
            or clicking anywhere outside of it.
          </p>
          <Library.Demo>
            <ModalExample />
          </Library.Demo>
        </Library.Example>

        <Library.Example title="Handling content overflow">
          <p>
            Modals that may contain a lot of content may need to handle overflow
            (i.e. make their content scrollable) so that the modal height
            doesn&apos;t exceed available viewport space.
          </p>
          <p>
            To make something in a modal scroll-able, apply{' '}
            <code>overflow: auto</code> to the element you wish to contain. This
            element needs to be an immediate-child element of the{' '}
            <code>Modal</code>.
          </p>
          <Library.Demo>
            <LongModalExample />
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>

      <Library.Pattern title="ConfirmModal">
        <p>
          <code>ConfirmModal</code> is intended to mirror the functionality of{' '}
          <code>window.confirm</code>.
        </p>
        <Library.Example>
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
          <Library.Demo>
            <ConfirmModalExample />
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>
    </Library.Page>
  );
}
