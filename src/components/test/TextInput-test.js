import { mount } from 'enzyme';
import { createRef } from 'preact';

import { TextInput, TextInputWithButton } from '../TextInput';

describe('TextInput', () => {
  const createComponent = (props = {}) => mount(<TextInput {...props} />);

  it('renders an input field with an appropriate className', () => {
    const wrapper = createComponent();

    assert.isTrue(wrapper.find('input').hasClass('Hyp-TextInput'));
    assert.isFalse(wrapper.find('input').hasClass('has-error'));
  });

  it('sets input type based on `type` prop', () => {
    const wrapper = createComponent({ type: 'url' });

    assert.equal(wrapper.getDOMNode().getAttribute('type'), 'url');
  });

  it('applies an error class when in error', () => {
    const wrapper = createComponent({ hasError: true });

    assert.isTrue(wrapper.find('input').hasClass('has-error'));
  });

  it('passes along a `ref` to the input element through `inputRef`', () => {
    const inputRef = createRef();
    createComponent({ inputRef: inputRef });

    assert.isTrue(inputRef.current instanceof Node);
  });

  it('applies extra classes', () => {
    const wrapper = createComponent({ classes: 'foo bar' });

    assert.isTrue(wrapper.find('.Hyp-TextInput.foo.bar').exists());
  });
});

describe('TextInputWithButton', () => {
  const createComponent = (props = {}) =>
    mount(
      <TextInputWithButton {...props}>
        <TextInput />
        <button />
      </TextInputWithButton>
    );

  it('wraps children in a container element with appropriate className', () => {
    const wrapper = createComponent();

    assert.isTrue(wrapper.find('.Hyp-TextInputWithButton').exists());
  });

  it('applies extra classes', () => {
    const wrapper = createComponent({ classes: 'foo bar' });

    assert.isTrue(wrapper.find('.Hyp-TextInputWithButton.foo.bar').exists());
  });
});
