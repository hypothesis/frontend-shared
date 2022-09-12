import { mount } from 'enzyme';

import { testCompositeComponent } from '../../test/common-tests';

import Dialog from '../Dialog';

const createComponent = (Component, props = {}) => {
  return mount(<Component {...props}>This is child content</Component>);
};

describe('Dialog', () => {
  testCompositeComponent(Dialog);

  // This is an auto-generated test. Expand or delete.
  it('has other functionality...', () => {
    const wrapper = createComponent(Dialog, { size: 'lg' });

    assert.isTrue(wrapper.childAt(0).hasClass('p-4'));
  });
});
