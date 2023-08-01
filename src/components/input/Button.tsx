import classnames from 'classnames';
import type { JSX } from 'preact';

import type { IconComponent, PresentationalProps } from '../../types';
import { downcastRef } from '../../util/typing';

type ComponentProps = {
  /**
   * Is the element associated with this button expanded?
   * (sets `aria-expanded` attribute)
   */
  expanded?: boolean;

  /**
   * Optional icon to display at left of button label text.
   */
  icon?: IconComponent;

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

  // Sizing API
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'custom';
  variant?: 'primary' | 'secondary' | 'custom';
  unstyled?: boolean;
};

export type HTMLButtonAttributes = Omit<
  JSX.HTMLAttributes<HTMLButtonElement>,
  'icon' | 'size'
>;

export type ButtonProps = PresentationalProps &
  ComponentProps &
  HTMLButtonAttributes;

/**
 * Render a button with optional icon
 */
const Button = function Button({
  children,
  classes,
  elementRef,

  expanded,
  pressed,
  title,
  icon: Icon,
  size = 'md',
  variant = 'secondary',
  unstyled = false,

  role,
  ...htmlAttributes
}: ButtonProps) {
  const styled = !unstyled;
  const themed = styled && variant !== 'custom';
  const sized = styled && size !== 'custom';

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
      data-component="Button"
      // Setting a default `type` can prevent undesired form submissions in
      // certain cases
      type="button"
      {...ariaProps}
      {...htmlAttributes}
      className={classnames(
        {
          'focus-visible-ring transition-colors whitespace-nowrap flex items-center':
            styled,
        },
        themed && {
          'font-semibold rounded': true,
          'text-grey-7 bg-grey-1 enabled:hover:text-grey-9 enabled:hover:bg-grey-2 aria-pressed:text-grey-9 aria-expanded:text-grey-9':
            variant === 'secondary', // default
          'text-grey-1 bg-grey-7 enabled:hover:bg-grey-8 disabled:text-grey-4':
            variant === 'primary',
        },
        sized && {
          'p-2 gap-x-2': size === 'md', // default
          'p-1 gap-x-1': size === 'xs',
          'p-1.5 gap-x-1.5': size === 'sm',
          'p-2.5 gap-x-1.5': size === 'lg',
        },
        classes,
      )}
      ref={downcastRef(elementRef)}
      title={title}
    >
      {Icon && <Icon className="w-em h-em" />}
      {children}
    </button>
  );
};

export default Button;
