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
export default function Link({
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
      className={classnames(
        'focus-visible-ring rounded-sm',
        {
          // color
          'text-brand hover:text-brand-dark': color === 'brand', // default
          'text-color-text-light hover:text-color-text-light':
            color === 'text-light',
          'text-color-text hover:text-color-text': color === 'text',
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
    >
      {children}
    </LinkBase>
  );
}
