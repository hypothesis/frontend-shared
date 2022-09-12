import { useEffect } from 'preact/hooks';

import { ListenerCollection } from '../util/listener-collection';

/**
 * @template T
 * @typedef {import("preact/hooks").Ref<T>} Ref
 */

/**
 * Invoke `onClickAway` handler if user interacts with elements outside of
 * `container` while it is active (open or visible).
 *
 * @param {Ref<HTMLElement>} container
 * @param {boolean} active
 * @param {() => void} onClickAway
 */
export function useClickAwayListener(container, active, onClickAway) {
  useEffect(() => {
    if (!active) {
      return () => {};
    }

    const listeners = new ListenerCollection();

    const handleEvent = event => {
      if (
        container.current &&
        !container.current.contains(/** @type {Node} */ (event.target))
      ) {
        onClickAway();
      }
    };

    // Close element if user focuses an element outside of it via any means
    // (key press, programmatic focus change).
    listeners.add(document.body, 'focus', handleEvent, {
      useCapture: true,
    });

    // Close element if user clicks outside of it, even if on an element which
    // does not accept focus.
    listeners.add(document.body, 'mousedown', handleEvent, {
      useCapture: true,
    });

    listeners.add(document.body, 'click', handleEvent, { useCapture: true });

    return () => {
      listeners.removeAll();
    };
  }, [container, active, onClickAway]);
}
