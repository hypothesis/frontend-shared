import type { CompositeProps } from '../../types';
import Scroll from './Scroll';
import ScrollContainer from './ScrollContainer';
import ScrollContent from './ScrollContent';

export type ScrollBoxProps = CompositeProps & {
  /** Turn off borders on outer container */
  borderless?: boolean;
};

/**
 * Render an opinionated composition of Scroll components, making `children`
 * scrollable.
 */
const ScrollBoxNext = function ScrollBox({
  children,
  elementRef,

  borderless = false,

  ...htmlAttributes
}: ScrollBoxProps) {
  return (
    <ScrollContainer
      data-composite-component="ScrollBox"
      {...htmlAttributes}
      borderless={borderless}
      elementRef={elementRef}
    >
      <Scroll>
        <ScrollContent>{children}</ScrollContent>
      </Scroll>
    </ScrollContainer>
  );
};

export default ScrollBoxNext;
