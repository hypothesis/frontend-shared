import classnames from 'classnames';
import type { JSX } from 'preact';

import type { PresentationalProps } from '../../types';
import { downcastRef } from '../../util/typing';

// These styles may be applied to input components to adapt them when in
// an InputGroup
export const inputGroupStyles = classnames(
  // All inputs within an InputGroup should have a border. Turn off border-radius
  'input-group:border input-group:rounded-none',
  // Restore border-radius on the leftmost and rightmost components in the group
  'input-group:first:rounded-l input-group:last:rounded-r',
  // "Collapse" borders between input components
  'input-group:ml-[-1px] input-group:first:ml-0',
  // Make sure focused element appears on top, preventing a cropped focus ring
  'focus:z-1',
);

export type InputGroupProps = PresentationalProps &
  JSX.HTMLAttributes<HTMLElement>;

/**
 * Render a container that lays out a group of input components
 */
export default function InputGroup({
  children,
  classes,
  elementRef,

  ...htmlAttributes
}: InputGroupProps) {
  return (
    <div
      data-component="InputGroup"
      {...htmlAttributes}
      ref={downcastRef(elementRef)}
      className={classnames(
        // Set the `.input-group` class so that children may
        // use the `input-group:` variant in their styles
        'input-group',
        'flex items-stretch w-full justify-center',
        classes,
      )}
    >
      {children}
    </div>
  );
}
