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
 * @param {FunctionComponent} Component
 */
export function testPresentationalComponent(Component) {
  describe('Common presentational functionality', () => {
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
