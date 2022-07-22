import classnames from 'classnames';

import { SpinnerSpokesIcon } from '../icons';

/**
 * @typedef SpinnerProps
 * @prop {'sm'|'md'|'lg'} [size='sm']
 * @prop {'text-light'|'text'} [color='text-light']
 */

/**
 * Style a spinner icon.
 *
 * @param {SpinnerProps} props
 */
export default function Spinner({ size = 'sm', color = 'text-light' }) {
  return (
    <SpinnerSpokesIcon
      className={classnames(
        {
          'text-color-text-light': color === 'text-light', // default
          'text-color-text': color === 'text',
        },
        {
          'w-em h-em': size === 'sm', // default
          'w-2em h-2em': size === 'md',
          'w-4em h-4em': size === 'lg',
        }
      )}
    />
  );
}
