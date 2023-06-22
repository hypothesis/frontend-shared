import type { ComponentChildren } from 'preact';
import { useState } from 'preact/hooks';
import type { StateUpdater } from 'preact/hooks';

import { Button, Dialog, Slider } from '../../../..';
import Library from '../../Library';

type DialogWrapperProps = {
  children: ComponentChildren;
  closed: boolean;
  setClosed: StateUpdater<boolean>;
};

function DialogWrapper({ children, closed, setClosed }: DialogWrapperProps) {
  return (
    <div className="flex-col w-full space-y-2">
      <Button onClick={() => setClosed(closed => !closed)} variant="primary">
        {closed ? 'Show' : 'Hide'} dialog
      </Button>
      {children}
    </div>
  );
}

function DialogWithBrokenExternalClose() {
  const [closed, setClosed] = useState(true);

  return (
    <DialogWrapper closed={closed} setClosed={setClosed}>
      {!closed && (
        <Dialog
          title="Dialog"
          onClose={() => setClosed(true)}
          transitionComponent={Slider}
        >
          Hello world
        </Dialog>
      )}
    </DialogWrapper>
  );
}

function FixedDialog({ initiallyOpen = false, restoreFocus = false }) {
  const [closed, setClosed] = useState(!initiallyOpen);

  return (
    <DialogWrapper closed={closed} setClosed={setClosed}>
      <Dialog
        title="Dialog"
        onClose={() => setClosed(true)}
        transitionComponent={Slider}
        closed={closed}
        initialFocus="manual"
        restoreFocus={restoreFocus}
      >
        Hello world
      </Dialog>
    </DialogWrapper>
  );
}

function NoTransitionDialog({ initiallyOpen = false, restoreFocus = false }) {
  const [closed, setClosed] = useState(!initiallyOpen);

  return (
    <DialogWrapper closed={closed} setClosed={setClosed}>
      <Dialog
        title="Dialog"
        onClose={() => setClosed(true)}
        closed={closed}
        initialFocus="manual"
        restoreFocus={restoreFocus}
      >
        Hello world
      </Dialog>
    </DialogWrapper>
  );
}

function DynamicallyRenderedDialog({
  initiallyOpen = false,
  restoreFocus = false,
}) {
  const [closed, setClosed] = useState(!initiallyOpen);

  return (
    <DialogWrapper closed={closed} setClosed={setClosed}>
      {!closed && (
        <Dialog
          title="Dialog"
          onClose={() => setClosed(true)}
          initialFocus="manual"
          restoreFocus={restoreFocus}
        >
          Hello world
        </Dialog>
      )}
    </DialogWrapper>
  );
}

export default function TransitionComponentsExperimentsPage() {
  return (
    <Library.Page
      title="Closing dialogs when wrapping a TransitionComponent"
      intro={
        <p>
          Some components (like <code>Dialog</code>) support a
          <code>TransitionComponent</code> to be provided, and change their
          behavior when that happens, by wrapping provided <code>onClose</code>{' '}
          callback (among other things).
        </p>
      }
    >
      <Library.Section>
        <Library.Pattern title="Current (broken) behavior">
          <p>
            Currently, the transition works fine when opening the Dialog, and if
            closed using its own close button.
          </p>
          <p>
            However, if it is closed using a external toggle, the transition is
            lost.
          </p>

          <Library.Demo>
            <DialogWithBrokenExternalClose />
          </Library.Demo>
        </Library.Pattern>

        <Library.Pattern title="Fixing it">
          <p>
            This can be fixed by using the new <code>closed</code> property,
            which makes the <code>Dialog</code> a fully controlled component.
          </p>

          <Library.Demo>
            <FixedDialog />
          </Library.Demo>
        </Library.Pattern>

        <Library.Pattern title="No transition">
          <p>
            This change does not affect dialogs with no{' '}
            <code>TransitionComponent</code>, which can still be conditionally
            rendered, or <i>closed</i> via the new <code>closed</code> prop.
          </p>

          <Library.Demo title="Using close prop">
            <NoTransitionDialog />
          </Library.Demo>

          <Library.Demo title="Dynamically rendered">
            <DynamicallyRenderedDialog />
          </Library.Demo>
        </Library.Pattern>

        <Library.Pattern title="Initially open">
          <p>
            The three combinations that work can be configured to be initially
            open.
          </p>

          <Library.Demo title="With transition">
            <FixedDialog initiallyOpen />
          </Library.Demo>

          <Library.Demo title="Using close prop">
            <NoTransitionDialog initiallyOpen />
          </Library.Demo>

          <Library.Demo title="Dynamically rendered">
            <DynamicallyRenderedDialog initiallyOpen />
          </Library.Demo>
        </Library.Pattern>

        <Library.Pattern title="Resotre focus">
          <p>
            When dialogs are provided with <code>restoreFocus</code> prop, the
            behavior should also be the same both with the new{' '}
            <code>closed</code> prop.
          </p>
          <p>
            Try interacting with the components above with the keyboard, so that
            the focus ring is displayed and you can see how focus is restored
            after the dialog is closed.
          </p>

          <Library.Demo title="Using close prop with transition">
            <FixedDialog restoreFocus />
          </Library.Demo>

          <Library.Demo title="Using close prop without transition">
            <NoTransitionDialog restoreFocus />
          </Library.Demo>

          <Library.Demo title="Dynamically rendered">
            <DynamicallyRenderedDialog restoreFocus />
          </Library.Demo>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
