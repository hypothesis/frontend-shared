import classnames from 'classnames';
import type { JSX } from 'preact';

import type { CompositeProps, IconComponent } from '../../types';
import { downcastRef } from '../../util/typing';

type ComponentProps = {
  checked?: boolean;
  /** Custom icon to show when input is unchecked */
  icon: IconComponent;
  /** Custom icon to show when input is checked */
  checkedIcon: IconComponent;

  type: 'checkbox' | 'radio';
};

export type ToggleInputProps = CompositeProps &
  ComponentProps &
  Omit<JSX.HTMLAttributes<HTMLInputElement>, 'size' | 'icon'>;

/**
 * Render a labeled checkbox or radio input. The input is styled with two icons:
 * one for the unchecked state and one for the checked state. The input itself
 * is positioned exactly on top of the icon, but is non-visible.
 */
export default function ToggleInput({
  children,
  elementRef,

  checked,
  icon: UncheckedIcon,
  checkedIcon: CheckedIcon,

  disabled,
  onChange,
  id,
  type,
  ...htmlAttributes
}: ToggleInputProps) {
  const Icon = checked ? CheckedIcon : UncheckedIcon;

  return (
    <label
      className={classnames('relative flex items-center gap-x-1.5', {
        'cursor-pointer': !disabled,
        'opacity-70': disabled,
      })}
      htmlFor={id}
      data-composite-component={
        type === 'checkbox' ? 'Checkbox' : 'RadioButton'
      }
    >
      <input
        {...htmlAttributes}
        type={type}
        ref={downcastRef(elementRef)}
        className={classnames(
          // Set the special Tailwind peer class to allow sibling elements
          // to style themselves based on the state of this element
          'peer',
          // Position this atop the icon and size it to the same dimensions
          'absolute w-em h-em',
          // Make input visually hidden, but some screen readers won't read out
          // elements with 0 opacity
          'opacity-[.00001]',
          {
            'cursor-pointer': !disabled,
          },
        )}
        checked={checked}
        disabled={disabled}
        id={id}
        onChange={onChange}
      />
      <Icon
        className={classnames(
          // Add an outline ring to the icon when the input is focus-visible.
          // The ring needs to be applied here because the `input` has an
          // effectively-0 opacity.
          'peer-focus-visible:ring',
          'w-em h-em',
        )}
      />
      {children}
    </label>
  );
}
