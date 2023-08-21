import classnames from 'classnames';
import type { JSX } from 'preact';

import type { PresentationalProps } from '../../types';
import { downcastRef } from '../../util/typing';
import { inputGroupStyles } from './InputGroup';

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
 */
const InputRoot = function InputRoot({
  element: Element = 'input',
  children,
  classes,
  elementRef,
  hasError,
  feedback,

  ...htmlAttributes
}: InputRootProps) {
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
      className={classnames(
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
      )}
    >
      {children}
    </Element>
  );
};

export default InputRoot;
