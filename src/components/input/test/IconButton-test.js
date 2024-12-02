import { mount } from '@hypothesis/frontend-testing';

import { CancelIcon } from '../../icons';
import {
  testPresentationalComponent,
  testStyledComponent,
} from '../../test/common-tests';
import IconButton from '../IconButton';

describe('IconButton', () => {
  const createComponent = (props = {}) => {
    return mount(<IconButton {...props} />);
  };

  testPresentationalComponent(IconButton, { componentName: 'IconButton' });
  testStyledComponent(IconButton);

  it('renders proportionally-sized icon', () => {
    const wrapper = createComponent({ icon: CancelIcon });
    const icon = wrapper.find('CancelIcon');

    assert.isTrue(icon.exists());
    assert.isTrue(icon.hasClass('h-em'));
    assert.isTrue(icon.hasClass('w-em'));
  });
});
