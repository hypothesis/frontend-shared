import Scroll from './Scroll';
import ScrollContainer from './ScrollContainer';
import ScrollContent from './ScrollContent';

/**
 * @typedef {import('../../types').CompositeProps} CompositeProps
 * @typedef {import('preact').JSX.HTMLAttributes<HTMLElement>} HTMLAttributes
 *
 * @typedef ScrollBoxProps
 * @prop {boolean} [borderless=false] - Turn off borders on outer container
 */

/**
 * Render an opinionated composition of Scroll components, making `children`
 * scrollable.
 *
 * @param {CompositeProps & ScrollBoxProps} props
 */
const ScrollBoxNext = function ScrollBox({
  children,
  elementRef,

  borderless = false,

  ...htmlAttributes
}) {
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
