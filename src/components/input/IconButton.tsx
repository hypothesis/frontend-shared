import classnames from 'classnames';

import type { IconComponent, PresentationalProps } from '../../types';
import { downcastRef } from '../../util/typing';
import type { ButtonProps } from './Button';
import Button from './Button';
import { inputGroupStyles } from './InputGroup';

type ComponentProps = {
  icon?: IconComponent;

  /** Required for `IconButton` as there is no text label */
  title: string;

  // Styling API
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'custom';
  unstyled?: boolean;
  variant?: 'primary' | 'secondary' | 'dark' | 'custom';
};

export type IconButtonProps = PresentationalProps &
  Omit<ButtonProps, 'title' | 'size' | 'variant'> &
  ComponentProps;

/**
 * Render a button that only contains an icon.
 */
export default function IconButton({
  children,
  classes,
  elementRef,

  pressed,
  expanded,

  icon: Icon,
  size = 'md',
  title,
  variant = 'secondary',
  unstyled = false,

  ...htmlAttributes
}: IconButtonProps) {
  const styled = !unstyled;
  const themed = styled && variant !== 'custom';
  const sized = styled && size !== 'custom';

  return (
    <Button
      data-component="IconButton"
      {...htmlAttributes}
      classes={classnames(
        {
          'focus-visible-ring transition-colors rounded whitespace-nowrap':
            styled,
          'flex items-center justify-center': styled,
        },
        // Adapt styles when in an InputGroup
        styled && inputGroupStyles,
        themed && {
          // variant
          'text-grey-7 bg-transparent enabled:hover:text-grey-9 aria-pressed:text-brand aria-expanded:text-brand':
            variant === 'secondary', //default
          'text-brand bg-transparent enabled:hover:text-grey-9 disabled:text-grey-7':
            variant === 'primary',
          'text-grey-7 bg-grey-2 enabled:hover:text-grey-9 enabled:hover:bg-grey-3 disabled:text-grey-5 aria-pressed:bg-grey-3 aria-expanded:bg-grey-3':
            variant === 'dark',
        },
        sized && {
          'gap-x-2 touch:min-w-touch-minimum touch:min-h-touch-minimum': true,
          'p-2': size === 'md', // Default
          'p-1': size === 'xs',
          'p-1.5': size === 'sm',
          'p-2.5': size === 'lg',
        },
        classes,
      )}
      elementRef={downcastRef(elementRef)}
      title={title}
      pressed={pressed}
      expanded={expanded}
      unstyled
    >
      {Icon && <Icon className="w-em h-em" />}
      {children}
    </Button>
  );
}
