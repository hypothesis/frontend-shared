/**
 * Props common to components that play a primarily presentational role.
 *
 * @typedef PresentationalProps
 * @prop {import('preact').ComponentChildren} [children]
 * @prop {string|string[]} [classes] - Optional extra CSS classes to append to the
 *   component's default classes
 * @prop {never} [className] - Use variants, props, unstyled component (when
 *   available) or `classes` instead
 * @prop {import('preact').Ref<HTMLElement>} [elementRef] - Ref for component's
 *   outermost element.
 */

/**
 * Props common to Base, abstract components. These are not part of the
 * package API.
 *
 * @typedef BaseProps
 * @prop {import('preact').ComponentChildren} [children]
 * @prop {string} className - Base components require a className for base
 *   styling.
 * @prop {never} [classes] - Use `className` instead
 * @prop {import('preact').Ref<HTMLElement>} [elementRef]
 */

// Make TypeScript treat this file as a module.
export const unused = {};
