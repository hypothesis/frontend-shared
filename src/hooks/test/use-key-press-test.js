import { mount } from 'enzyme';
import { useRef } from 'preact/hooks';
import { act } from 'preact/test-utils';

import { useKeyPress } from '../use-key-press';

describe('useKeyPress', () => {
  let handler;
  const defaultKeys = ['d', 'u'];

  const createEvent = (name, props) => {
    const event = new Event(name);
    Object.assign(event, props);
    return event;
  };

  // Create a fake component to mount in tests that uses the hook
  function FakeComponent({ keys = defaultKeys, enabled = true }) {
    const myRef = useRef();
    const hookOpts = enabled === true ? undefined : { enabled };
    useKeyPress(keys, handler, hookOpts);
    return (
      <div ref={myRef}>
        <button>Hi</button>
      </div>
    );
  }

  function createComponent(props) {
    return mount(<FakeComponent {...props} />);
  }

  beforeEach(() => {
    handler = sinon.stub();
  });

  defaultKeys.forEach(key => {
    it(`should invoke callback when registered key ${key} is pressed`, () => {
      const event = createEvent('keydown', { key });
      const wrapper = createComponent();

      act(() => {
        document.body.dispatchEvent(event);
      });
      wrapper.update();

      assert.calledOnce(handler);

      // Update the component to change it and re-execute the hook
      wrapper.setProps({ enabled: false });

      act(() => {
        document.body.dispatchEvent(event);
      });

      // Cleanup of hook should have removed eventListeners, so the callback
      // is not called again
      assert.calledOnce(handler);
    });
  });

  it('should not invoke callback if a non-registered key is pressed', () => {
    const event = createEvent('keydown', { key: 'q' });
    const wrapper = createComponent();

    act(() => {
      document.body.dispatchEvent(event);
    });
    wrapper.update();

    assert.notCalled(handler);
  });
});
