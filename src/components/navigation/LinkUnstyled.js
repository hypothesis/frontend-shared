import classnames from 'classnames';

import { downcastRef } from '../../util/typing';

import LinkBase from './LinkBase';

/**
 * Render a link (`<a>`) with common attributes but no styling
 *
 * @typedef {import('../../types').PresentationalProps} CommonProps
 * @typedef {import('preact').JSX.HTMLAttributes<HTMLAnchorElement>} HTMLAnchorAttributes
 *
 * @param {CommonProps & HTMLAnchorAttributes} props
 */
export default function LinkUnstyled({
  children,
  classes,
  elementRef,

  ...htmlAttributes
}) {
  return (
    <LinkBase
      {...htmlAttributes}
      className={classnames(classes)}
      elementRef={downcastRef(elementRef)}
      data-component="LinkUnstyled"
    >
      {children}
    </LinkBase>
  );
}
