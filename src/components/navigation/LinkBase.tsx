import classnames from 'classnames';
import type { JSX } from 'preact';

import type { BaseProps } from '../../types';
import { downcastRef } from '../../util/typing';

export type LinkBaseProps = BaseProps & JSX.HTMLAttributes<HTMLAnchorElement>;

/**
 * Base component for Link components. Applies common attributes and styles.
 * @deprecated Use Link with styling API props instead
 */
const LinkBase = function LinkBase({
  children,
  classes,
  elementRef,
  unstyled = false,

  ...htmlAttributes
}: LinkBaseProps) {
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

export default LinkBase;
