import { mount } from 'enzyme';
import { useRef } from 'preact/hooks';
import { act } from 'preact/test-utils';

import { useFocusAway } from '../use-focus-away';

describe('useFocusAway', () => {
  let handler;

  // Create a fake component to mount in tests that uses the hook
  function FakeComponent({ enabled = true }) {
    const myRef = useRef();
    const hookOpts = enabled === true ? undefined : { enabled };
    useFocusAway(myRef, handler, hookOpts);
    return (
      <div>
        <button data-testid="outer-button">Hi</button>
        <div ref={myRef} data-testid="container">
          <button data-testid="inner-button">Hi</button>
        </div>
      </div>
    );
  }

  function createComponent(props) {
    return mount(<FakeComponent {...props} />);
  }

  function getContainer(wrapper) {
    return wrapper.find('[data-testid="container"]').getDOMNode();
  }

  function getOuterButton(wrapper) {
    return wrapper.find('[data-testid="outer-button"]').getDOMNode();
  }

  function getInnerButton(wrapper) {
    return wrapper.find('[data-testid="inner-button"]').getDOMNode();
  }

  beforeEach(() => {
    handler = sinon.stub();
  });

  it('should invoke callback when focus moves outside of container', () => {
    const wrapper = createComponent();
    const focusOut = () =>
      act(() => {
        getInnerButton(wrapper).dispatchEvent(
          new FocusEvent('focusout', {
            bubbles: true,
            relatedTarget: getOuterButton(wrapper),
          }),
        );
      });

    focusOut();
    wrapper.update();

    assert.calledOnce(handler);

    // Update the component to change it and re-execute the hook
    wrapper.setProps({ enabled: false });

    focusOut();

    // Cleanup of hook should have removed eventListeners, so the callback
    // is not called again
    assert.calledOnce(handler);
  });

  it('should not invoke callback when focus moves inside of container', () => {
    const wrapper = createComponent();

    act(() => {
      getContainer(wrapper).dispatchEvent(
        new FocusEvent('focusout', {
          bubbles: true,
          relatedTarget: getInnerButton(wrapper),
        }),
      );
    });
    wrapper.update();

    assert.notCalled(handler);
  });
});
