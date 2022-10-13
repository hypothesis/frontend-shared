import classnames from 'classnames';

import { downcastRef } from '../../util/typing';

import { inputGroupStyles } from './InputGroup';

/**
 * @typedef {import('../../types').PresentationalProps} CommonProps
 * @typedef {import('preact').JSX.IntrinsicElements["input"]} HTMLInputAttributes
 *
 * @typedef InputProps
 * @prop {boolean} [hasError=false]
 * @prop {'email'|'search'|'text'|'url'} [type="text"]
 */

/**
 * Render a text field input
 *
 * @param {CommonProps & InputProps & Omit<HTMLInputAttributes, 'type'>} props
 */
const InputNext = function Input({
  children,
  classes,
  elementRef,

  hasError,
  type = 'text',

  ...htmlAttributes
}) {
  // @ts-expect-error - "aria-label" is missing from HTMLInputAttributes
  if (!htmlAttributes.id && !htmlAttributes['aria-label']) {
    console.warn(
      '`Input` component should have either an `id` or an `aria-label` attribute'
    );
  }
  return (
    <input
      {...htmlAttributes}
      type={type}
      ref={downcastRef(elementRef)}
      className={classnames(
        'focus-visible-ring ring-inset border rounded-sm w-full p-2',
        'bg-grey-0 focus:bg-white disabled:bg-grey-1',
        'placeholder:text-color-grey-5 disabled:placeholder:color-grey-6',
        { 'ring-inset ring-2 ring-red-error': hasError },
        // Adapt styles when this component is inside an InputGroup
        inputGroupStyles,
        classes
      )}
      data-component="Input"
    >
      {children}
    </input>
  );
};

export default InputNext;
