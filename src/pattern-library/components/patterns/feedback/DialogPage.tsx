import { useState, useRef } from 'preact/hooks';

import { Dialog } from '../../../../components/feedback';
import { ModalDialog } from '../../../../components/feedback';
import type { DialogProps } from '../../../../components/feedback/Dialog';
import type { ModalDialogProps } from '../../../../components/feedback/ModalDialog';
import {
  ArrowRightIcon,
  Button,
  CautionIcon,
  DataTable,
  EditIcon,
  IconButton,
  Input,
  InputGroup,
  Link,
  Scroll,
} from '../../../../next';
import Library from '../../Library';
import { LoremIpsum, nabokovNovels } from '../samples';

const nabokovRows = nabokovNovels();
const nabokovColumns = [
  { field: 'title', label: 'Title' },
  { field: 'year', label: 'Year' },
  { field: 'language', label: 'Language' },
];

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

export default function DialogPage() {
  const inputRef = useRef(null);
  return (
    <Library.Page
      title="Dialogs"
      intro={
        <p>
          <code>Dialog</code> and <code>ModalDialog</code> provide functionality
          similar to a {"browser's"} <code>dialog</code> element, with applied
          <code>Panel</code> layout.
        </p>
      }
    >
      <Library.Section
        title="Dialog"
        intro={
          <p>
            <code>Dialog</code> renders a non-modal dialog. It handles focus
            routing and provides other optional dialog behaviors.
          </p>
        }
      >
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

        <Library.Pattern title="Props">
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

          <Library.Example title="initialFocus">
            <p>
              The <code>initialFocus</code> prop determines how focus is routed
              when a <code>Dialog</code> is mounted (opened). Accepted values:
            </p>
            <ul>
              <li>
                <code>{"'auto'"}</code> (default): Focus is routed to the
                outermost element of the <code>Dialog</code> when opeend.
              </li>
              <li>
                <code>RefObject{'<HTMLOrSVGElement>'}</code>: Focus will be
                routed to the referenced element.
              </li>
              <li>
                <code>{"'manual'"}</code>: Disable automatic focus routing.
                Consumer is responsible for routing focus appropriately.
              </li>
            </ul>
          </Library.Example>

          <Library.Example title="restoreFocus">
            <p>
              This boolean prop (default <code>false</code>) restores focus when
              the Dialog is closed to the element that had focus before it was
              opened.
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

          <Library.Example title="onClose">
            <p>
              It is possible to create a non-closeable <code>Dialog</code> by
              omitting the <code>onClose</code> prop.
            </p>
            <div className="flex gap-x-2 items-center">
              <CautionIcon className="text-yellow-notice w-6 h-6" />
              <p>
                This flexibility exists to support legacy use cases. Avoid
                creating new non-closeable dialogs.
              </p>
            </div>
            <Library.Demo title="Non-closeable Dialog example" withSource>
              <Dialog_
                icon={EditIcon}
                title="Non-closeable dialog example"
                _nonCloseable
              >
                <p>
                  This is a {'"non-closeable"'} <code>Dialog</code>. This
                  pattern should be avoided, but is supported for a few legacy
                  use cases. You can close this modal by clicking the{' '}
                  {'"Escape!"'} button.
                </p>
              </Dialog_>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Forwarded Props: Panel">
          <p>
            These props are forwarded to <code>Panel</code>:
          </p>
          <ul>
            <li>
              <code>buttons</code>
            </li>
            <li>
              <code>icon</code>
            </li>
            <li>
              <code>onClose</code>
            </li>
            <li>
              <code>paddingSize</code>
            </li>
            <li>
              <code>title</code>
            </li>
          </ul>
          <p>
            <code>fullWidthHeader</code> is always <code>true</code>.
          </p>
        </Library.Pattern>
      </Library.Section>

      <Library.Section
        title="ModalDialog"
        intro={
          <p>
            <code>ModalDialog</code> renders a modal dialog with a full-screen
            backdrop overlay. It extends <code>Dialog</code> and sets some
            different behavioral defaults.
          </p>
        }
      >
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
            By default, <code>ModalDialog</code>s will close on escape keypress
            (<code>closeOnEscape</code>) and restore focus on close (
            <code>restoreFocus</code>). It also traps focus unless overridden
            with <code>disableFocusTrap</code>.
          </p>
          <Library.Demo title="Basic ModalDialog" withSource>
            <ModalDialog_
              _alwaysShowButton
              buttons={<DialogButtons />}
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

          <Library.Example title="Handling long content">
            <p>
              By default, content in a <code>Dialog</code> or{' '}
              <code>ModalDialog</code> will scroll as needed to keep the modal
              from exceeding viewport capacity.
            </p>
            <Library.Demo title="Modal with overflowing content" withSource>
              <ModalDialog_
                buttons={<DialogButtons />}
                onClose={() => {}}
                title="Modal with long content"
              >
                <LoremIpsum size="lg" />
              </ModalDialog_>
            </Library.Demo>
          </Library.Example>
          <Library.Example title="Managing modal height">
            <p>
              By default, the height of a modal is dependent on the content
              inside of it. It will grow in height as needed for the content
              until it fills the available vertical space in the viewport, after
              which it will (unless disabled) scroll overheight content.
            </p>
            <p>
              But you may wish to control the height of your modals. There are
              two options:
            </p>
            <ul>
              <li>
                <strong>Set a height on the Modal</strong> itself. The Modal
                will always render at this height. If contained content height
                exceeds this height, it will scroll.
              </li>
              <li>
                <strong>Set a minimum height on the {"Modal's"} content</strong>
                . The Modal will always render at least this height, but will
                grow in height if needed to accommodate longer content (up to
                the bounds of the viewport).
              </li>
            </ul>
            <Library.Demo title="ModalDialog with a fixed height" withSource>
              <ModalDialog_
                title="Modal with a fixed height"
                buttons={<DialogButtons />}
                classes="h-[25rem]"
                onClose={() => {}}
              >
                <p>
                  This Modal has a height of <code>25rem</code>.
                </p>
              </ModalDialog_>
            </Library.Demo>

            <Library.Demo
              title="Modal with a fixed height: long content"
              withSource
            >
              <ModalDialog_
                title="ModalDialog with a fixed height"
                buttons={<DialogButtons />}
                classes="h-[25rem]"
                onClose={() => {}}
              >
                <p>
                  This Modal has a height of <code>25rem</code> and long
                  content.
                </p>
                <LoremIpsum size="lg" />
              </ModalDialog_>
            </Library.Demo>

            <Library.Demo
              title="Modal with a minimum content height and not much content"
              withSource
            >
              <ModalDialog_
                title="Modal with minimum height set on content"
                buttons={<DialogButtons />}
                onClose={() => {}}
              >
                <div className="min-h-[15rem]">
                  <p>
                    This {"Modal's"} content has a preferred height of 15rem set
                    by a CSS class.
                  </p>
                </div>
              </ModalDialog_>
            </Library.Demo>

            <Library.Demo
              title="Modal with a minimum height and scrolling content"
              withSource
            >
              <ModalDialog_
                title="Modal with a minimum height and tall content"
                buttons={<DialogButtons />}
                onClose={() => {}}
              >
                <div className="min-h-[15rem] space-y-3">
                  <p>
                    This modal has a preferred height of 15rem, but its content
                    exceeds the height of the viewport, and scrolls.
                  </p>
                  <hr />
                  <p>
                    <LoremIpsum size="lg" />
                  </p>
                </div>
              </ModalDialog_>
            </Library.Demo>
          </Library.Example>
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
                buttons={<DialogButtons />}
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

          <Library.Example title="size">
            <p>
              The <code>size</code> prop affects the width of a{' '}
              <code>ModalDialog</code>.
            </p>
            <Library.Demo title="size='sm'" withSource>
              <ModalDialog_
                buttons={<DialogButtons />}
                onClose={() => {}}
                title="Small modal"
                size="sm"
              >
                <LoremIpsum size="sm" />
              </ModalDialog_>
            </Library.Demo>

            <Library.Demo title="size='md' (default)" withSource>
              <ModalDialog_
                buttons={<DialogButtons />}
                onClose={() => {}}
                title="Medium-width modal"
                size="md"
              >
                <LoremIpsum size="md" />
              </ModalDialog_>
            </Library.Demo>

            <Library.Demo title="size='lg'" withSource>
              <ModalDialog_
                buttons={<DialogButtons />}
                onClose={() => {}}
                title="Wide modal"
                size="lg"
              >
                <LoremIpsum size="md" />
              </ModalDialog_>
            </Library.Demo>

            <p>
              To style your <code>ModalDialog</code> with a custom width, set{' '}
              <code>size</code> to <code>{"'custom'"}</code> and provide sizing
              CSS class(es) via the <code>classes</code> prop.
            </p>

            <Library.Demo title="size='custom'" withSource>
              <ModalDialog_
                buttons={<DialogButtons />}
                classes="w-[40em]"
                onClose={() => {}}
                title="Custom-width modal"
                size="custom"
              >
                <LoremIpsum size="md" />
              </ModalDialog_>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="scrollable (default true)">
            <p>
              By default, dialogs will scroll overflowing content. In some
              cases, it is desireable to scroll only a portion of the content,
              or to disable scrolling entirely.
            </p>
            <p>
              This example demonstrates setting the boolean{' '}
              <code>scrollable</code> prop to <code>false</code> and using a{' '}
              <code>Scroll</code> component within Modal content to scroll only
              a portion of the content.
            </p>
            <Library.Demo title="Manually controlling scrolling" withSource>
              <ModalDialog_
                buttons={<DialogButtons />}
                classes="h-[25rem]"
                onClose={() => {}}
                title="Modal with scrollable disabled"
                scrollable={false}
              >
                <p>
                  Fake {'>'} breadcrumbs {'>'} example
                </p>
                <Scroll>
                  <DataTable
                    rows={nabokovRows}
                    columns={nabokovColumns}
                    title="Nabokov novels"
                  />
                </Scroll>
              </ModalDialog_>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="Forwarded Props: Dialog">
            <p>
              <code>ModalDialog</code> accepts and forwards all{' '}
              <code>Dialog</code> props, including forwarded <code>Panel</code>{' '}
              props.
            </p>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
