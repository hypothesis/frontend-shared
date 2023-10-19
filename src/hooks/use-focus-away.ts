import type { RefObject } from 'preact';
import { useEffect } from 'preact/hooks';

import { ListenerCollection } from '../util/listener-collection';

type UseFocusAwayOptions = {
  /** Enable listening for focusout events in `container`? */
  enabled?: boolean;
};

/**
 * Listen on container for focusout events. If a focusout event's relatedTarget
 * is outside of the `container` element, invoke the `callback`.
 * Do not listen if not `enabled`.
 */
export function useFocusAway(
  container: RefObject<HTMLElement | undefined>,
  callback: (e: FocusEvent) => void,
  { enabled = true }: UseFocusAwayOptions = {},
) {
  useEffect(() => {
    if (!enabled || !container.current) {
      return () => {};
    }
    const listeners = new ListenerCollection();

    listeners.add(container.current, 'focusout', e => {
      // Event type is not being properly inferred as FocusEvent
      const event = e as FocusEvent;

      if (
        container.current &&
        !container.current.contains(event.relatedTarget as Node)
      ) {
        callback(event);
      }
    });

    return () => {
      listeners.removeAll();
    };
  }, [container, enabled, callback]);
}
