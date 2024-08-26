import type { JSX } from 'preact';
import { useState } from 'preact/hooks';

import type { CompositeProps, IconComponent } from '../../types';
import { CheckboxCheckedIcon, CheckboxOutlineIcon } from '../icons';
import ToggleInput from './ToggleInput';

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
export default function Checkbox({
  checked,
  defaultChecked = false,
  icon = CheckboxOutlineIcon,
  checkedIcon = CheckboxCheckedIcon,
  onChange,
  ...rest
}: CheckboxProps) {
  // If `checked` is present, treat this as a controlled component
  const isControlled = typeof checked === 'boolean';
  // Only use this local state if checkbox is uncontrolled
  const [uncontrolledChecked, setUncontrolledChecked] =
    useState(defaultChecked);
  const isChecked = isControlled ? checked : uncontrolledChecked;

  function handleChange(
    this: void,
    event: JSX.TargetedEvent<HTMLInputElement>,
  ) {
    onChange?.call(this, event);
    if (!isControlled) {
      setUncontrolledChecked((event.target as HTMLInputElement).checked);
    }
  }

  return (
    <ToggleInput
      icon={icon}
      checkedIcon={checkedIcon}
      type="checkbox"
      checked={isChecked}
      onChange={handleChange}
      {...rest}
    />
  );
}
