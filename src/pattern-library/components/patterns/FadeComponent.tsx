import classnames from 'classnames';
import { useCallback } from 'preact/hooks';

import type { TransitionComponent } from '../../../types';

/**
 * This component is used just to demonstrate the `TransitionComponent`
 * functionality on components supporting it, like `Dialog`.
 */
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
      // @ts-expect-error preact uses "ontransitionend" rather than "onTransitionEnd".
      // eslint-disable-next-line react/no-unknown-property
      ontransitionend={handleTransitionEnd}
    >
      {children}
    </div>
  );
};

export default FadeComponent;
