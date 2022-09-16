import classnames from 'classnames';

import { downcastRef } from '../../util/typing';

/**
 * @typedef {import('../../types').BaseProps} BaseProps
 * @typedef {import('preact').JSX.HTMLAttributes<HTMLAnchorElement>} HTMLAnchorAttributes
 */

/**
 * Base component for Link components. Applies common attributes and styles.
 *
 * @param {BaseProps & HTMLAnchorAttributes} props
 */
const LinkBaseNext = function LinkBase({
  children,
  classes,
  elementRef,
  unstyled = false,

  ...htmlAttributes
}) {
  return (
    <a
      data-base-component="LinkBase"
      /* data-component will be overwritten unless this component is used directly */
      data-component="LinkBase"
      {...htmlAttributes}
      className={classnames({ 'focus-visible-ring': !unstyled }, classes)}
      rel="noopener noreferrer"
      ref={downcastRef(elementRef)}
    >
      {children}
    </a>
  );
};

export default LinkBaseNext;
