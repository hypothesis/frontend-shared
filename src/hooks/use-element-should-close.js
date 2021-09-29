import { useEffect } from 'preact/hooks';

import { normalizeKeyName } from '../browser-compatibility-utils';

/**
 * Attach listeners for one or multiple events to an element and return a
 * function that removes the listeners.
 *
 * @param {HTMLElement} element
 * @param {string[]} events
 * @param {EventListener} listener
 * @param {object} options
 *   @param {boolean} [options.useCapture]
 * @return {() => void} Function which removes the event listeners.
 */
function listen(element, events, listener, { useCapture = false } = {}) {
  events.forEach(event =>
    element.addEventListener(event, listener, useCapture)
  );
  return () => {
    events.forEach(event =>
      element.removeEventListener(event, listener, useCapture)
    );
  };
}

const nullHandler = () => {};

/**
 * @template T
 * @typedef {import("preact/hooks").Ref<T>} Ref
 */

/**
 * This hook provides a way to close or hide an element when a user interacts
 * with elements outside of it or presses the Esc key. It can be used to
 * create popups (eg. for menus, autocomplete lists and non-modal dialogs)
 * that automatically close when appropriate.
 *
 * When the popup element is visible/open, this hook monitors for document
 * interactions that should close it - such as clicks outside the element or
 * Esc key presses. When such an interaction happens, the `handleClose`
 * callback is invoked.
 *
 * Configuration `options` allow this hook to be dynamically disabled when
 * it's not relevant, or to ignore external interaction events (will still
 * respond to ESC).
 *
 * @param {Ref<HTMLElement>} closeableEl - Outer DOM element for the popup
 * @param {boolean} isOpen - Whether the popup is currently visible/open
 * @param {() => void} [handleClose] - Callback invoked to close the popup
 * @param {Object} [options] - Options for the hook
 *   @param {boolean} [options.enabled=true] - Enable closing on any event?
 *   @param {boolean} [options.closeOnExternalInteraction=true] - Should interactions
 *     with elements outside of the popup cause it to close? When this is disabled,
 *     ESC keypresses will still be handled, but mouse clicks and focus changes
 *     ignored.
 *
 */
export function useElementShouldClose(
  closeableEl,
  isOpen,
  handleClose = nullHandler,
  { enabled = true, closeOnExternalInteraction = true } = {}
) {
  useEffect(() => {
    if (!isOpen || !enabled) {
      return () => {};
    }

    // Close element when user presses Escape key, regardless of focus.
    const removeKeyDownListener = listen(document.body, ['keydown'], event => {
      const keyEvent = /** @type {KeyboardEvent} */ (event);
      if (normalizeKeyName(keyEvent.key) === 'Escape') {
        handleClose();
      }
    });

    const eventIsExternal = event => {
      return !closeableEl.current.contains(/** @type {Node} */ (event.target));
    };

    // Close element if user focuses an element outside of it via any means
    // (key press, programmatic focus change).
    const focusEvents = closeOnExternalInteraction ? ['focus'] : [];
    const removeFocusListener = listen(
      document.body,
      focusEvents,
      event => {
        if (eventIsExternal(event)) {
          handleClose();
        }
      },
      { useCapture: true }
    );

    // Close element if user clicks outside of it, even if on an element which
    // does not accept focus.
    const clickEvents = closeOnExternalInteraction
      ? ['mousedown', 'click']
      : [];
    const removeClickListener = listen(
      document.body,
      clickEvents,
      event => {
        if (eventIsExternal(event)) {
          handleClose();
        }
      },
      { useCapture: true }
    );

    return () => {
      removeKeyDownListener();
      removeClickListener();
      removeFocusListener();
    };
  }, [closeableEl, isOpen, handleClose, enabled, closeOnExternalInteraction]);
}
