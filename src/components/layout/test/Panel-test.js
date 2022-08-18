import { mount } from 'enzyme';

import { testCompositeComponent } from '../../test/common-tests';

import Panel from '../Panel';
import { EditIcon } from '../../icons';

const createComponent = (Component, props = {}) => {
  return mount(<Component {...props}>This is child content</Component>);
};

describe('Panel', () => {
  testCompositeComponent(Panel);

  it('renders an icon if one provided to `icon`', () => {
    const wrapper = createComponent(Panel, { icon: EditIcon });

    assert.isTrue(wrapper.find('EditIcon').exists());
  });

  it('renders a close button if `onClose` set', () => {
    const onClose = sinon.stub();
    const wrapper = createComponent(Panel, { onClose });

    wrapper.find('button').simulate('click');
    assert.calledOnce(onClose);
  });

  it('renders `buttons` as CardActions', () => {
    const buttons = <button>click me</button>;
    const wrapper = createComponent(Panel, { buttons });

    assert.isTrue(wrapper.find('CardActions').exists());
    assert.equal(wrapper.find('CardActions').text(), 'click me');
  });
});
