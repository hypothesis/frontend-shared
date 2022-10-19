import classnames from 'classnames';

import { downcastRef } from '../../util/typing';

import { inputGroupStyles } from './InputGroup';

import ButtonBase from './ButtonBase';

/**
 * @typedef {import('../../types').IconComponent} IconComponent
 * @typedef {import('../../types').PresentationalProps} CommonProps
 * @typedef {import('./ButtonBase').ButtonCommonProps} ButtonCommonProps
 * @typedef {import('./ButtonBase').HTMLButtonAttributes} HTMLButtonAttributes
 *
 * @typedef IconButtonProps
 * @prop {IconComponent} [icon] - reference to an icon function component
 *   to render in this button, e.g. CautionIcon
 * @prop {'sm'|'md'|'lg'} [size='md']
 * @prop {boolean} [disableTouchSizing=false] - Disable minimum tap target
 *   sizing for touch devices. This may be necessary in legacy patterns where
 *   there isn't enough room in the interface for these larger dimensions.
 * @prop {'primary'|'secondary'|'dark'} [variant='secondary']
 * @prop {string} title - Required for `IconButton` as there is no text label
 */

/**
 * Render a button that only contains an icon.
 *
 * @param {CommonProps & ButtonCommonProps & IconButtonProps & HTMLButtonAttributes} props
 */
const IconButtonNext = function IconButton({
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
}) {
  return (
    <ButtonBase
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
          'p-1.5': size === 'sm',
          'p-3': size === 'lg',

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
      data-component="IconButton"
      unstyled
    >
      {Icon && <Icon className="w-em h-em" />}
      {children}
    </ButtonBase>
  );
};

export default IconButtonNext;
