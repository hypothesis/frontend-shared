import { mount } from 'enzyme';
import { useRef } from 'preact/hooks';
import { act } from 'preact/test-utils';

import { useClickAway } from '../use-click-away';

describe('useClickAway', () => {
  let handler;

  const events = [new Event('mousedown'), new Event('click')];

  // Create a fake component to mount in tests that uses the hook
  function FakeComponent({ enabled = true }) {
    const myRef = useRef();
    useClickAway(myRef, handler, { enabled });
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

      wrapper.setProps({ enabled: false });

      act(() => {
        document.body.dispatchEvent(event);
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
