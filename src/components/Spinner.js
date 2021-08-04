import classnames from 'classnames';

import { registerIcon, SvgIcon } from './SvgIcon';

const spinnerIcon = registerIcon(
  'spinner',
  /** @ts-ignore - TS doesn't understand require here */
  require('../../images/icons/spinner--spokes.svg')
);

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
    <SvgIcon name={spinnerIcon} className={classnames(baseClass, classes)} />
  );
}
