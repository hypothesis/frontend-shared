import classnames from 'classnames';
import type { JSX } from 'preact';

import { useSyncedRef } from '../../hooks/use-synced-ref';
import { useValidationError } from '../../hooks/use-validation-error';
import type { FormControlProps, PresentationalProps } from '../../types';
import { downcastRef } from '../../util/typing';
import { inputGroupStyles } from './InputGroup';

export type InputStylesOptions = {
  classes?: string | string[];
  feedback?: 'error' | 'warning';
};

export function inputStyles({ classes, feedback }: InputStylesOptions) {
  return classnames(
    'focus-visible-ring ring-inset border rounded w-full p-2',
    'bg-grey-0 focus:bg-white disabled:bg-grey-1',
    'placeholder:text-grey-6 disabled:placeholder:text-grey-7',

    // On iOS, the input font size must be at least 16px to prevent the browser
    // from zooming into it on touch.
    'touch:text-at-least-16px',

    {
      'ring-2': !!feedback,
      'ring-red-error': feedback === 'error',
      'ring-yellow-notice': feedback === 'warning',
    },
    // Adapt styles when this component is inside an InputGroup
    inputGroupStyles,
    classes,
  );
}

type ComponentProps = FormControlProps & {
  type?: 'text' | 'email' | 'search' | 'number' | 'password' | 'url';
};

export type InputProps = PresentationalProps &
  ComponentProps &
  JSX.InputHTMLAttributes<HTMLInputElement>;

/**
 * Render a text field input
 */
export default function Input({
  elementRef,
  type = 'text',
  classes,
  error,
  feedback,

  ...htmlAttributes
}: InputProps) {
  if (!htmlAttributes.id && !htmlAttributes['aria-label']) {
    console.warn(
      '`Input` component should have either an `id` or an `aria-label` attribute',
    );
  }

  const inputRef = downcastRef<HTMLElement | undefined, HTMLInputElement>(
    elementRef,
  );
  const ref = useSyncedRef<HTMLInputElement>(inputRef);

  if (error) {
    feedback = 'error';
  }
  useValidationError(ref, error);

  return (
    <input
      data-component="Input"
      {...htmlAttributes}
      ref={ref}
      type={type}
      className={inputStyles({ classes, feedback })}
      aria-invalid={feedback === 'error'}
    />
  );
}
