import { mount } from 'enzyme';
import { createRef } from 'preact';

import { delay } from '../../../test-util/wait.js';
import { testPresentationalComponent } from '../../test/common-tests';
import Dialog from '../Dialog';
import { $imports } from '../Dialog';

const createComponent = (Component, props = {}) => {
  return mount(
    <Component title="Test title" onClose={() => {}} {...props}>
      This is child content
    </Component>
  );
};

/**
 * @type {import('../../../next.js').TransitionComponent}
 */
const ComponentWithTransition = ({ children, visible, onTransitionEnd }) => {
  // Fake a 50ms transition time
  setTimeout(() => onTransitionEnd?.(visible ? 'in' : 'out'), 50);
  return <div>{children}</div>;
};

describe('Dialog', () => {
  let fakeUseClickAway;
  let fakeUseFocusAway;
  let fakeUseKeyPress;

  testPresentationalComponent(Dialog, {
    createContent: createComponent,
    elementSelector: 'div[data-component="Dialog"]',
  });

  beforeEach(() => {
    fakeUseClickAway = sinon.stub();
    fakeUseFocusAway = sinon.stub();
    fakeUseKeyPress = sinon.stub();
    $imports.$mock({
      '../../hooks/use-click-away': {
        useClickAway: fakeUseClickAway,
      },
      '../../hooks/use-focus-away': {
        useFocusAway: fakeUseFocusAway,
      },
      '../../hooks/use-key-press': {
        useKeyPress: fakeUseKeyPress,
      },
    });
  });

  afterEach(() => {
    $imports.$restore();
  });

  describe('initial focus', () => {
    let container;

    beforeEach(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
    });

    afterEach(() => {
      container.remove();
    });

    it('focuses the element referred to by `initialFocus`', () => {
      const inputRef = createRef();

      mount(
        <Dialog initialFocus={inputRef} title="My dialog">
          <input ref={inputRef} />
        </Dialog>,
        { attachTo: container }
      );

      assert.equal(document.activeElement, inputRef.current);
    });

    it('focuses the dialog itself if `initialFocus` prop is missing', () => {
      const wrapper = mount(
        <Dialog title="My dialog">
          <div>Test</div>
        </Dialog>,
        { attachTo: container }
      );

      assert.equal(
        document.activeElement,
        wrapper.find('[role="dialog"]').getDOMNode()
      );
    });

    it('does not set focus if `initialFocus` is set to "manual"', () => {
      const focusedBefore = document.activeElement;
      mount(
        <Dialog initialFocus={'manual'} title="My dialog">
          <div>Test</div>
        </Dialog>,
        { attachTo: container }
      );

      assert.equal(document.activeElement, focusedBefore);
    });

    it('focuses the dialog if `initialFocus` element is disabled', () => {
      const inputRef = createRef();

      const wrapper = mount(
        <Dialog initialFocus={inputRef} title="My dialog">
          <button ref={inputRef} disabled={true} />
        </Dialog>,
        { attachTo: container }
      );

      assert.equal(
        document.activeElement,
        wrapper.find('[role="dialog"]').getDOMNode()
      );
    });

    context('when a TransitionComponent is provided', () => {
      it('focuses dialog only after "in" transition has ended', async () => {
        const wrapper = mount(
          <Dialog
            title="My dialog"
            transitionComponent={ComponentWithTransition}
          />,
          { attachTo: container }
        );

        // The Dialog is still not focused immediately after mounting it
        assert.notEqual(
          document.activeElement,
          wrapper.find('[role="dialog"]').getDOMNode()
        );
        // Once the transition has ended, the Dialog should be focused
        await delay(60); // Transition finishes after 6ms
        assert.equal(
          document.activeElement,
          wrapper.find('[role="dialog"]').getDOMNode()
        );
      });
    });
  });

  describe('restoring focus', () => {
    let container;

    beforeEach(() => {
      container = document.createElement('div');
      const button = document.createElement('button');
      button.id = 'focus-button';
      document.body.appendChild(button);
      document.body.appendChild(container);
    });

    afterEach(() => {
      container.remove();
    });

    it('should not restore focus by default', () => {
      const wrapper = mount(
        <Dialog id="focus-dialog" title="My dialog" restoreFocus />,
        {
          attachTo: container,
        }
      );
      const dialogElement = document.getElementById('focus-dialog');
      // Focus moves to dialog by default when mounted
      assert.equal(document.activeElement, dialogElement);

      wrapper.unmount();

      // Focus on unmount is not handled; it reverts to the body here.
      assert.equal(document.activeElement, document.body);
    });

    it('should restore focus when unmounted when `restoreFocus` set', () => {
      const button = document.getElementById('focus-button');

      // Start with focus on a button
      button.focus();
      assert.equal(document.activeElement, button);

      const wrapper = mount(
        <Dialog id="focus-dialog" title="My dialog" restoreFocus />,
        {
          attachTo: container,
        }
      );
      const dialogElement = document.getElementById('focus-dialog');
      // Focus moves to dialog by default when mounted
      assert.equal(document.activeElement, dialogElement);

      // Unmount cleanup should restore focus to the button
      wrapper.unmount();
      assert.equal(document.activeElement, button);
    });
  });

  describe('closing the dialog', () => {
    let container;
    let onClose;

    beforeEach(() => {
      onClose = sinon.stub();
      container = document.createElement('div');
      document.body.appendChild(container);
    });

    afterEach(() => {
      container.remove();
    });

    describe('closing the dialog', () => {
      it('does not lose on ESC, external clicks or external focus events by default', () => {
        mount(
          <Dialog title="Test dialog" onClose={onClose}>
            This is my dialog
          </Dialog>,
          {
            attachTo: container,
          }
        );

        assert.deepEqual(fakeUseKeyPress.lastCall.args[0], ['Escape']);
        assert.deepEqual(fakeUseKeyPress.lastCall.args[2], { enabled: false });
        assert.deepEqual(fakeUseFocusAway.lastCall.args[2], { enabled: false });
        assert.deepEqual(fakeUseClickAway.lastCall.args[2], { enabled: false });
      });
    });

    it('enables close on external click if `closeOnClickAway` set', () => {
      mount(
        <Dialog title="Test dialog" closeOnClickAway onClose={onClose}>
          This is my dialog
        </Dialog>,
        {
          attachTo: container,
        }
      );

      assert.deepEqual(fakeUseClickAway.lastCall.args[2], { enabled: true });
    });

    it('enables close on external focus if `closeOnFocusAway` set', () => {
      mount(
        <Dialog title="Test dialog" closeOnFocusAway onClose={onClose}>
          This is my dialog
        </Dialog>,
        {
          attachTo: container,
        }
      );

      assert.deepEqual(fakeUseFocusAway.lastCall.args[2], { enabled: true });
    });

    context('when a TransitionComponent is provided', () => {
      it('closes the Dialog only after "out" transition has ended', async () => {
        const wrapper = mount(
          <Dialog
            title="Test dialog"
            onClose={onClose}
            transitionComponent={ComponentWithTransition}
          />,
          {
            attachTo: container,
          }
        );

        // We simulate closing the Dialog's Panel
        wrapper.find('Panel').prop('onClose')();

        // The onClose callback is not immediately invoked
        assert.notCalled(onClose);
        // Once the transition has ended, the callback should have been called
        await delay(60); // Transition finishes after 50ms
        assert.called(onClose);
      });
    });
  });

  describe('aria-describedby', () => {
    it("marks the first `<p>` in the dialog's content as the accessible description", () => {
      const wrapper = mount(
        <Dialog title="My dialog">
          <p>Enter a URL</p>
        </Dialog>
      );
      const content = wrapper.find('[role="dialog"]').getDOMNode();
      const paragraphEl = wrapper.find('p').getDOMNode();

      assert.ok(content.getAttribute('aria-describedby'));
      assert.equal(content.getAttribute('aria-describedby'), paragraphEl.id);
    });

    it("does not set an accessible description if the dialog's content does not have a `<p>`", () => {
      const wrapper = mount(
        <Dialog title="My dialog">
          <button>Click me</button>
        </Dialog>
      );
      const content = wrapper.find('[role="dialog"]').getDOMNode();
      assert.isNull(content.getAttribute('aria-describedby'));
    });
  });
});
