import { mount, waitFor } from '@hypothesis/frontend-testing';
import { useRef, useState } from 'preact/hooks';

import Popover, { POPOVER_VIEWPORT_HORIZONTAL_GAP } from '../Popover';

function TestComponent({ children, ...rest }) {
  const buttonRef = useRef(null);
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        data-testid="toggle-button"
        className="p-2"
        ref={buttonRef}
        onClick={() => setOpen(prev => !prev)}
      >
        Anchor element
      </button>
      <Popover
        open={open}
        onClose={sinon.stub()}
        anchorElementRef={buttonRef}
        {...rest}
      >
        {children ?? (
          <>
            Content of popover
            <button
              data-testid="inner-button"
              onClick={() => setOpen(prev => !prev)}
            >
              Focusable element inside popover
            </button>
          </>
        )}
      </Popover>
    </div>
  );
}

describe('Popover', () => {
  function createComponent(props = {}, options = {}) {
    const { paddingTop = 0 } = options;

    return mount(<TestComponent {...props} />, {
      connected: true,
      prepareContainer: container => {
        container.style.paddingTop = `${paddingTop}px`;
        // Add horizontal paddings to the container, so that there's room for the
        // popover to grow if needed
        container.style.paddingLeft = '200px';
        container.style.paddingRight = '200px';
      },
    });
  }

  const getPopover = wrapper => wrapper.find('Popover');

  const getToggleButton = wrapper =>
    wrapper.find('[data-testid="toggle-button"]');

  const togglePopover = wrapper => getToggleButton(wrapper).simulate('click');

  const popoverAppearedAbove = wrapper => {
    const { top: popoverTop } = getPopover(wrapper)
      .getDOMNode()
      .getBoundingClientRect();
    const { top: buttonTop } = getToggleButton(wrapper)
      .getDOMNode()
      .getBoundingClientRect();

    return popoverTop < buttonTop;
  };

  const getDistanceBetweenButtonAndPopover = wrapper => {
    const appearedAbove = popoverAppearedAbove(wrapper);
    const { top: popoverTop, bottom: popoverBottom } = getPopover(wrapper)
      .getDOMNode()
      .getBoundingClientRect();
    const { top: buttonTop, bottom: buttonBottom } = getToggleButton(wrapper)
      .getDOMNode()
      .getBoundingClientRect();

    return Math.abs(
      appearedAbove ? popoverBottom - buttonTop : buttonBottom - popoverTop,
    );
  };

  [
    {
      restoreFocusOnClose: undefined, // Defaults to true
      expectedFocusAfterClose: wrapper => getToggleButton(wrapper).getDOMNode(),
    },
    {
      restoreFocusOnClose: true,
      expectedFocusAfterClose: wrapper => getToggleButton(wrapper).getDOMNode(),
    },
    {
      restoreFocusOnClose: false,
      expectedFocusAfterClose: () => document.body,
    },
  ].forEach(({ restoreFocusOnClose, expectedFocusAfterClose }) => {
    it('restores focus to toggle button after closing popover', () => {
      const wrapper = createComponent({ restoreFocusOnClose });

      // Focus toggle button before opening popover
      getToggleButton(wrapper).getDOMNode().focus();
      togglePopover(wrapper);
      assert.isTrue(getPopover(wrapper).prop('open'));

      // Focus something else before closing the popover
      const innerButton = wrapper.find('[data-testid="inner-button"]');
      innerButton.getDOMNode().focus();
      // Close the popover with a different button inside the popover itself
      innerButton.simulate('click');
      assert.isFalse(getPopover(wrapper).prop('open'));

      // After closing popover, the focus should have returned to the toggle
      // button, which was the last focused element
      assert.equal(document.activeElement, expectedFocusAfterClose(wrapper));
    });
  });

  [
    {
      containerPaddingTop: 0,
      asNativePopover: undefined,
      shouldBeAbove: false,
    },
    {
      containerPaddingTop: 0,
      asNativePopover: true,
      shouldBeAbove: false,
    },
    {
      containerPaddingTop: 0,
      asNativePopover: false,
      shouldBeAbove: false,
    },
    {
      containerPaddingTop: 1000,
      asNativePopover: undefined,
      shouldBeAbove: true,
    },
    {
      containerPaddingTop: 1000,
      asNativePopover: true,
      shouldBeAbove: true,
    },
    {
      containerPaddingTop: 1000,
      asNativePopover: false,
      shouldBeAbove: true,
    },
  ].forEach(({ containerPaddingTop, asNativePopover, shouldBeAbove }) => {
    it('positions popover above or below based on available space', () => {
      const wrapper = createComponent(
        { asNativePopover },
        { paddingTop: containerPaddingTop },
      );
      togglePopover(wrapper);

      assert.equal(popoverAppearedAbove(wrapper), shouldBeAbove);
    });
  });

  [true, false].forEach(asNativePopover => {
    it('repositions popover if it is resized after being open', async () => {
      const wrapper = createComponent(
        {
          asNativePopover,
          children: (
            <>
              <p>one</p>
              <p>two</p>
              <p>three</p>
            </>
          ),
        },
        { paddingTop: 1000 }, // Ensure popover appears above
      );
      togglePopover(wrapper);

      // This applies only when the popover appears above, so let's verify it
      assert.isTrue(popoverAppearedAbove(wrapper));

      // After opening the popover, its distance to the button should be the
      // same, even if it's resized
      const distanceBeforeResizing =
        getDistanceBetweenButtonAndPopover(wrapper);
      wrapper.setProps({ children: 'Just one line' });

      // Repositioning happens asynchronously via ResizeObserver, so we need to
      // wait for it to eventually happen.
      await waitFor(
        () =>
          distanceBeforeResizing ===
          getDistanceBetweenButtonAndPopover(wrapper),
      );
    });
  });

  context('when popover is supported', () => {
    [undefined, true].forEach(asNativePopover => {
      it('opens via popover API', async () => {
        const wrapper = createComponent({ asNativePopover });
        let resolve;
        const promise = new Promise(res => (resolve = res));

        getPopover(wrapper).getDOMNode().addEventListener('toggle', resolve);
        togglePopover(wrapper);

        // This test will time out if the toggle event is not dispatched
        await promise;
      });

      it('aligns popover to the right if `align="right"` is provided', () => {
        const wrapper = createComponent({
          children: 'A text much longer than the anchor element',
          asNativePopover,
          align: 'right',
        });
        togglePopover(wrapper);

        const { left: buttonLeft } = getToggleButton(wrapper)
          .getDOMNode()
          .getBoundingClientRect();
        const popoverLeftStyle = getPopover(wrapper).getDOMNode().style.left;
        const popoverLeft = Number(popoverLeftStyle.replace('px', ''));

        assert.isBelow(popoverLeft, buttonLeft);
      });
    });

    [
      { oldState: 'open', newState: 'closed', shouldCallOnClose: true },
      { oldState: 'open', newState: 'open', shouldCallOnClose: false },
      { oldState: 'closed', newState: 'open', shouldCallOnClose: false },
      { oldState: 'closed', newState: 'closed', shouldCallOnClose: false },
    ].forEach(({ shouldCallOnClose, ...eventInit }) => {
      it('closes popover when toggle event is dispatched transitioning from open to closed', () => {
        const onClose = sinon.stub();
        const wrapper = createComponent({ onClose });

        getPopover(wrapper)
          .getDOMNode()
          .dispatchEvent(new ToggleEvent('toggle', eventInit));

        assert.equal(onClose.called, shouldCallOnClose);
      });
    });
  });

  context('when popover is not supported', () => {
    it('closes popover when Escape is pressed', () => {
      const onClose = sinon.stub();
      const wrapper = createComponent({ onClose, asNativePopover: false });

      // The popover needs to be open for the event handler to be attached
      togglePopover(wrapper);

      document.body.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape' }),
      );

      assert.called(onClose);
    });

    it('closes popover when clicking away', () => {
      const onClose = sinon.stub();
      const wrapper = createComponent({ onClose, asNativePopover: false });

      // The popover needs to be open for the event handler to be attached
      togglePopover(wrapper);

      const externalButton = document.createElement('button');
      document.body.append(externalButton);
      externalButton.click();

      try {
        assert.called(onClose);
      } finally {
        externalButton.remove();
      }
    });
  });

  context('when popover does not fit in available space', () => {
    it('never renders a popover bigger than the viewport', () => {
      const children = 'long text'.repeat(1000);
      const wrapper = createComponent({ children });

      togglePopover(wrapper);

      const { width: popoverWidth } = getPopover(wrapper)
        .getDOMNode()
        .getBoundingClientRect();

      assert.isBelow(popoverWidth, window.innerWidth);
    });

    [
      // Content is small. The popover matches the anchor element size
      // regardless the orientation.
      ...['right', 'left'].map(align => ({
        children: 'short text',
        align,
        getExpectedCoordinates: (popoverDOMNode, wrapper) => {
          const buttonDOMNode = getToggleButton(wrapper).getDOMNode();
          const buttonLeft = buttonDOMNode.getBoundingClientRect().left;

          return {
            left: buttonLeft,
            right: popoverDOMNode.getBoundingClientRect().width + buttonLeft,
          };
        },
      })),

      // Content is slightly longer than the anchor element. The popover matches
      // one of its sides but spans further to the opposite one
      {
        children: 'slightly longer text'.repeat(2),
        align: 'left',
        getExpectedCoordinates: (popoverDOMNode, wrapper) => {
          const buttonDOMNode = getToggleButton(wrapper).getDOMNode();
          const buttonRect = buttonDOMNode.getBoundingClientRect();
          const popoverRect = popoverDOMNode.getBoundingClientRect();
          const popoverRightOverhand = popoverRect.width - buttonRect.width;

          return {
            left: buttonRect.left,
            right: buttonRect.right + popoverRightOverhand,
          };
        },
      },
      {
        children: 'slightly longer text'.repeat(2),
        align: 'right',
        getExpectedCoordinates: (popoverDOMNode, wrapper) => {
          const buttonDOMNode = getToggleButton(wrapper).getDOMNode();
          const buttonRect = buttonDOMNode.getBoundingClientRect();
          const popoverRect = popoverDOMNode.getBoundingClientRect();
          const popoverLeftOverhang = popoverRect.width - buttonRect.width;

          return {
            left: buttonRect.left - popoverLeftOverhang,
            right: buttonRect.right,
          };
        },
      },

      // Content is very big, so popover spans to the edge of the viewport and
      // grows further than the opposite side of the anchor element
      {
        children: 'very long text'.repeat(6),
        align: 'left',
        getExpectedCoordinates: popoverDOMNode => {
          const popoverRect = popoverDOMNode.getBoundingClientRect();
          const bodyWidth = document.body.getBoundingClientRect().width;

          return {
            left:
              bodyWidth - popoverRect.width - POPOVER_VIEWPORT_HORIZONTAL_GAP,
            right: bodyWidth - POPOVER_VIEWPORT_HORIZONTAL_GAP,
          };
        },
      },
      {
        children: 'very long text'.repeat(6),
        align: 'right',
        getExpectedCoordinates: popoverDOMNode => {
          const popoverRect = popoverDOMNode.getBoundingClientRect();
          return {
            left: POPOVER_VIEWPORT_HORIZONTAL_GAP,
            right: popoverRect.width + POPOVER_VIEWPORT_HORIZONTAL_GAP,
          };
        },
      },
    ].forEach(({ children, align, getExpectedCoordinates }) => {
      it('displays popover at expected coordinates', () => {
        const wrapper = createComponent({ align, children });

        togglePopover(wrapper);

        const popoverDOMNode = getPopover(wrapper).getDOMNode();
        const popoverStyleLeft = popoverDOMNode.style.left;
        const popoverLeft = Number(popoverStyleLeft.replace('px', ''));
        const popoverRight =
          popoverDOMNode.getBoundingClientRect().width + popoverLeft;

        const expectedCoordinates = getExpectedCoordinates(
          popoverDOMNode,
          wrapper,
        );

        assert.equal(
          popoverLeft.toFixed(0),
          expectedCoordinates.left.toFixed(0),
        );
        assert.equal(
          popoverRight.toFixed(0),
          expectedCoordinates.right.toFixed(0),
        );
      });
    });
  });
});
