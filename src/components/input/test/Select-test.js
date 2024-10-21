import { checkAccessibility, waitFor } from '@hypothesis/frontend-testing';
import { mount } from 'enzyme';

import {
  LISTBOX_VIEWPORT_HORIZONTAL_GAP,
  MultiSelect,
  Select,
} from '../Select';

describe('Select', () => {
  let wrappers;
  const defaultItems = [
    { id: '1', name: 'All students' },
    { id: '2', name: 'Albert Banana' },
    { id: '3', name: 'Bernard California' },
    { id: '4', name: 'Cecelia Davenport' },
    { id: '5', name: 'Doris Evanescence' },
  ];

  /**
   * @param {Object} [options]
   * @param {number} [options.paddingTop] - Extra padding top for the container.
   *                                        Defaults to 0.
   * @param {boolean} [options.optionsChildrenAsCallback] -
   *        Whether to render `Select.Option` children with callback notation.
   *        Used primarily to test and cover both branches.
   *        Defaults to true.
   * @param {MultiSelect | Select} [options.Component] -
   *        The actual "select" component to use. Defaults to `Select`.
   * @param {Array<{ id: string; name: string }>} [options.items] -
   *        Alternative list of items to render.
   */
  const createComponent = (props = {}, options = {}) => {
    const {
      paddingTop = 0,
      optionsChildrenAsCallback = true,
      Component = Select,
      items = defaultItems,
    } = options;
    const container = document.createElement('div');
    container.style.paddingTop = `${paddingTop}px`;
    // Add horizontal paddings to the container, so that there's room for the
    // listbox to grow if needed
    container.style.paddingLeft = '200px';
    container.style.paddingRight = '200px';
    document.body.append(container);

    const wrapper = mount(
      <Component value={undefined} onChange={sinon.stub()} {...props}>
        <Component.Option value={undefined}>
          {({ selected }) => (
            <span data-testid="option-reset">
              Reset
              {selected && <span data-testid="selected-option" />}
            </span>
          )}
        </Component.Option>
        {items.map(item => (
          <Component.Option
            value={item}
            disabled={item.id === '4'}
            key={item.id}
          >
            {!optionsChildrenAsCallback ? (
              <span data-testid={`option-${item.id}`}>{item.name}</span>
            ) : (
              ({ selected, disabled }) => (
                <span data-testid={`option-${item.id}`}>
                  {item.name}
                  {selected && <span data-testid="selected-option" />}
                  {disabled && <span data-testid="disabled-option" />}
                </span>
              )
            )}
          </Component.Option>
        ))}
      </Component>,
      { attachTo: container },
    );

    wrappers.push(wrapper);

    return wrapper;
  };

  beforeEach(() => {
    wrappers = [];
  });

  afterEach(() => {
    wrappers.forEach(wrapper => wrapper.unmount());
  });

  const getToggleButton = wrapper =>
    wrapper.find('button[data-testid="select-toggle-button"]');

  const toggleListbox = wrapper => getToggleButton(wrapper).simulate('click');

  const getListbox = wrapper => wrapper.find('[data-testid="select-listbox"]');

  const isListboxClosed = wrapper =>
    getListbox(wrapper).prop('data-listbox-open') === false;

  const listboxDidDropUp = wrapper => {
    const { top: listboxTop } = getListbox(wrapper)
      .getDOMNode()
      .getBoundingClientRect();
    const { top: buttonTop } = getToggleButton(wrapper)
      .getDOMNode()
      .getBoundingClientRect();

    return listboxTop < buttonTop;
  };

  const clickOption = (wrapper, id) =>
    wrapper.find(`[data-testid="option-${id}"]`).simulate('click');

  function clickOptionCheckbox(wrapper, id) {
    const checkbox = wrapper
      .find(`[data-testid="option-${id}"]`)
      .closest('[role="option"]')
      .find('input[type="checkbox"]');

    if (!checkbox.exists()) {
      throw new Error(
        `There is no checkbox in option ${id}. Make sure you are testing a MultiSelect`,
      );
    }

    checkbox.simulate('change');
  }

  const pressKeyInOption = (wrapper, id, key) =>
    wrapper
      .find(`[data-testid="option-${id}"]`)
      .closest('[role="option"]')
      .getDOMNode()
      .dispatchEvent(new KeyboardEvent('keydown', { key }));

  function pressKeyInOptionCheckbox(wrapper, id, key) {
    const checkbox = wrapper
      .find(`[data-testid="option-${id}"]`)
      .closest('[role="option"]')
      .find('input[type="checkbox"]');

    if (!checkbox.exists()) {
      throw new Error(
        `There is no checkbox in option ${id}. Make sure you are testing a MultiSelect`,
      );
    }

    checkbox.getDOMNode().dispatchEvent(new KeyboardEvent('keydown', { key }));
  }

  const isOptionSelected = (wrapper, id) =>
    wrapper
      .find(`[data-testid="option-${id}"]`)
      .exists('[data-testid="selected-option"]');

  it('changes selected value when an option is clicked', () => {
    const onChange = sinon.stub();
    const wrapper = createComponent({ onChange });

    clickOption(wrapper, 3);
    assert.calledWith(onChange.lastCall, defaultItems[2]);

    clickOption(wrapper, 5);
    assert.calledWith(onChange.lastCall, defaultItems[4]);

    clickOption(wrapper, 1);
    assert.calledWith(onChange.lastCall, defaultItems[0]);
  });

  it('does not change selected value when a disabled option is clicked', () => {
    const onChange = sinon.stub();
    const wrapper = createComponent({ onChange });
    const clickDisabledOption = () =>
      wrapper.find(`[data-testid="option-4"]`).simulate('click');

    clickDisabledOption();
    assert.notCalled(onChange);
  });

  ['Enter', ' '].forEach(key => {
    it(`changes selected value when ${key} is pressed in option`, () => {
      const onChange = sinon.stub();
      const wrapper = createComponent({ onChange });

      pressKeyInOption(wrapper, 3, key);
      assert.calledWith(onChange.lastCall, defaultItems[2]);

      pressKeyInOption(wrapper, 5, key);
      assert.calledWith(onChange.lastCall, defaultItems[4]);

      pressKeyInOption(wrapper, 1, key);
      assert.calledWith(onChange.lastCall, defaultItems[0]);
    });

    it(`does not change selected value when ${key} is pressed in a disabled option`, () => {
      const onChange = sinon.stub();
      const wrapper = createComponent({ onChange });

      pressKeyInOption(wrapper, 4, key); // Option 4 is disabled
      assert.notCalled(onChange);
    });
  });

  it('marks the right item as selected', () => {
    const wrapper = createComponent({ value: defaultItems[2] });

    assert.isFalse(isOptionSelected(wrapper, 1));
    assert.isFalse(isOptionSelected(wrapper, 2));
    assert.isTrue(isOptionSelected(wrapper, 3));
    assert.isFalse(isOptionSelected(wrapper, 4));
    assert.isFalse(isOptionSelected(wrapper, 5));
  });

  it('marks the right item as disabled', () => {
    const wrapper = createComponent();
    const isOptionDisabled = id =>
      wrapper
        .find(`[data-testid="option-${id}"]`)
        .exists('[data-testid="disabled-option"]');

    assert.isFalse(isOptionDisabled(1));
    assert.isFalse(isOptionDisabled(2));
    assert.isFalse(isOptionDisabled(3));
    assert.isTrue(isOptionDisabled(4));
    assert.isFalse(isOptionDisabled(5));
  });

  it('toggles listbox when button is clicked', () => {
    const wrapper = createComponent();

    assert.isTrue(isListboxClosed(wrapper));
    toggleListbox(wrapper);
    assert.isFalse(isListboxClosed(wrapper));
  });

  it('closes listbox when Escape is pressed', () => {
    const wrapper = createComponent();

    toggleListbox(wrapper);
    assert.isFalse(isListboxClosed(wrapper));

    document.body.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape' }),
    );
    wrapper.update();

    // Listbox is closed after `Escape` is pressed
    assert.isTrue(isListboxClosed(wrapper));
  });

  it('closes listbox when clicking away', () => {
    const wrapper = createComponent();

    toggleListbox(wrapper);
    assert.isFalse(isListboxClosed(wrapper));

    const externalButton = document.createElement('button');
    document.body.append(externalButton);

    externalButton.click();
    wrapper.update();

    try {
      // Listbox is closed after other element is clicked
      assert.isTrue(isListboxClosed(wrapper));
    } finally {
      externalButton.remove();
    }
  });

  it('closes listbox when focusing away', () => {
    const wrapper = createComponent();
    toggleListbox(wrapper);

    // Focus an element which is outside the listbox itself
    const outerButton = document.createElement('button');
    document.body.append(outerButton);
    outerButton.focus();
    wrapper.update();

    try {
      assert.isTrue(isListboxClosed(wrapper));
      // The button should still be focused after closing the listbox
      assert.equal(document.activeElement, outerButton);
    } finally {
      outerButton.remove();
    }
  });

  it('restores focus to toggle button after closing listbox', () => {
    const wrapper = createComponent();
    toggleListbox(wrapper);

    // Focus listbox option before closing listbox
    wrapper
      .find('[data-testid="option-3"]')
      .getDOMNode()
      .closest('[role="option"]')
      .focus();
    toggleListbox(wrapper);
    wrapper.update();

    assert.equal(document.activeElement, getToggleButton(wrapper).getDOMNode());
  });

  it('displays listbox when ArrowDown is pressed on toggle', () => {
    const wrapper = createComponent();

    assert.isTrue(isListboxClosed(wrapper));

    getToggleButton(wrapper)
      .getDOMNode()
      .dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    wrapper.update();

    assert.isFalse(isListboxClosed(wrapper));
  });

  [
    {
      containerPaddingTop: 0,
      shouldDropUp: false,
      listboxAsPopover: undefined,
    },
    {
      containerPaddingTop: 0,
      shouldDropUp: false,
      listboxAsPopover: true,
    },
    {
      containerPaddingTop: 0,
      shouldDropUp: false,
      listboxAsPopover: false,
    },
    {
      containerPaddingTop: 1000,
      shouldDropUp: true,
      listboxAsPopover: undefined,
    },
    {
      containerPaddingTop: 1000,
      shouldDropUp: true,
      listboxAsPopover: true,
    },
    {
      containerPaddingTop: 1000,
      shouldDropUp: true,
      listboxAsPopover: false,
    },
  ].forEach(({ containerPaddingTop, shouldDropUp, listboxAsPopover }) => {
    it('makes listbox drop up or down based on available space below', () => {
      const wrapper = createComponent(
        { listboxAsPopover },
        { paddingTop: containerPaddingTop },
      );
      toggleListbox(wrapper);

      assert.equal(listboxDidDropUp(wrapper), shouldDropUp);
    });
  });

  context('when Option is rendered outside of Select', () => {
    it('throws an error', () => {
      assert.throws(
        () => mount(<Select.Option value="1">{() => '1'}</Select.Option>),
        'Select.Option can only be used as Select or MultiSelect child',
      );
    });
  });

  context('when popover is supported', () => {
    [undefined, true].forEach(listboxAsPopover => {
      it('opens listbox via popover API', async () => {
        const wrapper = createComponent({ listboxAsPopover });
        let resolve;
        const promise = new Promise(res => (resolve = res));

        getListbox(wrapper).getDOMNode().addEventListener('toggle', resolve);
        toggleListbox(wrapper);

        // This test will time out if the toggle event is not dispatched
        await promise;
      });
    });
  });

  context('when listbox is bigger than toggle button', () => {
    [
      // Inferring listboxAsPopover based on browser support
      {
        listboxAsPopover: undefined,
        getListboxLeft: wrapper => {
          const leftStyle = getListbox(wrapper).getDOMNode().style.left;
          // Remove `px` unit indicator
          return Number(leftStyle.replace('px', ''));
        },
      },
      // Explicitly enabling listboxAsPopover
      {
        listboxAsPopover: true,
        getListboxLeft: wrapper => {
          const leftStyle = getListbox(wrapper).getDOMNode().style.left;
          // Remove `px` unit indicator
          return Number(leftStyle.replace('px', ''));
        },
      },
      // Explicitly disabling listboxAsPopover
      {
        listboxAsPopover: false,
        getListboxLeft: wrapper =>
          getListbox(wrapper).getDOMNode().getBoundingClientRect().left,
      },
    ].forEach(({ listboxAsPopover, getListboxLeft }) => {
      it('aligns listbox to the right if `right` prop is true', async () => {
        const wrapper = createComponent({
          listboxAsPopover,
          right: true,
          buttonClasses: '!w-8', // Set a small width in the button
        });
        toggleListbox(wrapper);

        // Wait for listbox to be open
        await waitFor(() => !isListboxClosed(wrapper));

        const { left: buttonLeft } = getToggleButton(wrapper)
          .getDOMNode()
          .getBoundingClientRect();
        const listboxLeft = getListboxLeft(wrapper);

        assert.isTrue(listboxLeft < buttonLeft);
      });
    });
  });

  context('when listbox does not fit in available space', () => {
    async function getOpenListbox(wrapper) {
      toggleListbox(wrapper);
      await waitFor(() => !isListboxClosed(wrapper));

      return getListbox(wrapper);
    }

    it('never renders a listbox bigger than the viewport', async () => {
      const name = 'name'.repeat(1000);
      const wrapper = createComponent(
        { buttonContent: 'Select a value' },
        {
          items: ['1', '2', '3'].map(id => ({ id, name })),
        },
      );

      const listbox = await getOpenListbox(wrapper);
      const { width: listboxWidth } = listbox
        .getDOMNode()
        .getBoundingClientRect();

      assert.isTrue(listboxWidth < window.innerWidth);
    });

    [
      // Content is small. The listbox matches the toggle button size regardless
      // the orientation.
      ...[true, false].map(right => ({
        name: 'short name',
        right,
        getExpectedCoordinates: (wrapper, listboxDOMNode) => {
          const buttonDOMNode = getToggleButton(wrapper).getDOMNode();
          const buttonLeft = buttonDOMNode.getBoundingClientRect().left;

          return {
            left: buttonLeft,
            right: listboxDOMNode.getBoundingClientRect().width + buttonLeft,
          };
        },
      })),

      // Content is slightly longer. The listbox matches one of the toggle's
      // sides but spans further to the opposite one
      {
        name: 'slightly longer name'.repeat(3),
        right: false,
        getExpectedCoordinates: (wrapper, listboxDOMNode) => {
          const buttonDOMNode = getToggleButton(wrapper).getDOMNode();
          const buttonRect = buttonDOMNode.getBoundingClientRect();
          const listboxRect = listboxDOMNode.getBoundingClientRect();
          const listboxRightIncrement = listboxRect.width - buttonRect.width;

          return {
            left: buttonRect.left,
            right: buttonRect.right + listboxRightIncrement,
          };
        },
      },
      {
        name: 'slightly longer name'.repeat(3),
        right: true,
        getExpectedCoordinates: (wrapper, listboxDOMNode) => {
          const buttonDOMNode = getToggleButton(wrapper).getDOMNode();
          const buttonRect = buttonDOMNode.getBoundingClientRect();
          const listboxRect = listboxDOMNode.getBoundingClientRect();
          const listboxLeftIncrement = listboxRect.width - buttonRect.width;

          return {
            left: buttonRect.left - listboxLeftIncrement,
            right: buttonRect.right,
          };
        },
      },

      // Content is very big, so listbox spans to the edge of the viewport grows
      // further than the opposite side of the toggle button
      {
        name: 'very long name'.repeat(6),
        right: false,
        getExpectedCoordinates: (wrapper, listboxDOMNode) => {
          const listboxRect = listboxDOMNode.getBoundingClientRect();
          const bodyWidth = document.body.getBoundingClientRect().width;

          return {
            left:
              bodyWidth - listboxRect.width - LISTBOX_VIEWPORT_HORIZONTAL_GAP,
            right: bodyWidth - LISTBOX_VIEWPORT_HORIZONTAL_GAP,
          };
        },
      },
      {
        name: 'very long name'.repeat(6),
        right: true,
        getExpectedCoordinates: (wrapper, listboxDOMNode) => {
          const listboxRect = listboxDOMNode.getBoundingClientRect();
          return {
            left: LISTBOX_VIEWPORT_HORIZONTAL_GAP,
            right: listboxRect.width + LISTBOX_VIEWPORT_HORIZONTAL_GAP,
          };
        },
      },
    ].forEach(({ name, right, getExpectedCoordinates }) => {
      it('displays listbox in expected coordinates', async () => {
        const wrapper = createComponent(
          { right, buttonContent: 'Select a value' },
          {
            items: ['1', '2', '3'].map(id => ({ id, name })),
          },
        );

        const listbox = await getOpenListbox(wrapper);
        const listboxDOMNode = listbox.getDOMNode();
        const listboxStyleLeft = listboxDOMNode.style.left;
        const listboxLeft = Number(listboxStyleLeft.replace('px', ''));
        const listboxRight =
          listboxDOMNode.getBoundingClientRect().width + listboxLeft;

        const expectedCoordinates = getExpectedCoordinates(
          wrapper,
          listboxDOMNode,
        );

        assert.equal(
          listboxLeft.toFixed(0),
          expectedCoordinates.left.toFixed(0),
        );
        assert.equal(
          listboxRight.toFixed(0),
          expectedCoordinates.right.toFixed(0),
        );
      });
    });
  });

  context('MultiSelect', () => {
    it('allows multiple items to be selected via checkboxes', () => {
      const onChange = sinon.stub();
      const wrapper = createComponent(
        {
          value: [defaultItems[0], defaultItems[2]],
          onChange,
        },
        { Component: MultiSelect },
      );

      toggleListbox(wrapper);
      clickOptionCheckbox(wrapper, 2);

      // When a not-yet-selected item is clicked, it will be selected
      assert.calledWith(onChange, [
        defaultItems[0],
        defaultItems[2],
        defaultItems[1],
      ]);

      // After clicking a checkbox, the listbox is still open
      assert.isFalse(isListboxClosed(wrapper));
    });

    it('allows deselecting already selected options via checkboxes', () => {
      const onChange = sinon.stub();
      const wrapper = createComponent(
        {
          value: [defaultItems[0], defaultItems[2]],
          onChange,
        },
        { Component: MultiSelect },
      );

      toggleListbox(wrapper);
      clickOptionCheckbox(wrapper, 3);

      // When an already selected item is clicked, it will be de-selected
      assert.calledWith(onChange, [defaultItems[0]]);
    });

    [
      { doReset: wrapper => clickOption(wrapper, 'reset') },
      { doReset: wrapper => clickOptionCheckbox(wrapper, 'reset') },
    ].forEach(({ doReset }) => {
      it('resets selection when option value is nullish and select value is an array', () => {
        const onChange = sinon.stub();
        const wrapper = createComponent(
          {
            value: [defaultItems[0], defaultItems[2]],
            onChange,
          },
          { Component: MultiSelect },
        );

        toggleListbox(wrapper);
        doReset(wrapper);

        assert.calledWith(onChange, []);
      });
    });

    [
      { value: [], isResetSelected: true },
      { value: [defaultItems[0], defaultItems[2]], isResetSelected: false },
    ].forEach(({ value, isResetSelected }) => {
      it('marks reset option as selected when value is empty', () => {
        const wrapper = createComponent({ value }, { Component: MultiSelect });
        assert.equal(isOptionSelected(wrapper, 'reset'), isResetSelected);
      });
    });

    ['Enter', ' '].forEach(key => {
      it(`does not change selected value when ${key} is pressed in an option's checkbox`, () => {
        const onChange = sinon.stub();
        const wrapper = createComponent(
          { onChange, value: [] },
          { Component: MultiSelect },
        );

        pressKeyInOptionCheckbox(wrapper, 3, key);
        assert.notCalled(onChange);

        pressKeyInOptionCheckbox(wrapper, 5, key);
        assert.notCalled(onChange);

        pressKeyInOptionCheckbox(wrapper, 1, key);
        assert.notCalled(onChange);
      });
    });

    it('focuses checkbox when right arrow is pressed in option', () => {
      const optionId = 3;
      const wrapper = createComponent(
        { value: [] },
        { Component: MultiSelect },
      );

      // Spy on checkbox focus
      const checkbox = wrapper
        .find(`[data-testid="option-${optionId}"]`)
        .closest('[role="option"]')
        .find('input[type="checkbox"]')
        .getDOMNode();
      const focusStub = sinon.stub(checkbox, 'focus');

      pressKeyInOption(wrapper, optionId, 'ArrowRight');
      assert.called(focusStub);
    });

    it('focuses option when left arrow is pressed in checkbox', () => {
      const optionId = 3;
      const wrapper = createComponent(
        { value: [] },
        { Component: MultiSelect },
      );

      const option = wrapper
        .find(`[data-testid="option-${optionId}"]`)
        .closest('[role="option"]')
        .getDOMNode();
      const focusStub = sinon.stub(option, 'focus');

      pressKeyInOptionCheckbox(wrapper, optionId, 'ArrowLeft');
      assert.called(focusStub);
    });
  });

  it(
    'should pass a11y checks',
    checkAccessibility([
      {
        name: 'Closed Select listbox',
        content: () =>
          createComponent(
            { buttonContent: 'Select', 'aria-label': 'Select' },
            { optionsChildrenAsCallback: false },
          ),
      },
      {
        name: 'Open Select listbox',
        content: () => {
          const wrapper = createComponent(
            { buttonContent: 'Select', 'aria-label': 'Select' },
            { optionsChildrenAsCallback: false },
          );
          toggleListbox(wrapper);

          return wrapper;
        },
      },
      {
        name: 'Open MultiSelect listbox',
        content: () => {
          const wrapper = createComponent(
            {
              buttonContent: 'Select',
              'aria-label': 'Select',
              value: [defaultItems[1], defaultItems[3]],
            },
            { optionsChildrenAsCallback: false, Component: MultiSelect },
          );
          toggleListbox(wrapper);

          return wrapper;
        },
      },
    ]),
  );
});
