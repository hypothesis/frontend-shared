import { mount } from '@hypothesis/frontend-testing';
import { useRef } from 'preact/hooks';
import { act } from 'preact/test-utils';

import { useClickAway } from '../use-click-away';

describe('useClickAway', () => {
  let handler;

  const event = name => new Event(name, { bubbles: true });
  const events = [event('mousedown'), event('click')];

  // Create a fake component to mount in tests that uses the hook
  function FakeComponent({ enabled = true }) {
    const myRef = useRef();
    const hookOpts = enabled === true ? undefined : { enabled };
    useClickAway(myRef, handler, hookOpts);
    return (
      <div ref={myRef}>
        <button>Hi</button>
      </div>
    );
  }

  function createComponent(props) {
    return mount(<FakeComponent {...props} />, { connected: true });
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

      wrapper.setProps({ enabled: false });

      act(() => {
        document.body.dispatchEvent(event);
      });

      // Cleanup of hook should have removed eventListeners, so the callback
      // is not called again
      assert.calledOnce(handler);
    });

    it(`should not invoke callback on events inside of container (${event.type})`, () => {
      const wrapper = createComponent();
      const button = wrapper.find('button');

      act(() => {
        button.getDOMNode().dispatchEvent(event);
      });
      wrapper.update();

      assert.notCalled(handler);
    });

    it(`should not invoke callback if clicked element is removed from container (${event.type})`, () => {
      const wrapper = createComponent();
      const button = wrapper.find('button').getDOMNode();

      act(() => {
        button.addEventListener(event.type, () => {
          // Remove the button from the DOM before next listeners are invoked,
          // to simulate what happens if the clicked element was removed as a
          // result of a state update + re-render in a child component
          button.remove();
        });
        button.dispatchEvent(event);
      });
      wrapper.update();

      assert.notCalled(handler);
    });
  });
});
