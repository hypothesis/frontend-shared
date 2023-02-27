import { mount } from 'enzyme';

import { testPresentationalComponent } from '../../test/common-tests';
import Overlay from '../Overlay';

const createComponent = (Component, props = {}) => {
  return mount(<Component {...props}>This is child content</Component>);
};

describe('Overlay', () => {
  testPresentationalComponent(Overlay);

  it("doesn't render if `open` is `false`", () => {
    const wrapper = createComponent(Overlay, { open: false });

    assert.isFalse(wrapper.childAt(0).exists());
  });
});
