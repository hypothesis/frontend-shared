import classnames from 'classnames';

/**
 * @typedef {import('preact').ComponentChildren} Children
 *
 * @typedef TextInputBaseProps
 * @prop {string} [classes] - Additional CSS classes to apply
 * @prop {import('preact').Ref<HTMLInputElement>} [inputRef] - Optional ref for
 *   the rendered `input` element.
 * @prop {boolean} [hasError] - There is an error associated with this input. Will
 *   set some error styling.
 * @prop {'email'|'search'|'text'|'url'} [type="text"] - Set the <input> type:
 *   restricted to the "text-like" type values.
 */

/**
 * @typedef {TextInputBaseProps & import('preact').JSX.IntrinsicElements["input"]} TextInputProps
 */

/**
 * @typedef TextInputWithButtonProps
 * @prop {Children} children
 * @prop {string} [classes] - Additional CSS classes to apply
 */

/**
 * Wrap a textual `<input>` element with some styles and provide error UI
 *
 * @deprecated - Use Input component in the input group
 * @param {TextInputProps} props
 */
export function TextInput({
  classes = '',
  inputRef,
  hasError = false,
  type = 'text',
  ...restProps
}) {
  return (
    <input
      className={classnames(
        'Hyp-TextInput',
        { 'has-error': hasError },
        classes
      )}
      {...restProps}
      ref={inputRef}
      type={type}
    />
  );
}

/**
 * A wrapping component for pairing a `TextInput` with an `IconButton` component.
 * Applies appropriate design pattern. Expected usage:
 *
 * <TextInputWithButton>
 *   <TextInput />
 *   <IconButton />
 * </TextInputWithButton>
 *
 * Current implementation assumes the input is on the left and button on right.
 *
 * @deprecated - Use InputGroup component in the input group
 * @param {TextInputWithButtonProps} props
 */
export function TextInputWithButton({ children, classes = '' }) {
  return (
    <div className={classnames('Hyp-TextInputWithButton', classes)}>
      {children}
    </div>
  );
}
