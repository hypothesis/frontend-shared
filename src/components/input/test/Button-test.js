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
      <Button {...props}>This is content inside of a Button</Button>
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
});
