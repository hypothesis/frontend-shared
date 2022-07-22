import classnames from 'classnames';

import { downcastRef } from '../util/typing';

/**
 * Components for laying out content within a consistently-styled container
 */

/**
 * @typedef {import('preact').ComponentChildren} Children
 * @typedef {import('preact').JSX.HTMLAttributes<HTMLDivElement>} HTMLDivAttributes
 * @typedef {import('preact').Ref<HTMLElement>} ElementRef
 */

/**
 * @typedef CommonPresentationalProps
 * @prop {Children} [children]
 * @prop {string|string[]} [classes] - Optional extra CSS classes to append to
 *   the component's default classes
 * @prop {ElementRef} [containerRef] - Deprecated; use
 *   `elementRef` instead.
 * @prop {ElementRef} [elementRef]
 *
 * @typedef {HTMLDivAttributes & CommonPresentationalProps} PresentationalProps
 */

/**
 * Render content inside of a "frame"
 *
 * @param {PresentationalProps} props
 */
export function Frame({
  children,
  classes,
  containerRef,
  elementRef,
  ...restProps
}) {
  return (
    <div
      className={classnames('Hyp-Frame', classes)}
      {...restProps}
      ref={downcastRef(elementRef ?? containerRef)}
    >
      {children}
    </div>
  );
}

/**
 * Render content inside of a "card"
 *
 * @param {PresentationalProps} props
 */
export function Card({
  children,
  classes,
  containerRef,
  elementRef,
  ...restProps
}) {
  return (
    <div
      className={classnames('Hyp-Card', classes)}
      {...restProps}
      ref={downcastRef(elementRef ?? containerRef)}
    >
      {children}
    </div>
  );
}

/**
 * Render a set of actions (typically buttons) laid out either horizontally
 * by default or vertically.
 *
 * @param {{ direction?: 'row'|'column'} & PresentationalProps} props
 */
export function Actions({
  children,
  direction = 'row',
  classes,
  containerRef,
  elementRef,
  ...restProps
}) {
  const baseClass = `Hyp-Actions--${direction}`;
  return (
    <div
      className={classnames(baseClass, classes)}
      {...restProps}
      ref={downcastRef(elementRef ?? containerRef)}
    >
      {children}
    </div>
  );
}

/**
 * Render a scrollable container to contain content that might overflow.
 * Optionally provide styling affordances for a sticky header (`withHeader`).
 *
 * @deprecated - Use re-implemented ScrollBox component in the data-display group
 * @param {{withHeader?: boolean} & PresentationalProps} props
 */
export function Scrollbox({
  children,
  classes,
  containerRef,
  elementRef,
  withHeader = false,
  ...restProps
}) {
  const baseClass = withHeader ? 'Hyp-Scrollbox--with-header' : 'Hyp-Scrollbox';
  return (
    <div
      className={classnames(baseClass, classes)}
      {...restProps}
      ref={downcastRef(elementRef ?? containerRef)}
    >
      {children}
    </div>
  );
}
