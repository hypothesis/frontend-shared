import { mount } from 'enzyme';

import { testPresentationalComponent } from '../../test/common-tests';
import CardHeader from '../CardHeader';

const createComponent = (Component, props = {}) => {
  return mount(<Component {...props}>This is child content</Component>);
};

describe('CardHeader', () => {
  testPresentationalComponent(CardHeader);

  it('renders a close button if `onClose` set', () => {
    const onClose = sinon.stub();
    const wrapper = createComponent(CardHeader, { onClose });

    wrapper.find('button').simulate('click');
    assert.calledOnce(onClose);
  });
});
