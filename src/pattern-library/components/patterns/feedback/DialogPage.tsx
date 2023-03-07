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
  }

  return (
    <Dialog buttons={forwardedButtons} {...dialogProps} onClose={closeHandler}>
      {children}
    </Dialog>
  );
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

          <Library.Example title="Done">
            <ul>
              <li>
                Differentiation between modal and non-modal Dialogs via a{' '}
                <code>modal</code> prop.
              </li>
            </ul>
          </Library.Example>

          <Library.Example title="TODO">
            <ul>
              <li>
                Close on ESC keypress: Defaults to enabled for modal dialogs,
                off for non-modal dialogs. Can be controlled with a prop.
              </li>
              <li>
                Close on click-away: Defaults to enabled for modal dialogs, off
                for non-modal dialogs. Can be controlled with a prop.
              </li>
              <li>
                Close on focus-away: Defaults to off for all dialogs. Can be
                conrolled with a prop.
              </li>
              <li>
                Focus trap: Defaults to enabled for modal dialogs, off for
                non-modal dialogs. Can be controlled with a prop.
              </li>
              <li>
                Initial focus: Should search for <code>autofocus</code> elements
                when in {'"auto"'} mode. {"'manual'"} value should be renamed to{' '}
                {"'custom'"} per conventions.
              </li>
              <li>Focus restoration after close.</li>
              <li>
                Control over using <code>Panel</code> or not.
              </li>
              <li>
                <code>size</code> and <code>unstyled</code> support
              </li>
              <li>Vet automated accessibility tests.</li>
            </ul>
          </Library.Example>
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

          <Library.Demo title="Basic modal Dialog" withSource>
            <Dialog_
              buttons={<DialogButtons />}
              icon={EditIcon}
              initialFocus={inputRef}
              onClose={() => {}}
              title="Basic dialog"
              modal
            >
              <p>
                This is a basic modal Dialog that routes focus initially to a
                text input.
              </p>
              <InputGroup>
                <Input name="my-input" elementRef={inputRef} />
                <IconButton icon={ArrowRightIcon} variant="dark" title="go" />
              </InputGroup>
            </Dialog_>
          </Library.Demo>
        </Library.Pattern>

        <Library.Pattern title="Props">
          <p>
            <em>Note</em>: At present these props only include those that are
            additional to or differ from props accepted by the Modal component.
            All component props will be documented before Dialog is released.
          </p>
          <Library.Example title="modal">
            <p>
              Setting the <code>modal</code> <code>boolean</code> prop (default{' '}
              <code>false</code>) indicates that the Dialog should have modal
              behavior.
            </p>
            <p>
              <code>modal</code> Dialogs:
            </p>
            <ul>
              <li>Have a full-screen backdrop</li>
              <li>
                Position themselves on the screen and constrain the Dialog
                dimensions based on the viewport
              </li>
            </ul>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
