import { mount } from 'enzyme';

import { testCompositeComponent } from '../../test/common-tests';
import ScrollBox from '../ScrollBox';

const createComponent = (Component, props = {}) => {
  return mount(<Component {...props}>This is child content</Component>);
};

describe('ScrollBox', () => {
  testCompositeComponent(ScrollBox);

  it('disables container border when `borderless` is set', () => {
    const withBorder = createComponent(ScrollBox);
    const withoutBorder = createComponent(ScrollBox, { borderless: true });

    assert.isFalse(withBorder.find('ScrollContainer').props().borderless);
    assert.isTrue(withoutBorder.find('ScrollContainer').props().borderless);
  });
});
