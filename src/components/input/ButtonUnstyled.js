import classnames from 'classnames';

import { downcastRef } from '../../util/typing';

import ButtonBase from './ButtonBase';

/**
 * @typedef {import('../../types').PresentationalProps} CommonProps
 * @typedef {import('./ButtonBase').ButtonCommonProps} ButtonCommonProps
 */

/**
 * Render a button with common attributes but no styling
 *
 * @param {CommonProps & ButtonCommonProps} props
 */
export default function ButtonUnstyled({
  children,
  classes,
  elementRef,

  expanded,
  pressed,
  title,
  ...htmlAttributes
}) {
  return (
    <ButtonBase
      {...htmlAttributes}
      className={classnames(classes)}
      elementRef={downcastRef(elementRef)}
      expanded={expanded}
      pressed={pressed}
      title={title}
    >
      {children}
    </ButtonBase>
  );
}
