import { mount } from 'enzyme';

import { testBaseComponent } from '../../test/common-tests';
import ButtonBase from '../ButtonBase';

describe('ButtonBase', () => {
  const createComponent = (props = {}) => {
    return mount(
      <ButtonBase {...props}>This is content inside of a Link</ButtonBase>
    );
  };

  testBaseComponent(ButtonBase);

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
      'true'
    );
    assert.equal(
      expanded.find('button').getDOMNode().getAttribute('aria-expanded'),
      'true'
    );
  });

  it('sets appropriate ARIA attributes for tabs', () => {
    const wrapper = createComponent({ role: 'tab' });

    assert.equal(
      wrapper.find('button').getDOMNode().getAttribute('role'),
      'tab'
    );
  });

  it('sets aria-label attribute', () => {
    const wrapper = createComponent({ title: 'Click me' });

    assert.equal(
      wrapper.find('button').getDOMNode().getAttribute('aria-label'),
      'Click me'
    );
  });
});
