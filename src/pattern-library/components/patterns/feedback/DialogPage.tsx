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
  _alwaysShowButton?: boolean;
};

/**
 * Wrap the Dialog component with some state management to make reuse in
 * multiple examples plausible and convenient.
 */
function Dialog_({
  buttons,
  _alwaysShowButton = false,
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

  const openButton = (
    <Button onClick={() => setDialogOpen(!dialogOpen)} variant="primary">
      {dialogOpen ? 'Hide' : 'Show'} dialog
    </Button>
  );

  return (
    <div className="flex w-full gap-x-2">
      {(!dialogOpen || _alwaysShowButton) && <div>{openButton}</div>}
      <div className="grow">
        {dialogOpen && (
          <Dialog
            buttons={forwardedButtons}
            {...dialogProps}
            onClose={closeHandler}
          >
            {children}
          </Dialog>
        )}
      </div>
    </div>
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
          for the <code>Modal</code> component, for non-modal dialogs.
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
                Creation of <code>Dialog</code> component.
              </li>
              <li>Support close-on-ESC (disabled by default).</li>
              <li>Support close-on-click-away (disabled by default).</li>
              <li>Support close-on-away-focus (disabled by default).</li>
              <li>Initial focus routing</li>
              <li>
                Support focus restoration after close (disabled by default)
              </li>
            </ul>
          </Library.Example>

          <Library.Example title="TODO">
            <ul>
              <li>Support focus trapping (disabled by default)</li>
              <li>All tests and vet automated accessibility tests</li>
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
        </Library.Pattern>

        <Library.Pattern title="Props">
          <p>
            <em>Note</em>: At present these props only include those that are
            additional to or differ from props accepted by the Modal component.
            All component props will be documented before Dialog is released.
          </p>

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
              Enable close-on-ESC behavior by setting this boolean prop (default{' '}
              <code>false</code>).
            </p>

            <Library.Demo
              title="Dialog with close-on-Escape behavior"
              withSource
            >
              <Dialog_ closeOnEscape onClose={() => {}} title="Close on ESC">
                <p>
                  This dialog will close if you press <kbd>Escape</kbd>.
                </p>
              </Dialog_>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="restoreFocus">
            <p>
              This boolean prop (default <code>false</code>) restores focus when
              the Dialog is closed to the element that had focus before it was
              opened.
            </p>
            <p>
              Note: This example does not hide its button when the Dialog is
              open, as the button needs to be present to restore focus to it.
            </p>

            <Library.Demo
              title="Dialog with focus restoration on close"
              withSource
            >
              <Dialog_
                _alwaysShowButton
                restoreFocus
                onClose={() => {}}
                title="Restore focus"
              >
                <p>
                  This dialog will restore focus to the previously-focused
                  element on close.
                </p>
              </Dialog_>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
