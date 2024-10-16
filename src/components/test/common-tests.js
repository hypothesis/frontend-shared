/* eslint-disable mocha/no-exports */
import { checkAccessibility } from '@hypothesis/frontend-testing';
import { mount } from 'enzyme';
import { createRef } from 'preact';

/**
 * @typedef {import('preact').FunctionComponent} FunctionComponent
 * @typedef {import('../../types').TransitionComponent} TransitionComponent
 */

const createComponent = (Component, props = {}) => {
  return mount(<Component {...props}>This is child content</Component>);
};

function primaryElement(wrapper, elementSelector) {
  if (elementSelector) {
    return wrapper.find(elementSelector).getDOMNode();
  }
  return wrapper.childAt(0).getDOMNode();
}

function wrapperElement(wrapper, wrapperSelector) {
  if (wrapperSelector) {
    return wrapper.find(wrapperSelector).getDOMNode();
  }
  return wrapper.childAt(0).getDOMNode();
}

/**
 * Set of tests common to all presentational components
 *
 * @typedef CommonTestOpts
 * @prop {string} [componentName] - Temporary affordance to prevent name
 *   collisions between updated components and legacy components with the same
 *   component function name.
 * @prop {(component:FunctionComponent, props:object) => ReactWrapper} [createContent] -
 *   A function that returns the rendered output to test or an Enzyme wrapper
 *   created using Enzyme's `mount` function.
 * @prop {string} [elementSelector] - Selector to find the element to which any
 *   passed HTML attributes are applied, when it is not the outermost element
 *   rendered by the component.
 */

/**
 * For composite components, add a `wrapperSelector` option, a selector for the
 * element to which a `data-composite-component` attribute is applied, when it
 * is not the outermost element rendered by the component.
 *
 * @typedef {CommonTestOpts & { wrapperSelector?: string }} CompositeTestOpts
 */

/**
 * @param {FunctionComponent} Component
 * @param {CompositeTestOpts} opts
 */
export function testCompositeComponent(
  Component,
  {
    componentName,
    createContent = createComponent,
    elementSelector,
    wrapperSelector,
  } = {},
) {
  const displayName = componentName ?? Component.displayName ?? Component.name;

  describe(`Common composite functionality for ${displayName}`, () => {
    it('applies `ref` via `elementRef`', () => {
      const elementRef = createRef();
      createContent(Component, { elementRef });

      assert.instanceOf(elementRef.current, Node);
    });

    it('applies HTML attributes to primary element', () => {
      const wrapper = createContent(Component, {
        'data-testid': 'foo-container',
      });
      const primaryEl = primaryElement(wrapper, elementSelector);

      assert.isTrue(primaryEl.hasAttribute('data-testid'));
      assert.equal(primaryEl.getAttribute('data-testid'), 'foo-container');
    });

    it('applies a `data-composite-component` attribute for debugging', () => {
      const wrapper = createContent(Component);
      const wrapperOuterEl = wrapperElement(wrapper, wrapperSelector);

      assert.isTrue(wrapperOuterEl.hasAttribute('data-composite-component'));
      assert.equal(
        wrapperOuterEl.getAttribute('data-composite-component'),
        displayName,
      );
    });

    it(
      'should pass a11y checks',
      checkAccessibility({
        content: () => createContent(Component),
      }),
    );
  });
}

/**
 * @typedef StyledTestOpts
 * @prop  {Array<'size'|'unstyled'|'variant'>} supportedProps Which styling
 *   props are supported
 */
/**
 * Set of tests common to all components that support the Styling API
 *
 * @param {import('preact').FunctionComponent} Component
 * @param {CommonTestOpts & StyledTestOpts} opts
 */
export function testStyledComponent(
  Component,
  {
    componentName,
    createContent = createComponent,
    elementSelector,
    supportedProps = ['size', 'unstyled', 'variant'],
  } = {},
) {
  const displayName = componentName ?? Component.displayName ?? Component.name;

  describe(`Common styling API functionality for ${displayName}`, () => {
    it('applies classes to primary element', () => {
      const wrapper = createContent(Component);
      const primaryEl = primaryElement(wrapper, elementSelector);

      assert.isNotEmpty(primaryEl.classList);
    });

    if (supportedProps.includes('unstyled')) {
      // It may be necessary to accept exceptions (classes that are always set,
      // even when unstyled) as another test option in the future
      it('does not apply any styles when `unstyled` is set', () => {
        const wrapper = createContent(Component, { unstyled: true });
        const primaryEl = primaryElement(wrapper, elementSelector);

        assert.isEmpty(primaryEl.classList);
      });
    }

    if (supportedProps.includes('variant')) {
      // It may be necessary to accept exceptions (classes that are always set,
      // even when unstyled) as another test option in the future
      it('does not apply theming styles when variant is `custom`', () => {
        const styled = createContent(Component);
        const unStyled = createContent(Component, { variant: 'custom' });
        assert.isTrue(
          primaryElement(styled, elementSelector).classList.length >
            primaryElement(unStyled, elementSelector).classList.length,
        );
      });
    }

    if (supportedProps.includes('size')) {
      // It may be necessary to accept exceptions (classes that are always set,
      // even when unstyled) as another test option in the future
      it('does not apply size styles when variant is `custom`', () => {
        const styled = createContent(Component);
        const unStyled = createContent(Component, { size: 'custom' });
        assert.isTrue(
          primaryElement(styled, elementSelector).classList.length >
            primaryElement(unStyled, elementSelector).classList.length,
        );
      });
    }
  });
}

/**
 * Set of tests common to all presentational components
 *
 * @param {import('preact').FunctionComponent} Component
 * @param {CommonTestOpts} opts
 */
export function testPresentationalComponent(
  Component,
  { componentName, createContent = createComponent, elementSelector } = {},
) {
  const displayName = componentName ?? Component.displayName ?? Component.name;

  describe(`Common presentational functionality for ${displayName}`, () => {
    it('applies extra classes to primary element', () => {
      const wrapper = createContent(Component, { classes: 'foo bar' });
      const primaryEl = primaryElement(wrapper, elementSelector);

      const allClasses = [...primaryEl.classList];
      assert.equal(allClasses.at(-2), 'foo');
      assert.equal(allClasses.at(-1), 'bar');
    });

    it('applies `ref` via `elementRef`', () => {
      const elementRef = createRef();
      createContent(Component, { elementRef });

      assert.instanceOf(elementRef.current, Node);
    });

    it('overrides disallowed `className` prop', () => {
      const wrapper = createContent(Component, { className: 'verboten' });
      const primaryEl = primaryElement(wrapper, elementSelector);

      assert.isFalse(primaryEl.classList.contains('verboten'));
    });

    it('applies HTML attributes to primary element', () => {
      const wrapper = createContent(Component, {
        'data-testid': 'foo-container',
      });
      const primaryEl = primaryElement(wrapper, elementSelector);

      assert.isTrue(primaryEl.hasAttribute('data-testid'));
      assert.equal(primaryEl.getAttribute('data-testid'), 'foo-container');
    });

    it('applies a `data-component` attribute for debugging', () => {
      const wrapper = createContent(Component);
      const primaryEl = primaryElement(wrapper, elementSelector);

      assert.isTrue(primaryEl.hasAttribute('data-component'));
      assert.equal(primaryEl.getAttribute('data-component'), displayName);
    });

    it(
      'should pass a11y checks',
      checkAccessibility({
        content: () => createContent(Component),
      }),
    );
  });
}

/**
 * Set of tests common to all base components
 *
 * @param {import('preact').FunctionComponent} Component
 * @param {CommonTestOpts} opts
 */
export function testBaseComponent(
  Component,
  { componentName, createContent = createComponent, elementSelector } = {},
) {
  const displayName = componentName ?? Component.displayName ?? Component.name;
  describe(`Common base presentational functionality for ${displayName}`, () => {
    it('applies `ref` via `elementRef`', () => {
      const elementRef = createRef();
      createContent(Component, { elementRef });

      assert.instanceOf(elementRef.current, Node);
    });

    it('applies extra classes to primary element', () => {
      const wrapper = createContent(Component, { classes: 'foo bar' });
      const primaryEl = primaryElement(wrapper, elementSelector);

      const allClasses = [...primaryEl.classList];
      assert.equal(allClasses.at(-2), 'foo');
      assert.equal(allClasses.at(-1), 'bar');
    });

    it('does not apply base classes if `unstyled` is set', () => {
      const wrapper = createContent(Component, {
        classes: 'testClass',
        unstyled: true,
      });

      const allClasses = [
        ...primaryElement(wrapper, elementSelector).classList,
      ];

      assert.deepEqual(allClasses, ['testClass']);
    });

    it('applies HTML attributes to primary element', () => {
      const wrapper = createContent(Component, {
        'data-testid': 'foo-container',
      });
      const primaryEl = primaryElement(wrapper, elementSelector);

      assert.isTrue(primaryEl.hasAttribute('data-testid'));
      assert.equal(primaryEl.getAttribute('data-testid'), 'foo-container');
    });

    it(
      'should pass a11y checks',
      checkAccessibility({
        content: () => createComponent(Component),
      }),
    );
  });
}

/**
 * Common tests for simple design components
 *
 * @param {FunctionComponent} Component
 */
export function testSimpleComponent(Component) {
  describe('Common simple component functionality', () => {
    it('renders', () => {
      const wrapper = createComponent(Component);
      assert.isTrue(wrapper.find(Component).exists());
    });
  });
}

/**
 * Common tests for simple design components
 *
 * @param {TransitionComponent} Component
 * @param {CommonTestOpts & { event?: Partial<TransitionEvent> }} opts
 */
export function testTransitionComponent(
  Component,
  {
    componentName,
    createContent = createComponent,
    event = {},
    elementSelector = '[ontransitionend]',
  } = {},
) {
  const displayName = componentName ?? Component.displayName ?? Component.name;

  describe(`Common transition component functionality for ${displayName}`, () => {
    it('renders', () => {
      const wrapper = createComponent(Component);
      assert.isTrue(wrapper.find(Component).exists());
    });

    ['in', 'out'].forEach(direction => {
      it('should handle on transition end', () => {
        const onTransitionEnd = sinon.stub();
        const wrapper = createComponent(Component, {
          direction,
          onTransitionEnd,
        });

        const container = wrapper.find(elementSelector);
        container.prop('ontransitionend')({
          // Default to the main container as the `target` for the TransitionEvent,
          // as that would be the actual behavior at runtime.
          // If that's not desired, callers can still override it by providing
          // event.target explicitly.
          target: container.getDOMNode(),
          ...event,
        });

        assert.calledWith(onTransitionEnd, direction);
      });
    });

    it(
      'should pass a11y checks',
      checkAccessibility([
        {
          content: () => createContent(Component),
        },
      ]),
    );
  });
}
