import { useRef, useState } from 'preact/hooks';

import { Popover } from '../../components/feedback';
import { Button } from '../../components/input';
import { useClickAway } from '../../hooks/use-click-away';

export default function App() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useClickAway(buttonRef, () => setOpen(false));

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
        align="right"
        anchorElementRef={buttonRef}
        classes="p-2"
      >
        The content of the popover goes here
      </Popover>
    </div>
  );
}
