import { useRef, useState } from 'preact/hooks';

import { Popover } from '../../components/feedback';
import { Button } from '../../components/input';

function ButtonWithPopover({ placement }: { placement: 'above' | 'below' }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div>
      <Button
        variant="primary"
        elementRef={buttonRef}
        onClick={() => setOpen(prev => !prev)}
      >
        {open ? 'Close' : 'Open'} {placement}
      </Button>
      <Popover
        open={open}
        onClose={() => setOpen(false)}
        anchorElementRef={buttonRef}
        placement={placement}
      >
        <div className="p-2 flex flex-col gap-y-2 w-64">
          <p>This popover is displayed {placement} the button.</p>
          <p>
            It will be displayed in the opposite direction if there is no room
            for it {placement}.
          </p>
        </div>
      </Popover>
    </div>
  );
}

export default function App() {
  return (
    <div className="relative flex justify-center gap-x-3">
      <ButtonWithPopover placement="above" />
      <ButtonWithPopover placement="below" />
    </div>
  );
}
