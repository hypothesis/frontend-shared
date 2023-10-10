import type { JSX } from 'preact';

import type { PresentationalProps } from '../../types';
import { downcastRef } from '../../util/typing';
import { inputStyles } from './Input';

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
  feedback,
  classes,

  ...htmlAttributes
}: TextareaProps) {
  if (!htmlAttributes.id && !htmlAttributes['aria-label']) {
    console.warn(
      '`Textarea` component should have either an `id` or an `aria-label` attribute',
    );
  }

  return (
    <textarea
      data-component="Textarea"
      {...htmlAttributes}
      ref={downcastRef(elementRef)}
      className={inputStyles({ classes, feedback })}
    />
  );
}
