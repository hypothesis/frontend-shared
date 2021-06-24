import { mount } from 'enzyme';

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
});

describe('TextInputWithButton', () => {
  const createComponent = () =>
    mount(
      <TextInputWithButton>
        <TextInput />
        <button />
      </TextInputWithButton>
    );

  it('wraps children in a container element with appropriate className', () => {
    const wrapper = createComponent();

    assert.isTrue(wrapper.find('div').hasClass('Hyp-TextInputWithButton'));
  });
});
