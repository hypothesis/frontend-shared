import type { RefObject } from 'preact';
import { useEffect } from 'preact/hooks';

import { ListenerCollection } from '../util/listener-collection';

function isElementDisabled(element: HTMLElement & { disabled?: boolean }) {
  return typeof element.disabled === 'boolean' && element.disabled;
}

function isElementVisible(element: HTMLElement) {
  return element.offsetParent !== null;
}

export type UseTabKeyNavigationOptions = {
  /**
   * Whether to focus the first element in the set of matching elements when
   * the component is mounted
   */
  autofocus?: boolean;

  /**
   * Don't respond to any keyboard events if not enabled. This allows selective
   * enabling by components using this hook, as hook use itself cannot be
   * conditional.
   */
  enabled?: boolean;

  /**
   * CSS selector which specifies the elements that navigation moves between
   */
  selector?: string;
};

/**
 * Trap focus within a modal dialog and support roving tabindex with 'Tab' and
 * 'Shift-Tab' keys to navigate through interactive descendants. See [1] for
 * reference for how keyboard navigation should work within modal dialogs.
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

export function useTabKeyNavigation(
  containerRef: RefObject<HTMLElement | undefined>,
  {
    enabled = true,
    autofocus = false,
    selector = 'a,button,input,select,textarea',
  }: UseTabKeyNavigationOptions = {}
) {
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
        container.querySelectorAll(selector)
      );
      return elements.filter(
        el => isElementVisible(el) && !isElementDisabled(el)
      );
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
      setFocus = false
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
          element.focus();
        }
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const elements = getNavigableElements();
      let currentIndex = elements.findIndex(item => item.tabIndex === 0);

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

    updateTabIndexes(getNavigableElements(), 0, autofocus);

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
  }, [autofocus, containerRef, enabled, selector]);
}
