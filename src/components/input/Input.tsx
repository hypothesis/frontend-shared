import type { JSX } from 'preact';

import type { PresentationalProps } from '../../types';
import { downcastRef } from '../../util/typing';
import InputRoot from './InputRoot';

type ComponentProps = {
  type?: 'email' | 'search' | 'text' | 'url';
  feedback?: 'error' | 'warning';

  /**
   * @deprecated Use feedback="error" instead
   */
  hasError?: boolean;
};

export type InputProps = PresentationalProps &
  ComponentProps &
  JSX.HTMLAttributes<HTMLInputElement>;

/**
 * Render a text field input
 */
const Input = function Input({
  elementRef,
  type = 'text',
  feedback,
  hasError,

  ...htmlAttributes
}: InputProps) {
  return (
    <InputRoot
      data-component="Input"
      elementRef={downcastRef(elementRef)}
      type={type}
      feedback={feedback}
      hasError={hasError}
      {...htmlAttributes}
    />
  );
};

export default Input;
