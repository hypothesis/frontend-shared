import classnames from 'classnames';
import type { JSX } from 'preact';
import { useState } from 'preact/hooks';

import type { CompositeProps, IconComponent } from '../../types';
import { downcastRef } from '../../util/typing';
import { CheckboxOutlineIcon, CheckboxCheckedIcon } from '../icons';

type ComponentProps = {
  /** Current checked state. Used when the Checkbox is controlled. */
  checked?: boolean;

  /**
   * Default checked state. Used to set initial state when the Checkbox is not
   * controlled.
   */
  defaultChecked?: boolean;
  /** Custom icon to show when input is unchecked */
  icon?: IconComponent;
  /** Custom icon to show when input is checked */
  checkedIcon?: IconComponent;
  /** type is always `checkbox` */
  type?: never;
};

export type CheckboxProps = CompositeProps &
  ComponentProps &
  Omit<JSX.HTMLAttributes<HTMLInputElement>, 'size' | 'icon'>;

/**
 * Render a labeled checkbox input. The checkbox is styled with two icons:
 * one for the unchecked state and one for the checked state. The input itself
 * is positioned exactly on top of the icon, but is non-visible.
 */
const Checkbox = function Checkbox({
  children,
  elementRef,

  checked,
  defaultChecked = false,
  icon: UncheckedIcon = CheckboxOutlineIcon,
  checkedIcon: CheckedIcon = CheckboxCheckedIcon,

  disabled,
  onChange,
  id,
  ...htmlAttributes
}: CheckboxProps) {
  // If `checked` is present, treat this as a controlled component
  const isControlled = typeof checked === 'boolean';
  // Only use this local state if checkbox is uncontrolled
  const [uncontrolledChecked, setUncontrolledChecked] =
    useState(defaultChecked);
  const isChecked = isControlled ? checked : uncontrolledChecked;

  function handleChange(
    this: void,
    event: JSX.TargetedEvent<HTMLInputElement>
  ) {
    onChange?.call(this, event);
    if (!isControlled) {
      setUncontrolledChecked((event.target as HTMLInputElement).checked);
    }
  }

  const Icon = isChecked ? CheckedIcon : UncheckedIcon;

  return (
    <label
      className={classnames('relative flex items-center gap-x-1.5', {
        'cursor-pointer': !disabled,
        'opacity-70': disabled,
      })}
      htmlFor={id}
      data-composite-component="Checkbox"
    >
      <input
        {...htmlAttributes}
        type="checkbox"
        ref={downcastRef(elementRef)}
        className={classnames(
          // Set the special Tailwind peer class to allow sibling elements
          // to style themselves based on the state of this element
          'peer',
          // Position this atop the icon and size it to the same dimensions
          'absolute w-em h-em',
          // Make checkbox input visually hidden, but
          // some screen readers won't read out elements with 0 opacity
          'opacity-[.00001]',
          {
            'cursor-pointer': !disabled,
          }
        )}
        checked={isChecked}
        disabled={disabled}
        id={id}
        onChange={handleChange}
      />
      <Icon
        className={classnames(
          // Add an outline ring to the icon when the input is focus-visible.
          // The ring needs to be applied here because the `input` has an
          // effectively-0 opacity.
          'peer-focus-visible:ring',
          'w-em h-em'
        )}
      />
      {children}
    </label>
  );
};

export default Checkbox;
