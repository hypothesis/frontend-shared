import classnames from 'classnames';

/**
 * @typedef {import('preact').ComponentChildren} Children
 *
 * @typedef LinkBaseProps
 * @prop {Children} children
 * @prop {string} [classes] - Additional CSS classes to apply
 * @prop {import('preact').Ref<HTMLAnchorElement>} [linkRef] - Optional ref for
 *   the rendered anchor element
 */

/**
 * @typedef {LinkBaseProps & import('preact').JSX.HTMLAttributes<HTMLAnchorElement>} LinkProps
 */

/**
 * Style and add some attributes to an anchor (`<a>`) element
 *
 * @param {LinkProps} props
 */
export function Link({ children, classes = '', linkRef, ...restProps }) {
  return (
    <a
      className={classnames('Hyp-Link', classes)}
      ref={linkRef}
      rel="noopener noreferrer"
      {...restProps}
    >
      {children}
    </a>
  );
}
