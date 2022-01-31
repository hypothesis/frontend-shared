import classnames from 'classnames';
import { useLayoutEffect, useRef } from 'preact/hooks';

/**
 * Object mapping icon names to SVG markup.
 *
 * @typedef {Map<string|symbol, string>} IconMap
 */

/**
 * @template T
 * @typedef {import("preact/hooks").Ref<T>} Ref
 */

/**
 * Map of icon name to SVG data.
 *
 * @type {IconMap}
 */
const iconRegistry = new Map();

/**
 * @typedef SvgIconProps
 * @prop {string|symbol} name - The name of the icon to display.
 *   The name must match a name that has already been registered using the
 *   `registerIcon` or `registerIcons` functions.
 * @prop {string} [className] - A CSS class to apply to the `<svg>` element.
 * @prop {boolean} [inline] - Apply a style allowing for inline display of icon wrapper.
 * @prop {string} [title] - Optional title attribute to apply to the SVG's containing `span`.
 */

/**
 * Component that renders icons using inline `<svg>` elements.
 * This enables their appearance to be customized via CSS.
 *
 * This matches the way we do icons on the website, see
 * https://github.com/hypothesis/h/pull/3675
 *
 * @param {SvgIconProps} props
 */
export function SvgIcon({ name, className = '', inline = false, title = '' }) {
  const markup = iconRegistry.get(name);
  if (!markup) {
    throw new Error(`Icon "${name.toString()}" is not registered`);
  }

  const element = /** @type {{ current: HTMLElement }} */ (useRef());
  useLayoutEffect(() => {
    const svg = element.current.querySelector('svg');

    // The icon should always contain an `<svg>` element, but check here as we
    // don't validate the markup when it is registered.
    if (svg) {
      svg.setAttribute('class', className);
    }
  }, [
    className,
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
      className={classnames('Hyp-SvgIcon', { 'Hyp-SvgIcon--inline': inline })}
      dangerouslySetInnerHTML={{ __html: markup }}
      ref={element}
      {...spanProps}
    />
  );
}

/**
 * Register an icon for use with the `SvgIcon` component.
 *
 * Returns a symbol that can be passed as the `name` prop to `SvgIcon` in order
 * to render this icon.
 *
 * @param {string|symbol} name - A name for this icon
 * @param {string} markup - SVG markup for the icon
 * @return {symbol}
 */
export function registerIcon(name, markup) {
  const key = typeof name === 'string' ? Symbol(name) : name;
  iconRegistry.set(key, markup);
  return key;
}

/**
 * Register icons for use with the `SvgIcon` component.
 *
 * @deprecated Prefer the `registerIcon` function instead which will return a
 * key that does not conflict with existing icons.
 *
 * @param {Record<string, string>} icons
 * @param {Object} options
 *  @param {boolean} [options.reset] - If `true`, remove existing registered icons.
 */
export function registerIcons(icons, { reset = false } = {}) {
  if (reset) {
    iconRegistry.clear();
  }
  for (let [key, value] of Object.entries(icons)) {
    iconRegistry.set(key, value);
  }
}

/**
 * Return the currently available icons.
 *
 * To register icons, don't mutate this directly but call `registerIcons`
 * instead.
 *
 * @return {IconMap}
 */
export function availableIcons() {
  return iconRegistry;
}
