import { mount } from 'enzyme';
import { useRef } from 'preact/hooks';
import { act } from 'preact/test-utils';

import { useFocusAway } from '../use-focus-away';

describe('useFocusAway', () => {
  let handler;

  const events = [new Event('focus')];

  // Create a fake component to mount in tests that uses the hook
  function FakeComponent({ enabled = true }) {
    const myRef = useRef();
    useFocusAway(myRef, handler, { enabled });
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

  events.forEach(event => {
    it(`should invoke callback once for events outside of element (${event.type})`, () => {
      const wrapper = createComponent();

      act(() => {
        document.body.dispatchEvent(event);
      });
      wrapper.update();

      assert.calledOnce(handler);

      // Update the component to change it and re-execute the hook
      wrapper.setProps({ enabled: false });

      act(() => {
        document.body.dispatchEvent(new Event('focus'));
      });

      // Cleanup of hook should have removed eventListeners, so the callback
      // is not called again
      assert.calledOnce(handler);
    });
  });

  events.forEach(event => {
    it(`should not invoke callback on events inside of container (${event.type})`, () => {
      const wrapper = createComponent();
      const button = wrapper.find('button');

      act(() => {
        button.getDOMNode().dispatchEvent(event);
      });
      wrapper.update();

      assert.equal(handler.callCount, 0);
    });
  });
});
