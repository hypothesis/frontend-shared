import type { JSX, Ref } from 'preact';

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

  /** Optional extra CSS classes appended to the container's className */
  containerClasses?: string | string[];
  /** Ref associated with the component's container */
  containerRef?: Ref<HTMLLabelElement | undefined>;
};

export type RadioButtonProps = CompositeProps &
  ComponentProps &
  Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'size' | 'icon'>;

/**
 * Render a labeled radio input. The radio is styled with two icons: one for the
 * unchecked state and one for the checked state. The input itself is positioned
 * exactly on top of the icon, but is non-visible.
 *
 * Note:
 * This component was created with the intention to make it the foundation for
 * RadioGroup, but we finally found it easier to implement something from scratch.
 * If we don't find a use case for this component, we'll remove it eventually.
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
