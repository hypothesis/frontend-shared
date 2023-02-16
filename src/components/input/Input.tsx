import type { JSX } from 'preact';

import type { PresentationalProps } from '../../types';
import { downcastRef } from '../../util/typing';

import InputRoot from './InputRoot';

type ComponentProps = {
  hasError?: boolean;
  type?: 'email' | 'search' | 'text' | 'url';
};

export type InputProps = PresentationalProps &
  ComponentProps &
  JSX.HTMLAttributes<HTMLInputElement>;

/**
 * Render a text field input
 */
const InputNext = function Input({
  elementRef,
  hasError,
  type = 'text',

  ...htmlAttributes
}: InputProps) {
  return (
    <InputRoot
      elementRef={downcastRef(elementRef)}
      type={type}
      hasError={hasError}
      {...htmlAttributes}
      data-component="Input"
    />
  );
};

export default InputNext;