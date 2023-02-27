import classnames from 'classnames';

import type { PresentationalProps } from '../../types';
import { downcastRef } from '../../util/typing';
import ButtonBase from '../input/ButtonBase';
import type {
  ButtonCommonProps,
  HTMLButtonAttributes,
} from '../input/ButtonBase';

type ComponentProps = {
  /**
   * Direction the button should point. If not provided, the button will be
   * lozenge-shaped.
   */
  direction?: 'left' | 'up' | 'down';
};

export type PointerButtonProps = PresentationalProps &
  ButtonCommonProps &
  ComponentProps &
  HTMLButtonAttributes;

/**
 * A button for pointing toward a quantified set of items somewhere else in the
 * UI or off-screen. When clicked, the application should navigate to the
 * indicated or implied position.
 *
 * Used by the bucket bar in the client application to point at
 * highlights/annotations in the guest document. Expected button content is
 * numeric text, e.g.:
 *
 *   <PointerButton direction="left">5</PointerButton>
 *
 * The arrow-points are created by the combination of borders and positioning.
 * See https://css-tricks.com/snippets/css/css-triangle/
 */
const PointerButtonNext = function PointerButton({
  children,
  classes,
  elementRef,

  expanded,
  pressed,
  title,

  direction,

  ...htmlAttributes
}: PointerButtonProps) {
  return (
    <ButtonBase
      data-component="PointerButton"
      {...htmlAttributes}
      elementRef={downcastRef(elementRef)}
      classes={classnames(
        // Establish relative positioning to allow absolute positioning of
        // ::before and ::after pseudo-elements (the arrow pointers)
        'relative w-[26px] h-[16px]',
        'flex items-center justify-center',
        'bg-white rounded-[4px] border',
        // The borders of ::before and ::after will be used to style the arrow
        // pointer border (grey) and fill (white) respectively
        'before:absolute before:border-transparent',
        'after:absolute after:border-transparent',
        'text-[10px] text-color-text-light leading-none font-semibold',
        {
          // This adds a 1-pixel x-offset to the default `shadow` (see tailwind
          // config)
          'shadow-[1px_1px_1px_rgba(0,0,0,0.1)]': direction !== 'down',
          // The down arrow has no y-offset on its shadow to avoid odd edges
          // around its down-pointing wedge
          'shadow-[1px_0px_1px_rgba(0,0,0,0.1)]': direction === 'down',
        },

        // Styling for left-pointing arrows
        {
          'rounded-r-[4px] rounded-l-[2px]': direction === 'left',
          // Position the right edges of ::before and ::after to align with the
          // left edge of the button's body, centered vertically
          'before:right-full before:top-1/2 after:right-full after:top-1/2':
            direction === 'left',
          // ::before is the grey border of the left-pointing wedge, 1px wider
          // than the fill
          'before:mt-[-8px] before:border-8 before:border-r-[5px] before:border-r-grey-3':
            direction === 'left',
          // ::after is the white fill of the left-pointing wedge. NB: ordering
          // of these rules after the ::before rules is important for
          // compositing order
          'after:mt-[-7px] after:border-[7px] after:border-r-[4px] after:border-r-white':
            direction === 'left',
        },

        // Styling for up-pointing arrows
        {
          'z-1 rounded-t-px-sm rounded-b-px': direction === 'up',
          // Position the bottom edges of ::before and ::after to align with the
          // top edges of the button body. Center horizontally.
          'before:top-auto before:left-1/2 before:bottom-full after:top-auto after:left-1/2 after:bottom-full':
            direction === 'up',
          // Grey border of up-pointing wedge
          'before:ml-[-13px] before:border-[13px] before:border-b-[6px] before:border-b-grey-3':
            direction === 'up',
          // White fill of up-pointing wedge
          'after:ml-[-12px] after:border-[12px] after:border-b-[5px] after:border-b-white':
            direction === 'up',
        },

        // Styling for down-pointing arrows
        {
          'z-1 rounded-t-px rounded-b-px-sm': direction === 'down',
          // Position the top edges of ::before and ::after at the bottom of
          // the button body. Center horizontally.
          'before:top-full before:left-1/2 after:top-full after:left-1/2':
            direction === 'down',
          // Grey border of down-pointing wedge
          'before:ml-[-13px] before:border-[13px] before:border-t-[6px] before:border-t-grey-3':
            direction === 'down',
          // White fill of down-pointing wedge
          'after:ml-[-12px] after:border-[12px] after:border-t-[5px] after:border-t-white':
            direction === 'down',
        },
        classes
      )}
      expanded={expanded}
      pressed={pressed}
      title={title}
    >
      {children}
    </ButtonBase>
  );
};

export default PointerButtonNext;
