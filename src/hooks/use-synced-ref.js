import { useRef } from 'preact/hooks';

/**
 * @template T
 * @typedef {import('preact').RefObject<T>} RefObject
 */

/**
 * @template T
 * @typedef {import('preact').Ref<T>} Ref
 */

/**
 * Object ref which synchronizes its value to another ref.
 *
 * @template T
 * @implements {RefObject<T>}
 */
class SyncedRef {
  /**
   * @param {Ref<T>} [target] - Initial target for this ref to synchronize to.
   *   This is not called/set until the {@link current} property of the
   *   SyncedRef is set. This makes the target behave close to how it would
   *   if used in place of the SyncedRef.
   */
  constructor(target) {
    /** @type {Ref<T>|undefined} */
    this._target = target;

    /** @type {T|null} */
    this._value = null;
  }

  get current() {
    return this._value;
  }

  /** @param {T|null} value */
  set current(value) {
    this._value = value;
    this._updateTarget();
  }

  get target() {
    return this._target;
  }

  /** @param {Ref<T>|undefined} target */
  set target(target) {
    if (target === this._target) {
      return;
    }
    this._target = target;

    // If the target changes after the initial render, we currently synchronize
    // the value immediately. This is different than what happens if the target
    // were passed to an element directly, as it would be updated only after the
    // render.
    this._updateTarget();
  }

  _updateTarget() {
    const value = this._value;
    if (typeof this._target === 'function') {
      this._target(value);
    } else if (this._target) {
      this._target.current = value;
    }
  }
}

/**
 * Return an object ref which synchronizes its value to another "target" ref.
 *
 * This is useful when a component needs an object ref for an element for
 * internal use, but also wants to allow the caller to get a ref for the same
 * element.
 *
 * The target ref can be either a callback or an object.
 *
 * @example
 *   function Widget({ elementRef }) {
 *     const ref = useSyncedRef(elementRef);
 *
 *     useEffect(() => {
 *       ref.current.focus();
 *     }, []);
 *
 *     return <input ref={ref}>...</input>;
 *   }
 *
 * @template T
 * @param {import('preact').Ref<T>} [targetRef]
 * @return {import('preact').RefObject<T>}
 */
export function useSyncedRef(targetRef) {
  const container = useRef(new SyncedRef(targetRef));
  container.current.target = targetRef;
  return container.current;
}
