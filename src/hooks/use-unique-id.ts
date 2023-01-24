import { useState } from 'preact/hooks';

let idCounter = 0;
/**
 * Return an ID string beginning with `prefix` that is unique per component
 * instance.
 *
 * This avoids different instances of a component re-using the same ID.
 */
export function useUniqueId(prefix: string) {
  const [id] = useState(() => {
    ++idCounter;
    return `${prefix}-${idCounter}`;
  });
  return id;
}
