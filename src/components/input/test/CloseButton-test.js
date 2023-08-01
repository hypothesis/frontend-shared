import { mount } from 'enzyme';

import CloseableContext from '../../CloseableContext';
import { testPresentationalComponent } from '../../test/common-tests';
import CloseButton from '../CloseButton';

describe('CloseButton', () => {
  testPresentationalComponent(CloseButton);

  describe('When in a CloseableContext', () => {
    it('Uses context `onClose` as click handler', () => {
      const onClose = sinon.stub();
      const wrapper = mount(
        <CloseableContext.Provider value={{ onClose }}>
          <CloseButton />
        </CloseableContext.Provider>,
      );

      wrapper.find('button').simulate('click');
      assert.calledOnce(onClose);
    });

    it('Uses `onClick` as click handler when provided', () => {
      const onClose = sinon.stub();
      const onClick = sinon.stub();
      const wrapper = mount(
        <CloseableContext.Provider value={{ onClose }}>
          <CloseButton onClick={onClick} />
        </CloseableContext.Provider>,
      );

      wrapper.find('button').simulate('click');
      assert.calledOnce(onClick);
      assert.notCalled(onClose);
    });
  });
});
