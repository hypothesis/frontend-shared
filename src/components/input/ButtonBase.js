import { downcastRef } from '../../util/typing';

/**
 * Common props used for Button components.
 *
 * @typedef ButtonCommonProps
 * @prop {boolean} [expanded] - Is the element associated with this button
 *   expanded? (set `aria-expanded`)
 * @prop {never} [aria-expanded] - Use `expanded` prop instead
 * @prop {boolean} [pressed] - Is this button currently "active?" (set
 *   `aria-pressed` or `aria-selected` depending on button `role`)
 * @prop {never} [aria-pressed] - Use `pressed` prop instead
 * @prop {string} [title] - Button title; used for `aria-label` attribute
 * @prop {never} [aria-label] - Use `title` prop instead
 *
 * HTML attributes accepted by button components. This eliminates conflicting
 * `icon` and `size` attributes.
 *
 * @typedef {Omit<import('preact').JSX.HTMLAttributes<HTMLButtonElement>, 'icon'|'size'>} HTMLButtonAttributes
 *
 */

/**
 * @typedef {import('../../types').BaseProps} BaseProps
 *
 * Base component for Button components. Applies common attributes.
 *
 * @param {BaseProps & ButtonCommonProps & HTMLButtonAttributes} props
 */
const ButtonBaseNext = function ButtonBase({
  elementRef,
  children,
  className,

  expanded,
  pressed,
  title,

  role,
  ...htmlAttributes
}) {
  const ariaProps = {
    'aria-label': title,
  };

  // aria-pressed and aria-expanded are not allowed for buttons with
  // an aria role of `tab`. Instead, the aria-selected attribute is expected.
  if (role === 'tab') {
    ariaProps['aria-selected'] = pressed;
  } else {
    ariaProps['aria-pressed'] = pressed;
    ariaProps['aria-expanded'] = expanded;
  }

  return (
    <button
      role={role ?? 'button'}
      {...ariaProps}
      {...htmlAttributes}
      className={className}
      title={title}
      ref={downcastRef(elementRef)}
    >
      {children}
    </button>
  );
};

export default ButtonBaseNext;
