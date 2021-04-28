import { useEffect, useRef, useState } from 'preact/hooks';

const noop = () => {};

/**
 * @typedef CheckboxProps
 * @prop {boolean} [defaultChecked] - Should the checkbox be selected/checked
 *  by default?
 * @prop {string} name - The `name` of the checkbox. Will be used as `id` if
 *   `id` not provided
 * @prop {string} [id] - HTML ID for the checkbox element
 * @prop {string} label - Checkbox label
 * @prop {(checked: boolean) => any} [onChanged] - Callback when checkbox is
 *   checked/unchecked
 */

/**
 * A checkbox input
 *
 * @param {CheckboxProps} props
 */
export function Checkbox({
  defaultChecked = false,
  id,
  name,
  label,
  onChanged,
}) {
  let [isChecked, setChecked] = useState(defaultChecked);
  onChanged = onChanged ?? noop;
  id = id ?? name;

  const wasChecked = useRef(isChecked);
  useEffect(() => {
    if (wasChecked.current !== isChecked && typeof onChanged === 'function') {
      wasChecked.current = isChecked;
      onChanged(isChecked);
    }
  }, [isChecked, onChanged]);

  function onChange(event) {
    const isChecked = event.target.checked;
    setChecked(isChecked);
  }

  return (
    <>
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={isChecked}
        onChange={e => onChange(e)}
      />
      <label htmlFor={id}>{label}</label>
    </>
  );
}
