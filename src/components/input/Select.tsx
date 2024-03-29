import classnames from 'classnames';
import type { ComponentChildren, JSX } from 'preact';

import type { PresentationalProps } from '../../types';
import InputRoot from './InputRoot';

type ComponentProps = {
  children?: ComponentChildren;
  feedback?: 'error' | 'warning';

  /**
   * @deprecated Use feedback="error" instead
   */
  hasError?: boolean;
};
export type SelectProps = PresentationalProps &
  ComponentProps &
  JSX.HTMLAttributes<HTMLSelectElement>;

// URI-encoded source of `CaretDownIcon`
// Currently, the color (stroke) is hard-coded
const arrowImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' aria-hidden='true' focusable='false'%3E%3Cg fill-rule='evenodd'%3E%3Crect fill='none' stroke='none' x='0' y='0' width='16' height='16'%3E%3C/rect%3E%3Cpath fill='none' stroke='%239c9c9c' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 6l-4 4-4-4'%3E%3C/path%3E%3C/g%3E%3C/svg%3E")`;

/**
 * Style a native `<select>` element.
 * @deprecated Use SelectNext instead
 */
export default function Select({
  children,
  classes,
  type = 'text',
  feedback,
  hasError,

  ...htmlAttributes
}: SelectProps) {
  return (
    <InputRoot
      data-component="Select"
      classes={classnames(
        'appearance-none',
        // position the down-arrow image centered at the right, offset from the
        // right edge by 0.5rem. Arrow image width (4 units) + horizontal
        // padding (3 units) = 7 units of right padding needed.
        'bg-no-repeat bg-[center_right_0.5rem] pr-7',
        classes,
      )}
      element="select"
      type={type}
      feedback={feedback}
      hasError={hasError}
      style={{
        backgroundImage: arrowImage,
      }}
      {...htmlAttributes}
    >
      {children}
    </InputRoot>
  );
}
