import { useLayoutEffect, useState } from 'preact/hooks';

/**
 * Determines if a popping element (typically a dialog/popover of some sort)
 * should be positioned above another reference component, based on the sizes of
 * those two components, and the available viewport space above and below the
 * reference component.
 *
 * By default, we prefer the popping component to be positioned below the
 * reference component, and only if there's enough space above, and not enough
 * space below, we will prefer it to be positioned above.
 */
export function useShouldBePositionedAbove(
  referenceComponent: HTMLElement | null,
  poppingComponent: HTMLElement | null,
  isPoppingComponentOpen: boolean,
) {
  const [shouldBePositionedAbove, setShouldBePositionedAbove] = useState(false);

  useLayoutEffect(() => {
    // Reset shouldPositionAbove so that it does not affect calculations next
    // time popping component opens
    if (!referenceComponent || !poppingComponent || !isPoppingComponentOpen) {
      setShouldBePositionedAbove(false);
      return;
    }

    const viewportHeight = window.innerHeight;
    const {
      top: referenceComponentDistanceToTop,
      bottom: referenceComponentBottom,
    } = referenceComponent.getBoundingClientRect();
    const referenceComponentDistanceToBottom =
      viewportHeight - referenceComponentBottom;
    const { bottom: poppingComponentBottom } =
      poppingComponent.getBoundingClientRect();
    const poppingComponentDistanceToBottom =
      viewportHeight - poppingComponentBottom;

    // The popping component should drop up only if there's not enough space
    // below to fit it, and there's more absolute space above than below
    setShouldBePositionedAbove(
      poppingComponentDistanceToBottom < 0 &&
        referenceComponentDistanceToTop > referenceComponentDistanceToBottom,
    );
  }, [referenceComponent, poppingComponent, isPoppingComponentOpen]);

  return shouldBePositionedAbove;
}
