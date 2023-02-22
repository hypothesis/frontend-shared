import classnames from 'classnames';

import { downcastRef } from '../../util/typing';

/**
 * @typedef {import('../../types').PresentationalProps} CommonProps
 * @typedef {import('preact').JSX.HTMLAttributes<HTMLDivElement>} HTMLDivAttributes
 *
 * @typedef ScrollContainerProps
 * @prop {boolean} [borderless=false] - Remove border around container
 */

/**
 * Constrain children (which may include both scrollable and non-scrolling
 * content) to the dimensions of the immediate parent.
 *
 * @param {CommonProps & ScrollContainerProps & HTMLDivAttributes} props
 */
const ScrollContainerNext = function ScrollContainer({
  children,
  classes,
  elementRef,

  borderless = false,

  ...htmlAttributes
}) {
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

export default ScrollContainerNext;
