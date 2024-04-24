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
    {
      error: undefined,
      validationMessage: '',
      invalid: false,
    },
    {
      error: 'Not a valid URL',
      validationMessage: 'Not a valid URL',
      invalid: true,
    },
  ].forEach(({ error, validationMessage, invalid }) => {
    it('should set custom validation error if `error` prop is provided', () => {
      const wrapper = mount(<Input aria-label="Test" error={error} />);
      const input = wrapper.find('input');
      assert.equal(input.getDOMNode().validationMessage, validationMessage);
      assert.equal(input.prop('aria-invalid'), invalid);
    });
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
