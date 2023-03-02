import classnames from 'classnames';
import type { JSX } from 'preact';

import type { PresentationalProps } from '../../types';
import { downcastRef } from '../../util/typing';
import LinkBase from './LinkBase';

type ComponentProps = {
  underline?: 'always' | 'hover' | 'none';
  color?: 'brand' | 'text-light' | 'text';
};

export type LinkProps = PresentationalProps &
  ComponentProps &
  JSX.HTMLAttributes<HTMLAnchorElement>;

/**
 * Styled component for a link (`<a>` element).
 */
const LinkNext = function Link({
  children,
  classes,
  elementRef,

  underline = 'none',
  color = 'brand',

  ...htmlAttributes
}: LinkProps) {
  return (
    <LinkBase
      data-component="Link"
      {...htmlAttributes}
      classes={classnames(
        'rounded-sm',
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
    >
      {children}
    </LinkBase>
  );
};

export default LinkNext;
