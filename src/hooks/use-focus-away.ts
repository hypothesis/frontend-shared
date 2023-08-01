import type { RefObject } from 'preact';
import { useEffect } from 'preact/hooks';

import { ListenerCollection } from '../util/listener-collection';

type UseFocusAwayOptions = {
  /**
   * Enable listening for focus events outside of `container`? Can be set to
   * false to disable
   */
  enabled?: boolean;
};

/**
 * Listen on document.body for focus events. If a focus event's target
 * is outside of the `container` element, invoke the `callback`. Do not listen
 * if not `enabled`.
 */
export function useFocusAway(
  container: RefObject<HTMLElement | undefined>,
  callback: (e: FocusEvent) => void,
  { enabled = true }: UseFocusAwayOptions = {},
) {
  useEffect(() => {
    if (!enabled) {
      return () => {};
    }
    const target = document.body;
    const listeners = new ListenerCollection();

    listeners.add(
      target,
      'focus',
      event => {
        if (
          container.current &&
          !container.current.contains(event.target as Node)
        ) {
          callback(event);
        }
      },
      {
        // Focus events don't bubble; they need to be handled in the capture phase
        capture: true,
      },
    );

    return () => {
      listeners.removeAll();
    };
  }, [container, enabled, callback]);
}
