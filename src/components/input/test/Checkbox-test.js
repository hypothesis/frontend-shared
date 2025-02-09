import { mount } from '@hypothesis/frontend-testing';
import { act } from 'preact/test-utils';

import { testCompositeComponent } from '../../test/common-tests';
import Checkbox from '../Checkbox';

const createComponent = (Component, props = {}) => {
  return mount(<Component {...props}>This is child content</Component>);
};

describe('Checkbox', () => {
  testCompositeComponent(Checkbox, { elementSelector: 'input' });

  it('shows an icon representing checkbox state', () => {
    const wrapper = createComponent(Checkbox);

    assert.isTrue(wrapper.exists('CheckboxIcon'));
    assert.isFalse(wrapper.exists('CheckboxCheckedFilledIcon'));

    wrapper.setProps({ checked: true });

    assert.isFalse(wrapper.exists('CheckboxIcon'));
    assert.isTrue(wrapper.exists('CheckboxCheckedFilledIcon'));
  });

  it('calls provided `onChange` callback when input changes', () => {
    const onChange = sinon.stub();
    const wrapper = createComponent(Checkbox, {
      onChange,
    });

    const checkbox = wrapper.find('input').getDOMNode();
    const event = new Event('change');
    act(() => {
      checkbox.dispatchEvent(event);
    });

    assert.calledWith(onChange, event);
  });

  it('updates uncontrolled checkbox state on "change" event', () => {
    const wrapper = createComponent(Checkbox);
    const checkbox = wrapper.find('input').getDOMNode();

    // Toggle the checkbox without updating the uncontrolled state
    const toggle = () => (checkbox.checked = !checkbox.checked);

    // Toggle the checkbox and update the uncontrolled state
    const simulateChange = () => {
      toggle();
      act(() => {
        checkbox.dispatchEvent(new Event('change'));
      });
    };

    simulateChange();
    toggle();
    wrapper.setProps({}); // Force re-render. This will re-apply the uncontrolled state.
    assert.isTrue(checkbox.checked);

    simulateChange();
    toggle();
    wrapper.setProps({}); // Force re-render. This will re-apply the uncontrolled state.
    assert.isFalse(checkbox.checked);
  });
});
