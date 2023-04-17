import classNames from 'classnames';
import type { JSX } from 'preact';

import type { BaseProps } from '../../types';
import { downcastRef } from '../../util/typing';

/**
 * Common props used for Button components.
 */
export type ButtonCommonProps = {
  /**
   * Is the element associated with this button expanded?
   * (sets `aria-expanded` attribute)
   */
  expanded?: boolean;

  /**
   * Is this button currently "active"?
   * (sets `aria-pressed` or `aria-selected` depending on button `role`)
   */
  pressed?: boolean;

  /**
   * Button title (sets `aria-label` attribute)
   */
  title?: string;

  /** Use `expanded` prop instead */
  'aria-expanded'?: never;
  /** Use `pressed` prop instead */
  'aria-pressed'?: never;
  /** Use `title` prop instead */
  'aria-label'?: never;
};

/**
 * HTML attributes accepted by button components. This eliminates conflicting
 * `icon` and `size` attributes.
 */
export type HTMLButtonAttributes = Omit<
  JSX.HTMLAttributes<HTMLButtonElement>,
  'icon' | 'size'
>;

export type ButtonBaseProps = BaseProps &
  ButtonCommonProps &
  HTMLButtonAttributes;

/**
 * Base component for Button components. Applies common attributes.
 */
const ButtonBase = function ButtonBase({
  elementRef,
  children,
  classes,
  unstyled = false,

  expanded,
  pressed,
  title,

  role,
  ...htmlAttributes
}: ButtonBaseProps) {
  const ariaProps: Record<string, unknown> = {
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
      data-base-component="ButtonBase"
      /* data-component will be overwritten unless this component is used directly */
      data-component="ButtonBase"
      // Setting a default `type` can prevent undesired form submissions in
      // certain cases
      type="button"
      {...htmlAttributes}
      className={classNames(
        {
          'focus-visible-ring': !unstyled,
          'transition-colors': !unstyled,
          // Set layout for button content
          'whitespace-nowrap flex items-center': !unstyled,
        },
        classes
      )}
      title={title}
      ref={downcastRef(elementRef)}
    >
      {children}
    </button>
  );
};

export default ButtonBase;
