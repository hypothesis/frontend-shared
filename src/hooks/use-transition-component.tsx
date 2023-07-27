import type { ComponentChildren } from 'preact';
import type { JSX } from 'preact';
import { useCallback, useEffect, useState } from 'preact/hooks';

import type { TransitionComponent } from '../types';

type TransitionComponentOptions = {
  closed: boolean;
  transitionComponent?: TransitionComponent;
  onClose?: () => void;
  onOpen?: () => void;
};

type TransitionComponentResult = {
  closeHandler: () => void;
  isClosed: boolean;
  wrapWithTransition: (children: ComponentChildren) => JSX.Element;
};

export function useTransitionComponent({
  closed,
  transitionComponent,
  onClose,
  onOpen,
}: TransitionComponentOptions): TransitionComponentResult {
  // TODO To properly handle closing/opening with a TransitionComponent, these
  //  two pieces of state need to be synced with the `closed` argument.
  //  That makes the logic hard to follow. It would be good to revisit eventually
  const [isClosed, setIsClosed] = useState(closed);
  const [transitionComponentVisible, setTransitionComponentVisible] =
    useState(false);

  const closeHandler = useCallback(() => {
    if (transitionComponent) {
      // When a TransitionComponent is provided, the actual "onClose" will be
      // called by that component, once the "out" transition has finished
      setTransitionComponentVisible(false);
    } else {
      onClose?.();
    }
  }, [onClose, transitionComponent]);

  const onTransitionEnd = useCallback(
    (direction: 'in' | 'out') => {
      if (direction === 'in') {
        onOpen?.();
      } else {
        setIsClosed(true);
        onClose?.();
      }
    },
    [onOpen, onClose],
  );

  useEffect(() => {
    if (closed && transitionComponent) {
      setTransitionComponentVisible(false);
    } else if (closed && !transitionComponent) {
      setIsClosed(true);
    } else {
      setIsClosed(false);
    }

    if (!closed && !transitionComponent) {
      onOpen?.();
    }

    // We only want to run this effect when opened or closed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closed]);

  useEffect(() => {
    if (!isClosed) {
      setTransitionComponentVisible(true);
    }
  }, [isClosed]);

  const wrapWithTransition = useCallback(
    (children: ComponentChildren) => {
      if (!transitionComponent) {
        return <>{children}</>;
      }

      const TransitionComp = transitionComponent;
      return (
        <TransitionComp
          direction={transitionComponentVisible ? 'in' : 'out'}
          onTransitionEnd={onTransitionEnd}
        >
          {children}
        </TransitionComp>
      );
    },
    [transitionComponent, transitionComponentVisible, onTransitionEnd],
  );

  return {
    closeHandler,
    isClosed,
    wrapWithTransition,
  };
}
