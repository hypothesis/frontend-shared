/**
 * @typedef CheckboxBaseProps
 * @prop {string} name - The `name` of the checkbox.
 * @prop {import('preact').Ref<HTMLInputElement>} [inputRef]
 * @prop {(checked: boolean) => void} [onToggle] - Callback when checkbox is
 *   checked/unchecked
 * @prop {never} [type] - Type is always 'checkbox'
 * @prop {never} [children] - Children are not allowed
 *
 * @typedef {Omit<import('Preact').JSX.HTMLAttributes<HTMLInputElement>, 'onToggle'> & CheckboxBaseProps} CheckboxProps
 *
 * @typedef LabeledCheckboxProps
 * @prop {string} label - Label text
 */

/**
 * A checkbox input
 *
 * @param {CheckboxProps} props
 */
export function Checkbox({ inputRef, onToggle, onClick, ...restProps }) {
  /**
   * @param {import('Preact').JSX.TargetedMouseEvent<HTMLInputElement>} event
   * @this HTMLInputElement
   */
  function onPressed(event) {
    onToggle?.(event.currentTarget.checked);
    // onChange expects `this` context to be of type `HTMLInputElement`
    // according to the preact type definitions, but preact doesn't implement
    // it: https://github.com/preactjs/preact/issues/3137
    onClick?.call(this, event);
  }

  return (
    <input ref={inputRef} type="checkbox" onClick={onPressed} {...restProps} />
  );
}

/**
 * A labeled checkbox input
 *
 * @param {CheckboxProps & LabeledCheckboxProps} props
 */
export function LabeledCheckbox({ label, id, ...restProps }) {
  id ??= restProps.name;
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <Checkbox id={id} {...restProps} />
    </>
  );
}
