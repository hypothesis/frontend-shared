import type { Ref } from 'preact';

/**
 * Helper for downcasting a ref to a more specific type, where that is safe
 * to do.
 *
 * This is mainly useful to cast a generic `Ref<HTMLElement>` to a more specific
 * element type (eg. `Ref<HTMLDivElement>`) for use with the `ref` prop of a JSX element.
 * Since Preact only writes to the `ref` prop, such a cast is safe.
 */
export function downcastRef<T, U extends T>(
  ref: Ref<T> | undefined,
): Ref<U> | undefined {
  return ref as Ref<U> | undefined;
}
