import type { RefObject } from 'preact';
import { useEffect } from 'preact/hooks';

import { ListenerCollection } from '../util/listener-collection';

type UseClickAwayOptions = {
  /** Enable listening for away-click events? Can be set to false to disable */
  enabled?: boolean;
};

/**
 * Listen on document.body for click events. If a click event's target is
 * outside of the `container` element, invoke the `callback`. Do not listen if
 * not `enabled`.
 */
export function useClickAway(
  container: RefObject<HTMLElement | undefined>,
  callback: (e: Event) => void,
  { enabled = true }: UseClickAwayOptions = {}
) {
  useEffect(() => {
    if (!enabled) {
      return () => {};
    }
    const target = document.body;
    const listeners = new ListenerCollection();

    const handleAwayClick = (event: Event) => {
      if (
        container.current &&
        !container.current.contains(event.target as Node)
      ) {
        callback(event);
      }
    };

    listeners.add(target, 'mousedown', handleAwayClick);
    listeners.add(target, 'click', handleAwayClick);

    return () => {
      listeners.removeAll();
    };
  }, [container, enabled, callback]);
}
