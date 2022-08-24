import classnames from 'classnames';

import { downcastRef } from '../../util/typing';

import LinkBase from './LinkBase';

/**
 * @typedef {import('../../types').PresentationalProps} CommonProps
 * @typedef {import('preact').JSX.HTMLAttributes<HTMLAnchorElement>} HTMLAnchorAttributes
 *
 * @typedef LinkProps
 * @prop {'always'|'hover'|'none'} [underline]
 * @prop {'brand'|'text-light'|'text'} [color='brand']
 */

/**
 * Styled component for a link (`<a>` element).
 *
 * @param {CommonProps & LinkProps & HTMLAnchorAttributes} props
 */
const LinkNext = function Link({
  children,
  classes,
  elementRef,

  underline = 'none',
  color = 'brand',

  ...htmlAttributes
}) {
  return (
    <LinkBase
      {...htmlAttributes}
      classes={classnames(
        // NB: Base classes are applied by LinkBase
        {
          // color
          'text-brand hover:text-brand-dark': color === 'brand', // default
          'text-color-text-light hover:text-brand': color === 'text-light',
          'text-color-text hover:text-brand-dark': color === 'text',
        },
        {
          // underline
          'no-underline hover:no-underline': underline === 'none', // default
          'underline hover:underline': underline === 'always',
          'no-underline hover:underline': underline === 'hover',
        },
        classes
      )}
      elementRef={downcastRef(elementRef)}
      data-component="Link"
    >
      {children}
    </LinkBase>
  );
};

export default LinkNext;
