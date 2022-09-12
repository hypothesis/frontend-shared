import { render } from 'preact';
import { useRef } from 'preact/hooks';
import { act } from 'preact/test-utils';

import { useArrowKeyNavigation, useFocusCapture } from '../keyboard-navigation';
import { waitFor } from '../../test-util/wait';

function Toolbar({ navigationOptions = {} }) {
  const containerRef = useRef();

  useArrowKeyNavigation(containerRef, navigationOptions);

  return (
    <div ref={containerRef} data-testid="toolbar">
      <button data-testid="bold">Bold</button>
      <button data-testid="italic">Italic</button>
      <button data-testid="underline">Underline</button>
      <a href="/help" target="_blank" data-testid="help">
        Help
      </a>
    </div>
  );
}
describe('keyboard-navigation hooks', () => {
  function currentItem() {
    return document.activeElement.innerText;
  }
  describe('useArrowKeyNavigation', () => {
    let container;

    const findElementByTestId = testId => {
      return container.querySelector(`[data-testid=${testId}]`);
    };

    beforeEach(() => {
      container = document.createElement('div');
      document.body.append(container);
      renderToolbar();
    });

    afterEach(() => {
      container.remove();
    });

    function renderToolbar(options = {}) {
      // We render the component with Preact directly rather than using Enzyme
      // for these tests. Since the `tabIndex` state lives only in the DOM,
      // and there are no child components involved, this is more convenient.
      act(() => {
        render(<Toolbar navigationOptions={options} />, container);
      });
      return findElementByTestId('toolbar');
    }

    function pressKey(key) {
      const event = new KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        key,
      });
      act(() => {
        findElementByTestId('toolbar').dispatchEvent(event);
      });
      return event;
    }

    [
      { forwardKey: 'ArrowRight', backKey: 'ArrowLeft' },
      { forwardKey: 'ArrowDown', backKey: 'ArrowUp' },
    ].forEach(({ forwardKey, backKey }) => {
      it('should move focus and tab stop between elements when arrow keys are pressed', () => {
        const steps = [
          // Test navigating forwards.
          [forwardKey, 'Italic'],
          [forwardKey, 'Underline'],
          [forwardKey, 'Help'],

          // Test that navigation wraps to start.
          [forwardKey, 'Bold'],

          // Test that navigation wraps to end.
          [backKey, 'Help'],

          // Test navigating backwards.
          [backKey, 'Underline'],
          [backKey, 'Italic'],
          [backKey, 'Bold'],

          // Test jump to start / end.
          ['End', 'Help'],
          ['Home', 'Bold'],
        ];

        for (let [key, expectedItem] of steps) {
          pressKey(key);

          const currentElement = document.activeElement;
          assert.equal(currentElement.innerText, expectedItem);

          const toolbarButtons = container.querySelectorAll('a,button');
          for (let element of toolbarButtons) {
            if (element === currentElement) {
              assert.equal(element.tabIndex, 0);
            } else {
              assert.equal(element.tabIndex, -1);
            }
          }
        }
      });
    });

    [
      // Keys handled with default options.
      {
        key: 'ArrowLeft',
        shouldHandle: true,
      },
      {
        key: 'ArrowRight',
        shouldHandle: true,
      },
      {
        key: 'ArrowUp',
        shouldHandle: true,
      },
      {
        key: 'ArrowDown',
        shouldHandle: true,
      },
      {
        key: 'End',
        shouldHandle: true,
      },
      {
        key: 'Home',
        shouldHandle: true,
      },

      // Keys never handled.
      {
        key: 'Space',
        shouldHandle: false,
      },

      // Keys not handled if horizontal navigation is disabled
      {
        key: 'ArrowLeft',
        horizontal: false,
        shouldHandle: false,
      },
      {
        key: 'ArrowRight',
        horizontal: false,
        shouldHandle: false,
      },

      // Keys not handled if vertical navigation is disabled
      {
        key: 'ArrowUp',
        vertical: false,
        shouldHandle: false,
      },
      {
        key: 'ArrowDown',
        vertical: false,
        shouldHandle: false,
      },
      // Tab key should not be handled
      {
        key: 'Tab',
        shouldHandle: false,
      },
    ].forEach(({ key, horizontal = true, vertical = true, shouldHandle }) => {
      it(`should stop keyboard event propagation for '${key}' if event is handled`, () => {
        renderToolbar({ horizontal, vertical });

        const handleKeyDown = sinon.stub();
        container.addEventListener('keydown', handleKeyDown);

        const event = pressKey(key);
        assert.equal(
          event.defaultPrevented,
          shouldHandle,
          `${key} defaultPrevented`
        );
        assert.equal(handleKeyDown.called, !shouldHandle, `${key} propagated`);
        handleKeyDown.resetHistory();
      });
    });

    it('should skip hidden elements', () => {
      renderToolbar();
      findElementByTestId('bold').focus();
      findElementByTestId('italic').style.display = 'none';

      pressKey('ArrowRight');

      assert.equal(currentItem(), 'Underline');
    });

    it('should skip disabled elements', () => {
      renderToolbar();
      findElementByTestId('bold').focus();
      findElementByTestId('italic').disabled = true;

      pressKey('ArrowRight');

      assert.equal(currentItem(), 'Underline');
    });

    it('should not respond to Up/Down arrow keys if vertical navigation is disabled', () => {
      renderToolbar({ vertical: false });
      findElementByTestId('bold').focus();

      pressKey('ArrowDown');

      assert.equal(currentItem(), 'Bold');
    });

    it('should not respond to Left/Right arrow keys if horizontal navigation is disabled', () => {
      renderToolbar({ horizontal: false });
      findElementByTestId('bold').focus();

      pressKey('ArrowRight');

      assert.equal(currentItem(), 'Bold');
    });

    it('shows an error if container ref is not initialized', () => {
      function BrokenToolbar() {
        const ref = useRef();
        useArrowKeyNavigation(ref);
        return <div />;
      }

      // Suppress "Add @babel/plugin-transform-react-jsx-source to get a more
      // detailed component stack" warning from the `render` call below.
      sinon.stub(console, 'warn');

      let error;
      try {
        act(() => render(<BrokenToolbar />, container));
      } catch (e) {
        error = e;
      } finally {
        console.warn.restore();
      }

      assert.instanceOf(error, Error);
      assert.equal(error.message, 'Container ref not set');
    });

    it('should respect a custom element selector', () => {
      renderToolbar({
        selector: '[data-testid=bold],[data-testid=italic]',
      });
      findElementByTestId('bold').focus();

      pressKey('ArrowRight');
      assert.equal(currentItem(), 'Italic');
      pressKey('ArrowRight');
      assert.equal(currentItem(), 'Bold');
      pressKey('ArrowLeft');
      assert.equal(currentItem(), 'Italic');
    });

    it('should re-initialize tabindex attributes if current element is removed', async () => {
      const toolbar = renderToolbar();
      const boldButton = toolbar.querySelector('[data-testid=bold]');
      const italicButton = toolbar.querySelector('[data-testid=italic]');

      boldButton.focus();
      assert.equal(boldButton.tabIndex, 0);
      assert.equal(italicButton.tabIndex, -1);

      boldButton.remove();

      // nb. tabIndex update is async because it uses MutationObserver
      await waitFor(() => italicButton.tabIndex === 0);
    });

    it('should re-initialize tabindex attributes if current element is disabled', async () => {
      renderToolbar();
      const boldButton = findElementByTestId('bold');
      const italicButton = findElementByTestId('italic');

      boldButton.focus();
      assert.equal(boldButton.tabIndex, 0);
      assert.equal(italicButton.tabIndex, -1);

      boldButton.disabled = true;

      // nb. tabIndex update is async because it uses MutationObserver
      await waitFor(() => italicButton.tabIndex === 0);
    });
  });

  function Modal({
    open,
    withAutofocus = false,
    includeContainer = false,
    navigationOptions = {},
  }) {
    const containerRef = useRef();
    const inputRef = useRef();

    const navOptions = {
      autofocusRef: withAutofocus ? inputRef : undefined,
      ...navigationOptions,
    };

    useFocusCapture(containerRef, open, navOptions);

    if (!open) {
      return null;
    }

    const tabIndex = includeContainer ? -1 : undefined;

    return (
      <div tabIndex={tabIndex} ref={containerRef} data-testid="modal">
        <p>Non-interactive element.</p>
        <button data-testid="bold">Bold</button>
        <button data-testid="italic">Italic</button>
        <input type="text" data-testid="input" ref={inputRef} />
      </div>
    );
  }

  describe('useFocusCapture', () => {
    let container;
    let outerButton;

    const findElementByTestId = testId => {
      return container.querySelector(`[data-testid=${testId}]`);
    };

    beforeEach(() => {
      container = document.createElement('div');

      // This button won't have any function except to be outside of the
      // modal itself and be focus-able (for testing how focus is moved between it
      // and the modal)
      outerButton = document.createElement('button');
      outerButton.setAttribute('data-testid', 'outer-button');
      outerButton.innerHTML = 'Open modal';
      container.append(outerButton);

      document.body.append(container);
    });

    afterEach(() => {
      container.remove();
    });

    function renderModal(props = {}) {
      act(() => {
        render(
          <Modal open={true} withAutofocus={false} {...props} />,
          container
        );
      });
      return findElementByTestId('modal');
    }

    function pressKey(key, options = {}) {
      const event = new KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        key,
        ...options,
      });
      act(() => {
        findElementByTestId('modal').dispatchEvent(event);
      });
      return event;
    }

    function currentItem() {
      return document.activeElement.innerText;
    }

    it('moves focus to first navigable element when activated', () => {
      const outerButton = findElementByTestId('outer-button');
      outerButton.focus();
      renderModal({ open: false });
      // Because the modal isn't active (open), focus should not move yet
      assert.equal(currentItem(), 'Open modal');
      renderModal();
      // Now focus is moved to the first navigable element in the container
      assert.equal(currentItem(), 'Bold');
    });

    it('should move focus and tab stop between elements when activated keys are pressed', () => {
      renderModal();
      assert.equal(currentItem(), 'Bold');
      pressKey('Tab');
      assert.equal(currentItem(), 'Italic');
      pressKey('Tab');
      assert.equal(document.activeElement, findElementByTestId('input'));
      pressKey('Tab'); // Cycle back to first element
      assert.equal(currentItem(), 'Bold');
      pressKey('Tab', { shiftKey: true }); // Back to the final element
      assert.equal(document.activeElement, findElementByTestId('input'));
      pressKey('Home');
      assert.equal(currentItem(), 'Bold');
      pressKey('End');
      assert.equal(document.activeElement, findElementByTestId('input'));
    });

    describe('setting initial focus to a specific element', () => {
      beforeEach(() => {
        sinon.stub(console, 'warn');
      });

      afterEach(() => {
        console.warn.restore();
      });

      it('moves focus to indicated `autofocusRef` when activated', () => {
        renderModal({ open: true, withAutofocus: true });
        assert.equal(document.activeElement, findElementByTestId('input'));
      });

      it('warns if `autofocusRef` is not a navigable element in the container', () => {
        renderModal({
          open: true,
          withAutofocus: true,
          navigationOptions: { selector: 'a,button' },
        });
        assert.calledWith(
          console.warn,
          'useKeyboardNavigation: `autofocusRef.current` is not a navigable element within `container`'
        );
        // It will focus the first navigable element instead
        assert.equal(currentItem(), 'Bold');
      });
    });

    it('restores focus when deactivated', () => {
      const outerButton = findElementByTestId('outer-button');
      outerButton.focus();
      assert.equal(currentItem(), 'Open modal');
      renderModal();
      assert.equal(currentItem(), 'Bold');
      renderModal({ open: false });
      assert.equal(currentItem(), 'Open modal');
    });

    it('should include the container in the navigation sequence if it has a `tabIndex` set', () => {
      renderModal({ includeContainer: true });
      // If a `tabIndex` is set on the `container`, the container itself will
      // be included in the navigation sequence. As there is no `focusRef` set,
      // focus should be moved to the first navigable element, which is the
      // container itself.
      assert.equal(document.activeElement, findElementByTestId('modal'));
    });
  });
});
