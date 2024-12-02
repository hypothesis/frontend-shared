import { mount } from '@hypothesis/frontend-testing';

import CloseableContext from '../../CloseableContext';
import { testPresentationalComponent } from '../../test/common-tests';
import CardHeader from '../CardHeader';

const createComponent = (Component, props = {}) => {
  return mount(<Component {...props}>This is child content</Component>);
};

describe('CardHeader', () => {
  testPresentationalComponent(CardHeader);

  describe('Close button', () => {
    it('renders a close button if `onClose` set', () => {
      const onClose = sinon.stub();
      const wrapper = createComponent(CardHeader, {
        title: 'My title',
        onClose,
      });

      wrapper.find('button').simulate('click');
      assert.calledOnce(onClose);
    });

    it('renders a close button if there is a CloseableContext handler', () => {
      const onClose = sinon.stub();
      const wrapper = mount(
        <CloseableContext.Provider value={{ onClose }}>
          <CardHeader title="Test header" />
        </CloseableContext.Provider>,
      );

      wrapper.find('button').simulate('click');
      assert.calledOnce(onClose);
    });
  });
});
