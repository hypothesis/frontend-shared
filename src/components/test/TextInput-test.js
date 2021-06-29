import { mount } from 'enzyme';
import { createRef } from 'preact';

import { TextInput, TextInputWithButton } from '../TextInput';

describe('TextInput', () => {
  const createComponent = (props = {}) => mount(<TextInput {...props} />);

  it('renders an input field with an appropriate className', () => {
    const wrapper = createComponent();

    assert.isTrue(wrapper.find('input').hasClass('Hyp-TextInput'));
    assert.isFalse(wrapper.find('input').hasClass('is-error'));
  });

  it('ignores `type` property and sets `type` to `text`', () => {
    const wrapper = createComponent({ type: 'checkbox' });

    assert.equal(wrapper.getDOMNode().getAttribute('type'), 'text');
  });

  it('applies an error class when in error', () => {
    const wrapper = createComponent({ error: true });

    assert.isTrue(wrapper.find('input').hasClass('is-error'));
  });

  it('passes along a `ref` to the input element through `inputRef`', () => {
    const inputRef = createRef();
    createComponent({ inputRef: inputRef });

    assert.isTrue(inputRef.current instanceof Node);
  });

  it('applies extra classes', () => {
    createComponent({ classes: 'foo bar' });

    assert.exists('div.Hyp-TextInput.foo.bar');
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
    createComponent();

    assert.exists('div.Hyp-TextInputWithButton');
  });

  it('applies extra classes', () => {
    createComponent({ classes: 'foo bar' });

    assert.exists('div.Hyp-TextInputWithButton.foo.bar');
  });
});
