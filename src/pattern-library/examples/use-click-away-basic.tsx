import classnames from 'classnames';
import { useRef, useState } from 'preact/hooks';

import { Button } from '../../components/input';
import { useClickAway } from '../../hooks/use-click-away';

export default function App() {
  const [clickedAway, setClickedAway] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useClickAway(containerRef, () => setClickedAway(true));

  return (
    <div
      ref={containerRef}
      className={classnames(
        'rounded-lg h-32 w-full p-2 flex items-center justify-center gap-2',
        { 'bg-red-100': clickedAway, 'bg-amber-100': !clickedAway },
      )}
    >
      {clickedAway ? 'You clicked outside the area' : 'Click outside this area'}
      {clickedAway && (
        <Button onClick={() => setClickedAway(false)}>Reset</Button>
      )}
    </div>
  );
}
