import classnames from 'classnames';

// @ts-ignore
import spinnerSVG from '../../images/icons/spinner--spokes.svg';
import { Icon } from './Icon';
import { registerIcon } from './SvgIcon';

// Register the spinner icon for use
const spinnerIcon = registerIcon('spinner', spinnerSVG);

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
    <Icon
      name={spinnerIcon}
      containerClasses={classnames(baseClass, classes)}
    />
  );
}
