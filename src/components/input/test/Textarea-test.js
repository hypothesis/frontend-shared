import { mount } from 'enzyme';

import { testPresentationalComponent } from '../../test/common-tests';
import Textarea from '../Textarea';

const contentFn = (Component, props = {}) => {
  return mount(<Component aria-label="Test textarea" {...props} />);
};

describe('Textarea', () => {
  testPresentationalComponent(Textarea, { createContent: contentFn });

  it('should warn in console if accessibility attributes are missing', () => {
    sinon.stub(console, 'warn');

    mount(<Textarea placeholder="..." />);

    assert.calledWith(
      console.warn,
      '`Textarea` component should have either an `id` or an `aria-label` attribute',
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
      const wrapper = mount(<Textarea aria-label="Test" error={error} />);
      const textarea = wrapper.find('textarea');
      assert.equal(textarea.getDOMNode().validationMessage, validationMessage);
      assert.equal(textarea.prop('aria-invalid'), invalid);
    });
  });

  [
    { feedback: undefined, expectedInvalid: false },
    { feedback: 'error', expectedInvalid: true },
    { feedback: 'warning', expectedInvalid: false },
  ].forEach(({ feedback, expectedInvalid }) => {
    it('sets aria-invalid based on feedback prop', () => {
      const wrapper = mount(
        <Textarea aria-label="Test textarea" feedback={feedback} />,
      );
      const textarea = wrapper.find('textarea');

      assert.equal(textarea.prop('aria-invalid'), expectedInvalid);
    });
  });
});
