import classnames from 'classnames';

// @ts-ignore
import spinnerIcon from '../../images/icons/spinner--spokes.svg';
import { registerIcons, SvgIcon } from './SvgIcon';

// Register the spinner icon for use
registerIcons({
  'hyp-spinner': spinnerIcon,
});

/**
 * @typedef SpinnerProps
 * @prop {string} [classes] - Additional CSS classes to apply
 * @prop {'small'|'medium'|'large'} [size='medium'] - Relative size of spinner
 *   to surrounding content
 */

/**
 * Loading indicator.
 *
 * @param {SpinnerProps} props
 */
export function Spinner({ classes = '', size = 'medium' }) {
  const baseClass = `Hyp-Spinner--${size}`;
  return (
    <SvgIcon name="hyp-spinner" className={classnames(baseClass, classes)} />
  );
}
