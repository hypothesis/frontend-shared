import { useState, useRef } from 'preact/hooks';

import type { ModalProps } from '../../../../components/feedback/Modal';
import {
  ArrowRightIcon,
  Button,
  DataTable,
  EditIcon,
  IconButton,
  Input,
  InputGroup,
  Modal,
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

function ModalButtons() {
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

type Modal_Props = ModalProps & {
  /** Pattern-wrapping prop. Not visible in source view */
  _nonCloseable?: boolean;
};

/**
 * Wrap the Modal component with some state management to make reuse in
 * multiple examples plausible and convenient.
 */
function Modal_({
  buttons,
  _nonCloseable,
  children,
  ...modalProps
}: Modal_Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => setModalOpen(false);

  const closeHandler = _nonCloseable ? undefined : closeModal;
  const forwardedButtons = buttons ? (
    buttons
  ) : (
    <Button onClick={closeModal}>Escape!</Button>
  );

  if (!modalOpen) {
    return (
      <Button onClick={() => setModalOpen(!modalOpen)} variant="primary">
        Show modal
      </Button>
    );
  } else {
    return (
      <Modal buttons={forwardedButtons} {...modalProps} onClose={closeHandler}>
        {children}
      </Modal>
    );
  }
}

export default function ModalPage() {
  const inputRef = useRef(null);
  return (
    <Library.Page
      title="Modal"
      intro={
        <p>
          <code>Modal</code> is a presentational component for rendering modal
          dialogs. It currently renders modal content inside of a{' '}
          <code>Panel</code>.
        </p>
      }
    >
      <Library.Section
        title="Modal"
        intro={
          <p>
            This is an interim implementation of a modal dialog that conforms to
            updated styling and API conventions. It does not yet fully implement
            an accessible dialog. It routes focus, but does not trap or restore
            focus, e.g.
          </p>
        }
      >
        <Library.Pattern title="Status">
          <Library.Changelog>
            <Library.ChangelogItem status="deprecated">
              This implementation of
              <s>
                <code>Modal</code>
              </s>{' '}
              is deprecated. Use
              <code>ModalDialog</code> or <code>Dialog</code> instead, which
              provide a similar API and enhanced accessibility.
            </Library.ChangelogItem>
          </Library.Changelog>
        </Library.Pattern>
        <Library.Pattern title="Usage">
          <Library.Usage componentName="Modal" />
          <Library.Demo title="Basic modal" withSource>
            <Modal_
              buttons={<ModalButtons />}
              icon={EditIcon}
              initialFocus={inputRef}
              onClose={() => {}}
              title="Basic modal"
            >
              <p>
                This is a basic modal that routes focus initially to a text
                input.
              </p>
              <InputGroup>
                <Input name="my-input" elementRef={inputRef} />
                <IconButton icon={ArrowRightIcon} variant="dark" title="go" />
              </InputGroup>
            </Modal_>
          </Library.Demo>
        </Library.Pattern>

        <Library.Pattern title="Working with modals">
          <ul>
            <li>
              <code>Modal</code> supports and forwards several props to{' '}
              <code>Panel</code>: see Props section for details.
            </li>
            <li>
              <code>Modal</code> does not currently manage state. If a{' '}
              <code>Modal</code> is rendered, it is open, visible and active.
            </li>
            <li>
              Modals will invoke their <code>onClose</code> handler (unless they
              are non-closeable) when there are clicks or focus events outside
              of the modal, or if the <kbd>ESC</kbd> key is pressed.
            </li>
            <li>
              Modals route initial focus unless directed not to do so. See
              documentation for the <code>initialFocus</code> prop.
            </li>
            <li>Modals do not (yet) trap focus. They should.</li>
          </ul>
          <Library.Example title="Handling long content">
            <p>
              By default, content in a modal will scroll as needed to keep the
              modal from exceeding viewport capacity.
            </p>
            <Library.Demo title="Modal with overflowing content" withSource>
              <Modal_
                buttons={<ModalButtons />}
                onClose={() => {}}
                title="Modal with long content"
              >
                <LoremIpsum size="lg" />
              </Modal_>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="Non-closeable modals">
            <p>
              Modals <em>should</em> be given a <code>onClose</code> handler,
              but there are some edge use cases in which our applications render
              a non-closeable modal in uncoverable error states. A non-closeable
              modal can be achieved by not passing an <code>onClose</code>{' '}
              handler.
            </p>

            <Library.Demo title="Non-closeable modal" withSource>
              <Modal_ title="Non-closeable modal" _nonCloseable={true}>
                <p>
                  This is a non-closeable modal. There is no close button at the
                  top of the panel, and the modal cannot be dismissed by
                  pressing escape or clicking outside of it. However, an escape
                  hatch has been provided for you below (typically non-closeable
                  modals do not have any buttons).
                </p>
              </Modal_>
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
            <Library.Demo title="Modal with a fixed height" withSource>
              <Modal_
                title="Modal with a fixed height"
                buttons={<ModalButtons />}
                classes="h-[25rem]"
                onClose={() => {}}
              >
                <p>
                  This Modal has a height of <code>25rem</code>.
                </p>
              </Modal_>
            </Library.Demo>

            <Library.Demo
              title="Modal with a fixed height: long content"
              withSource
            >
              <Modal_
                title="Modal with a fixed height"
                buttons={<ModalButtons />}
                classes="h-[25rem]"
                onClose={() => {}}
              >
                <p>
                  This Modal has a height of <code>25rem</code> and long
                  content.
                </p>
                <LoremIpsum size="lg" />
              </Modal_>
            </Library.Demo>

            <Library.Demo
              title="Modal with a minimum content height and not much content"
              withSource
            >
              <Modal_
                title="Modal with minimum height set on content"
                buttons={<ModalButtons />}
                onClose={() => {}}
              >
                <div className="min-h-[15rem]">
                  <p>
                    This {"Modal's"} content has a preferred height of 15rem set
                    by a CSS class.
                  </p>
                </div>
              </Modal_>
            </Library.Demo>

            <Library.Demo
              title="Modal with a minimum height and scrolling content"
              withSource
            >
              <Modal_
                title="Modal with a minimum height and tall content"
                buttons={<ModalButtons />}
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
              </Modal_>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Props">
          <Library.Example title="props forwarded to Panel">
            <p>
              These props are forwarded to <code>Panel</code>:{' '}
              <code>buttons</code>, <code>icon</code>, <code>onClose</code>,{' '}
              <code>paddingSize</code> and <code>title</code>.
            </p>
            <p>
              <code>fullWidthHeader</code> is always <code>true</code>.
            </p>
          </Library.Example>
          <Library.Example title="initialFocus">
            <p>
              <code>Modal</code> will route focus when it is rendered. By
              default, focus will be set on the outermost <code>Modal</code>{' '}
              element. When a Ref is provided as <code>initialFocus</code>,
              focus will be routed to the element referenced by the Ref,
              instead.
            </p>
            <p>
              To opt out of focus routing entirely, e.g. in cases where the
              consumer wants to handle its own focus routing, set{' '}
              <code>initialFocus</code> to <code>{"'manual'"}</code>.
            </p>
          </Library.Example>

          <Library.Example title="width">
            <Library.Demo title="width='sm'" withSource>
              <Modal_
                buttons={<ModalButtons />}
                onClose={() => {}}
                title="Small modal"
                width="sm"
              >
                <LoremIpsum size="sm" />
              </Modal_>
            </Library.Demo>

            <Library.Demo title="width='md' (default)" withSource>
              <Modal_
                buttons={<ModalButtons />}
                onClose={() => {}}
                title="Medium-width modal"
                width="md"
              >
                <LoremIpsum size="md" />
              </Modal_>
            </Library.Demo>

            <Library.Demo title="width='lg'" withSource>
              <Modal_
                buttons={<ModalButtons />}
                onClose={() => {}}
                title="Wide modal"
                width="lg"
              >
                <LoremIpsum size="md" />
              </Modal_>
            </Library.Demo>

            <p>
              To style your <code>Modal</code> with a custom width, set{' '}
              <code>width</code> to <code>{"'custom'"}</code> and provide sizing
              CSS class(es) via the <code>classes</code> prop.
            </p>

            <Library.Demo title="width='custom'" withSource>
              <Modal_
                buttons={<ModalButtons />}
                classes="w-[40em]"
                onClose={() => {}}
                title="Custom-width modal"
                width="custom"
              >
                <LoremIpsum size="md" />
              </Modal_>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="scrollable (default true)">
            <p>
              By default, Modals will scroll overflowing content. In some cases,
              it is desireable to scroll only a portion of the content, or to
              disable scrolling entirely.
            </p>
            <p>
              This example demonstrates setting the boolean{' '}
              <code>scrollable</code> prop to <code>false</code> and using a{' '}
              <code>Scroll</code> component within Modal content to scroll only
              a portion of the content.
            </p>
            <Library.Demo title="Manually controlling scrolling" withSource>
              <Modal_
                buttons={<ModalButtons />}
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
              </Modal_>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
