import { mount } from 'enzyme';

import { testPresentationalComponent } from '../../test/common-tests';

import Button from '../Button';
import { CancelIcon } from '../../icons';

describe('Button', () => {
  const createComponent = (props = {}) => {
    return mount(
      <Button {...props}>This is content inside of a Button</Button>
    );
  };

  testPresentationalComponent(Button);

  it('renders proportionally-sized icon', () => {
    const wrapper = createComponent({ icon: CancelIcon });
    const icon = wrapper.find('CancelIcon');

    assert.isTrue(icon.exists());
    assert.isTrue(icon.hasClass('h-em'));
    assert.isTrue(icon.hasClass('w-em'));
  });
});
