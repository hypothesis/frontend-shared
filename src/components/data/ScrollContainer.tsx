import classnames from 'classnames';
import type { JSX } from 'preact';

import type { PresentationalProps } from '../../types';
import { downcastRef } from '../../util/typing';

export type ScrollContainerProps = PresentationalProps & {
  /** Remove border around container */
  borderless?: boolean;
} & JSX.HTMLAttributes<HTMLDivElement>;

/**
 * Constrain children (which may include both scrollable and non-scrolling
 * content) to the dimensions of the immediate parent.
 *
 * @param {CommonProps & ScrollContainerProps & HTMLDivAttributes} props
 */
const ScrollContainer = function ScrollContainer({
  children,
  classes,
  elementRef,

  borderless = false,

  ...htmlAttributes
}: ScrollContainerProps) {
  return (
    <div
      data-component="ScrollContainer"
      {...htmlAttributes}
      ref={downcastRef(elementRef)}
      className={classnames(
        'flex flex-col h-full w-full',
        // Prevent overflow by overriding `min-height: auto`.
        // See https://stackoverflow.com/a/66689926/434243.
        'min-h-0',
        { border: !borderless },
        classes
      )}
    >
      {children}
    </div>
  );
};

export default ScrollContainer;
