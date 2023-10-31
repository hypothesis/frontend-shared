import type { CompositeProps } from '../../types';
import Scroll from './Scroll';
import ScrollContainer from './ScrollContainer';
import ScrollContent from './ScrollContent';

export type ScrollBoxProps = CompositeProps & {
  /** Turn off borders on outer container */
  borderless?: boolean;
  /** Add rounded corners to scrollable container */
  rounded?: boolean;
};

/**
 * Render an opinionated composition of Scroll components, making `children`
 * scrollable.
 */
export default function ScrollBox({
  children,
  elementRef,

  borderless = false,
  rounded = false,

  ...htmlAttributes
}: ScrollBoxProps) {
  return (
    <ScrollContainer
      data-composite-component="ScrollBox"
      {...htmlAttributes}
      borderless={borderless}
      rounded={rounded}
      elementRef={elementRef}
    >
      <Scroll>
        <ScrollContent>{children}</ScrollContent>
      </Scroll>
    </ScrollContainer>
  );
}
