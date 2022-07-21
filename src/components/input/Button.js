import classnames from 'classnames';

import { downcastRef } from '../../util/typing';

import ButtonBase from './ButtonBase';

/**
 * @typedef {import('../../types').IconComponent} IconComponent
 *
 * @typedef {import('../../types').PresentationalProps} CommonProps
 * @typedef {import('./ButtonBase').ButtonCommonProps} ButtonCommonProps
 * @typedef {import('./ButtonBase').HTMLButtonAttributes} HTMLButtonAttributes
 *
 * @typedef ButtonProps
 * @prop {'sm'|'md'|'lg'} [size='md'] - Adjusts padding on button
 * @prop {'primary'|'secondary'} [variant='secondary']
 * @prop {IconComponent} [Icon] - Optional icon to display at left
 *   of button label text. Will be sized proportional to local font size.
 */

/**
 * Render a button with a label (`children`) and optional icon
 *
 * @param {CommonProps & ButtonCommonProps & ButtonProps & HTMLButtonAttributes} props
 */
export default function Button({
  children,
  classes,
  elementRef,

  expanded,
  pressed,
  title,

  Icon,
  size = 'md',
  variant = 'secondary',

  ...htmlAttributes
}) {
  return (
    <ButtonBase
      {...htmlAttributes}
      className={classnames(
        'focus-visible-ring transition-colors whitespace-nowrap rounded-sm',
        'flex items-center font-semibold',
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
          'px-1.5 py-1 gap-x-1.5': size === 'sm',
          'px-3 py-2.5 gap-x-2.5': size === 'lg',
        },
        classes
      )}
      elementRef={downcastRef(elementRef)}
      expanded={expanded}
      pressed={pressed}
      title={title}
    >
      {Icon && <Icon className="w-em h-em" />}
      {children}
    </ButtonBase>
  );
}
