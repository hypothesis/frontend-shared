import { useState, useRef } from 'preact/hooks';

import { Dialog } from '../../../../components/feedback';
import type { DialogProps } from '../../../../components/feedback/Dialog';
import {
  ArrowRightIcon,
  Button,
  EditIcon,
  IconButton,
  Input,
  InputGroup,
} from '../../../../next';
import Library from '../../Library';

function DialogButtons() {
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

type Dialog_Props = DialogProps & {
  /** Pattern-wrapping prop. Not visible in source view */
  _nonCloseable?: boolean;
};

/**
 * Wrap the Dialog component with some state management to make reuse in
 * multiple examples plausible and convenient.
 */
function Dialog_({
  buttons,
  _nonCloseable,
  children,
  ...dialogProps
}: Dialog_Props) {
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
        Show dialog
      </Button>
    );
  } else {
    return (
      <Dialog
        buttons={forwardedButtons}
        {...dialogProps}
        onClose={closeHandler}
      >
        {children}
      </Dialog>
    );
  }
}

export default function DialogPage() {
  const inputRef = useRef(null);
  return (
    <Library.Page
      title="Dialog"
      intro={
        <p>
          <code>Dialog</code> is intended as a more full-featured replacement
          for the <code>Modal</code> component, supporting both modal and
          non-modal dialogs.
        </p>
      }
    >
      <Library.Section title="Dialog">
        <Library.Pattern title="Status">
          <p>
            <strong>
              <code>Dialog</code> is under development
            </strong>{' '}
            and is not yet part of this {"package's"} public API.
          </p>
        </Library.Pattern>
        <Library.Pattern title="Usage">
          <Library.Usage componentName="Dialog" />
          <Library.Demo title="Basic Dialog" withSource>
            <Dialog_
              buttons={<DialogButtons />}
              icon={EditIcon}
              initialFocus={inputRef}
              onClose={() => {}}
              title="Basic dialog"
            >
              <p>
                This is a basic Dialog that routes focus initially to a text
                input.
              </p>
              <InputGroup>
                <Input name="my-input" elementRef={inputRef} />
                <IconButton icon={ArrowRightIcon} variant="dark" title="go" />
              </InputGroup>
            </Dialog_>
          </Library.Demo>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
