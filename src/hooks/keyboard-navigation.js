import { useEffect, useRef } from 'preact/hooks';

import { ListenerCollection } from '../util/listener-collection';

/**
 * @param {HTMLElement & { disabled?: boolean }} element
 */
function isElementDisabled(element) {
  return typeof element.disabled === 'boolean' && element.disabled;
}

/** @param {HTMLElement} element */
function isElementVisible(element) {
  return element.offsetParent !== null;
}

/**
 * @typedef KeyboardNavigationOptions
 * @prop {boolean} [active=true]
 * @prop {boolean} [autofocus=false] - Whether to move focus to one of the
 *   navigable elements when activated. Focuses the first navigable descendant
 *   element by default, but a different element can be specified with
 *   `autofocusRef`
 * @prop {import('preact').RefObject<HTMLElement>} [autofocusRef] - Which of the
 *   navigable elements should be focused when `autofocus` is enabled.
 * @prop {boolean} [horizontal=false] - Enable navigating elements using
 *   left/right arrow keys
 * @prop {boolean} [tab=false] - Enable navigating elements using tab/shift-tab
 *   keys
 * @prop {boolean} [vertical=false] - Enable navigating elements using up/down
 *   arrow keys
 *  @prop {string} [selector] - CSS selector which specifies which descendant
 *   elements to include in the navigation sequence
 */

/**
 * Enable keyboard navigation between interactive descendants of a container
 * element.
 *
 * In addition to moving focus between elements when enabled key types
 * (vertical, horizontal, tab) are pressed, this also implements the "roving
 * tabindex" pattern [1], which sets the `tabindex` attribute of elements to
 * control which element gets focus when the user tabs into the container.
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
 *     useKeyboardNavigation(container, {
 *       horizontal: true,
 *       vertical: true,
 *     });
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
 * @param {import('preact').RefObject<HTMLElement>} containerRef
 * @param {KeyboardNavigationOptions} options
 */
export function useKeyboardNavigation(
  containerRef,
  {
    active = true,
    autofocus = false,
    autofocusRef,
    horizontal = false,
    tab = false,
    vertical = false,
    selector = 'button, [href], input, select, textarea, [tabindex]',
  } = {}
) {
  useEffect(() => {
    if (!active) {
      return () => {};
    }

    if (active && !containerRef.current) {
      throw new Error('Container ref not set');
    }

    const container = /** @type {HTMLElement} */ (containerRef.current);

    const getNavigableElements = () => {
      const elements = /** @type {HTMLElement[]} */ (
        Array.from(container.querySelectorAll(selector))
      );
      // If the container itself has a `tabIndex`, include it in the
      // set of navigable elements
      if (container.getAttribute('tabIndex')) {
        elements.unshift(container);
      }
      return elements.filter(
        el => isElementVisible(el) && !isElementDisabled(el)
      );
    };

    /**
     * Update the `tabindex` attribute of navigable elements.
     *
     * Exactly one element will have `tabindex=0` and all others will have
     * `tabindex=1`.
     *
     * @param {HTMLElement[]} elements
     * @param {number} currentIndex - Index of element in `elements` to make current.
     *   Defaults to the current element if there is one, or the first element
     *   otherwise.
     * @param {boolean} setFocus - Whether to focus the current element
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

      for (let [index, element] of elements.entries()) {
        element.tabIndex = index === currentIndex ? 0 : -1;
        if (index === currentIndex && setFocus) {
          element.focus();
        }
      }
    };

    /** @param {KeyboardEvent} event */
    const onKeyDown = event => {
      const elements = getNavigableElements();
      let currentIndex = elements.findIndex(item => item.tabIndex === 0);

      let handled = false;
      if (
        (horizontal && event.key === 'ArrowLeft') ||
        (vertical && event.key === 'ArrowUp') ||
        (tab && event.key === 'Tab' && event.shiftKey)
      ) {
        if (currentIndex === 0) {
          currentIndex = elements.length - 1;
        } else {
          --currentIndex;
        }
        handled = true;
      } else if (
        (horizontal && event.key === 'ArrowRight') ||
        (vertical && event.key === 'ArrowDown') ||
        (tab && event.key === 'Tab')
      ) {
        if (currentIndex === elements.length - 1) {
          currentIndex = 0;
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

    const navigableElements = getNavigableElements();
    let initialFocusIndex = 0;
    if (autofocus && autofocusRef?.current) {
      const focusRefIndex = navigableElements.findIndex(
        el => el === autofocusRef.current
      );
      if (focusRefIndex >= 0) {
        initialFocusIndex = focusRefIndex;
      } else {
        console.warn(
          'useKeyboardNavigation: `autofocusRef.current` is not a navigable element within `container`'
        );
      }
    }

    updateTabIndexes(navigableElements, initialFocusIndex, autofocus);

    const listeners = new ListenerCollection();
    // Update the tab indexes of elements as they are added, removed, enabled
    // or disabled.
    const mo = new MutationObserver(() => {
      updateTabIndexes();
    });

    // Set an element as current when it gains focus. In Safari this event
    // may not be received if the element immediately loses focus after it
    // is triggered.
    listeners.add(container, 'focusin', event => {
      const elements = getNavigableElements();
      const targetIndex = elements.indexOf(
        /** @type {HTMLElement} */ (event.target)
      );
      if (targetIndex >= 0) {
        updateTabIndexes(elements, targetIndex);
      }
    });

    listeners.add(
      container,
      'keydown',
      /** @type {EventListener} */ (onKeyDown)
    );

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
    active,
    autofocus,
    autofocusRef,
    containerRef,
    horizontal,
    selector,
    tab,
    vertical,
  ]);
}

/**
 * Enable arrow key navigation between interactive descendants of a container
 * element.
 *
 * @param {import('preact').RefObject<HTMLElement>} containerRef
 * @param {KeyboardNavigationOptions} options
 */
export function useArrowKeyNavigation(containerRef, options) {
  useKeyboardNavigation(containerRef, {
    active: true,
    horizontal: true,
    vertical: true,
    ...options,
  });
}

/**
 * Capture focus and constrain keyboard tab navigation sequence to
 * navigable elements within `container` when `open`. Restore focus when closed.
 *
 * @param {import('preact').RefObject<HTMLElement>} containerRef
 * @param {boolean} open - Whether the component's container is currently active
 * @param {KeyboardNavigationOptions} options
 */
export function useFocusCapture(containerRef, open, options = {}) {
  const isOpen = useRef(false);
  const prevFocusRef =
    /** @type {import('preact').RefObject<HTMLOrSVGElement>} */ (useRef());

  // Restore focus when container is closed
  useEffect(() => {
    if (open !== isOpen.current) {
      if (open) {
        prevFocusRef.current = /** @type {HTMLOrSVGElement|null} */ (
          document.activeElement
        );
      } else {
        if (prevFocusRef.current) {
          prevFocusRef.current.focus();
        }
        prevFocusRef.current = null;
      }
    }
    isOpen.current = open;
  }, [open]);

  useKeyboardNavigation(containerRef, {
    active: open,
    autofocus: open,
    tab: true,
    ...options,
  });
}
