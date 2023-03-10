import { useState, useRef } from 'preact/hooks';

import { ModalDialog } from '../../../../components/feedback';
import type { ModalDialogProps } from '../../../../components/feedback/ModalDialog';
import {
  ArrowRightIcon,
  Button,
  EditIcon,
  IconButton,
  Input,
  InputGroup,
} from '../../../../next';
import Library from '../../Library';

function ModalDialogButtons() {
  return (
    <>
      <Button key="maybe" onClick={() => alert('You chose maybe')}>
        Maybe
      </Button>
      <Button
        key="yep"
        onClick={() => alert('You chose yep')}
        variant="primary"
      >
        Do it!
      </Button>
    </>
  );
}

type ModalDialog_Props = ModalDialogProps & {
  /** Pattern-wrapping prop. Not visible in source view */
  _nonCloseable?: boolean;
};

/**
 * Wrap the ModalDialog component with some state management to make reuse in
 * multiple examples plausible and convenient.
 */
function ModalDialog_({
  buttons,
  _nonCloseable,
  children,
  ...dialogProps
}: ModalDialog_Props) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const closeDialog = () => setDialogOpen(false);

  const closeHandler = _nonCloseable ? undefined : closeDialog;
  const forwardedButtons = buttons ? (
    buttons
  ) : (
    <Button onClick={closeDialog}>Escape!</Button>
  );

  if (!dialogOpen) {
    return (
      <Button onClick={() => setDialogOpen(!dialogOpen)} variant="primary">
        Show modal dialog
      </Button>
    );
  }

  return (
    <ModalDialog
      buttons={forwardedButtons}
      {...dialogProps}
      onClose={closeHandler}
    >
      {children}
    </ModalDialog>
  );
}

export default function ModalDialogPage() {
  const inputRef = useRef(null);
  return (
    <Library.Page
      title="ModalDialog"
      intro={
        <p>
          <code>ModalDialog</code> is intended as a more full-featured
          replacement for the <code>Modal</code> component, for modal dialogs.
        </p>
      }
    >
      <Library.Section title="ModalDialog">
        <Library.Pattern title="Status">
          <p>
            <strong>
              <code>ModalDialog</code> is under development
            </strong>{' '}
            and is not yet part of this {"package's"} public API.
          </p>
        </Library.Pattern>
        <Library.Pattern title="Usage">
          <Library.Usage componentName="ModalDialog" />
          <p>
            By default, <code>ModalDialog</code>s close when the ESC key is
            pressed.
          </p>
          <Library.Demo title="Basic ModalDialog" withSource>
            <ModalDialog_
              buttons={<ModalDialogButtons />}
              icon={EditIcon}
              initialFocus={inputRef}
              onClose={() => {}}
              title="Basic dialog"
            >
              <p>This is a basic ModalDialog.</p>
              <InputGroup>
                <Input name="my-input" elementRef={inputRef} />
                <IconButton icon={ArrowRightIcon} variant="dark" title="go" />
              </InputGroup>
            </ModalDialog_>
          </Library.Demo>
        </Library.Pattern>
        <Library.Pattern title="Props">TODO</Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
