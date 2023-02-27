import classnames from 'classnames';

// @ts-ignore
import checkboxSVG from '../../images/icons/checkbox.svg';
import { registerIcon, SvgIcon } from './SvgIcon';

// Register the checkbox icon for use
const checkboxIcon = registerIcon('checkbox', checkboxSVG);

/**
 * @typedef CheckboxBaseProps
 * @prop {string} [classes] - Additional CSS classes to apply to the <input>
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
 * @prop {string} [containerClasses] - Optional additional classes for the container
 *   <label> element
 *
 * @typedef {Omit<CheckboxProps, 'children'> & LabeledCheckboxBaseProps} LabeledCheckboxProps
 */

/**
 * A checkbox input.
 *
 * A checkbox component is a combination of an <input> element and a sibling
 * <svg> element that is used for the visual appearance of the checkbox.
 *
 * @deprecated - Use re-implemented Checkbox component in the input group
 * @param {CheckboxProps} props
 */
export function Checkbox({
  classes = '',
  inputRef,
  onToggle,
  onClick,
  ...restProps
}) {
  /**
   * @param {import('preact').JSX.TargetedMouseEvent<HTMLInputElement>} event
   * @this HTMLInputElement
   */
  function onPressed(event) {
    onToggle?.(event.currentTarget.checked);
    // preact event handlers expects `this` context to be of type `never`
    // https://github.com/preactjs/preact/issues/3137
    onClick?.call(/** @type {never} */ (this), event);
  }

  return (
    <>
      <input
        className={classnames('Hyp-Checkbox', classes)}
        ref={inputRef}
        type="checkbox"
        onClick={onPressed}
        {...restProps}
      />
      <SvgIcon className="hyp-svg-checkbox" name={checkboxIcon} />
    </>
  );
}

/**
 * @deprecated - Use re-implemented Checkbox component in the input group
 * A labeled checkbox input
 *
 * @param {LabeledCheckboxProps} props
 */
export function LabeledCheckbox({
  children,
  id,
  containerClasses = '',
  ...restProps
}) {
  id ??= restProps.name;
  return (
    <label
      htmlFor={id}
      className={classnames('Hyp-LabeledCheckbox', containerClasses)}
    >
      <Checkbox id={id} {...restProps} />
      <span data-testid="label-text">{children}</span>
    </label>
  );
}
