import { useState, useRef } from 'preact/hooks';

import type { DialogProps } from '../../../../';
import {
  ArrowRightIcon,
  Button,
  CautionIcon,
  DataTable,
  Dialog,
  EditIcon,
  IconButton,
  Input,
  InputGroup,
  Link,
  Scroll,
  Tab,
  TabList,
} from '../../../../';
import { ModalDialog } from '../../../../components/feedback';
import type { ModalDialogProps } from '../../../../components/feedback/ModalDialog';
import Library from '../../Library';
import FadeComponent from '../FadeComponent';
import { LoremIpsum, nabokovNovels } from '../samples';
import type { NabokovNovel } from '../samples';

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

  // For the complex-modal example
  const [selectedRow, setSelectedRow] = useState<NabokovNovel | null>(null);
  const [selectedTab, setSelectedTab] = useState<'tab1' | 'tab2'>('tab1');
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
              <code>Dialog</code> is a new component.
            </strong>
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

          <Library.Example title="transitionComponent">
            <p>
              It allows to provide a component which supports transitions, but
              keeping the internal behavior (initial focus, closing, etc)
              transparent to consumers.
            </p>
            <p>
              The only requirement is that provided component needs to conform
              to the next props:
            </p>
            <Library.Code
              content={`type TransitionComponentProps = {
  visible: boolean;
  onTransitionEnd?: (direction: 'in' | 'out') => void;
}`}
            />
            <Library.Demo
              title="Dialog with TransitionComponent example"
              withSource
            >
              <Dialog_
                title="Dialog with TransitionComponent example"
                transitionComponent={FadeComponent}
              >
                <p>
                  This dialog has a fade in/out transition when opened/closed.
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
              <code>ModalDialog</code> is intended to replace the existing,
              deprecated <code>Modal</code> component.
            </strong>
          </p>
          <Library.Example title="Migrating to this component from Modal">
            <Library.Changelog>
              <Library.ChangelogItem status="changed">
                ModalDialogs trap focus and provide tab/shift-tab navigation
                through navigable elements. Disable this behavior by setting the{' '}
                <code>disableFocusTrap</code> prop.
              </Library.ChangelogItem>
              <Library.ChangelogItem status="changed">
                ModalDialogs restore focus to the previously-focused element
                when closed. Disable this behavior by setting the{' '}
                <code>disableRestoreFocus</code> prop.
              </Library.ChangelogItem>
              <Library.ChangelogItem status="changed">
                ModalDialogs do not close when the user clicks outside of them.
                Re-enable this behavior if needed by setting the{' '}
                <code>closeOnClickAway</code> prop.
              </Library.ChangelogItem>
              <Library.ChangelogItem status="changed">
                ModalDialogs do not close if there are focus events outside of
                their container. Re-enable this behavior if needed by setting
                the <code>closeOnFocusAwayProp</code>.
              </Library.ChangelogItem>
              <Library.ChangelogItem status="changed">
                ModalDialogs (still) close when the <kbd>Escape</kbd> key is
                pressed, but you can disable this behavior by setting the{' '}
                <code>disableCloseOnEscape</code> prop.
              </Library.ChangelogItem>
              <Library.ChangelogItem status="deprecated">
                <code>width</code> prop → use <code>size</code> instead
              </Library.ChangelogItem>
            </Library.Changelog>
          </Library.Example>
        </Library.Pattern>
        <Library.Pattern title="Usage">
          <Library.Usage componentName="ModalDialog" />

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
              <ul className="list-disc m-8">
                <li>
                  It will close if you press the <kbd>Escape</kbd> key.
                </li>
                <li>
                  It will trap focus and allow navigation with tab and
                  shift-tab.
                </li>
                <li>It will restore focus after it is closed.</li>
              </ul>
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
          <Library.Example title="Handling complex modals">
            <p>
              Modal dialogs should provide appropriate keyboard navigation even
              when there are multiple or complex embedded widgts, like data
              tables (ARIA <code>{'`role="grid"`'}</code>) or tabs (ARIA{' '}
              <code>{'`role="tablist"`'}</code>).
            </p>
            <Library.Demo title="Modal with embedded ARIA widgets" withSource>
              <ModalDialog_
                buttons={<DialogButtons />}
                classes="h-[25rem]"
                onClose={() => {}}
                title="Modal with tabs and data table"
                scrollable={false}
              >
                <TabList classes="gap-x-4">
                  <Tab
                    textContent="Tab 1"
                    selected={selectedTab === 'tab1'}
                    onClick={() => setSelectedTab('tab1')}
                  >
                    Tab 1
                  </Tab>
                  <Tab
                    textContent="Tab 2"
                    selected={selectedTab === 'tab2'}
                    onClick={() => setSelectedTab('tab2')}
                  >
                    Tab 2
                  </Tab>
                </TabList>
                <p>
                  Content for both tabs, with{' '}
                  <Link href="#" underline="always">
                    a link
                  </Link>
                  .
                </p>
                {selectedTab === 'tab1' && (
                  <Scroll>
                    <DataTable
                      rows={nabokovRows}
                      columns={nabokovColumns}
                      title="Nabokov novels"
                      selectedRow={selectedRow}
                      onSelectRow={row => setSelectedRow(row)}
                    />
                  </Scroll>
                )}
                {selectedTab === 'tab2' && (
                  <>
                    <p>This is content on another, second, tab.</p>
                    <div className="flex gap-x-4">
                      <Button>Click me</Button>
                      <Button>No, me!</Button>
                    </div>
                  </>
                )}
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
                <strong>Set a height on the ModalDialog</strong> itself. The
                Modal will always render at this height. If contained content
                height exceeds this height, it will scroll.
              </li>
              <li>
                <strong>
                  Set a minimum height on the {"ModalDialog's"} content
                </strong>
                . The ModalDialog will always render at least this height, but
                will grow in height if needed to accommodate longer content (up
                to the bounds of the viewport).
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
                  This ModalDialog has a height of <code>25rem</code>.
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
                  This ModalDialog has a height of <code>25rem</code> and long
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
                    This {"ModalDialog's"} content has a preferred height of
                    15rem set by a CSS class.
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
          <Library.Example title="disableCloseOnEscape">
            <p>
              Set this boolean prop (default <code>false</code>) to disable
              closing the modal when the <kbd>Escape</kbd> key is pressed.
            </p>
          </Library.Example>
          <Library.Example title="disableFocusTrap">
            <p>
              This boolean prop (default <code>false</code>) enables
              modal-dialog focus trap and keyboard navigation as specified by{' '}
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
          </Library.Example>

          <Library.Example title="disableRestoreFocus">
            <p>
              Set this boolean prop (default <code>false</code>) to disable the
              restoration of focus after the <code>ModalDialog</code> is closed.
            </p>
          </Library.Example>

          <Library.Example title="size">
            <p>
              The <code>size</code> prop establishes the width of the modal
              dialog.
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
              The <i>Handling Complex Modals</i> example above disables
              scrolling with the <code>scrollable</code> prop.
            </p>
          </Library.Example>

          <Library.Example title="width">
            <p>
              The{' '}
              <s>
                <code>width</code>
              </s>{' '}
              prop is deprecated: use <code>size</code> instead.
            </p>
          </Library.Example>

          <Library.Example title="Forwarded Props: Dialog">
            <p>
              <code>ModalDialog</code> forwards the following props (defaults in
              parentheses) to <code>Dialog</code>:
            </p>
            <ul>
              <li>
                <code>closeOnClickAway</code> (<code>false</code>)
              </li>
              <li>
                <code>closeOnFocusAway</code> (<code>false</code>)
              </li>
              <li>
                <code>initialFocus</code> (<code>{"'auto'"}</code>)
              </li>
            </ul>
            <p>
              <code>Panel</code> props forwarded by <code>Dialog</code> are also
              accepted.
            </p>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
