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
 * Common props for form controls.
 */
export type FormControlProps = {
  /**
   * The current validation error.
   *
   * If set, this will override `feedback` and set it to `error`. The validation
   * error will be synced to the browser's native validation state via
   * {@link HTMLInputElement.setCustomValidity}. This will prevent submission
   * of the containing form.
   */
  error?: string;

  /**
   * Set the visual and semantic state (`aria-invalid`) of the control to
   * indicate an error.
   *
   * Unlike {@link FormControlProps.error} this does not set a native validation
   * error and as such, it won't prevent a containing form from being submitted.
   */
  feedback?: 'error' | 'warning';
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
 * A component that describes an `in` and an `out` transition, typically to
 * animate the mounting and unmounting of a child component.
 */
export type TransitionComponent = FunctionComponent<{
  direction?: 'in' | 'out';
  onTransitionEnd?: (direction: 'in' | 'out') => void;
}>;

export type OrderDirection = 'ascending' | 'descending';

export type Order<Field extends string | number | symbol> = {
  field: Field;
  direction: OrderDirection;

  /**
   * Indicates whether entries where the value for `field` is null/undefined
   * should go last. Otherwise, they will go first.
   * Defaults to true.
   */
  nullsLast?: boolean;
};
