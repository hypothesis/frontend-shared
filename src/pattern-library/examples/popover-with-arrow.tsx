import { useRef, useState } from 'preact/hooks';

import { Popover } from '../../components/feedback';
import { Button } from '../../components/input';

export default function App() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="relative flex justify-center">
      <Button
        variant="primary"
        elementRef={buttonRef}
        onClick={() => setOpen(prev => !prev)}
      >
        {open ? 'Close' : 'Open'} Popover
      </Button>
      <Popover
        open={open}
        onClose={() => setOpen(false)}
        anchorElementRef={buttonRef}
        classes="p-2"
        arrow
      >
        The content of the popover goes here
      </Popover>
    </div>
  );
}
