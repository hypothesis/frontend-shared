import classnames from 'classnames';

/**
 * @typedef {import('preact').ComponentChildren} Children
 *
 * @typedef TextInputBaseProps
 * @prop {string} [classes] - Additional CSS classes to apply
 * @prop {boolean} [error] - There is an error associated with this input. Will
 *   set some error styling.
 */

/**
 * `TextInput` sets the `type` attribute on the `input`, but any other valid
 * attribute should be forwarded.
 * @typedef {Omit<import('preact').JSX.HTMLAttributes<HTMLInputElement>, 'type'>} HTMLInputElementProps
 * @typedef {TextInputBaseProps & HTMLInputElementProps} TextInputProps
 */

/**
 * @typedef TextInputWithButtonProps
 * @prop {Children} children
 * @prop {string} [classes] - Additional CSS classes to apply
 */

/**
 * Wrap a textual `<input>` element with some styles and provide error UI
 *
 * @param {TextInputProps} props
 */
export function TextInput({ classes = '', error, ...restProps }) {
  return (
    <input
      className={classnames('Hyp-TextInput', { 'is-error': error }, classes)}
      {...restProps}
      type="text"
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
 * @param {TextInputWithButtonProps} props
 */
export function TextInputWithButton({ children, classes = '' }) {
  return (
    <div className={classnames('Hyp-TextInputWithButton', classes)}>
      {children}
    </div>
  );
}
