import { useState } from 'preact/hooks';

import { Button, CloseButton, Dialog } from '../../../../';
import type { DialogProps } from '../../../../';
import Library from '../../Library';

/**
 * Dialog for use in demos
 */
function Dialog_({ children, ...dialogProps }: DialogProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const closeDialog = () => setDialogOpen(false);

  const openButton = (
    <Button onClick={() => setDialogOpen(!dialogOpen)} variant="primary">
      {dialogOpen ? 'Hide' : 'Show'} dialog
    </Button>
  );

  return (
    <div className="flex w-full gap-x-2">
      {!dialogOpen && <div>{openButton}</div>}
      <div className="grow">
        {dialogOpen && (
          <Dialog {...dialogProps} onClose={closeDialog}>
            {children}
          </Dialog>
        )}
      </div>
    </div>
  );
}

export default function CloseButtonPage() {
  return (
    <Library.Page
      title="CloseButton"
      intro={
        <p>
          Render a close button that can take a click handler or find one in
          context.
        </p>
      }
    >
      <Library.Section>
        <Library.Pattern>
          <Library.Usage componentName="CloseButton" />
          <Library.Example>
            <Library.Demo withSource title="Basic CloseButton">
              <CloseButton />
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Working with CloseButton">
          <Library.Example title="Click handlers for close buttons">
            <p>
              You can pass an <code>onClick</code> prop to{' '}
              <code>CloseButton</code> like any button and that will be used. If
              no <code>onClick</code> is provided, <code>CloseButton</code> will
              check for any available <code>CloseableContext</code> close
              handler and use that, if found.
            </p>
            <p>
              For example, <code>Dialog</code> components provide a{' '}
              <code>CloseableContext</code>. Any <code>CloseButton</code> inside
              of a <code>Dialog</code> with an <code>onClose</code> handler will
              use that handler automatically: you do not need to provide an{' '}
              <code>onClick</code> prop in these cases.
            </p>
            <Library.Demo title="Dialog with CloseButton" withSource>
              <Dialog_ variant="custom" title="Example Dialog">
                <div className="flex gap-x-3">
                  <div className="grow">Example custom dialog</div>
                  <CloseButton />
                </div>
              </Dialog_>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Component API">
          <p>
            <code>CloseButton</code> provides the same API as{' '}
            <code>
              <Library.Link href="/input-button">IconButton</Library.Link>
            </code>
            .
          </p>
          <Library.Example title="title">
            <Library.Info>
              <Library.InfoItem label="description">
                This is an optional prop for <code>CloseButton</code> (it is
                required for <code>IconButton</code>).
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`string`}</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>{`'Close'`}</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
