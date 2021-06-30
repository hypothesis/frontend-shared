import classnames from 'classnames';

import { registerIcons, SvgIcon } from './SvgIcon';

// Register the spinner icon for use
registerIcons({
  /** @ts-ignore - TS doesn't understand require here */
  'hyp-spinner': require('../../images/icons/spinner.svg'),
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
  return <SvgIcon name="spinner" className={classnames(baseClass, classes)} />;
}
