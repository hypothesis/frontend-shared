import { mount } from 'enzyme';
import { createRef } from 'preact';

import { Frame, Card, Actions, Scrollbox } from '../containers';

describe('Container components', () => {
  const createComponent = (Component, props = {}) => {
    return mount(
      <Component {...props}>
        <div>This is content inside of a container</div>
      </Component>
    );
  };

  const commonTests = (Component, className) => {
    it('renders children inside of a div with appropriate classnames', () => {
      const wrapper = createComponent(Component);

      assert.isTrue(wrapper.find('div').first().hasClass(className));
    });

    it('applies extra classes', () => {
      const wrapper = createComponent(Component, { classes: 'foo bar' });
      assert.deepEqual(
        [
          ...wrapper
            .find(`div.${className}.foo.bar`)
            .getDOMNode()
            .classList.values(),
        ],
        [className, 'foo', 'bar']
      );
    });

    it('passes along a `ref` to the input element through `elementRef`', () => {
      const elementRef = createRef();
      createComponent(Component, { elementRef });

      assert.instanceOf(elementRef.current, Node);
    });

    it('passes along a `ref` to the input element through deprecated `containerRef`', () => {
      const containerRef = createRef();
      createComponent(Component, { containerRef });

      assert.instanceOf(containerRef.current, Node);
    });

    it('forwards HTML attributes', () => {
      const wrapper = createComponent(Component, {
        'data-testid': 'test-identifier',
      });

      const divEl = wrapper.find('div').first().getDOMNode();

      assert.equal(divEl.getAttribute('data-testid'), 'test-identifier');
    });
  };

  describe('Frame', () => {
    commonTests(Frame, 'Hyp-Frame');
  });

  describe('Card', () => {
    commonTests(Card, 'Hyp-Card');
  });

  describe('Actions', () => {
    commonTests(Actions, 'Hyp-Actions--row');

    it('applies columnar layout if `direction` is `column`', () => {
      const wrapper = createComponent(Actions, { direction: 'column' });

      assert.isTrue(wrapper.find('div.Hyp-Actions--column').exists());
    });
  });

  describe('Scrollbox', () => {
    commonTests(Scrollbox, 'Hyp-Scrollbox');

    it('applies header-affordance layout class if `withHeader`', () => {
      const wrapper = createComponent(Scrollbox, { withHeader: true });

      assert.isTrue(wrapper.find('div.Hyp-Scrollbox--with-header').exists());
    });
  });
});
