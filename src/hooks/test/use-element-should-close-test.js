import { mount } from 'enzyme';
import { useRef } from 'preact/hooks';
import { act } from 'preact/test-utils';

import { useElementShouldClose } from '../use-element-should-close';

describe('useElementShouldClose', () => {
  let handleClose;

  const createEvent = (name, props) => {
    const event = new Event(name);
    Object.assign(event, props);
    return event;
  };

  const events = [
    new Event('mousedown'),
    new Event('click'),
    createEvent('keydown', { key: 'Escape' }),
    new Event('focus'),
  ];

  // Create a fake component to mount in tests that uses the hook
  function FakeComponent({ isOpen = true, options = {} }) {
    const myRef = useRef();
    useElementShouldClose(myRef, isOpen, handleClose, options);
    return (
      <div ref={myRef}>
        <button>Hi</button>
      </div>
    );
  }

  function createComponent(props) {
    return mount(<FakeComponent isOpen={true} {...props} />);
  }

  beforeEach(() => {
    handleClose = sinon.stub();
  });

  events.forEach(event => {
    it(`should invoke close callback once for events outside of element (${event.type})`, () => {
      const wrapper = createComponent();

      act(() => {
        document.body.dispatchEvent(event);
      });
      wrapper.update();

      assert.calledOnce(handleClose);

      // Update the component to change it and re-execute the hook
      wrapper.setProps({ isOpen: false });

      act(() => {
        document.body.dispatchEvent(event);
      });

      // Cleanup of hook should have removed eventListeners, so the callback
      // is not called again
      assert.calledOnce(handleClose);
    });
  });

  events.forEach(event => {
    it(`should not invoke callback if disabled (${event.type})`, () => {
      const wrapper = createComponent({ options: { enabled: false } });

      act(() => {
        document.body.dispatchEvent(event);
      });
      wrapper.update();

      assert.notCalled(handleClose);
    });
  });

  events.forEach(event => {
    it(`should only respond to keypress events if \`closeOnExternalInteraction\` is false (${event.type})`, () => {
      const wrapper = createComponent({
        options: { closeOnExternalInteraction: false },
      });

      act(() => {
        document.body.dispatchEvent(event);
      });
      wrapper.update();

      if (!event.key) {
        assert.notCalled(handleClose);
      } else {
        assert.calledOnce(handleClose);
      }
    });
  });

  events.forEach(event => {
    it(`should not invoke close callback on events outside of element if element closed (${event.type})`, () => {
      const wrapper = createComponent({ isOpen: false });

      act(() => {
        document.body.dispatchEvent(event);
      });
      wrapper.update();

      assert.equal(handleClose.callCount, 0);
    });
  });

  events.forEach(event => {
    it(`should not invoke close callback on events inside of element (${event.type})`, () => {
      const wrapper = createComponent();
      const button = wrapper.find('button');

      act(() => {
        button.getDOMNode().dispatchEvent(event);
      });
      wrapper.update();

      assert.equal(handleClose.callCount, 0);
    });
  });
});
