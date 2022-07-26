import { mount } from 'enzyme';

import { testPresentationalComponent } from '../../test/common-tests';

import IconButton from '../IconButton';
import { CancelIcon } from '../../icons';

describe('IconButton', () => {
  const createComponent = (props = {}) => {
    return mount(<IconButton {...props} />);
  };

  testPresentationalComponent(IconButton);

  it('renders proportionally-sized icon', () => {
    const wrapper = createComponent({ icon: CancelIcon });
    const icon = wrapper.find('CancelIcon');

    assert.isTrue(icon.exists());
    assert.isTrue(icon.hasClass('h-em'));
    assert.isTrue(icon.hasClass('w-em'));
  });
});
