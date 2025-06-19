import classnames from 'classnames';
import type { ComponentChildren, JSX, RefObject } from 'preact';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'preact/hooks';

import { useClickAway } from '../../hooks/use-click-away';
import { useKeyPress } from '../../hooks/use-key-press';
import { useSyncedRef } from '../../hooks/use-synced-ref';
import { ListenerCollection } from '../../util/listener-collection';
import { downcastRef } from '../../util/typing';
import { PointerDownIcon, PointerUpIcon } from '../icons';

/** Small space in px, to apply between the anchor element and the popover */
const POPOVER_ANCHOR_EL_GAP = 3;

/**
 * Space in pixels to apply between the popover and the viewport sides to
 * prevent it from growing to the very edges.
 */
export const POPOVER_VIEWPORT_HORIZONTAL_GAP = 8;

type PopoverCSSProps =
  | 'top'
  | 'left'
  | 'minWidth'
  | 'marginBottom'
  | 'bottom'
  | 'marginTop';

type PopoverPositioningOptions = {
  open: boolean;
  placement: 'above' | 'below';

  /**
   * Whether the popover should be aligned to the right side of the anchor
   * element or not
   */
  alignToRight: boolean;

  /** Whether an arrow pointing to the anchor should be added. */
  arrow: boolean;

  /** Native popover API is used to toggle the popover */
  asNativePopover: boolean;
};

/**
 * Manages the popover position manually to make sure it renders "next" to the
 * anchor element (above or below). This is mainly needed when using the
 * popover API, as that makes it render in the top layer, making it impossible
 * to position it relative to the anchor element via regular CSS.
 */
function usePopoverPositioning(
  popoverRef: RefObject<HTMLElement | undefined>,
  anchorRef: RefObject<HTMLElement | undefined>,
  {
    open,
    asNativePopover,
    alignToRight,
    placement,
    arrow,
  }: PopoverPositioningOptions,
) {
  const [resolvedPlacement, setResolvedPlacement] = useState(placement);

  const adjustPopoverPositioning = useCallback(() => {
    const popoverEl = popoverRef.current!;
    const anchorEl = anchorRef.current!;

    /**
     * Set the positioning styles synchronously (not via <div style={computedStyles} />),
     * to make sure positioning happens before other side effects.
     * @return - A callback that undoes the property assignments
     */
    const setPopoverCSSProps = (
      props: Partial<Record<PopoverCSSProps, string>>,
    ) => {
      Object.assign(popoverEl.style, props);
      const keys = Object.keys(props) as PopoverCSSProps[];
      return () => keys.map(prop => (popoverEl.style[prop] = ''));
    };

    const viewportHeight = window.innerHeight;
    const {
      top: anchorElDistanceToTop,
      bottom: anchorElBottom,
      left: anchorElLeft,
      height: anchorElHeight,
      width: anchorElWidth,
    } = anchorEl.getBoundingClientRect();
    const anchorElDistanceToBottom = viewportHeight - anchorElBottom;
    const { height: popoverHeight, width: popoverWidth } =
      popoverEl.getBoundingClientRect();

    // The popover should render in indicated placement unless there's not
    // enough space to fit it there, but there is in the opposite one.
    const shouldBeAbove =
      (placement === 'above' &&
        (anchorElDistanceToTop > popoverHeight ||
          anchorElDistanceToBottom < anchorElDistanceToTop)) ||
      (placement === 'below' &&
        anchorElDistanceToBottom < popoverHeight &&
        anchorElDistanceToTop > anchorElDistanceToBottom);

    // Update the actual placement, which may not match provided one
    setResolvedPlacement(shouldBeAbove ? 'above' : 'below');

    const anchorGap = arrow ? POPOVER_ANCHOR_EL_GAP + 8 : POPOVER_ANCHOR_EL_GAP;

    if (!asNativePopover) {
      // Set styles for non-popover mode
      if (shouldBeAbove) {
        return setPopoverCSSProps({
          bottom: '100%',
          marginBottom: `${anchorGap}px`,
        });
      }

      return setPopoverCSSProps({
        top: '100%',
        marginTop: `${anchorGap}px`,
      });
    }

    const { top: bodyTop, width: bodyWidth } =
      document.body.getBoundingClientRect();
    const absBodyTop = Math.abs(bodyTop);

    // The available space is:
    // - left-aligned popovers: distance from left side of anchor element to
    //   right side of viewport
    // - right-aligned popovers: distance from right side of anchor element to
    //   left side of viewport
    const availableSpace =
      (alignToRight ? anchorElLeft + anchorElWidth : bodyWidth - anchorElLeft) -
      POPOVER_VIEWPORT_HORIZONTAL_GAP;

    let left = anchorElLeft;
    if (popoverWidth > availableSpace) {
      // If the popover is not going to fit the available space, let it "grow"
      // in the opposite direction
      left = alignToRight
        ? POPOVER_VIEWPORT_HORIZONTAL_GAP
        : left - (popoverWidth - availableSpace);
    } else if (alignToRight && popoverWidth > anchorElWidth) {
      // If a right-aligned popover fits the available space, but it's bigger
      // than the anchor element, move it to the left so that it is aligned with
      // the right side of the element
      left -= popoverWidth - anchorElWidth;
    }

    return setPopoverCSSProps({
      minWidth: `${anchorElWidth}px`,
      top: shouldBeAbove
        ? `${absBodyTop + anchorElDistanceToTop - popoverHeight - anchorGap}px`
        : `${absBodyTop + anchorElDistanceToTop + anchorElHeight + anchorGap}px`,
      left: `${Math.max(POPOVER_VIEWPORT_HORIZONTAL_GAP, left)}px`,
    });
  }, [popoverRef, anchorRef, placement, arrow, asNativePopover, alignToRight]);

  useLayoutEffect(() => {
    if (!open) {
      return () => {};
    }

    // First of all, open popover if it's using the native API, otherwise its
    // size is 0x0 and positioning calculations won't work.
    const popover = popoverRef.current!;
    if (asNativePopover) {
      popover.togglePopover(true);
    }

    const cleanup = adjustPopoverPositioning();

    if (!asNativePopover) {
      return cleanup;
    }

    // Readjust popover position when any element scrolls, just in case that
    // affected the anchor element position.
    const listeners = new ListenerCollection();
    listeners.add(document.body, 'scroll', adjustPopoverPositioning, {
      capture: true,
    });

    // Readjust popover positioning if its resized, in case it dropped-up, and
    // it needs to be moved down
    const observer = new ResizeObserver(adjustPopoverPositioning);
    observer.observe(popover);

    return () => {
      if (asNativePopover) {
        popover?.togglePopover(false);
      }
      cleanup();
      listeners.removeAll();
      observer.disconnect();
    };
  }, [adjustPopoverPositioning, asNativePopover, open, popoverRef]);

  return resolvedPlacement;
}

/**
 * Add the right listeners to the popover so that `onClose` is called when
 * clicking away or pressing `Escape`.
 */
function useOnClose(
  popoverRef: RefObject<HTMLElement | undefined>,
  anchorElementRef: RefObject<HTMLElement | undefined>,
  onClose: () => void,
  popoverOpen: boolean,
  asNativePopover: boolean,
) {
  // When the popover API is used, listen for the `toggle` event and call
  // onClose() when transitioning from `open` to `closed`.
  // This happens when clicking away or pressing `Escape` key.
  useEffect(() => {
    if (!asNativePopover) {
      return () => {};
    }

    const popover = popoverRef.current!;
    const toggleListener = (e: ToggleEvent) => {
      if (e.oldState === 'open' && e.newState === 'closed') {
        onClose();
      }
    };

    popover.addEventListener('toggle', toggleListener as any);
    return () => popover.removeEventListener('toggle', toggleListener as any);
  }, [asNativePopover, onClose, popoverRef]);

  // When the popover API is not used, manually add listeners for Escape key
  // press and click away, to mimic the native popover behavior.
  // Disable these while the popover is closed, otherwise trying to open it
  // by interacting with some other element will trigger a click-away and
  // immediately close the popover after it opens..
  const enabled = popoverOpen && !asNativePopover;
  useClickAway(
    popoverRef,
    e => {
      // Ignore clicking "away" when the target is the anchor element.
      // In most cases, popovers will be anchored to a "toggle" which is
      // supposed to open/close the popover on click, so closing-on-click-away
      // when they are the target will cause the popover to close and
      // immediately open again.
      if (!e.composedPath().includes(anchorElementRef.current!)) {
        onClose();
      }
    },
    { enabled },
  );
  useKeyPress(['Escape'], onClose, { enabled });
}

export type PopoverProps = {
  children?: ComponentChildren;
  classes?: string | string[];
  variant?: 'panel' | 'custom';

  /** Ref for the popover element. */
  elementRef?: RefObject<HTMLElement>;

  /** Whether the popover is currently open or not */
  open: boolean;

  /**
   * Callback invoked when the popover is automatically closed.
   * Use this callback to sync local state.
   */
  onClose: () => void;

  /** The element relative to which the popover should be positioned */
  anchorElementRef: RefObject<HTMLElement | undefined>;

  /**
   * Determines to which side of the anchor element the popover should be
   * aligned.
   *
   * Defaults to `left`
   */
  align?: 'right' | 'left';

  /**
   * Where to position the popover if there's available space: above the anchor
   * or below it.
   * Defaults to 'below'.
   *
   * If there's no space to display the popover in selected placement, an
   * alternative placement will be used to keep it inside the viewport.
   */
  placement?: 'above' | 'below';

  /**
   * Determines if a small arrow pointing to the anchor element should be
   * displayed.
   * Defaults to false.
   */
  arrow?: boolean;

  /**
   * Determines if focus should be restored when the popover is closed.
   * Defaults to true.
   *
   * @deprecated - Setting this prop to `false` does not work if native popovers
   * are used. This prop will be removed entirely in future.
   */
  restoreFocusOnClose?: boolean;

  /**
   * Used to determine if the popover API should be used.
   * Defaults to true, as long as the browser supports it.
   */
  asNativePopover?: boolean;

  /** A callback passed to the outermost element onScroll */
  onScroll?: JSX.HTMLAttributes<HTMLElement>['onScroll'];
};

type RestoreFocusOptions = {
  /** True if the popover is open. */
  open: boolean;

  /** Ref for the popover element. */
  popoverRef: { current: HTMLElement | null };
};

/**
 * Restore focus to the previously active element when a popover is closed.
 */
function useRestoreFocusOnClose({ popoverRef, open }: RestoreFocusOptions) {
  useLayoutEffect(() => {
    const container = popoverRef.current;
    const restoreFocusTo = open
      ? (document.activeElement as HTMLElement)
      : null;

    if (!container || !restoreFocusTo) {
      return () => {};
    }

    return () => {
      // When a popover is opened and then closed, there are several
      // possibilities for what happens to the focus:
      //
      // 1. The focus may be unchanged from before the popover was opened.
      //
      // 2. The focus may have moved into the popover when it was opened, and
      //    then back to either the previously focused element or the body when
      //    it was closed.
      //
      //    When a native popover is closed via `togglePopover` or `hidePopover`,
      //    focus will revert to the element that was focused at the time the
      //    popover was shown. See https://html.spec.whatwg.org/multipage/popover.html#dom-hidepopover.
      //
      // 3. The user may have clicked an element outside the popover, focusing
      //    that element and causing the popover to close.
      //
      // From the above cases, we only need to restore focus if it is still
      // inside the popover, or focus reverted to the document body.
      const currentFocus = document.activeElement;
      if (
        currentFocus &&
        !container.contains(currentFocus) &&
        currentFocus !== document.body
      ) {
        return;
      }

      restoreFocusTo.focus();
    };
  }, [popoverRef, open]);
}

export default function Popover({
  anchorElementRef,
  children,
  open,
  onClose,
  align = 'left',
  placement = 'below',
  arrow = false,
  classes,
  variant = 'panel',
  onScroll,
  elementRef,
  /* eslint-disable-next-line no-prototype-builtins */
  asNativePopover = HTMLElement.prototype.hasOwnProperty('popover'),
}: PopoverProps) {
  const popoverRef = useSyncedRef<HTMLElement>(elementRef);

  const resolvedPlacement = usePopoverPositioning(
    popoverRef,
    anchorElementRef,
    {
      open,
      placement,
      arrow,
      alignToRight: align === 'right',
      asNativePopover,
    },
  );
  useOnClose(popoverRef, anchorElementRef, onClose, open, asNativePopover);
  useRestoreFocusOnClose({
    open,
    popoverRef: popoverRef,
  });

  return (
    <div
      className={classnames(
        'absolute z-5',
        variant === 'panel' && [
          'max-h-80 ',
          'rounded border bg-white shadow hover:shadow-md focus-within:shadow-md',
          !arrow && 'overflow-y-auto overflow-x-hidden',
        ],
        arrow && 'overflow-visible',
        asNativePopover && [
          // We don't want the popover to ever render outside the viewport,
          // and we give it a 16px gap
          'max-w-[calc(100%-16px)]',
          // Overwrite [popover] default styles
          'p-0 m-0',
        ],
        !asNativePopover && {
          // Hiding instead of unmounting so that popover size can be computed
          // to position it above or below
          hidden: !open,
          'right-0': align === 'right',
          'min-w-full': true,
        },
        classes,
      )}
      ref={downcastRef(popoverRef)}
      popover={asNativePopover && 'auto'}
      onScroll={onScroll}
      data-testid="popover"
      data-component="Popover"
    >
      {open && arrow && (
        <div
          className={classnames('absolute z-10', 'fill-white text-grey-3', {
            'top-full': resolvedPlacement === 'above',
            'bottom-full': resolvedPlacement === 'below',
            'left-2': align === 'left',
            'right-2': align === 'right',
          })}
          data-testid="arrow"
        >
          {resolvedPlacement === 'below' ? (
            <PointerUpIcon />
          ) : (
            <PointerDownIcon />
          )}
        </div>
      )}
      {open && children}
    </div>
  );
}
