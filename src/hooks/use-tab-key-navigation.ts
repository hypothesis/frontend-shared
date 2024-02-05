import type { RefObject } from 'preact';
import { useEffect, useRef } from 'preact/hooks';

import { ListenerCollection } from '../util/listener-collection';

function isElementDisabled(element: HTMLElement & { disabled?: boolean }) {
  return typeof element.disabled === 'boolean' && element.disabled;
}

function isElementVisible(element: HTMLElement) {
  return element.offsetParent !== null;
}

export type UseTabKeyNavigationOptions = {
  /**
   * Don't respond to any keyboard events if not enabled. This allows selective
   * enabling by components using this hook, as hook use itself cannot be
   * conditional.
   */
  enabled?: boolean;

  /**
   * CSS selector which specifies which elements should be in the tab sequence
   */
  selector?: string;
};

/**
 * Trap focus within a modal dialog and support roving tabindex with 'Tab' and
 * 'Shift-Tab' keys to navigate through interactive descendants. See [1] for
 * reference for how keyboard navigation should work within modal dialogs.
 *
 * Note that this hook does not set initial focus: routing initial focus
 * appropriately is the responsibility of the consuming component.
 *
 * NB: This hook should be removed/disused once we migrate to using native
 * <dialog> elements. The hook duplicates some logic in `useArrowKeyNavigation`.
 *
 * @example
 *   function MyModalDialog() {
 *     const container = useRef();
 *
 *     // Enable tab key navigation between interactive elements in the
 *     // modal-dialog container.
 *     useTabKeyNavigation(container);
 *
 *     return (
 *       <div ref={container} role="dialog" aria-modal>
 *         <button>Bold</bold>
 *         <button>Italic</bold>
 *         <a href="https://example.com/help">Help</a>
 *       </div>
 *     )
 *   }
 *
 * [1] https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/#keyboardinteraction
 *
 */

// By default, include standard browser focus-able, tab-sequence elements (links, buttons,
// inputs). Also include the containers for ARIA interactive widgets `grid` and
// `tablist`. Internal keyboard navigation for those widgets should be handled
// separately: exclude `tab`-role buttons from this hook's navigation sequence.
export const defaultSelector =
  'a,button:not([role="tab"]),input,select,textarea,[role="grid"],[role="tablist"]';

export function useTabKeyNavigation(
  containerRef: RefObject<HTMLElement | undefined>,
  {
    enabled = true,
    selector = defaultSelector,
  }: UseTabKeyNavigationOptions = {},
) {
  const lastFocusedItem = useRef<HTMLOrSVGElement | null>(null);
  useEffect(() => {
    if (!enabled) {
      return () => {};
    }
    if (!containerRef.current) {
      throw new Error('Container ref not set');
    }
    const container = containerRef.current;

    const getNavigableElements = () => {
      const elements: HTMLElement[] = Array.from(
        container.querySelectorAll(selector),
      );
      const filtered = elements.filter(
        el => isElementVisible(el) && !isElementDisabled(el),
      );
      // Include the container itself in the set of navigable elements if it
      // is currently focused. It will not be part of the tab sequence once it
      // loses focus. This allows, e.g., a modal container to be focused when
      // opened but not be part of the subsequent trapped tab sequence.
      if (document.activeElement === container) {
        filtered.unshift(container);
      }
      return filtered;
    };

    /**
     * Update the `tabindex` attribute of navigable elements.
     *
     * Exactly one element will have `tabindex=0` and all others will have
     * `tabindex=1`.

     * @param currentIndex - Index of element in `elements` to make current.
     *   Defaults to the current element if there is one, or the first element
     *   otherwise.
     * @param setFocus - Whether to focus the current element
     */
    const updateTabIndexes = (
      elements = getNavigableElements(),
      currentIndex = -1,
      setFocus = false,
    ) => {
      if (currentIndex < 0) {
        currentIndex = elements.findIndex(el => el.tabIndex === 0);
        if (currentIndex < 0) {
          currentIndex = 0;
        }
      }

      for (const [index, element] of elements.entries()) {
        element.tabIndex = index === currentIndex ? 0 : -1;
        if (index === currentIndex && setFocus) {
          lastFocusedItem.current = element;
          element.focus();
        }
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const elements = getNavigableElements();
      let currentIndex = elements.findIndex(item => item.tabIndex === 0);
      if (
        (currentIndex === -1 || elements[currentIndex] === container) &&
        lastFocusedItem.current
      ) {
        // Focus is moving back to/into the container after having left (or
        // active tabindex is a non-navigable element). Restore previous active
        // tabindex. This allows the user to exit and re-enter the widget
        // without losing tab-sequence position.
        currentIndex = elements.indexOf(lastFocusedItem.current as HTMLElement);
      }

      let handled = false;
      if (event.key === 'Tab' && event.shiftKey) {
        if (currentIndex === 0) {
          currentIndex = elements.length - 1;
        } else {
          --currentIndex;
        }
        handled = true;
      } else if (event.key === 'Tab') {
        if (currentIndex === elements.length - 1) {
          currentIndex = 0;
        } else {
          ++currentIndex;
        }
        handled = true;
      }

      if (!handled) {
        return;
      }

      updateTabIndexes(elements, currentIndex, true);

      event.preventDefault();
      event.stopPropagation();
    };

    const elements = getNavigableElements();
    // One of the navigable elements may already have focus
    const focusedIndex = elements.indexOf(
      document.activeElement as HTMLElement,
    );
    updateTabIndexes(elements, focusedIndex);

    const listeners = new ListenerCollection();

    // Set an element as current when it gains focus. In Safari this event
    // may not be received if the element immediately loses focus after it
    // is triggered.
    listeners.add(container, 'focusin', event => {
      const elements = getNavigableElements();
      const targetIndex = elements.indexOf(event.target as HTMLElement);
      if (targetIndex >= 0) {
        updateTabIndexes(elements, targetIndex);
      }
    });

    listeners.add(container, 'keydown', onKeyDown);

    // Update the tab indexes of elements as they are added, removed, enabled
    // or disabled.
    const mo = new MutationObserver(() => {
      updateTabIndexes();
    });
    mo.observe(container, {
      subtree: true,
      attributes: true,
      attributeFilter: ['disabled'],
      childList: true,
    });

    return () => {
      listeners.removeAll();
      mo.disconnect();
    };
  }, [containerRef, enabled, selector]);
}
