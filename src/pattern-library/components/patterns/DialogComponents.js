import { createRef, render } from 'preact';
import { useState } from 'preact/hooks';
import {
  ConfirmModal,
  Dialog,
  LabeledButton,
  Modal,
  TextInputWithButton,
  TextInput,
  IconButton,
} from '../../../';

import Library from '../Library';

/**
 * Render a Dialog or Modal within the `container`, and invoke
 * `setOpen` as needed to alert caller to state changes. Provides the
 * ability to open and close a Dialog demo. We don't want to render a Dialog
 * until it's opened because it will grab focus when it first mounts.
 *
 * @param {Object} options
 *   @param {import('preact').FunctionComponent} options.DialogComponent - Which Dialog
 *   or Dialog-wrapping component (function) to use;
 *   a reference to `Dialog`, `Modal`, `ConfirmModal`, e.g.
 *   @param {HTMLElement} options.container - Element to render the Dialog inside of
 *   @param {(isOpen: boolean) => void} options.setOpen - callback to call when
 *     the Dialog state changes: opened (true) or closed/removed (false)
 *   @param {Object} [options.props] - Extra prop(s) for Dialog component
 */
const showDialog = ({ DialogComponent, container, setOpen, props }) => {
  const initialFocusRef = createRef();

  const close = message => {
    if (message) {
      alert(message);
    }
    if (container) {
      render(null, container);
    }
    setOpen(false);
  };

  if (!container) {
    return null;
  }

  if (!props.children) {
    props.children = (
      <>
        <p>This is an example of a dialog.</p>
        <p>
          This dialog contains an <code>input</code> which is focused when the
          dialog is opened.
        </p>
        <input
          className="hyp-u-focus-outline"
          ref={initialFocusRef}
          type="text"
        />
      </>
    );
  }

  return render(
    <DialogComponent
      icon="hyp-edit"
      initialFocus={initialFocusRef}
      title="Basic dialog with icon"
      onCancel={() => close()}
      {...props}
    />,
    container
  );
};

export default function DialogComponents() {
  // Dialog/Modal state for each of the examples

  // Basic Dialog example
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  // Basic Modal example
  const [, setModalIsOpen] = useState(false);
  // Modal with manual focus control
  const [, setFocusModalIsOpen] = useState(false);
  // Modal with overflowing content example
  const [, setLongModalIsOpen] = useState(false);
  // ConfirmModal example
  const [, setConfirmModalIsOpen] = useState(false);

  // Extra buttons to use in Dialog, Modal examples
  const buttons = [
    <LabeledButton key="maybe" onClick={() => alert('You chose maybe')}>
      Maybe
    </LabeledButton>,
    <LabeledButton
      key="yep"
      onClick={() => alert('You chose yep')}
      variant="primary"
    >
      Do it!
    </LabeledButton>,
  ];

  const openDialog = () => {
    setDialogIsOpen(true);
    showDialog({
      DialogComponent: Dialog,
      container: /** @type {HTMLElement} */ (document.getElementById(
        'dialog1'
      )),
      setOpen: setDialogIsOpen,
      props: {
        buttons,
      },
    });
  };

  const openModal = () => {
    setModalIsOpen(true);
    showDialog({
      DialogComponent: Modal,
      container: /** @type {HTMLElement} */ (document.getElementById('modal1')),
      setOpen: setModalIsOpen,
      props: {
        buttons,
      },
    });
  };

  const openFocusModal = () => {
    const inputRef = createRef();
    const children = (
      <>
        <div>
          The input here is manually focused after the <code>Modal</code> is
          opened.
        </div>
        <TextInputWithButton>
          <TextInput inputRef={inputRef} />
          <IconButton icon="hyp-edit" title="go" variant="dark" />
        </TextInputWithButton>
      </>
    );
    setFocusModalIsOpen(true);
    showDialog({
      DialogComponent: Modal,
      container: /** @type {HTMLElement} */ (document.getElementById(
        'modalFocus'
      )),
      setOpen: setFocusModalIsOpen,
      props: {
        buttons,
        children,
        initialFocus: null,
      },
    });
    // This is possible because the Dialog has not grabbed focus
    inputRef.current.focus();
  };

  const openLongModal = () => {
    const children = (
      <div style={{ overflow: 'auto' }}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a sapien
          cursus, fringilla diam posuere, varius urna. Phasellus dictum sodales
          dui, sed scelerisque mauris auctor et. Integer suscipit justo in erat
          tristique, nec feugiat augue ultrices. Sed accumsan pretium commodo.
          Orci varius natoque penatibus et magnis dis parturient montes,
          nascetur ridiculus mus. Ut lobortis tortor metus, sed rutrum risus
          ultricies non. Maecenas ultricies rutrum diam non feugiat. Nam ut ex
          ac enim efficitur semper. Integer sed rhoncus eros. Nulla pharetra
          vulputate faucibus. Vestibulum vestibulum orci non maximus aliquet.
          Donec id dui ac ipsum pellentesque gravida sit amet non sem.
          Suspendisse malesuada turpis id erat porta, nec luctus odio mollis.
          Sed a arcu sed sem venenatis porta. In dictum sapien ut congue
          facilisis. Curabitur consequat vestibulum ultricies. Vivamus rhoncus
          vitae sapien id volutpat. Fusce ac nisi dolor. Suspendisse ut
          venenatis ex. Quisque elementum libero quam, non consectetur lorem
          faucibus a. Sed eu orci vitae nibh sodales sodales ut at neque. Ut
          lobortis arcu eu lorem porttitor scelerisque. Aenean euismod est ac
          enim fermentum, sit amet tristique dui consequat. Phasellus vitae
          sapien dolor. Nulla iaculis nibh at magna convallis finibus ut vitae
          ipsum. Maecenas ultricies ultrices diam laoreet lacinia. Nunc commodo
          eu lorem a bibendum. Sed eu magna rutrum, consectetur orci sit amet,
          venenatis ex. Aliquam sodales nec odio ac ultricies. In sit amet
          congue ipsum. Class aptent taciti sociosqu ad litora torquent per
          conubia nostra, per inceptos himenaeos. Phasellus accumsan justo nec
          maximus sollicitudin. Aenean eu urna egestas justo dignissim venenatis
          quis quis massa. Pellentesque convallis posuere elit, eu interdum diam
          placerat et. Aenean cursus vehicula nibh, in scelerisque nunc feugiat
          eu. Praesent eleifend ipsum eget urna dictum semper. Nullam dapibus
          nisl sit amet ultricies lobortis. Vestibulum a velit neque.
          Suspendisse tincidunt aliquet lorem et consectetur. Phasellus at
          libero fringilla nulla egestas aliquam. Nullam ut magna risus. Etiam
          consequat neque sapien, vel ultrices justo vehicula sit amet. Donec
          semper facilisis odio vel faucibus. Integer eget sagittis justo.
          Integer sed tincidunt neque. In vulputate fermentum lacus, eget
          sollicitudin nisi vestibulum vel. Etiam porttitor varius justo, id
          efficitur tellus congue a. Cras condimentum congue lectus sit amet
          commodo. Etiam lacus ex, efficitur volutpat enim id, malesuada posuere
          metus. Mauris convallis convallis arcu, sit amet placerat felis
          sodales ut. Duis semper a risus ac consequat. Nulla id nibh sem.
          Aliquam et nulla nec lectus viverra lobortis. Vivamus eros enim,
          lobortis nec efficitur nec, rhoncus at tortor. Aliquam aliquet
          bibendum ipsum eu feugiat. Duis iaculis bibendum ligula non ultricies.
          Curabitur cursus nulla in nisl tincidunt, eget eleifend tellus
          ultricies. Pellentesque eget mauris nec magna ultrices fringilla id
          sit amet nulla. Ut nec velit sed augue eleifend pharetra. Aliquam a
          posuere massa. Nunc vitae tortor ut est cursus vestibulum. In hac
          habitasse platea dictumst. Nulla eget orci eleifend, elementum turpis
          vitae, consectetur magna. In in nulla in tellus vestibulum pharetra.
          Curabitur at rhoncus enim, tempus congue est. Nullam consectetur
          lobortis nunc, vel feugiat lorem semper a. Ut tellus nulla, tempus id
          posuere vel, luctus et sem. Nulla nec rhoncus mi. Aenean sit amet
          mollis nibh. Nam ullamcorper tellus quis arcu aliquam, dignissim
          ultricies justo efficitur. Cras non ipsum tempor, elementum dui id,
          pellentesque turpis. Praesent commodo dolor in elit aliquet, sit amet
          pellentesque sem molestie. In pharetra nisl nec orci pellentesque, ut
          posuere quam faucibus. Class aptent taciti sociosqu ad litora torquent
          per conubia nostra, per inceptos himenaeos. Maecenas mollis purus non
          erat tempor euismod. Vestibulum non leo eget magna vestibulum mattis.
          Aenean vitae tortor vel mauris pretium tempor. Sed viverra eros
          tristique, dapibus tellus a, feugiat ipsum. Pellentesque non tellus
          scelerisque, molestie massa vitae, fermentum ex. Quisque molestie
          interdum nibh a luctus. Sed aliquet risus ac varius suscipit. Proin
          eget leo vel lacus finibus posuere vel non nisl. In tristique ligula
          leo, sed molestie sem sodales nec. Phasellus sed consectetur lectus.
          In pretium hendrerit eros, a sagittis est faucibus ac. Etiam faucibus
          felis et eros commodo fringilla. Duis volutpat lobortis suscipit.
          Maecenas facilisis metus in lorem aliquet efficitur. Duis scelerisque
          eros scelerisque, rhoncus massa eget, tempor ipsum. Donec id feugiat
          purus, non condimentum turpis. Sed consequat lorem a odio pharetra
          pretium. Proin sed turpis ac sapien convallis iaculis a sit amet est.
          Proin lorem risus, rhoncus non metus at, fringilla commodo erat. Sed
          quis elit vitae leo ullamcorper interdum non nec ipsum. Etiam
          ullamcorper lorem ac velit condimentum, eget porttitor odio mollis.
          Maecenas semper, urna eu cursus placerat, enim neque aliquam orci, ut
          elementum justo ex id justo. Nunc malesuada egestas dui at vestibulum.
        </p>
      </div>
    );
    setLongModalIsOpen(true);
    showDialog({
      DialogComponent: Modal,
      container: /** @type {HTMLElement} */ (document.getElementById('modal2')),
      setOpen: setLongModalIsOpen,
      props: {
        title: 'Long Modal',
        buttons,
        children,
      },
    });
  };

  const openConfirmModal = () => {
    setConfirmModalIsOpen(true);
    showDialog({
      DialogComponent: ConfirmModal,
      container: /** @type {HTMLElement} */ (document.getElementById(
        'confirm-modal1'
      )),
      setOpen: setConfirmModalIsOpen,
      props: {
        confirmAction: 'Sure thing',
        message: 'Confirm modal content goes right here.',
        title: 'Confirm Modal Example',
        onConfirm: () => alert('ok'),
      },
    });
  };
  return (
    <Library.Page title="Dialogs">
      <Library.Pattern title="Dialog">
        <p>
          A <code>Dialog</code> prompts for user interaction and will take focus
          when opened.
        </p>
        <p>
          Use a <code>Dialog</code> when you want to route focus. Consider using
          a <code>Panel</code> for presenting panel-styled content that does not
          require grabbing focus.
        </p>
        <Library.Example title="Setting initial focus">
          <p>
            This example shows a dismiss-able <code>Dialog</code> with an
            explicitly-provided element (<code>ref</code>) that should take
            initial focus: a text <code>input</code>. The highlighted outline is
            added here by using <code>.hyp-u-focus-outline</code> on the{' '}
            <code>input</code> element.
          </p>
          <p>
            <code>Dialogs</code> are styled using the <code>panel</code>{' '}
            pattern.
          </p>
          <Library.Demo>
            <div>
              <div id="dialog1" />
              {!dialogIsOpen && (
                <LabeledButton variant="primary" onClick={openDialog}>
                  Open dialog
                </LabeledButton>
              )}
            </div>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>

      <Library.Pattern title="Modal">
        <p>
          A <code>Modal</code> is a type of <code>Dialog</code> that centers on
          the screen and obscures the background with an overlay.
        </p>
        <Library.Example title="Basic usage">
          <p>
            Close the modal by clicking the close (X) button, the cancel button
            or clicking anywhere outside of it.
          </p>
          <Library.Demo>
            <div>
              <div id="modal1" />
              <LabeledButton variant="primary" onClick={openModal}>
                Open modal
              </LabeledButton>
            </div>
          </Library.Demo>
        </Library.Example>

        <Library.Example title="Manual focus control">
          <p>
            In some cases, you might need more manual control of focus routing.
            This might arise if you have nested components within a{' '}
            <code>Modal</code> or <code>Dialog</code>, or there is complex logic
            about focus. Setting the <code>initialFocus</code> prop to{' '}
            <code>null</code> will opt out of automatic focus handling.
          </p>
          <p>
            In this example, automatic focus is disabled. When the{' '}
            <code>Modal</code> is opened, a contained <code>TextInput</code>{' '}
            component is manually set to focused.
          </p>

          <Library.Demo>
            <div>
              <div id="modalFocus" />
              <LabeledButton variant="primary" onClick={openFocusModal}>
                Open modal
              </LabeledButton>
            </div>
          </Library.Demo>
        </Library.Example>

        <Library.Example title="Handling content overflow">
          <p>
            Modals that may contain a lot of content may need to handle overflow
            (i.e. make their content scrollable) so that the modal height
            doesn&apos;t exceed available viewport space.
          </p>
          <p>
            To make something in a modal scroll-able, apply{' '}
            <code>overflow: auto</code> to the element you wish to contain. This
            element needs to be an immediate-child element of the{' '}
            <code>Modal</code>.
          </p>
          <Library.Demo>
            <div>
              <div id="modal2" />
              <LabeledButton variant="primary" onClick={openLongModal}>
                Open long modal
              </LabeledButton>
            </div>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>

      <Library.Pattern title="ConfirmModal">
        <p>
          <code>ConfirmModal</code> is intended to mirror the functionality of{' '}
          <code>window.confirm</code>.
        </p>
        <Library.Example>
          <p>
            <code>ConfirmModal</code> prompts the user for a boolean yes/no
            input. Close and cancel are considered no.
          </p>
          <p>
            Handlers need to be provided for what to do on yes (
            <code>onConfirm</code>) and no/cancel (<code>onCancel</code>).
            Typically, both would (also) close the modal, though in this
            example, the <code>onConfirm</code> handler does not close the
            modal.
          </p>
          <Library.Demo>
            <div>
              <div id="confirm-modal1" />
              <LabeledButton variant="primary" onClick={openConfirmModal}>
                Open confirm modal
              </LabeledButton>
            </div>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>
    </Library.Page>
  );
}
