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
        classes="p-2"
        placement={placement}
      >
        This popover is displayed {placement} the button while there is space
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
