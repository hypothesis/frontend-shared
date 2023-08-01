import { mount } from 'enzyme';

import { CancelIcon } from '../../icons';
import {
  testPresentationalComponent,
  testStyledComponent,
} from '../../test/common-tests';
import Button from '../Button';

describe('Button', () => {
  const createComponent = (props = {}) => {
    return mount(
      <Button {...props}>This is content inside of a Button</Button>,
    );
  };

  testPresentationalComponent(Button);
  testStyledComponent(Button);

  it('renders proportionally-sized icon', () => {
    const wrapper = createComponent({ icon: CancelIcon });
    const icon = wrapper.find('CancelIcon');

    assert.isTrue(icon.exists());
    assert.isTrue(icon.hasClass('h-em'));
    assert.isTrue(icon.hasClass('w-em'));
  });

  it('applies role="button" by default', () => {
    const wrapper = createComponent();
    const outerEl = wrapper.find('button').getDOMNode();

    assert.isTrue(outerEl.hasAttribute('role'));
    assert.equal(outerEl.getAttribute('role'), 'button');
  });

  it('applies appropriate ARIA attributes for button state', () => {
    const pressed = createComponent({ pressed: true });
    const expanded = createComponent({ expanded: true });

    assert.equal(
      pressed.find('button').getDOMNode().getAttribute('aria-pressed'),
      'true',
    );
    assert.equal(
      expanded.find('button').getDOMNode().getAttribute('aria-expanded'),
      'true',
    );
  });

  it('sets appropriate ARIA attributes for tabs', () => {
    const wrapper = createComponent({ role: 'tab' });

    assert.equal(
      wrapper.find('button').getDOMNode().getAttribute('role'),
      'tab',
    );
  });

  it('sets aria-label attribute', () => {
    const wrapper = createComponent({ title: 'Click me' });

    assert.equal(
      wrapper.find('button').getDOMNode().getAttribute('aria-label'),
      'Click me',
    );
  });
});
