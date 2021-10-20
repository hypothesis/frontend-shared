import classnames from 'classnames';

import { SvgIcon } from './SvgIcon';

/**
 * @typedef ButtonProps
 * @prop {import('preact').Ref<HTMLButtonElement>} [buttonRef]
 * @prop {string} [classes] - Optional CSS class name(s) to use _in addition_
 *   to the button component's own clases
 * @prop {string} [className] - Optional CSS class name that will _replace_
 *   the button component's own classes
 * @prop {string|symbol} [icon] - Name of `SvgIcon` to render in the button
 * @prop {'left'|'right'} [iconPosition] - Icon positioned to left or to
 *   right of button text
 * @prop {boolean} [expanded] - Is the element associated with this button
 *   expanded (set `aria-expanded`)
 * @prop {never} [aria-expanded] - Use `expanded` prop instead
 * @prop {boolean} [pressed] - Is this button currently "active?" (set
 *   `aria-pressed`)
 * @prop {never} [aria-pressed] - Use `pressed` prop instead
 * @prop {'small'|'medium'|'large'} [size='medium'] - Relative button size:
 *   affects padding
 * @prop {string} [title] - Button title; used for `aria-label` attribute
 * @prop {never} [aria-label] - Use `title` prop instead
 * @prop {'normal'|'primary'|'light'|'dark'} [variant='normal'] - For styling: element variant
 */

/**
 * Fold in HTML button prop definitions into ButtonProps, but ignore `size` because it's inherited
 * from HTMLElement and conflicts with the _ButtonProps.size prop above. Ignore `icon`
 * because it is typed to `string` only and we need to be able to accept {string|symbol}
 *
 * @typedef {Omit<import('preact').JSX.HTMLAttributes<HTMLButtonElement>, 'size' | 'icon'> } HTMLButtonElementProps
 * @typedef {ButtonProps & HTMLButtonElementProps} ButtonBaseProps
 */

/**
 * @typedef IconButtonBaseProps
 * @prop {string|symbol} icon - Icon is required for icon buttons
 * @prop {string} title - Title is required for icon buttons
 * @prop {never} [children] - children are not allowed (use LabeledButton instead)
 */

/**
 * @typedef {ButtonBaseProps & IconButtonBaseProps} IconButtonProps
 */

/**
 * @param {ButtonBaseProps} props
 */
function ButtonBase({
  // Custom props.
  buttonRef,
  classes,
  className,
  icon,
  iconPosition = 'left',
  size = 'medium',
  variant = 'normal',
  expanded,
  pressed,

  // Standard <button> props.
  type = 'button',
  ...restProps
}) {
  const ariaProps = {
    'aria-expanded': expanded,
    'aria-pressed': pressed,
    'aria-label': restProps.title,
  };

  return (
    <button
      ref={buttonRef}
      className={classnames(
        className,
        `${className}--${size}`,
        `${className}--${variant}`,
        {
          [`${className}--icon-${iconPosition}`]: icon,
        },
        classes
      )}
      type={type}
      {...ariaProps}
      {...restProps}
    />
  );
}

/**
 * An icon-only button
 *
 * @param {IconButtonProps} props
 */
export function IconButton({ className = 'Hyp-IconButton', ...restProps }) {
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
 * @param {ButtonBaseProps} props
 */
export function LabeledButton({
  children,
  className = 'Hyp-LabeledButton',
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
 * @param {ButtonBaseProps} props
 */
export function LinkButton(props) {
  return <ButtonBase className="Hyp-LinkButton" {...props} />;
}
