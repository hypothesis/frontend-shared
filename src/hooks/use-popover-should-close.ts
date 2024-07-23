import type { RefObject } from 'preact';

import { useClickAway } from './use-click-away';
import { useFocusAway } from './use-focus-away';
import { useKeyPress } from './use-key-press';

export type UsePopoverShouldCloseOptions = {
  /** Whether the popover is currently visible/open. Defaults to true */
  enabled?: boolean;
};

/**
 * This hook is a convenient way to close or hide a popover-like element when a
 * user interacts with elements outside of it or presses the Esc key.
 *
 * This hook is effectively a combination of {@link useClickAway},
 * {@link useFocusAway} and {@link useKeyPress} handling `Escape` key.
 *
 * @param popoverEl - Outer DOM element for the popover
 * @param handleClose - Callback invoked to close the popover
 * @param options
 */
export function usePopoverShouldClose(
  popoverEl: RefObject<HTMLElement | undefined>,
  handleClose: () => void,
  options: UsePopoverShouldCloseOptions = {},
) {
  useClickAway(popoverEl, handleClose, options);
  useFocusAway(popoverEl, handleClose, options);
  useKeyPress(['Escape'], handleClose, options);
}
