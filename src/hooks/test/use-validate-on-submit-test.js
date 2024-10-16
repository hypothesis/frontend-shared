import { mount } from 'enzyme';
import { useState, useId } from 'preact/hooks';

import { Input } from '../../components/input';
import { useValidateOnSubmit } from '../use-validate-on-submit';

// Example of a simple form that uses this hook to implement custom display of
// validation messages.
function CustomForm({ onSelectURL }) {
  const [url, setURL] = useState();
  const [error, setError] = useState();
  const errorId = useId();

  const onSubmit = useValidateOnSubmit(() => {
    onSelectURL(url);
  });

  const onChangeURL = event => {
    const url = event.target.value;
    setURL(undefined);

    try {
      new URL(url);
      setError(undefined);
      setURL(url);
    } catch {
      setError('Not a valid URL');
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <Input
        onChange={onChangeURL}
        required
        aria-label="URL"
        aria-describedby={errorId}
        error={error}
      />
      <div id={errorId}>{error}</div>
      <button type="submit">Submit</button>
    </form>
  );
}

describe('useValidateOnSubmit', () => {
  function changeURL(form, url) {
    const input = form.find('input');
    input.getDOMNode().value = url;
    input.simulate('change');
  }

  function submitForm(form) {
    form.find('form').simulate('submit');
  }

  it('should invoke callback if form has no errors', () => {
    const onSelectURL = sinon.stub();
    const form = mount(<CustomForm onSelectURL={onSelectURL} />);
    changeURL(form, 'https://example.com');
    submitForm(form);
    assert.calledWith(onSelectURL, 'https://example.com');
  });

  it('should invoke change event for empty, required inputs', () => {
    const onSelectURL = sinon.stub();
    const form = mount(<CustomForm onSelectURL={onSelectURL} />);
    const input = form.find('input');
    const onChange = sinon.stub();
    input.getDOMNode().addEventListener('change', onChange);

    submitForm(form);

    assert.notCalled(onSelectURL);
    assert.calledOnce(onChange);
  });

  it('should not invoke callback if form has errors', () => {
    const onSelectURL = sinon.stub();
    const form = mount(<CustomForm onSelectURL={onSelectURL} />);
    changeURL(form, 'not valid');
    submitForm(form);
    assert.notCalled(onSelectURL);
  });

  it('should focus first input with an error', () => {
    const onSelectURL = sinon.stub();
    const form = mount(<CustomForm onSelectURL={onSelectURL} />);
    changeURL(form, 'not valid');

    const input = form.find('input').getDOMNode();
    const focusStub = sinon.stub(input, 'focus');
    submitForm(form);

    assert.calledOnce(focusStub);
  });

  // Create a fake `Event` for which we can control the `target` property.
  // We do this in order to call the event handler directly, rather than
  // using `target.dispatchEvent`. This makes catching the exception easier.
  function createFakeEvent({ type, target }) {
    return { type, target, preventDefault: sinon.stub() };
  }

  it('should throw if handler received non-"submit" event', () => {
    function InvalidUsage() {
      const onSubmit = useValidateOnSubmit(() => {});

      // eslint-disable-next-line
      return <form onClick={onSubmit} />;
    }
    const wrapper = mount(<InvalidUsage />);
    assert.throws(() => {
      const formEl = wrapper.find('form').getDOMNode();
      const event = createFakeEvent({ type: 'click', target: formEl });
      wrapper.find('form').prop('onClick')(event);
    }, 'Event type is not "submit"');
  });

  it('should throw if handler is not a form', () => {
    function InvalidUsage() {
      const onSubmit = useValidateOnSubmit(() => {});

      return <button onSubmit={onSubmit} type="button" />;
    }
    const wrapper = mount(<InvalidUsage />);
    assert.throws(() => {
      const buttonEl = wrapper.find('button').getDOMNode();
      const event = createFakeEvent({ type: 'submit', target: buttonEl });
      wrapper.find('button').prop('onSubmit')(event);
    }, 'Event target is not a form');
  });
});
