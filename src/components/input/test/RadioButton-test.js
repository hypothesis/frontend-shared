import { mount } from '@hypothesis/frontend-testing';

import { testCompositeComponent } from '../../test/common-tests';
import RadioButton from '../RadioButton';

// Relatively simple test, as most of the logic is shared with Checkbox, and
// covered by Checkbox-test
describe('RadioButton', () => {
  const createComponent = (props = {}) => {
    return mount(<RadioButton {...props}>This is child content</RadioButton>);
  };

  testCompositeComponent(RadioButton, {
    elementSelector: 'input[type="radio"]',
  });

  it('shows an icon representing radio state', () => {
    const wrapper = createComponent();

    assert.isTrue(wrapper.exists('RadioIcon'));
    assert.isFalse(wrapper.exists('RadioCheckedIcon'));

    wrapper.setProps({ checked: true });

    assert.isFalse(wrapper.exists('RadioIcon'));
    assert.isTrue(wrapper.exists('RadioCheckedIcon'));
  });
});
