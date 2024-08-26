import type { IconComponent } from '../../types';
import { CheckboxCheckedIcon, CheckboxOutlineIcon } from '../icons';
import ToggleInput, { type ToggleInputProps } from './ToggleInput';

export type CheckboxProps = Omit<
  ToggleInputProps,
  'icon' | 'checkedIcon' | 'type'
> & {
  /** Custom icon to show when input is unchecked */
  icon?: IconComponent;
  /** Custom icon to show when input is checked */
  checkedIcon?: IconComponent;
  /** type is always `checkbox` */
  type?: never;
};

/**
 * Render a labeled checkbox input. The checkbox is styled with two icons:
 * one for the unchecked state and one for the checked state. The input itself
 * is positioned exactly on top of the icon, but is non-visible.
 */
export default function Checkbox({
  icon = CheckboxOutlineIcon,
  checkedIcon = CheckboxCheckedIcon,
  ...rest
}: CheckboxProps) {
  return (
    <ToggleInput
      icon={icon}
      checkedIcon={checkedIcon}
      type="checkbox"
      {...rest}
    />
  );
}
