import classnames from 'classnames';

import type { IconComponent, PresentationalProps } from '../../types';
import { downcastRef } from '../../util/typing';
import ButtonBase from './ButtonBase';
import type { ButtonCommonProps, HTMLButtonAttributes } from './ButtonBase';

type ComponentProps = {
  /** Adjusts padding on button */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';

  /**
   * Optional icon to display at left of button label text. Will be sized
   * proportional to local font size.
   */
  icon?: IconComponent;
};

export type ButtonProps = PresentationalProps &
  ButtonCommonProps &
  ComponentProps &
  HTMLButtonAttributes;
/**
 * Render a button with a label (`children`) and optional icon
 */
const ButtonNext = function Button({
  children,
  classes,
  elementRef,

  expanded,
  pressed,
  title,

  icon: Icon,
  size = 'md',
  variant = 'secondary',

  ...htmlAttributes
}: ButtonProps) {
  return (
    <ButtonBase
      data-component="Button"
      {...htmlAttributes}
      classes={classnames(
        'focus-visible-ring transition-colors whitespace-nowrap flex items-center',
        'font-semibold rounded-sm',
        {
          // Variants
          'text-grey-7 bg-grey-1 enabled:hover:text-grey-9 enabled:hover:bg-grey-2 aria-pressed:text-grey-9 aria-expanded:text-grey-9':
            variant === 'secondary', // default
          'text-grey-1 bg-grey-7 enabled:hover:bg-grey-8 disabled:text-grey-4':
            variant === 'primary',
        },
        {
          // Sizes
          'p-2 gap-x-2': size === 'md', // default
          'p-1 gap-x-1': size === 'xs',
          'p-1.5 gap-x-1.5': size === 'sm',
          'p-2.5 gap-x-1.5': size === 'lg',
        },
        classes
      )}
      elementRef={downcastRef(elementRef)}
      expanded={expanded}
      pressed={pressed}
      title={title}
      unstyled
    >
      {Icon && <Icon className="w-em h-em" />}
      {children}
    </ButtonBase>
  );
};

export default ButtonNext;
