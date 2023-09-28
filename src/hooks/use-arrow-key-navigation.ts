import type { RefObject } from 'preact';
import { useEffect, useRef } from 'preact/hooks';

import { ListenerCollection } from '../util/listener-collection';

function isElementDisabled(element: HTMLElement & { disabled?: boolean }) {
  return typeof element.disabled === 'boolean' && element.disabled;
}

function isElementVisible(element: HTMLElement) {
  return element.offsetParent !== null;
}

export type UseArrowKeyNavigationOptions = {
  /**
   * Whether to focus the first element in the set of matching elements when
   * the component is mounted
   */
  autofocus?: boolean;

  /**
   * Whether focus should loop back to the first element once the end of the
   * list is reached. Defaults to `true`.
   */
  loop?: boolean;

  /** Enable navigating elements using left/right arrow keys  */
  horizontal?: boolean;
  /** Enable navigating elements using up/down arrow keys */
  vertical?: boolean;

  /**
   * CSS selector which specifies the elements that navigation moves between
   */
  selector?: string;

  /**
   * Indicates if the container element is currently visible.
   * This information is used to focus the current element when the container
   * transitions from hidden to visible.
   *
   * Defaults to `true`.
   */
  containerVisible?: boolean;
};

/**
 * Enable arrow key navigation between interactive descendants of a
 * container element.
 *
 * In addition to moving focus between elements when arrow keys are pressed,
 * this also implements the "roving tabindex" pattern [1] which sets the
 * `tabindex` attribute of elements to control which element gets focus when the
 * user tabs into the container.
 *
 * See [2] for a reference of how keyboard navigation should work in web
 * applications and how it applies to various common widgets.
 *
 * @example
 *   function MyToolbar() {
 *     const container = useRef();
 *
 *     // Enable arrow key navigation between interactive elements in the
 *     // toolbar container.
 *     useArrowKeyNavigation(container);
 *
 *     return (
 *       <div ref={container} role="toolbar">
 *         <button>Bold</bold>
 *         <button>Italic</bold>
 *         <a href="https://example.com/help">Help</a>
 *       </div>
 *     )
 *   }
 *
 * [1] https://www.w3.org/TR/wai-aria-practices/#kbd_roving_tabindex
 * [2] https://www.w3.org/TR/wai-aria-practices/#keyboard
 *
 */

export function useArrowKeyNavigation(
  containerRef: RefObject<HTMLElement | undefined>,
  {
    autofocus = false,
    loop = true,
    horizontal = true,
    vertical = true,
    selector = 'a,button',
    containerVisible = true,
  }: UseArrowKeyNavigationOptions = {},
) {
  // Keep track of the element that was last focused by this hook such that
  // navigation can be restored if focus moves outside the container and then
  // back to/into it.
  const lastFocusedItem = useRef<HTMLOrSVGElement | null>(null);

  useEffect(() => {
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
      // loses focus. This allows, e.g., a widget container to be focused when
      // opened but not be part of the subsequent keyboard-navigation sequence.
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

      let handled = false;
      if (
        (horizontal && event.key === 'ArrowLeft') ||
        (vertical && event.key === 'ArrowUp')
      ) {
        if (currentIndex === 0) {
          currentIndex = loop ? elements.length - 1 : currentIndex;
        } else {
          --currentIndex;
        }
        handled = true;
      } else if (
        (horizontal && event.key === 'ArrowRight') ||
        (vertical && event.key === 'ArrowDown')
      ) {
        if (currentIndex === elements.length - 1) {
          currentIndex = loop ? 0 : currentIndex;
        } else {
          ++currentIndex;
        }
        handled = true;
      } else if (event.key === 'Home') {
        currentIndex = 0;
        handled = true;
      } else if (event.key === 'End') {
        currentIndex = elements.length - 1;
        handled = true;
      }

      if (!handled) {
        return;
      }

      updateTabIndexes(elements, currentIndex, true);

      event.preventDefault();
      event.stopPropagation();
    };

    updateTabIndexes(getNavigableElements(), 0, containerVisible && autofocus);

    const listeners = new ListenerCollection();

    // Set an element as current when it gains focus. In Safari this event
    // may not be received if the element immediately loses focus after it
    // is triggered.
    listeners.add(container, 'focusin', event => {
      if (event.target === container && lastFocusedItem.current) {
        // Focus is moving back to the container after having left. Restore the
        // last tabindex. This allows users to exit and re-enter the widget
        // without resetting the navigation sequence.
        lastFocusedItem.current.focus();
        return;
      }
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
  }, [
    autofocus,
    containerRef,
    horizontal,
    loop,
    selector,
    vertical,
    containerVisible,
  ]);
}
