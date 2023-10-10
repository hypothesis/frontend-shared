import type { JSX } from 'preact';

import type { PresentationalProps } from '../../types';
import { downcastRef } from '../../util/typing';
import { inputStyles } from './Input';

type RootComponentProps = {
  element?: 'input' | 'select' | 'textarea';
  feedback?: 'error' | 'warning';

  /**
   * @deprecated Use feedback="error" instead
   */
  hasError?: boolean;
};

export type InputRootProps = PresentationalProps &
  RootComponentProps &
  (
    | Omit<JSX.HTMLAttributes<HTMLInputElement>, 'size' | 'icon'>
    | Omit<JSX.HTMLAttributes<HTMLSelectElement>, 'size' | 'icon'>
    | Omit<JSX.HTMLAttributes<HTMLTextAreaElement>, 'size' | 'icon'>
  );

/**
 * Root component for various input types that applies a consistent design
 * pattern.
 * @deprecated Only `Select` is using this component. Remove once it is deleted
 */
export default function InputRoot({
  element: Element = 'input',
  children,
  classes,
  elementRef,
  hasError,
  feedback,

  ...htmlAttributes
}: InputRootProps) {
  /* istanbul ignore next */
  if (feedback === undefined && hasError) {
    feedback = 'error';
  }

  if (!htmlAttributes.id && !htmlAttributes['aria-label']) {
    console.warn(
      '`Input` component should have either an `id` or an `aria-label` attribute',
    );
  }

  return (
    <Element
      data-component="InputRoot"
      {...htmlAttributes}
      // @ts-ignore-next
      ref={downcastRef(elementRef)}
      className={inputStyles({ classes, feedback })}
    >
      {children}
    </Element>
  );
}
