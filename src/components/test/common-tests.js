import { mount } from 'enzyme';
import { createRef } from 'preact';

import { checkAccessibility } from '../../../test/util/accessibility';

/**
 * @typedef {import('preact').FunctionComponent} FunctionComponent
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
 *
 * @param {FunctionComponent} Component
 * @param {CommonTestOpts} opts
 */
export function testCompositeComponent(
  Component,
  { componentName, createContent = createComponent, elementSelector } = {}
) {
  const displayName = componentName ?? Component.displayName ?? Component.name;

  describe(`Common composite functionality for ${displayName}`, () => {
    it('applies `ref` via `elementRef`', () => {
      const elementRef = createRef();
      createContent(Component, { elementRef });

      assert.instanceOf(elementRef.current, Node);
    });

    it('applies HTML attributes to primary element', () => {
      let primaryEl;

      const wrapper = createContent(Component, {
        'data-testid': 'foo-container',
      });

      if (elementSelector) {
        primaryEl = wrapper.find(elementSelector).getDOMNode();
      } else {
        primaryEl = wrapper.childAt(0).getDOMNode();
      }

      assert.isTrue(primaryEl.hasAttribute('data-testid'));
      assert.equal(primaryEl.getAttribute('data-testid'), 'foo-container');
    });

    it('applies a `data-composite-component` attribute for debugging', () => {
      const wrapperOuterEl = createContent(Component).childAt(0).getDOMNode();

      assert.isTrue(wrapperOuterEl.hasAttribute('data-composite-component'));
      assert.equal(
        wrapperOuterEl.getAttribute('data-composite-component'),
        displayName
      );
    });

    it(
      'should pass a11y checks',
      checkAccessibility({
        content: () => createContent(Component),
      })
    );
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
  { componentName, createContent = createComponent, elementSelector } = {}
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
      })
    );
  });
}

/**
 * Set of tests common to all base components
 *
 * @param {FunctionComponent} Component
 */
export function testBaseComponent(Component) {
  describe('Common base component functionality', () => {
    it('applies `ref` via `elementRef`', () => {
      const elementRef = createRef();
      createComponent(Component, { elementRef });

      assert.instanceOf(elementRef.current, Node);
    });

    it('applies supplied `className`', () => {
      const wrapper = createComponent(Component, { className: 'testClass' });

      const allClasses = [...wrapper.childAt(0).getDOMNode().classList];

      assert.deepEqual(allClasses, ['testClass']);
    });

    it('applies HTML attributes to outer element', () => {
      const wrapperOuterEl = createComponent(Component, {
        'data-testid': 'foo-container',
      })
        .childAt(0)
        .getDOMNode();

      assert.isTrue(wrapperOuterEl.hasAttribute('data-testid'));
      assert.equal(wrapperOuterEl.getAttribute('data-testid'), 'foo-container');
    });

    it(
      'should pass a11y checks',
      checkAccessibility({
        content: () => createComponent(Component),
      })
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
