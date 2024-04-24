import type { RefObject } from 'preact';
import { useLayoutEffect } from 'preact/hooks';

export type InputLike = {
  setCustomValidity(message: string): void;
};

/**
 * Sync custom validation error messages to the browser's native validation
 * state.
 *
 * @param ref - An `HTMLInputElement` or other element that supports the
 *   Constraint Validation API
 * @param error - The current error or undefined if the field input is valid
 */
export function useValidationError(
  ref: RefObject<InputLike | undefined>,
  error?: string,
) {
  // Sync errors to native form validation API. This will prevent submission
  // of the form until the error is resolved.
  useLayoutEffect(() => {
    ref.current?.setCustomValidity(error ?? '');
  }, [error, ref]);
}
