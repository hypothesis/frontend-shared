import { mount } from 'enzyme';

import { testPresentationalComponent } from '../../test/common-tests';
import Input from '../Input';

const contentFn = (Component, props = {}) => {
  return mount(<Component aria-label="Test input" {...props} />);
};

describe('Input', () => {
  testPresentationalComponent(Input, { createContent: contentFn });

  it('should warn in console if accessibility attributes are missing', () => {
    sinon.stub(console, 'warn');

    mount(<Input placeholder="..." />);

    assert.calledWith(
      console.warn,
      '`Input` component should have either an `id` or an `aria-label` attribute',
    );

    console.warn.restore();
  });

  [
    { feedback: undefined, expectedInvalid: false },
    { feedback: 'error', expectedInvalid: true },
    { feedback: 'warning', expectedInvalid: false },
  ].forEach(({ feedback, expectedInvalid }) => {
    it('sets aria-invalid based on feedback prop', () => {
      const wrapper = mount(
        <Input aria-label="Test input" feedback={feedback} />,
      );
      const input = wrapper.find('input');

      assert.equal(input.prop('aria-invalid'), expectedInvalid);
    });
  });
});
