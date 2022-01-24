import classnames from 'classnames';
import { useLayoutEffect, useRef } from 'preact/hooks';

import { availableIcons } from './SvgIcon';

/**
 * @template T
 * @typedef {import("preact/hooks").Ref<T>} Ref
 */

/**
 * @typedef IconProps
 * @prop {string|symbol} name - The name of the icon to display.
 *   The name must match a name that has already been registered using the
 *   `registerIcon` or `registerIcons` functions.
 * @prop {string} [classes] - CSS classes to apply to the `<svg>` element.
 * @prop {string} [containerClasses] - CSS classes to apply to wrapping element.
 * @prop {string} [title] - Optional title attribute to apply to the SVG's containing `span`.
 */

/**
 * Component that renders icons using inline `<svg>` elements.
 *
 * @param {IconProps} props
 */
export function Icon({
  name,
  classes = '',
  containerClasses = '',
  title = '',
}) {
  const registeredIcons = availableIcons();
  const markup = registeredIcons.get(name);
  if (!markup) {
    throw new Error(`Icon "${name.toString()}" is not registered`);
  }

  const element = /** @type {{ current: HTMLElement }} */ (useRef());
  useLayoutEffect(() => {
    const svg = element.current.querySelector('svg');

    // The icon should always contain an `<svg>` element, but check here as we
    // don't validate the markup when it is registered.
    if (svg) {
      svg.setAttribute('class', classnames('Hyp-Icon', classes));
    }
  }, [
    classes,
    // `markup` is a dependency of this effect because the SVG is replaced if
    // it changes.
    markup,
  ]);

  const spanProps = {};
  if (title) {
    spanProps.title = title;
  }

  return (
    <span
      className={containerClasses}
      dangerouslySetInnerHTML={{ __html: markup }}
      ref={element}
      {...spanProps}
    />
  );
}
