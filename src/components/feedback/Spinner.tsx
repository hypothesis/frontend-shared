import classnames from 'classnames';

import { SpinnerSpokesIcon } from '../icons';

export type SpinnerProps = {
  size?: 'sm' | 'md' | 'lg';
  color?: 'text-light' | 'text' | 'text-inverted';
};

/**
 * Style a spinner icon.
 */
export default function Spinner({
  size = 'sm',
  color = 'text-light',
}: SpinnerProps) {
  return (
    <SpinnerSpokesIcon
      className={classnames(
        {
          'text-color-text-light': color === 'text-light', // default
          'text-color-text': color === 'text',
          'text-color-text-inverted': color === 'text-inverted',
        },
        {
          'w-em h-em': size === 'sm', // default
          'w-2em h-2em': size === 'md',
          'w-4em h-4em': size === 'lg',
        },
      )}
      data-component="Spinner"
    />
  );
}
