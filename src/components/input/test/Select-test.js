import { checkAccessibility, mount } from '@hypothesis/frontend-testing';

import { MultiSelect, Select } from '../Select';

describe('Select', () => {
  const items = [
    { id: '1', name: 'All students' },
    { id: '2', name: 'Albert Banana' },
    { id: '3', name: 'Bernard California' },
    { id: '4', name: 'Cecelia Davenport' },
    { id: '5', name: 'Doris Evanescence' },
  ];

  /**
   * @param {Object} [options]
   * @param {boolean} [options.optionsChildrenAsCallback] -
   *        Whether to render `Select.Option` children with callback notation.
   *        Used primarily to test and cover both branches.
   *        Defaults to true.
   * @param {MultiSelect | Select} [options.Component] -
   *        The actual "select" component to use. Defaults to `Select`.
   */
  const createComponent = (props = {}, options = {}) => {
    const { optionsChildrenAsCallback = true, Component = Select } = options;

    return mount(
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
      { connected: true },
    );
  };

  const getToggleButton = wrapper =>
    wrapper.find('button[data-testid="select-toggle-button"]');

  const toggleListbox = wrapper => getToggleButton(wrapper).simulate('click');

  const isListboxClosed = wrapper =>
    wrapper.find('Popover').prop('open') === false;

  const openListbox = wrapper => {
    if (isListboxClosed(wrapper)) {
      toggleListbox(wrapper);
    }
  };

  const getOption = (wrapper, id) =>
    wrapper.find(`[data-testid="option-${id}"]`).closest('[role="option"]');

  const clickOption = (wrapper, id) => {
    openListbox(wrapper);
    getOption(wrapper, id).simulate('click');
  };

  function clickOptionCheckbox(wrapper, id) {
    openListbox(wrapper);

    const checkbox = getOption(wrapper, id).find('input[type="checkbox"]');

    if (!checkbox.exists()) {
      throw new Error(
        `There is no checkbox in option ${id}. Make sure you are testing a MultiSelect`,
      );
    }

    checkbox.simulate('change');
  }

  const pressKeyInOption = (wrapper, id, key) => {
    openListbox(wrapper);

    getOption(wrapper, id)
      .getDOMNode()
      .dispatchEvent(new KeyboardEvent('keydown', { key }));
  };

  function pressKeyInOptionCheckbox(wrapper, id, key) {
    openListbox(wrapper);

    const checkbox = getOption(wrapper, id).find('input[type="checkbox"]');

    if (!checkbox.exists()) {
      throw new Error(
        `There is no checkbox in option ${id}. Make sure you are testing a MultiSelect`,
      );
    }

    checkbox.getDOMNode().dispatchEvent(new KeyboardEvent('keydown', { key }));
  }

  const isOptionSelected = (wrapper, id) => {
    openListbox(wrapper);
    return wrapper
      .find(`[data-testid="option-${id}"]`)
      .exists('[data-testid="selected-option"]');
  };

  it('changes selected value when an option is clicked', () => {
    const onChange = sinon.stub();
    const wrapper = createComponent({ onChange });

    clickOption(wrapper, 3);
    assert.calledWith(onChange.lastCall, items[2]);

    clickOption(wrapper, 5);
    assert.calledWith(onChange.lastCall, items[4]);

    clickOption(wrapper, 1);
    assert.calledWith(onChange.lastCall, items[0]);
  });

  it('does not change selected value when a disabled option is clicked', () => {
    const onChange = sinon.stub();
    const wrapper = createComponent({ onChange });
    const clickDisabledOption = () =>
      wrapper.find(`[data-testid="option-4"]`).simulate('click');

    openListbox(wrapper);
    clickDisabledOption();
    assert.notCalled(onChange);
  });

  ['Enter', ' '].forEach(key => {
    it(`changes selected value when ${key} is pressed in option`, () => {
      const onChange = sinon.stub();
      const wrapper = createComponent({ onChange });

      pressKeyInOption(wrapper, 3, key);
      assert.calledWith(onChange.lastCall, items[2]);

      pressKeyInOption(wrapper, 5, key);
      assert.calledWith(onChange.lastCall, items[4]);

      pressKeyInOption(wrapper, 1, key);
      assert.calledWith(onChange.lastCall, items[0]);
    });

    it(`does not change selected value when ${key} is pressed in a disabled option`, () => {
      const onChange = sinon.stub();
      const wrapper = createComponent({ onChange });

      pressKeyInOption(wrapper, 4, key); // Option 4 is disabled
      assert.notCalled(onChange);
    });
  });

  it('marks the right item as selected', () => {
    const wrapper = createComponent({ value: items[2] });

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

    openListbox(wrapper);

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
    const toggleButtonDOMNode = getToggleButton(wrapper).getDOMNode();

    // Focus toggle button before opening listbox
    toggleButtonDOMNode.focus();
    toggleListbox(wrapper);

    // Focus listbox option before closing listbox
    getOption(wrapper, '3').getDOMNode().focus();

    toggleListbox(wrapper);
    wrapper.update();

    // After closing listbox, the focus should have returned to the toggle
    // button, which was the last focused element before all children were
    // removed
    assert.equal(document.activeElement, toggleButtonDOMNode);
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

  it('sets tabIndex=0 for the selected option', () => {
    const wrapper = createComponent({ value: items[2] });
    const getTabIndex = id => getOption(wrapper, id).prop('tabIndex');

    openListbox(wrapper);

    assert.equal(getTabIndex(1), -1);
    assert.equal(getTabIndex(2), -1);
    assert.equal(getTabIndex(3), 0);
    assert.equal(getTabIndex(4), -1);
    assert.equal(getTabIndex(5), -1);
  });

  it('invokes onPopoverScroll when scrolling inside the Popover', () => {
    const onScroll = sinon.stub();
    const wrapper = createComponent({ onPopoverScroll: onScroll });

    wrapper.find('[data-testid="popover"]').simulate('scroll');

    assert.called(onScroll);
  });

  context('when Option is rendered outside of Select', () => {
    it('throws an error', () => {
      assert.throws(
        () => mount(<Select.Option value="1">{() => '1'}</Select.Option>),
        'Select.Option can only be used as Select or MultiSelect child',
      );
    });
  });

  context('MultiSelect', () => {
    it('allows multiple items to be selected via checkboxes', () => {
      const onChange = sinon.stub();
      const wrapper = createComponent(
        {
          value: [items[0], items[2]],
          onChange,
        },
        { Component: MultiSelect },
      );

      clickOptionCheckbox(wrapper, 2);

      // When a not-yet-selected item is clicked, it will be selected
      assert.calledWith(onChange, [items[0], items[2], items[1]]);

      // After clicking a checkbox, the listbox is still open
      assert.isFalse(isListboxClosed(wrapper));
    });

    it('allows deselecting already selected options via checkboxes', () => {
      const onChange = sinon.stub();
      const wrapper = createComponent(
        {
          value: [items[0], items[2]],
          onChange,
        },
        { Component: MultiSelect },
      );

      clickOptionCheckbox(wrapper, 3);

      // When an already selected item is clicked, it will be de-selected
      assert.calledWith(onChange, [items[0]]);
    });

    [
      { doReset: wrapper => clickOption(wrapper, 'reset') },
      { doReset: wrapper => clickOptionCheckbox(wrapper, 'reset') },
    ].forEach(({ doReset }) => {
      it('resets selection when option value is nullish and select value is an array', () => {
        const onChange = sinon.stub();
        const wrapper = createComponent(
          {
            value: [items[0], items[2]],
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
      { value: [items[0], items[2]], isResetSelected: false },
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
      openListbox(wrapper);

      // Spy on checkbox focus
      const checkbox = getOption(wrapper, optionId)
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
      openListbox(wrapper);

      const option = getOption(wrapper, optionId).getDOMNode();
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
              value: [items[1], items[3]],
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
