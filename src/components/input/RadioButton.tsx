import type { JSX } from 'preact';

import type { CompositeProps, IconComponent } from '../../types';
import { RadioCheckedIcon, RadioIcon } from '../icons';
import ToggleInput from './ToggleInput';

type ComponentProps = {
  checked?: boolean;
  /** Custom icon to show when input is unchecked */
  icon?: IconComponent;
  /** Custom icon to show when input is checked */
  checkedIcon?: IconComponent;
  /** type is always `radio` */
  type?: never;
};

export type RadioButtonProps = CompositeProps &
  ComponentProps &
  Omit<JSX.HTMLAttributes<HTMLInputElement>, 'size' | 'icon'>;

/**
 * Render a labeled radio input. The radio is styled with two icons: one for the
 * unchecked state and one for the checked state. The input itself is positioned
 * exactly on top of the icon, but is non-visible.
 */
export default function RadioButton({
  icon = RadioIcon,
  checkedIcon = RadioCheckedIcon,
  ...rest
}: RadioButtonProps) {
  return (
    <ToggleInput icon={icon} checkedIcon={checkedIcon} type="radio" {...rest} />
  );
}
