import type { RefObject } from 'preact';
import { useEffect } from 'preact/hooks';

import { ListenerCollection } from '../util/listener-collection';

export type UseClickAwayOptions = {
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
  options: UseClickAwayOptions = {},
) {
  const { enabled = true } = options;

  useEffect(() => {
    if (!enabled) {
      return () => {};
    }
    const target = document.body;
    const listeners = new ListenerCollection();

    const handleAwayClick = (event: Event) => {
      if (
        container.current &&
        // We test the composed path here to handle the case where the clicked
        // element was in fact in the container, but is removed from the DOM
        // (eg. by a re-render in a child component) before this callback is run.
        // The composed path reflects the DOM hierarchy at the time the event was
        // dispatched.
        !event.composedPath().includes(container.current)
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
