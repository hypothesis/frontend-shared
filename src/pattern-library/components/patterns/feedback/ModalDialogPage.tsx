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
  Link,
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
  _alwaysShowButton?: boolean;
};

/**
 * Wrap the ModalDialog component with some state management to make reuse in
 * multiple examples plausible and convenient.
 */
function ModalDialog_({
  buttons,
  _alwaysShowButton = false,
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

  const openButton = (
    <Button onClick={() => setDialogOpen(!dialogOpen)} variant="primary">
      {dialogOpen ? 'Hide' : 'Show'} dialog
    </Button>
  );

  return (
    <>
      {(!dialogOpen || _alwaysShowButton) && openButton}
      {dialogOpen && (
        <ModalDialog
          buttons={forwardedButtons}
          {...dialogProps}
          onClose={closeHandler}
        >
          {children}
        </ModalDialog>
      )}
    </>
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
            By default, <code>ModalDialog</code> components:
          </p>
          <ul>
            <li>Close on ESC keypress</li>
            <li>Trap focus and allow navigation with Tab/Shift-Tab keys</li>
            <li>Restore focus to previously-focused element when closed</li>
          </ul>
          <Library.Demo title="Basic ModalDialog" withSource>
            <ModalDialog_
              _alwaysShowButton
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
        <Library.Pattern title="Props">
          <Library.Example title="disableFocusTrap">
            <p>
              This boolean prop (default <code>true</code>) enables modal-dialog
              focus trap and keyboard navigation as specified by{' '}
              <Link
                href="https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/#keyboardinteraction"
                underline="always"
              >
                WAI-ARIA authoring guidelines
              </Link>
              .
            </p>
            <p>
              <em>Note</em>: Disabling this prop is not recommended and could
              raise issues of accessibility.
            </p>
            <Library.Demo title="Disabling focus trapping">
              <ModalDialog_
                _alwaysShowButton
                buttons={<ModalDialogButtons />}
                icon={EditIcon}
                initialFocus={inputRef}
                onClose={() => {}}
                title="Modal Dialog with disabled `trapFocus`"
                disableFocusTrap
              >
                <p>This is a ModalDialog that does not trap focus.</p>
                <InputGroup>
                  <Input name="my-input" elementRef={inputRef} />
                  <IconButton icon={ArrowRightIcon} variant="dark" title="go" />
                </InputGroup>
              </ModalDialog_>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="Props forwarded to Dialog">
            <p>
              The following optional props (<code>ModalDialog</code> defaults in
              parentheses) are forwarded to <code>Dialog</code>. See{' '}
              <code>Dialog</code> documentation for details.
            </p>
            <ul>
              <li>
                <code>closeOnEscape</code> (<code>true</code>)
              </li>
              <li>
                <code>closeOnClickAway</code> (<code>false</code>)
              </li>
              <li>
                <code>closeOnFocusAway</code> (<code>false</code>)
              </li>
              <li>
                <code>initialFocus</code> (<code>{"'auto'"}</code>)
              </li>
              <li>
                <code>restoreFocus</code> (<code>true</code>)
              </li>
            </ul>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
