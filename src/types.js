/**
 * Props common to components that play a primarily presentational role.
 *
 * @typedef PresentationalProps
 * @prop {import('preact').ComponentChildren} [children]
 * @prop {string|string[]} [classes] - Optional extra CSS classes to append to the
 *   component's default classes
 * @prop {never} [className] - Use variants, props, base component (when
 *   available) or `classes` instead
 * @prop {import('preact').Ref<HTMLElement>} [elementRef] - Ref for component's
 *   outermost element.
 */

/**
 * Props common to components that are opinionated compositions of other
 * components.
 *
 * @typedef {Omit<PresentationalProps, 'classes'>} CompositeProps
 */

/**
 * Props common to Base components.
 *
 * @typedef {PresentationalProps & { unstyled?:boolean } } BaseProps
 */

/**
 * A type describing any of the standalone icon components, which take any
 * valid `<svg>` element attribute as props.
 *
 *  @typedef {import('preact').FunctionComponent<import('preact').JSX.SVGAttributes<SVGSVGElement>>} IconComponent
 */
// Make TypeScript treat this file as a module.
export const unused = {};
