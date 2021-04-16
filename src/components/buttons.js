import classnames from 'classnames';

import { SvgIcon } from './SvgIcon';

/**
 * @typedef ButtonProps
 * @prop {import("preact").ComponentChildren} [children]
 * @prop {string} [className]
 * @prop {string} [icon] - Name of `SvgIcon` to render in the button
 * @prop {'left'|'right'} [iconPosition] - Icon positioned to left or to
 *   right of button text
 * @prop {boolean} [disabled]
 * @prop {boolean} [expanded] - Is the element associated with this button
 *   expanded (set `aria-expanded`)
 * @prop {boolean} [pressed] - Is this button currently "active?" (set
 *   `aria-pressed`)
 * @prop {() => any} [onClick]
 * @prop {'small'|'medium'|'large'} [size='medium'] - Relative button size:
 *   affects padding
 * @prop {Object} [style] - Optional inline styles
 * @prop {string} [title] - Button title; used for `aria-label` attribute
 * @prop {'normal'|'primary'|'light'|'dark'} [variant='normal'] - For styling: element variant
 */

/**
 * @typedef IconButtonBaseProps
 * @prop {string} icon - Icon is required for icon buttons
 * @prop {string} title - Title is required for icon buttons
 * @prop {never} [children] - children are not allowed (use LabeledButton instead)
 */

/**
 * @typedef {ButtonProps & IconButtonBaseProps} IconButtonProps
 */

/**
 * @param {ButtonProps} props
 */
function ButtonBase({
  className,
  icon,
  iconPosition = 'left',
  size = 'medium',
  variant = 'normal',
  expanded,
  pressed,
  ...restProps
}) {
  restProps['aria-expanded'] = expanded;
  restProps['aria-pressed'] = pressed;
  restProps['aria-label'] = restProps.title;

  return (
    <button
      className={classnames(
        className,
        `${className}--${size}`,
        `${className}--${variant}`,
        {
          [`${className}--icon-${iconPosition}`]: icon,
        }
      )}
      {...restProps}
    />
  );
}

/**
 * An icon-only button
 *
 * @param {IconButtonProps} props
 */
export function IconButton({ className = 'IconButton', ...restProps }) {
  const { icon } = restProps;
  return (
    <ButtonBase className={className} {...restProps}>
      <SvgIcon name={icon} />
    </ButtonBase>
  );
}

/**
 * A labeled button, with or without an icon
 *
 * @param {ButtonProps} props
 */
export function LabeledButton({
  children,
  className = 'LabeledButton',
  ...restProps
}) {
  const { icon, iconPosition = 'left' } = restProps;
  return (
    <ButtonBase className={className} {...restProps}>
      {icon && iconPosition === 'left' && <SvgIcon name={icon} />}
      {children}
      {icon && iconPosition === 'right' && <SvgIcon name={icon} />}
    </ButtonBase>
  );
}

/**
 * A button styled to appear as an HTML link (<a>)
 *
 * @param {ButtonProps} props
 */
export function LinkButton(props) {
  return <ButtonBase className="LinkButton" {...props} />;
}
