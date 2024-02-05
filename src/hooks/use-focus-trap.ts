import type { RefObject } from 'preact';
import { useLayoutEffect } from 'preact/hooks';

import { defaultSelector } from './use-tab-key-navigation';

export type UseFocusTrapOptions = {
  enabled?: boolean;
  focusableElementsSelector?: string;
};

export function useFocusTrap(
  containerRef: RefObject<HTMLElement | undefined>,
  {
    enabled = true,
    focusableElementsSelector = defaultSelector,
  }: UseFocusTrapOptions,
) {
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!enabled || !container) {
      return () => {};
    }

    const listener = (e: FocusEvent) => {
      // When trying to focus an element outside the container, prevent it and
      // move focus back to the first focusable element in the container
      if (!e.composedPath().includes(container)) {
        e.preventDefault();
        const firstFocusableElement = container.querySelector(
          focusableElementsSelector,
        ) as HTMLElement | null;
        firstFocusableElement?.focus();

        // TODO
        //  - Prevent scrolling to element that is going to be focused
        //  - Allow Shift+Tab infinite loop sequence inside the modal
        //  - Focus modal itself if no focusable elements are found on it
      }
    };

    document.body.addEventListener('focusin', listener, { capture: true });
    return () => {
      document.body.removeEventListener('focusin', listener, { capture: true });
    };
  }, [enabled, containerRef, focusableElementsSelector]);
}
