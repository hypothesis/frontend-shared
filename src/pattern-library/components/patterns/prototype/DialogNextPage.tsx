import { useState } from 'preact/hooks';

import { Button, CloseButton } from '../../../../';
import DialogNext from '../../../../components/feedback/DialogNext';
import type { ModalSize } from '../../../../components/feedback/DialogNext';
import Library from '../../Library';
import { LoremIpsum } from '../samples';

function DialogNext_({
  modal,
  skipLorem = false,
}: {
  modal?: boolean | ModalSize;
  skipLorem?: boolean;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setDialogOpen(prev => !prev)} variant="primary">
        {dialogOpen ? 'Hide' : 'Show'} dialog
      </Button>
      <DialogNext
        modal={modal}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      >
        {modal && <CloseButton />}
        This is a {modal ? 'modal' : ''} native dialog
        {!skipLorem && <LoremIpsum />}
      </DialogNext>
    </>
  );
}

export default function DialogNextPage() {
  return (
    <Library.Page
      title="Dialogs"
      intro={
        <p>
          <code>DialogNext</code> provides functionality to use a {"browser's"}{' '}
          <code>dialog</code> element,.
        </p>
      }
    >
      <Library.Section id="dialog-next" title="DialogNext">
        <Library.Pattern>
          <Library.Usage componentName="DialogNext" />
          <Library.Demo title="Basic DialogNext">
            <DialogNext_ />
          </Library.Demo>
          <Library.Demo title="Auto-size modal DialogNext">
            <DialogNext_ modal />
          </Library.Demo>
          <Library.Demo title="Large-size modal DialogNext">
            <DialogNext_ modal="lg" />
          </Library.Demo>
          <Library.Demo title="Medium-size modal DialogNext">
            <DialogNext_ modal="md" />
          </Library.Demo>
          <Library.Demo title="Small-size modal DialogNext">
            <DialogNext_ modal="sm" />
          </Library.Demo>
          <Library.Demo title="Small-size modal DialogNext with little content">
            <DialogNext_ modal="sm" skipLorem />
          </Library.Demo>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
