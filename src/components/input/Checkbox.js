import classnames from 'classnames';
import { useState } from 'preact/hooks';

import { downcastRef } from '../../util/typing';

import { CheckboxOutlineIcon, CheckboxCheckedIcon } from '../icons';

/**
 * @typedef {import('../../types').CompositeProps} CommonProps
 * @typedef {Omit<import('preact').JSX.HTMLAttributes<HTMLInputElement>, 'size'|'icon'>} HTMLAttributes
 * @typedef {import('../../types').IconComponent} IconComponent
 *
 * @typedef CheckboxProps
 * @prop {boolean} [checked=false] - Current checked state. Used when the
 *   Checkbox is controlled.
 * @prop {boolean} [defaultChecked=false] - Default checked state. Used to set
 *   initial state when the Checkbox is not controlled.
 * @prop {IconComponent} [icon=CheckboxOutlineIcon] - Custom icon to show when input is unchecked
 * @prop {IconComponent} [checkedIcon=CheckboxCheckedIcon] - Custom icon to show when input is checked
 * @prop {never} [type] - Type is always 'checkbox'
 */

/**
 * Render a labeled checkbox input. The checkbox is styled with two icons:
 * one for the unchecked state and one for the checked state. The input itself
 * is positioned exactly on top of the icon, but is non-visible.
 *
 * @param {CommonProps & CheckboxProps & HTMLAttributes} props
 */
const CheckboxNext = function Checkbox({
  children,
  elementRef,

  checked,
  defaultChecked = false,
  icon: UncheckedIcon = CheckboxOutlineIcon,
  checkedIcon: CheckedIcon = CheckboxCheckedIcon,

  disabled,
  onChange,
  id,
  ...htmlAttributes
}) {
  // If `checked` is present, treat this as a controlled component
  const isControlled = typeof checked === 'boolean';
  // Only use this local state if checkbox is uncontrolled
  const [uncontrolledChecked, setUncontrolledChecked] =
    useState(defaultChecked);
  const isChecked = isControlled ? checked : uncontrolledChecked;

  /**
   * @param {import('preact').JSX.TargetedEvent<HTMLInputElement>} event
   * @this HTMLInputElement
   */
  function handleChange(event) {
    // preact event handlers expects `this` context to be of type `never`
    // https://github.com/preactjs/preact/issues/3137
    onChange?.call(/** @type {never} */ (this), event);
    if (!isControlled) {
      setUncontrolledChecked(
        /** @type {HTMLInputElement} */ (event.target).checked
      );
    }
  }

  return (
    <label
      className={classnames('relative flex items-center gap-x-1.5', {
        'cursor-pointer': !disabled,
        'opacity-70': disabled,
      })}
      html-for={id}
      data-composite-component="Checkbox"
    >
      <input
        {...htmlAttributes}
        type="checkbox"
        ref={downcastRef(elementRef)}
        className={classnames(
          // Position this atop the icon and size it to the same dimensions
          'absolute w-em h-em',
          // Make checkbox input visually hidden, but
          // some screen readers won't read out elements with 0 opacity
          'opacity-[.00001]',
          {
            'cursor-pointer': !disabled,
          }
        )}
        checked={isChecked}
        disabled={disabled}
        id={id}
        onChange={handleChange}
      />
      {isChecked ? (
        <CheckedIcon className="w-em h-em" />
      ) : (
        <UncheckedIcon className="w-em h-em" />
      )}
      {children}
    </label>
  );
};

export default CheckboxNext;
