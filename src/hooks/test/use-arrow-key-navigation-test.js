import { render } from 'preact';
import { useCallback, useMemo, useRef, useState } from 'preact/hooks';
import { act } from 'preact/test-utils';

import { waitFor } from '../../test-util/wait';
import { useArrowKeyNavigation } from '../use-arrow-key-navigation';

function Toolbar({ navigationOptions = {} }) {
  const containerRef = useRef();
  const visible = navigationOptions.containerVisible ?? true;

  useArrowKeyNavigation(containerRef, navigationOptions);

  return (
    <div
      ref={containerRef}
      data-testid="toolbar"
      tabIndex={-1}
      style={{ display: visible ? 'block' : 'none' }}
    >
      <button data-testid="bold">Bold</button>
      <button data-testid="italic">Italic</button>
      <button data-testid="underline">Underline</button>
      <a href="/help" target="_blank" data-testid="help">
        Help
      </a>
    </div>
  );
}

function ToolbarWithToggle({ navigationOptions = {} }) {
  const [visible, setVisible] = useState(false);
  const toggleVisible = useCallback(() => setVisible(prev => !prev), []);
  const options = useMemo(
    () => ({ ...navigationOptions, containerVisible: visible }),
    [navigationOptions, visible],
  );

  return (
    <>
      <button data-testid="toggle" onClick={toggleVisible}>
        Toggle
      </button>
      <Toolbar navigationOptions={options} />
    </>
  );
}

describe('useArrowKeyNavigation', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    const button = document.createElement('button');
    button.setAttribute('data-testid', 'outside-button');
    container.append(button);
    document.body.append(container);
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

  function findElementByTestId(testId) {
    return container.querySelector(`[data-testid=${testId}]`);
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

  function currentItem() {
    return document.activeElement.innerText;
  }

  [
    { forwardKey: 'ArrowRight', backKey: 'ArrowLeft' },
    { forwardKey: 'ArrowDown', backKey: 'ArrowUp' },
  ].forEach(({ forwardKey, backKey }) => {
    it('should move focus and tab stop between elements when arrow keys are pressed', () => {
      const toolbar = renderToolbar();
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

        const toolbarButtons = toolbar.querySelectorAll('a,button');
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
  ].forEach(({ key, horizontal, vertical, shouldHandle }) => {
    it('should stop keyboard event propagation if event is handled', () => {
      renderToolbar({ horizontal, vertical });

      const handleKeyDown = sinon.stub();
      container.addEventListener('keydown', handleKeyDown);

      const event = pressKey(key);
      assert.equal(
        event.defaultPrevented,
        shouldHandle,
        `${key} defaultPrevented`,
      );
      assert.equal(handleKeyDown.called, !shouldHandle, `${key} propagated`);
      handleKeyDown.resetHistory();
    });
  });

  it('should invoke custom `focusElement` callback', () => {
    const focusElement = sinon.spy(element => {
      element.focus();
    });
    renderToolbar({ focusElement });
    findElementByTestId('bold').focus();

    pressKey('ArrowRight');
    assert.calledWith(focusElement, findElementByTestId('italic'));
    assert.instanceOf(focusElement.getCall(0).args[1], KeyboardEvent);

    pressKey('ArrowLeft');
    assert.calledWith(focusElement, findElementByTestId('bold'));
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

  it('should restore tabindex sequence when widget is re-entered', () => {
    const toolbar = renderToolbar();

    // Set focus on the widget's container, which isn't otherwise part
    // of the widget's navigable element set.
    toolbar.focus();

    // In this case, the first right-arrow press will go to the first item
    pressKey('ArrowRight');
    assert.equal(currentItem(), 'Bold');
    pressKey('ArrowRight');
    assert.equal(currentItem(), 'Italic');

    const outsideButton = container.querySelector(
      '[data-testid="outside-button"]',
    );

    // Place focus on an element entirely outside of the widget
    outsideButton.focus();
    assert.equal(document.activeElement, outsideButton);

    // Now trigger a `focusin` event on the widget's container
    toolbar.dispatchEvent(new FocusEvent('focusin'));

    // Focus/navigation sequence is restored to the last option
    assert.equal(currentItem(), 'Italic');

    // Take focus out of the sequence of navigable elements and set it back
    // on the container
    toolbar.focus();

    // As there is a previously-focused item, focus will be restored
    // to that item
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

  it('should not loop if disabled', () => {
    renderToolbar({ loop: false });

    // Focus last element
    findElementByTestId('help').focus();

    // Clicking down or right should not move focus back to the first element
    pressKey('ArrowDown');
    pressKey('ArrowRight');
    assert.equal(currentItem(), 'Help');

    // Focus first element
    findElementByTestId('bold').focus();

    // Clicking up or left should not move focus back to the last element
    pressKey('ArrowUp');
    pressKey('ArrowLeft');
    assert.equal(currentItem(), 'Bold');
  });

  it('should re-check focus sequence when container visibility changes', async () => {
    await act(() =>
      render(
        <ToolbarWithToggle navigationOptions={{ autofocus: true }} />,
        container,
      ),
    );
    const toggleToolbar = () =>
      act(() => findElementByTestId('toggle').click());

    // No button should be initially focused
    assert.equal(document.activeElement, document.body);

    // Once we open the toolbar, the first item will be focused
    await toggleToolbar();
    await waitFor(() => document.activeElement === findElementByTestId('bold'));

    // If we then focus another toolbar item, then close the toolbar and open it
    // again, that same element should be focused again
    pressKey('ArrowDown'); // "italic" is focused
    pressKey('ArrowDown'); // "underline" is focused
    await toggleToolbar(); // Close toolbar
    await toggleToolbar(); // Open toolbar again

    await waitFor(
      () => document.activeElement === findElementByTestId('underline'),
    );
  });
});
