import type { JSX } from 'preact';

import type { PresentationalProps } from '../../types';
import { downcastRef } from '../../util/typing';
import InputRoot from './InputRoot';

type ComponentProps = {
  feedback?: 'error' | 'warning';
};

export type TextareaProps = PresentationalProps &
  ComponentProps &
  JSX.HTMLAttributes<HTMLTextAreaElement>;

/**
 * Render a textarea
 */
export default function Textarea({
  elementRef,
  type = 'text',
  feedback,

  ...htmlAttributes
}: TextareaProps) {
  return (
    <InputRoot
      data-component="Textarea"
      element="textarea"
      elementRef={downcastRef(elementRef)}
      type={type}
      feedback={feedback}
      {...htmlAttributes}
    />
  );
}
