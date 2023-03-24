import { render } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import { act } from 'preact/test-utils';

import { waitFor } from '../../test-util/wait';
import { useTabKeyNavigation } from '../use-tab-key-navigation';

function Toolbar({
  focusContainer = false,
  initialFocusIndex = -1,
  navigationOptions = {},
}) {
  const containerRef = useRef();

  useEffect(() => {
    if (focusContainer) {
      containerRef.current.focus();
    } else if (initialFocusIndex >= 0) {
      containerRef.current.children[initialFocusIndex].focus();
    }
  }, [focusContainer, initialFocusIndex]);

  useTabKeyNavigation(containerRef, navigationOptions);

  return (
    <div ref={containerRef} tabIndex={-1} data-testid="toolbar">
      <button data-testid="bold">Bold</button>
      <button data-testid="italic">Italic</button>
      <button data-testid="underline">Underline</button>
      <a href="/help" target="_blank" data-testid="help">
        Help
      </a>
    </div>
  );
}

describe('useTabKeyNavigation', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.append(container);
    renderToolbar();
  });

  afterEach(() => {
    container.remove();
  });

  function renderToolbar({
    focusContainer = false,
    initialFocusIndex = -1,
    ...options
  } = {}) {
    // We render the component with Preact directly rather than using Enzyme
    // for these tests. Since the `tabIndex` state lives only in the DOM,
    // and there are no child components involved, this is more convenient.
    act(() => {
      render(
        <Toolbar
          focusContainer={focusContainer}
          initialFocusIndex={initialFocusIndex}
          navigationOptions={options}
        />,
        container
      );
    });
    return findElementByTestId('toolbar');
  }

  function findElementByTestId(testId) {
    return container.querySelector(`[data-testid=${testId}]`);
  }

  /**
   * @param {string|Partial<KeyboardEvent>} key - Either a string name of a
   *   key (e.g. 'ArrowLeft') or a partial `KeyboardEvent` object, e.g.
   *   `{ key: 'Tab', shiftKey: true }`
   */
  function pressKey(key) {
    const eventOptions = typeof key === 'string' ? { key } : key;

    const event = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      ...eventOptions,
    });
    act(() => {
      findElementByTestId('toolbar').dispatchEvent(event);
    });
    return event;
  }

  function currentItem() {
    return document.activeElement.innerText;
  }

  it('should move focus and tab stop between elements when tab keys are pressed', () => {
    const forwardKey = 'Tab';
    const backKey = { key: 'Tab', shiftKey: true };

    renderToolbar();

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

  [
    {
      key: 'Tab',
      shouldHandle: true,
    },
    {
      key: { key: 'Tab', shiftKey: true },
      shouldHandle: true,
    },
    {
      key: 'Space',
      shouldHandle: false,
    },
  ].forEach(({ key, shouldHandle }) => {
    it('should stop keyboard event propagation if event is handled', () => {
      renderToolbar();

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

  context('when initial focus is on the container', () => {
    it('should move to first item in tab sequence when tab pressed', async () => {
      const toolbar = renderToolbar({ focusContainer: true });
      await waitFor(() => document.activeElement === toolbar);

      pressKey('Tab');
      assert.equal(currentItem(), 'Bold');

      // Container has been removed from the tab sequence
      pressKey({ key: 'Tab', shiftKey: true });
      assert.equal(currentItem(), 'Help');
    });

    it('should not include container in tab sequence', async () => {
      const toolbar = renderToolbar({ focusContainer: true });
      await waitFor(() => document.activeElement === toolbar);

      // Forward to first item in tab sequence
      pressKey('Tab');
      // Back to last item in tab sequence
      pressKey({ key: 'Tab', shiftKey: true });
      assert.equal(currentItem(), 'Help');
    });
  });

  context('when initial focus is not on first item in tab sequence', () => {
    it('should focus on the next item in the tab sequence when "Tab" pressed', async () => {
      const toolbar = renderToolbar({ initialFocusIndex: 1 });
      await waitFor(() => document.activeElement === toolbar.children[1]);

      assert.equal(currentItem(), 'Italic');

      pressKey('Tab');
      assert.equal(currentItem(), 'Underline');
    });

    it('should focus on the previous item in the tab sequence when "shift-Tab" pressed', async () => {
      const toolbar = renderToolbar({ initialFocusIndex: 2 });
      await waitFor(() => document.activeElement === toolbar.children[2]);

      pressKey({ key: 'Tab', shiftKey: true });
      assert.equal(currentItem(), 'Italic');
    });
  });

  it('should skip hidden elements', () => {
    renderToolbar();
    findElementByTestId('bold').focus();
    findElementByTestId('italic').style.display = 'none';

    pressKey('Tab');

    assert.equal(currentItem(), 'Underline');
  });

  it('should skip disabled elements', () => {
    renderToolbar();
    findElementByTestId('bold').focus();
    findElementByTestId('italic').disabled = true;

    pressKey('Tab');

    assert.equal(currentItem(), 'Underline');
  });

  it('should not respond to keys if hook is not enabled', () => {
    renderToolbar({
      enabled: false,
    });
    ['Tab', { key: 'Tab', shiftKey: true }].forEach(key => {
      findElementByTestId('bold').focus();
      pressKey(key);
      assert.equal(currentItem(), 'Bold');
    });
  });

  it('shows an error if container ref is not initialized', () => {
    function BrokenToolbar() {
      const ref = useRef();
      useTabKeyNavigation(ref);
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

    pressKey('Tab');
    assert.equal(currentItem(), 'Italic');
    pressKey('Tab');
    assert.equal(currentItem(), 'Bold');
    pressKey({ key: 'Tab', shiftKey: true });
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
