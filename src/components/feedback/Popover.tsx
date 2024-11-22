import classnames from 'classnames';
import type { ComponentChildren, RefObject } from 'preact';
import { useCallback, useLayoutEffect, useRef } from 'preact/hooks';

import { ListenerCollection } from '../../util/listener-collection';

/** Small space to apply between the anchor element and the popover */
const POPOVER_ANCHOR_EL_GAP = '.15rem';

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

/**
 * Manages the popover position manually to make sure it renders "next" to the
 * anchor element (above or below). This is mainly needed when using the
 * popover API, as that makes it render in the top layer, making it impossible
 * to position it relative to the anchor element via regular CSS.
 *
 * @param asNativePopover - Native popover API is used to toggle the popover
 * @param alignToRight - Whether the popover should be aligned to the right side
 *                       of the anchor element or not
 */
function usePopoverPositioning(
  anchorElementRef: RefObject<HTMLElement | undefined>,
  popoverRef: RefObject<HTMLElement | undefined>,
  popoverOpen: boolean,
  asNativePopover: boolean,
  alignToRight: boolean,
) {
  const adjustPopoverPositioning = useCallback(() => {
    const popoverEl = popoverRef.current!;
    const anchorEl = anchorElementRef.current!;

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

    // The popover should render above only if there's not enough space below to
    // fit it and there's more absolute space above than below
    const shouldBeAbove =
      anchorElDistanceToBottom < popoverHeight &&
      anchorElDistanceToTop > anchorElDistanceToBottom;

    if (!asNativePopover) {
      // Set styles for non-popover mode
      if (shouldBeAbove) {
        return setPopoverCSSProps({
          bottom: '100%',
          marginBottom: POPOVER_ANCHOR_EL_GAP,
        });
      }

      return setPopoverCSSProps({
        top: '100%',
        marginTop: POPOVER_ANCHOR_EL_GAP,
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
        ? `calc(${absBodyTop + anchorElDistanceToTop - popoverHeight}px - ${POPOVER_ANCHOR_EL_GAP})`
        : `calc(${absBodyTop + anchorElDistanceToTop + anchorElHeight}px + ${POPOVER_ANCHOR_EL_GAP})`,
      left: `${Math.max(POPOVER_VIEWPORT_HORIZONTAL_GAP, left)}px`,
    });
  }, [asNativePopover, anchorElementRef, popoverRef, alignToRight]);

  useLayoutEffect(() => {
    if (!popoverOpen) {
      return () => {};
    }

    // First of all, open popover if it's using the native API, otherwise its
    // size is 0x0 and positioning calculations won't work.
    const popover = popoverRef.current;
    if (asNativePopover) {
      popover?.togglePopover(true);
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

    return () => {
      if (asNativePopover) {
        popover?.togglePopover(false);
      }
      cleanup();
      listeners.removeAll();
    };
  }, [adjustPopoverPositioning, asNativePopover, popoverOpen, popoverRef]);
}

export type PopoverProps = {
  children?: ComponentChildren;
  classes?: string | string[];
  variant?: 'panel' | 'custom';

  /** Whether the popover is currently open or not. Defaults to false */
  open: boolean;
  /** The element relative to which the popover should be positioned */
  anchorElementRef: RefObject<HTMLElement | undefined>;

  /**
   * Determines to what side of the anchor element should the popover be
   * aligned.
   *
   * Defaults to `left`
   */
  align?: 'right' | 'left';

  /**
   * Determines if focus should be restored when the popover is closed.
   * Defaults to true.
   */
  restoreFocusOnClose?: boolean;

  /**
   * Used to determine if the popover API should be used.
   * Defaults to true, as long as the browser supports it.
   */
  asNativePopover?: boolean;
};

export default function Popover({
  anchorElementRef,
  children,
  open,
  align = 'left',
  classes,
  variant = 'panel',
  restoreFocusOnClose = true,
  /* eslint-disable-next-line no-prototype-builtins */
  asNativePopover = HTMLElement.prototype.hasOwnProperty('popover'),
}: PopoverProps) {
  const popoverRef = useRef<HTMLDivElement | null>(null);

  usePopoverPositioning(
    anchorElementRef,
    popoverRef,
    open,
    asNativePopover,
    align === 'right',
  );

  useLayoutEffect(() => {
    const restoreFocusTo = open
      ? (document.activeElement as HTMLElement)
      : null;

    return () => {
      if (restoreFocusOnClose && restoreFocusTo) {
        restoreFocusTo.focus();
      }
    };
  }, [open, restoreFocusOnClose]);

  return (
    <div
      className={classnames(
        'absolute z-5',
        variant === 'panel' && [
          'max-h-80 overflow-y-auto overflow-x-hidden',
          'rounded border bg-white shadow hover:shadow-md focus-within:shadow-md',
        ],
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
      ref={popoverRef}
      // nb. Use `undefined` rather than `false` because Preact doesn't
      // handle boolean values correctly for this attribute (it will set
      // `popover="false"` instead of removing the attribute).
      popover={asNativePopover ? 'auto' : undefined}
      data-testid="popover"
      data-component="Popover"
    >
      {open && children}
    </div>
  );
}
