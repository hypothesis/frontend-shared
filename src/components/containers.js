/**
 * Components for laying out content within a consistently-styled container
 */

import classnames from 'classnames';

import { downcastRef } from '../util/typing';

/**
 * @typedef {import('preact').ComponentChildren} Children
 *
 * @typedef ContainerProps
 * @prop {Children} children
 * @prop {string} [classes] - Additional CSS classes to apply
 * @prop {import('preact').Ref<HTMLElement>} [containerRef] - Access to the
 *  wrapping element.
 */

/**
 * Render content inside of a "frame"
 *
 * @param {ContainerProps} props
 */
export function Frame({ children, classes = '', containerRef }) {
  return (
    <div
      className={classnames('Hyp-Frame', classes)}
      ref={downcastRef(containerRef)}
    >
      {children}
    </div>
  );
}

/**
 * Render content inside of a "card"
 *
 * @param {ContainerProps} props
 */
export function Card({ children, classes = '', containerRef }) {
  return (
    <div
      className={classnames('Hyp-Card', classes)}
      ref={downcastRef(containerRef)}
    >
      {children}
    </div>
  );
}

/**
 *
 * @typedef ActionBaseProps
 * @prop {'row'|'column'} [direction='row'] - Lay out the actions horizontally (row)
 *   or vertically (column)
 */

/**
 * Render a set of actions (typically buttons) laid out either horizontally
 * by default or vertically.
 *
 * @param {ActionBaseProps & ContainerProps} props
 */
export function Actions({
  children,
  direction = 'row',
  classes = '',
  containerRef,
}) {
  const baseClass = `Hyp-Actions--${direction}`;
  return (
    <div
      className={classnames(baseClass, classes)}
      ref={downcastRef(containerRef)}
    >
      {children}
    </div>
  );
}

/**
 *
 * @typedef ScrollboxBaseProps
 * @prop {boolean} [withHeader=false] - Provide layout affordances for a sticky
 *   header in the scrollable content
 */

/**
 * Render a scrollable container to contain content that might overflow.
 *
 * @param {ScrollboxBaseProps & ContainerProps} props
 */
export function Scrollbox({
  children,
  classes = '',
  containerRef,
  withHeader = false,
}) {
  const baseClass = withHeader ? 'Hyp-Scrollbox--with-header' : 'Hyp-Scrollbox';
  return (
    <div
      className={classnames(baseClass, classes)}
      ref={downcastRef(containerRef)}
    >
      {children}
    </div>
  );
}
