import { downcastRef } from '../../util/typing';

/**
 * @typedef {import('../../types').BaseProps} BaseProps
 * @typedef {import('preact').JSX.HTMLAttributes<HTMLAnchorElement>} HTMLAnchorAttributes
 */

/**
 * Base component for Link components. Applies common attributes.
 *
 * @param {BaseProps & HTMLAnchorAttributes} props
 */
const LinkBaseNext = function LinkBase({
  children,
  className,
  elementRef,

  ...htmlAttributes
}) {
  return (
    <a
      {...htmlAttributes}
      className={className}
      rel="noopener noreferrer"
      ref={downcastRef(elementRef)}
    >
      {children}
    </a>
  );
};

export default LinkBaseNext;
