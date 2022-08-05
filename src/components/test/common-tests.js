import { mount } from 'enzyme';
import { createRef } from 'preact';

/**
 * @typedef {import('preact').FunctionComponent} FunctionComponent
 */

const createComponent = (Component, props = {}) => {
  return mount(<Component {...props}>This is child content</Component>);
};

/**
 * Set of tests common to all presentational components
 *
 * @typedef CommonTestOpts
 * @prop {string} [componentName] - Temporary affordance to prevent name
 *   collisions between updated components and legacy components with the same
 *   component function name.
 * @prop {string} [elementSelector] - Selector to find the element to which any
 *   passed HTML attributes are applied, when it is not the outermost element
 *   rendered by the component.
 *
 * @param {FunctionComponent} Component
 * @param {CommonTestOpts} opts
 */
export function testCompositeComponent(
  Component,
  { componentName, elementSelector } = {}
) {
  const displayName = componentName ?? Component.displayName ?? Component.name;

  describe(`Common composite functionality for ${displayName}`, () => {
    it('applies `ref` via `elementRef`', () => {
      const elementRef = createRef();
      createComponent(Component, { elementRef });

      assert.instanceOf(elementRef.current, Node);
    });

    it('applies HTML attributes to primary element', () => {
      let primaryEl;

      const wrapper = createComponent(Component, {
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
      const wrapperOuterEl = createComponent(Component).childAt(0).getDOMNode();

      assert.isTrue(wrapperOuterEl.hasAttribute('data-composite-component'));
      assert.equal(
        wrapperOuterEl.getAttribute('data-composite-component'),
        displayName
      );
    });
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
  { componentName, elementSelector } = {}
) {
  const displayName = componentName ?? Component.displayName ?? Component.name;

  describe(`Common presentational functionality for ${displayName}`, () => {
    it('applies extra classes', () => {
      const wrapper = createComponent(Component, { classes: 'foo bar' });
      const allClasses = [...wrapper.childAt(0).getDOMNode().classList];
      assert.equal(allClasses.at(-2), 'foo');
      assert.equal(allClasses.at(-1), 'bar');
    });

    it('applies `ref` via `elementRef`', () => {
      const elementRef = createRef();
      createComponent(Component, { elementRef });

      assert.instanceOf(elementRef.current, Node);
    });

    it('overrides disallowed `className` prop', () => {
      const wrapper = createComponent(Component, { className: 'verboten' });

      assert.isFalse(wrapper.childAt(0).hasClass('verboten'));
    });

    it('applies HTML attributes to primary element', () => {
      let primaryEl;

      const wrapper = createComponent(Component, {
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

    it('applies a `data-component` attribute for debugging', () => {
      const wrapperOuterEl = createComponent(Component).childAt(0).getDOMNode();

      assert.isTrue(wrapperOuterEl.hasAttribute('data-component'));
      assert.equal(wrapperOuterEl.getAttribute('data-component'), displayName);
    });
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
