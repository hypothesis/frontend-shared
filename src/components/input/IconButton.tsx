import classnames from 'classnames';

import type { IconComponent, PresentationalProps } from '../../types';
import { downcastRef } from '../../util/typing';
import ButtonBase from './ButtonBase';
import type { ButtonCommonProps, HTMLButtonAttributes } from './ButtonBase';
import { inputGroupStyles } from './InputGroup';

type ComponentProps = {
  icon?: IconComponent;
  size?: 'xs' | 'sm' | 'md' | 'lg';

  /**
   * Disable minimum tap target sizing for touch devices. This may be necessary
   * in legacy patterns where there isn't enough room in the interface for these
   * larger dimensions.
   */
  disableTouchSizing?: boolean;
  variant?: 'primary' | 'secondary' | 'dark';

  /** Required for `IconButton` as there is no text label */
  title: string;
};

export type IconButtonProps = PresentationalProps &
  ButtonCommonProps &
  ComponentProps &
  HTMLButtonAttributes;

/**
 * Render a button that only contains an icon.
 */
const IconButton = function IconButton({
  children,
  classes,
  elementRef,

  pressed,
  expanded,

  icon: Icon,
  disableTouchSizing = false,
  size = 'md',
  title,
  variant = 'secondary',

  ...htmlAttributes
}: IconButtonProps) {
  return (
    <ButtonBase
      data-component="IconButton"
      {...htmlAttributes}
      classes={classnames(
        'focus-visible-ring transition-colors whitespace-nowrap flex items-center',
        'justify-center gap-x-2 rounded-sm',
        {
          // variant
          'text-grey-7 bg-transparent enabled:hover:text-grey-9 aria-pressed:text-brand aria-expanded:text-brand':
            variant === 'secondary', //default
          'text-brand bg-transparent enabled:hover:text-grey-9 disabled:text-grey-7':
            variant === 'primary',
          'text-grey-7 bg-grey-2 enabled:hover:text-grey-9 enabled:hover:bg-grey-3 disabled:text-grey-5 aria-pressed:bg-grey-3 aria-expanded:bg-grey-3':
            variant === 'dark',

          // size
          'p-2': size === 'md', // Default
          'p-1': size === 'xs',
          'p-1.5': size === 'sm',
          'p-2.5': size === 'lg',

          // Responsive
          'touch:min-w-touch-minimum touch:min-h-touch-minimum':
            !disableTouchSizing,
        },
        // Adapt styling when this component is inside an InputGroup
        inputGroupStyles,
        classes
      )}
      elementRef={downcastRef(elementRef)}
      title={title}
      pressed={pressed}
      expanded={expanded}
      unstyled
    >
      {Icon && <Icon className="w-em h-em" />}
      {children}
    </ButtonBase>
  );
};

export default IconButton;
