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
const Input = function Input({
  elementRef,
  hasError,
  type = 'text',

  ...htmlAttributes
}: InputProps) {
  return (
    <InputRoot
      data-component="Input"
      elementRef={downcastRef(elementRef)}
      type={type}
      hasError={hasError}
      {...htmlAttributes}
    />
  );
};

export default Input;
