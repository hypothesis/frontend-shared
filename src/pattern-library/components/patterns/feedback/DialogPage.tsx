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
              <li>
                Close on ESC keypress: Defaults to enabled for modal dialogs,
                off for non-modal dialogs. Can be controlled with a prop.
              </li>
              <li>
                Close on click-away: Defaults to off for all dialogs. Can be
                controlled with a prop.
              </li>
              <li>
                Close on focus-away: Defaults to off for all dialogs. Can be
                controlled with a prop.
              </li>
            </ul>
          </Library.Example>

          <Library.Example title="TODO">
            <ul>
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

          <p>
            Modal dialogs position themselves atop a full-screen overlay, and
            will close by default when <kbd>Escape</kbd> is pressed.
          </p>

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
          <Library.Example title="closeOnClickAway">
            <p>
              This boolean prop (default <code>false</code>) controls whether
              the Dialog should close when there are click events outside of it.
            </p>
            <Library.Demo
              title="Dialog that closes on external clicks"
              withSource
            >
              <Dialog_
                closeOnClickAway
                onClose={() => {}}
                title="Dialog that closes when there are external clicks"
              >
                <p>This dialog will close if you click outside of it</p>
              </Dialog_>
            </Library.Demo>
          </Library.Example>
          <Library.Example title="closeOnFocusAway">
            <p>
              This boolean prop (default <code>false</code>) controls whether
              the Dialog should close when there are focus events outside of it.
            </p>
            <Library.Demo
              title="Dialog that closes on external focus events"
              withSource
            >
              <Dialog_
                closeOnFocusAway
                onClose={() => {}}
                title="Close on Away Focus"
              >
                <p>This dialog will close if you focus outside of it</p>
              </Dialog_>
            </Library.Demo>
          </Library.Example>
          <Library.Example title="closeOnEscape">
            <p>
              Close-on-<kbd>Escape</kbd> keypress behavior is enabled by default
              when <code>modal</code> is set. The default behavior may be
              overridden by setting this prop:
            </p>
            <ul>
              <li>
                Set to <code>true</code> to explicitly enable closing on{' '}
                <code>Escape</code>, e.g. on non-modal Dialogs
              </li>
              <li>
                Set to <code>false</code> to explicitly disable closing on{' '}
                <code>Escape</code>, e.g. on modal Dialogs
              </li>
            </ul>

            <Library.Demo
              title="Disabling close-on-Escape for a modal dialog"
              withSource
            >
              <Dialog_
                closeOnEscape={false}
                modal
                onClose={() => {}}
                title="ESC won't close me!"
              >
                <p>
                  This dialog will not close if you press <kbd>Escape</kbd>.
                </p>
              </Dialog_>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
