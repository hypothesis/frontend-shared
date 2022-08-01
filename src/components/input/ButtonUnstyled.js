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
const ButtonUnstyledNext = function ButtonUnstyled({
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
      data-component="ButtonUnstyled"
    >
      {children}
    </ButtonBase>
  );
};

export default ButtonUnstyledNext;
