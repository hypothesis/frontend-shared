import { SvgIcon } from './SvgIcon';

/**
 * @typedef CheckboxBaseProps
 * @prop {string} name - The `name` of the checkbox.
 * @prop {import('preact').Ref<HTMLInputElement>} [inputRef] - Access to the input
 *    element in case a parent element wants for example to focus on it.
 * @prop {(checked: boolean) => void} [onToggle] - Callback when checkbox is
 *   checked/unchecked
 * @prop {never} [type] - Type is always 'checkbox'
 * @prop {never} [children] - Children are not allowed
 *
 * The props for Checkbox component extends and narrows the attributes of the native input element.
 * `onToggle` event should only be associated to HTMLDetailsElement, but Preact is not very strict with types.
 * We omit the `onToggle` because it clashes with our definition.
 * @typedef {Omit<import('preact').JSX.HTMLAttributes<HTMLInputElement>, 'onToggle'> & CheckboxBaseProps} CheckboxProps
 */

/**
 * @typedef LabeledCheckboxBaseProps
 * @prop {import('preact').ComponentChildren} children - Label text or elements
 *
 * @typedef {Omit<CheckboxProps, 'children'> & LabeledCheckboxBaseProps} LabeledCheckboxProps
 */

/**
 * A checkbox input.
 *
 * A checkbox component is a combination of an <input> element and a sibling
 * <svg> element that is used for the visual appearance of the checkbox.
 *
 * @param {CheckboxProps} props
 */
export function Checkbox({ inputRef, onToggle, onClick, ...restProps }) {
  /**
   * @param {import('preact').JSX.TargetedMouseEvent<HTMLInputElement>} event
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
    <>
      <input
        className="Hyp-Checkbox"
        ref={inputRef}
        type="checkbox"
        onClick={onPressed}
        {...restProps}
      />
      <SvgIcon className="hyp-svg-checkbox" name="checkbox" />
    </>
  );
}

/**
 * A labeled checkbox input
 *
 * @param {LabeledCheckboxProps} props
 */
export function LabeledCheckbox({ children, id, ...restProps }) {
  id ??= restProps.name;
  return (
    <label htmlFor={id} className="Hyp-LabeledCheckbox">
      <Checkbox id={id} {...restProps} />
      <span data-testid="label-text">{children}</span>
    </label>
  );
}
