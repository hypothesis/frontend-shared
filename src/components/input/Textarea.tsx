import type { JSX } from 'preact';

import { useSyncedRef } from '../../hooks/use-synced-ref';
import { useValidationError } from '../../hooks/use-validation-error';
import type { FormControlProps, PresentationalProps } from '../../types';
import { downcastRef } from '../../util/typing';
import { inputStyles } from './Input';

export type TextareaProps = PresentationalProps &
  FormControlProps &
  JSX.HTMLAttributes<HTMLTextAreaElement>;

/**
 * Render a textarea
 */
export default function Textarea({
  elementRef,
  error,
  feedback,
  classes,

  ...htmlAttributes
}: TextareaProps) {
  if (!htmlAttributes.id && !htmlAttributes['aria-label']) {
    console.warn(
      '`Textarea` component should have either an `id` or an `aria-label` attribute',
    );
  }

  const textAreaRef = downcastRef<HTMLElement | undefined, HTMLTextAreaElement>(
    elementRef,
  );
  const ref = useSyncedRef<HTMLTextAreaElement>(textAreaRef);
  if (error) {
    feedback = 'error';
  }
  useValidationError(ref, error);

  return (
    <textarea
      data-component="Textarea"
      {...htmlAttributes}
      ref={ref}
      className={inputStyles({ classes, feedback })}
      aria-invalid={feedback === 'error'}
    />
  );
}
