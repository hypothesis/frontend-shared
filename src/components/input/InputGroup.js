import classnames from 'classnames';

import { downcastRef } from '../../util/typing';

/**
 * @typedef {import('../../types').PresentationalProps} CommonProps
 * @typedef {import('preact').JSX.HTMLAttributes<HTMLElement>} HTMLAttributes
 */

// These styles may be applied to input components to adapt them when in
// an InputGroup
export const inputGroupStyles = classnames(
  // All inputs within an InputGroup should have a border. Turn off border-radius
  'input-group:border input-group:rounded-none',
  // Restore border-radius on the leftmost and rightmost components in the group
  'input-group:first:rounded-l-sm input-group:last:rounded-r-sm',
  // "Collapse" borders between input components
  'input-group:border-l-0 input-group:first:border-l'
);

/**
 * Render a container that lays out a group of input components
 *
 * @param {CommonProps & HTMLAttributes} props
 */
const InputGroupNext = function InputGroup({
  children,
  classes,
  elementRef,

  ...htmlAttributes
}) {
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
        classes
      )}
    >
      {children}
    </div>
  );
};

export default InputGroupNext;
