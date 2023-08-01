import { useEffect } from 'preact/hooks';

import { ListenerCollection } from '../util/listener-collection';

type UseKeyPressOptions = {
  /** Enable listening for key events? Can be set to false to disable */
  enabled?: boolean;
};

/**
 * Listen on HTMLElement `target` for key press events for the designated `keys`
 * and invoke a callback. Do not listen if not `enabled`.
 *
 * @param keys - Array of keys (e.g. 'Escape', 'd') to listen for
 */
export function useKeyPress(
  keys: string[],
  callback: (e: KeyboardEvent) => void,
  { enabled = true }: UseKeyPressOptions = {},
) {
  useEffect(() => {
    if (!enabled) {
      return () => {};
    }
    const target = document.body;
    const listeners = new ListenerCollection();

    listeners.add(target, 'keydown', event => {
      if (keys.includes(event.key)) {
        callback(event);
      }
    });

    return () => {
      listeners.removeAll();
    };
  }, [enabled, callback, keys]);
}
