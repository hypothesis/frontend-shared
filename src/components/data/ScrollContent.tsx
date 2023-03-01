import classnames from 'classnames';
import type { JSX } from 'preact';

import type { PresentationalProps } from '../../types';
import { downcastRef } from '../../util/typing';

export type ScrollContentProps = PresentationalProps &
  JSX.HTMLAttributes<HTMLDivElement>;

/**
 * Apply consistent padding and spacing to content within a Scroll
 */
const ScrollContentNext = function ScrollContent({
  children,
  classes,
  elementRef,
  ...htmlAttributes
}: ScrollContentProps) {
  return (
    <div
      data-component="ScrollContent"
      {...htmlAttributes}
      ref={downcastRef(elementRef)}
      className={classnames('px-3 py-2', classes)}
    >
      {children}
    </div>
  );
};

export default ScrollContentNext;
