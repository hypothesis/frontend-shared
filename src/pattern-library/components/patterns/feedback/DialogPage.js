import { useRef, useState } from 'preact/hooks';

import { Button, Checkbox, Dialog, Input } from '../../../../next';
import Library from '../../Library';
import Next from '../../LibraryNext';

import { LoremIpsum } from '../samples';

function ModalSizingExample() {
  const [sizeExOpen, setSizeExOpen] = useState(false);
  const [sizeExFullWidth, setSizeExFullWidth] = useState(true);
  const [sizeExMaxWidth, setSizeExMaxWidth] = useState('md');
  const [sizeExMaxHeight, setSizeExMaxHeight] = useState('full');
  const [sizeExFullHeight, setSizeExFullHeight] = useState(false);
  const sizeExFocusRef = useRef(null);

  return (
    <div>
      <Dialog
        onClose={() => setSizeExOpen(false)}
        title="Controlling dialog sizing"
        open={sizeExOpen}
        aria-describedby="max-width-desc"
        focusRef={sizeExFocusRef}
        fullHeight={sizeExFullHeight}
        fullWidth={sizeExFullWidth}
        maxHeight={sizeExMaxHeight}
        maxWidth={sizeExMaxWidth}
        buttons={
          <>
            <Button onClick={() => setSizeExOpen(false)}>Cancel</Button>
            <Button onClick={() => setSizeExOpen(false)} variant="primary">
              Submit
            </Button>
          </>
        }
      >
        <div className="space-y-2">
          <p id="max-width-desc">You can adjust dialog sizing props here.</p>
          <div className="border flex p-2 gap-x-2 items-center">
            <Checkbox
              id="full-width"
              checked={sizeExFullWidth}
              onChange={() => setSizeExFullWidth(!sizeExFullWidth)}
              elementRef={sizeExFocusRef}
            >
              <code>fullWidth</code>
            </Checkbox>

            <label className="grow text-right" htmlFor="max-width-value">
              <code>maxWidth</code>
            </label>
            <select
              className="focus-visible-ring p-1 border"
              id="max-width-value"
              onChange={event =>
                setSizeExMaxWidth(
                  /** @type {HTMLSelectElement} */ (event.target).value
                )
              }
            >
              <option value="sm" selected={sizeExMaxWidth === 'sm'}>
                <code>sm</code>
              </option>
              <option value="md" selected={sizeExMaxWidth === 'md'}>
                <code>md (default)</code>
              </option>
              <option value="lg" selected={sizeExMaxWidth === 'lg'}>
                <code>lg</code>
              </option>
              <option value="full" selected={sizeExMaxWidth === 'full'}>
                <code>full</code>
              </option>
              <option value="380px" selected={sizeExMaxWidth === '380px'}>
                custom: <code>380px</code>
              </option>
            </select>
          </div>
          <div className="border flex p-2 gap-x-2 items-center">
            <Checkbox
              id="full-height"
              checked={sizeExFullHeight}
              onChange={() => setSizeExFullHeight(!sizeExFullHeight)}
            >
              <code>fullHeight</code>
            </Checkbox>

            <label className="grow text-right" htmlFor="max-height-value">
              <code>maxHeight</code>
            </label>
            <select
              className="focus-visible-ring p-1 border"
              id="max-height-value"
              onChange={event =>
                setSizeExMaxHeight(
                  /** @type {HTMLSelectElement} */ (event.target).value
                )
              }
            >
              <option value="full" selected={sizeExMaxHeight === 'full'}>
                <code>full (default)</code>
              </option>
              <option value="320px" selected={sizeExMaxHeight === '320px'}>
                <code>custom: 320px</code>
              </option>
              <option value="600px" selected={sizeExMaxHeight === '600px'}>
                <code>custom: 600px</code>
              </option>
            </select>
          </div>
        </div>
      </Dialog>
      <Button onClick={() => setSizeExOpen(!sizeExOpen)}>
        Show resize-able Dialog
      </Button>
    </div>
  );
}

export default function DialogPage() {
  const [basicExOpen, setBasicExOpen] = useState(false);
  const [usageExOpen, setUsageExOpen] = useState(false);
  const usageExFocusRef = useRef(null);

  const [nonModalOpen, setNonModalOpen] = useState(false);

  const [longModalOpen, setLongModalOpen] = useState(false);
  const longModalFocusRef = useRef(null);

  return (
    <Library.Page
      title="Dialog"
      intro={
        <p>
          <code>Dialog</code> is a composite component for controlling and
          styling a dialog with an overlay backdrop.
        </p>
      }
    >
      <Library.Section title="Dialog">
        <Library.Pattern title="Status">
          <p>
            <code>Dialog</code> is a new composite component loosely based upon
            the legacy <code>Dialog</code> and <code>Modal</code> components.
          </p>
          <Library.Example title="Migrating to this component">
            <p>
              Because API and conceptual changes to this component are so
              extensive, it should be considered a new component.
            </p>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Usage">
          <Next.Usage componentName="Dialog" />
          <Library.Example>
            <Library.Demo title="Bare-bones Dialog" withSource>
              <div>
                <Dialog
                  onClose={() => setBasicExOpen(false)}
                  title="A Very Basic Dialog"
                  open={basicExOpen}
                  aria-describedby="basic-dialog"
                >
                  <p id="basic-dialog">This is an incredibly basic dialog.</p>
                </Dialog>
                <Button onClick={() => setBasicExOpen(!basicExOpen)}>
                  Show Dialog
                </Button>
              </div>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Authoring basics">
          When authoring a <code>Dialog</code>:
          <ul>
            <li>
              you <em>must</em> set a <code>title</code>. You <em>might</em>{' '}
              consider setting an{' '}
              <strong>
                <code>aria-label</code> attribute
              </strong>{' '}
              if you want to differentiate it from the <code>title</code>.
            </li>
            <li>
              you <em>should</em> set a description for the dialog using the
              <strong>
                <code>aria-describedby</code> attribute
              </strong>
              .
            </li>
            <li>
              you <em>should</em> designate which element in the dialog should
              receive the <strong>initial focus</strong> when the dialog is
              opened (<code>focusRef</code> prop).
            </li>
          </ul>
          <p>
            This example demonstrates <code>aria-describedby</code> and setting
            an initial focus via <code>focusRef</code>.
          </p>
          <Library.Demo
            title="Dialog with accessible interactive elements"
            withSource
          >
            <div>
              <Dialog
                onClose={() => setUsageExOpen(false)}
                title="Choose your adventure"
                open={usageExOpen}
                aria-describedby="choose-adventure-desc"
                focusRef={usageExFocusRef}
                buttons={
                  <>
                    <Button onClick={() => setUsageExOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={() => setUsageExOpen(false)}
                      variant="primary"
                    >
                      Submit
                    </Button>
                  </>
                }
              >
                <div className="space-y-2">
                  <label id="choose-adventure-desc" htmlFor="holiday-dest">
                    Enter your dream holiday destination.
                  </label>
                  <Input id="holiday-dest" elementRef={usageExFocusRef} />
                </div>
              </Dialog>
              <Button onClick={() => setUsageExOpen(!usageExOpen)}>
                Show Dialog
              </Button>
            </div>
          </Library.Demo>
        </Library.Pattern>

        <Library.Pattern title="Focus and navigation behavior">
          <p>
            In nearly all cases, <code>Dialog</code>s are modal: When open, the
            user may not interact with other parts of the interface. The{' '}
            <code>Dialog</code> component takes care of the mechanics of modal
            keyboard navigation and focus behavior, including:
          </p>
          <ul>
            <li>
              <strong>Routing initial focus</strong> to an appropriate element
              within the dialog when it is opened. It is your job to indicate
              which element should receive initial focus, using the{' '}
              <code>focusRef</code> prop. If no <code>focusRef</code> is
              present, initial focus will be set on the dialog container
              element.
            </li>
            <li>
              <strong>Restoring focus</strong> after the dialog is closed.
            </li>
            <li>
              <strong>
                Closing when the <kbd>Escape</kbd> key is pressed
              </strong>
              .
            </li>
            <li>
              <strong>Trapping focus</strong> and constraining the{' '}
              <kbd>tab</kbd> and <kbd>shift-tab</kbd> navigation sequence.
            </li>
          </ul>
          <Library.Example title="Non-modal, non-closeable Dialogs">
            <p>
              <strong>
                If no <code>onClose</code> handler is provided, the dialog is
                non-closeable and is considered non-modal
              </strong>
              . This should be avoided for all future dialogs, but is allowed to
              support some legacy use cases in which, for example, certain
              {'"dead-end"'} error states presented as dialogs have no
              associated user action (other than reloading the page).
            </p>
            <p>
              In this case,{' '}
              <strong>
                none of the focus affordances listed above will take effect
              </strong>
              . You must manually control any focus routing needed.
            </p>
            <Library.Demo title="Dead-end non-closeable Dialog" withSource>
              <div>
                <Dialog
                  title="A non-modal Dialog"
                  open={nonModalOpen}
                  aria-describedby="non-modal-desc"
                  buttons={
                    <Button onClick={() => setNonModalOpen(false)}>
                      Escape!
                    </Button>
                  }
                >
                  <p id="non-modal-desc">
                    This would be a dead end for a user. But here is an extra
                    button for your own escape.
                  </p>
                </Dialog>
                <Button onClick={() => setNonModalOpen(!nonModalOpen)}>
                  Show non-modal Dialog
                </Button>
              </div>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Sizing and containment">
          <Library.Example title="Configuring Dialog size">
            <p>
              The following example shows how the four size-related props —{' '}
              <code>maxWidth</code>, <code>fullWidth</code>,{' '}
              <code>maxHeight</code> and <code>fullHeight</code> — work
              together. These props are individually documented in the{' '}
              <em>Props</em> section as well.
            </p>
            <p>
              A <code>Dialog</code> will never exceed its <code>maxWidth</code>{' '}
              or <code>maxHeight</code> dimensions, but will take up as much
              space as it needs until it hits those maxima.
            </p>
            <p>
              Setting <code>fullWidth</code> or <code>fullHeight</code> will
              ensure that a <code>Dialog</code>
              {"'s"} dimensions are <em>exactly</em> <code>maxWidth</code> or{' '}
              <code>maxHeight</code>, respectively, even if the content does not
              require that much space.
            </p>
            <Library.Demo title="Demonstration of sizing-related props">
              <ModalSizingExample />
            </Library.Demo>
          </Library.Example>

          <Library.Example title="Overflowing content">
            <p>
              If the content of a <code>Dialog</code>
              {"'s"} <code>children</code> overflows the available vertical
              space, it will scroll.
            </p>
            <Library.Demo
              title="Sized Dialog with overflowing content"
              withSource
            >
              <div>
                <Dialog
                  onClose={() => setLongModalOpen(false)}
                  title="There is a lot of content in this modal"
                  open={longModalOpen}
                  focusRef={longModalFocusRef}
                  maxHeight="400px"
                  maxWidth="lg"
                  fullWidth={true}
                  fullHeight={true}
                  buttons={
                    <>
                      <Button
                        elementRef={longModalFocusRef}
                        onClick={() => setLongModalOpen(false)}
                        variant="primary"
                      >
                        OK
                      </Button>
                    </>
                  }
                >
                  <LoremIpsum />
                </Dialog>
                <Button onClick={() => setLongModalOpen(!longModalOpen)}>
                  Show Scrolling Modal
                </Button>
              </div>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Props">
          <Library.Example title="title and aria-label">
            <p>
              The required <code>title</code> prop is used to set the visible
              dialog title, and also used as an <code>aria-label</code>{' '}
              attribute value for the dialog.
            </p>
            <p>
              You may set an explicit <code>aria-label</code> if you would like
              to use different text than the <code>title</code>.
            </p>

            <Next.Code
              content={`<Dialog title="Displayed dialog title" aria-label="Different label text" ...>`}
              size="sm"
            />
          </Library.Example>
          <Library.Example title="aria-describedby">
            In most cases, you should set an <code>aria-describedby</code>{' '}
            attribute on the <code>Dialog</code>.
            <Next.Code
              size="sm"
              content={`<Dialog aria-describedby="dialog-desc" ...>
  <p id="dialog-desc">This describes what this Dialog is for.</p>
</Dialog>`}
            />
          </Library.Example>
          <Library.Example title="open (default: true)">
            Control whether the <code>Dialog</code> and its backdrop are visible
            and active with the boolean <code>open</code> prop (default{' '}
            <code>true</code>).
          </Library.Example>
          <Library.Example title="onClose">
            Callback for when the <code>Dialog</code> is requesting to be
            closed.
            <Next.Code
              size="sm"
              title="Example: managing dialog open state with onClose"
              content={`const [dialogOpen, setDialogOpen] = useState(false);

<>
  <Dialog open={dialogOpen} onClose={setDialogOpen(false)} .../>
  <Button onClick={() => setDialogOpen(true)}>Open dialog</Button>
</>
`}
            />
          </Library.Example>
          <Library.Example title="focusRef">
            <p>
              <code>RefObject</code> for an element that should receive initial
              focus when the dialog is opened.
            </p>
          </Library.Example>
          <Library.Example title="buttons">
            These <code>ComponentChildren</code> will be rendered in the footer
            area of the dialog.
          </Library.Example>
          <Library.Example title="maxWidth (default: 'md')">
            <p>
              The maximum width that the dialog should use. Accepted values:
            </p>
            <ul>
              <li>
                a size string: <code>{"'sm'"}</code>, <code>{"'md'"}</code>,
                <code>{"'lg'"}</code>
              </li>
              <li>
                <code>
                  {"'full'"}, i.e. 100% of the usable width of the viewport
                </code>
              </li>
              <li>
                a CSS length string (e.g. <code>{"'450px'"}</code>)
              </li>
            </ul>
          </Library.Example>
          <Library.Example title="fullWidth (default: true)">
            When <code>true</code>, the width of the dialog will always equal
            the <code>maxWidth</code> value. When <code>false</code>, the dialog
            will size adaptively to its content, but will not exceed{' '}
            <code>maxWidth</code> in width.
          </Library.Example>
          <Library.Example title="maxHeight (default: 'full')">
            <p>
              The maximum height that the dialog should use. Accepted values:
            </p>
            <ul>
              <li>
                <code>{"'full'"}</code>, i.e. 100% of the available vertical
                space in the viewport
              </li>
              <li>
                a CSS length string (e.g. <code>{"'450px'"}</code>)
              </li>
            </ul>
          </Library.Example>

          <Library.Example title="fullHeight (default: false)">
            {' '}
            When <code>true</code>, the height of the dialog will always equal
            the <code>maxHeight</code> value. When <code>false</code>, the
            dialog will size adaptively to its content, but will not exceed{' '}
            <code>maxHeight</code> in height.
          </Library.Example>
          <Library.Example title="disableClickAwayClose (default: false)">
            Enable to opt out of closing the modal when the user clicks
            elsewhere in the document.
          </Library.Example>
          <Library.Example title="disableFocusCapture (default: false)">
            Enable to opt out of focus capture and routing. If you do this, you
            should make sure you are handling focus in some other manner.
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
