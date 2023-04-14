import type { ComponentChildren, FunctionComponent, JSX, Ref } from 'preact';

/** Props common to components that play a primarily presentational role. */
export type PresentationalProps = {
  children?: ComponentChildren;
  /** Optional extra CSS classes appended to the component's className */
  classes?: string | string[];
  /** Use `classes` or props instead */
  className?: never;
  /** Ref associated with components outermost or primary element */
  elementRef?: Ref<HTMLElement | undefined>;
};

/**
 * Props common to components that are opinionated compositions of other
 * components.
 */
export type CompositeProps = Omit<PresentationalProps, 'classes'>;

/** Props common to Base components */
export type BaseProps = PresentationalProps & { unstyled?: boolean };

/**
 * A type describing any of the standalone icon components, which take any
 * valid `<svg>` element attribute as props.
 */
export type IconComponent = FunctionComponent<JSX.SVGAttributes<SVGSVGElement>>;

/**
 * A component type used by other components that can optionally support a
 * transition animation
 */
export type TransitionComponent = JSX.ElementType<{
  visible: boolean;
  onTransitionEnd?: (direction: 'in' | 'out') => void;
}>;
