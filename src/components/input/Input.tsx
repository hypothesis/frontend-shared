import classnames from 'classnames';
import type { JSX } from 'preact';

import type { PresentationalProps } from '../../types';
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
    'placeholder:text-color-grey-5 disabled:placeholder:color-grey-6',
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

type ComponentProps = {
  type?: 'text' | 'email' | 'search' | 'number' | 'password' | 'url';
  feedback?: 'error' | 'warning';
};

export type InputProps = PresentationalProps &
  ComponentProps &
  JSX.HTMLAttributes<HTMLInputElement>;

/**
 * Render a text field input
 */
export default function Input({
  elementRef,
  type = 'text',
  classes,
  feedback,

  ...htmlAttributes
}: InputProps) {
  if (!htmlAttributes.id && !htmlAttributes['aria-label']) {
    console.warn(
      '`Input` component should have either an `id` or an `aria-label` attribute',
    );
  }

  return (
    <input
      data-component="Input"
      {...htmlAttributes}
      ref={downcastRef(elementRef)}
      type={type}
      className={inputStyles({ classes, feedback })}
    />
  );
}
