import { useState, useRef } from 'preact/hooks';

import {
  ArrowRightIcon,
  Button,
  EditIcon,
  IconButton,
  Input,
  InputGroup,
  Modal,
} from '../../../../next';
import type { ModalProps } from '../../../../components/feedback/Modal';
import Library from '../../Library';
import Next from '../../LibraryNext';

import { LoremIpsum } from '../samples';

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
      <Library.Section title="Modal">
        <Library.Pattern title="Status">
          <p>
            <code>Modal</code> is a presentational component that combines
            aspects of legacy <code>Modal</code> and <code>Dialog</code>{' '}
            components.
          </p>
          <p>
            This is an interim implementation of a modal dialog that conforms to
            updated styling and API conventions. It does not yet fully implement
            an accessible dialog. It routes focus, but does not trap or restore
            focus, e.g.
          </p>
          <p>
            This implementation should, however, provide a more flexible and
            simplified API compared to its legacy counterpart.
          </p>
          <Library.Example title="Migrating to this component">
            <Next.Changelog>
              <Next.ChangelogItem status="breaking">
                Prop removed:{' '}
                <s>
                  <code>contentClass</code>
                </s>{' '}
                ➜ use <code>classes</code> instead to style the outer container.
              </Next.ChangelogItem>
              <Next.ChangelogItem status="breaking">
                Prop removed:{' '}
                <s>
                  <code>cancelLabel</code>
                </s>{' '}
                ➜ A cancel button is no longer automatically added when a close
                handler is present. Pass a cancel button with the other buttons
                in the <code>buttons</code> prop instead, and label it however
                you like.
              </Next.ChangelogItem>
              <Next.ChangelogItem status="breaking">
                Prop name:{' '}
                <s>
                  <code>onCancel</code>
                </s>{' '}
                ➜ <code>onClose</code>: This prop is forwarded to{' '}
                <code>Panel</code> and its naming more clearly indicates that
                its purpose is to handle the closing of the modal.
              </Next.ChangelogItem>
              <Next.ChangelogItem status="breaking">
                Props removed:{' '}
                <s>
                  <code>withCancelButton</code>
                </s>{' '}
                and{' '}
                <s>
                  <code>withCloseButton</code>
                </s>
                ➜ Cancel buttons are no longer automatically rendered based on
                the presence of the close handler. A close button will now
                always be rendered if <code>onClose</code> is provided.
              </Next.ChangelogItem>
              <Next.ChangelogItem status="changed">
                <code>icon</code> prop: Now takes an <code>IconComponent</code>{' '}
                instead of a <code>string</code>.
              </Next.ChangelogItem>
              <Next.ChangelogItem status="changed">
                <code>initialFocus</code> prop: Set to <code>{"'manual'"}</code>{' '}
                to opt out of automatic focus routing (formerly{' '}
                <code>null</code>).
              </Next.ChangelogItem>
              <Next.ChangelogItem status="added">
                Optional <code>width</code> prop
              </Next.ChangelogItem>
            </Next.Changelog>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Usage">
          <Next.Usage componentName="Modal" />
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
              Content in a modal will scroll as needed to keep the modal from
              exceeding viewport capacity.
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

          <Library.Example title="Use case: setting preferred height for modal content">
            <p>
              In some cases it might be desirable to set a preferred height for
              the content of a modal, so that the modal container does not
              resize or jump around if content changes.
            </p>
            <p>To do this, set a minimum height on the modal content.</p>
            <p>
              Styling in the <code>Modal</code> component should prevent content
              from escaping the bounds of the viewport.
            </p>
            <Library.Demo
              title="Modal with a minimum height and not much content"
              withSource
            >
              <Modal_
                title="Modal with a fixed height"
                buttons={<ModalButtons />}
                onClose={() => {}}
              >
                <div className="min-h-[15rem]">
                  <p>
                    This content has a preferred height of 15rem set by a CSS
                    class.
                  </p>
                </div>
              </Modal_>
            </Library.Demo>

            <Library.Demo
              title="Modal with a minimum height and more content"
              withSource
            >
              <Modal_
                title="Modal with a fixed height"
                buttons={<ModalButtons />}
                onClose={() => {}}
              >
                <div className="min-h-[15rem] space-y-3">
                  <p>
                    This modal has a preferred height of 15rem, but its content
                    needs more space, so the modal height grows.{' '}
                  </p>
                  <p>
                    <LoremIpsum size="md" />
                  </p>
                </div>
              </Modal_>
            </Library.Demo>

            <Library.Demo
              title="Modal with a minimum height and scrolling content"
              withSource
            >
              <Modal_
                title="Modal with a fixed height"
                buttons={<ModalButtons />}
                onClose={() => {}}
              >
                <div className="min-h-[15rem] space-y-3">
                  <p>
                    This modal has a preferred height of 15rem, but its content
                    exceeds the height of the viewport, and scrolls.
                  </p>
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
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
