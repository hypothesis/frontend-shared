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
 * @typedef FullScreenSpinnerProps
 * @prop {string} [classes] - Additional CSS classes to apply
 * @prop {string} [containerClasses] - CSS classes to apply to wrapping element.
 */

/**
 * Loading indicator.
 *
 * @deprecated - Use re-implemented component in the feedback group
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

/**
 * Full-screen loading indicator.
 *
 * @deprecated - Use `SpinnerOverlay` in the feedback group
 * @param {FullScreenSpinnerProps} props
 */
export function FullScreenSpinner({ classes = '', containerClasses = '' }) {
  return (
    <div className={classnames('Hyp-FullScreenSpinner', containerClasses)}>
      <Spinner
        classes={classnames('Hyp-FullScreenSpinner__spinner', classes)}
        size="large"
      />
    </div>
  );
}
