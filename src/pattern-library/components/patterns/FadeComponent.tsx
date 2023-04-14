import classnames from 'classnames';
import { useCallback } from 'preact/hooks';

import type { TransitionComponent } from '../../../types';

const FadeComponent: TransitionComponent = ({
  children,
  visible,
  onTransitionEnd,
}) => {
  const handleTransitionEnd = useCallback(
    () => onTransitionEnd?.(visible ? 'in' : 'out'),
    [visible, onTransitionEnd]
  );

  return (
    <div
      className={classnames('transition-opacity duration-500', {
        'opacity-100': visible,
        'opacity-0': !visible,
      })}
      // @ts-expect-error react uses "ontransitionend" rather than "onTransitionEnd".
      // eslint-disable-next-line react/no-unknown-property
      ontransitionend={handleTransitionEnd}
    >
      {children}
    </div>
  );
};

export default FadeComponent;
