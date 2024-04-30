import { checkAccessibility, waitFor } from '@hypothesis/frontend-testing';
import { mount } from 'enzyme';

import SelectNext from '../SelectNext';

describe('SelectNext', () => {
  let wrappers;
  const items = [
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
   *        Whether to renders SelectNext.Option children with callback notation.
   *        Used primarily to test and cover both branches.
   *        Defaults to true.
   * @param {boolean} [options.defaultListboxAsPopover] -
   *        Whether we should let the `listboxAsPopover` prop use default value
   *        if not explicitly provided, or we should initialize it instead.
   */
  const createComponent = (props = {}, options = {}) => {
    const {
      paddingTop = 0,
      optionsChildrenAsCallback = true,
      defaultListboxAsPopover = false,
    } = options;
    const container = document.createElement('div');
    container.style.paddingTop = `${paddingTop}px`;
    document.body.append(container);

    // Explicitly disable listboxAsPopover, unless requested differently or a
    // value has been provided
    if (!defaultListboxAsPopover && !('listboxAsPopover' in props)) {
      props.listboxAsPopover = false;
    }

    const wrapper = mount(
      <SelectNext value={undefined} onChange={sinon.stub()} {...props}>
        {items.map(item => (
          <SelectNext.Option
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
          </SelectNext.Option>
        ))}
      </SelectNext>,
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

  it('changes selected value when an option is clicked', () => {
    const onChange = sinon.stub();
    const wrapper = createComponent({ onChange });
    const clickOption = index =>
      wrapper.find(`[data-testid="option-${index}"]`).simulate('click');

    clickOption(3);
    assert.calledWith(onChange.lastCall, items[2]);

    clickOption(5);
    assert.calledWith(onChange.lastCall, items[4]);

    clickOption(1);
    assert.calledWith(onChange.lastCall, items[0]);
  });

  it('does not change selected value when a disabled option is clicked', () => {
    const onChange = sinon.stub();
    const wrapper = createComponent({ onChange });
    const clickDisabledOption = () =>
      wrapper.find(`[data-testid="option-4"]`).simulate('click');

    clickDisabledOption();
    assert.notCalled(onChange);
  });

  ['Enter', 'Space'].forEach(code => {
    it(`changes selected value when ${code} is pressed in option`, () => {
      const onChange = sinon.stub();
      const wrapper = createComponent({ onChange });
      const pressKeyInOption = index =>
        wrapper
          .find(`[data-testid="option-${index}"]`)
          .getDOMNode()
          .closest('[role="option"]')
          .dispatchEvent(new KeyboardEvent('keypress', { code }));

      pressKeyInOption(3);
      assert.calledWith(onChange.lastCall, items[2]);

      pressKeyInOption(5);
      assert.calledWith(onChange.lastCall, items[4]);

      pressKeyInOption(1);
      assert.calledWith(onChange.lastCall, items[0]);
    });

    it(`does not change selected value when ${code} is pressed in a disabled option`, () => {
      const onChange = sinon.stub();
      const wrapper = createComponent({ onChange });
      const pressKeyInDisabledOption = () =>
        wrapper
          .find(`[data-testid="option-4"]`)
          .getDOMNode()
          .closest('[role="option"]')
          .dispatchEvent(new KeyboardEvent('keypress', { code }));

      pressKeyInDisabledOption();
      assert.notCalled(onChange);
    });
  });

  it('marks the right item as selected', () => {
    const wrapper = createComponent({ value: items[2] });
    const isOptionSelected = id =>
      wrapper
        .find(`[data-testid="option-${id}"]`)
        .exists('[data-testid="selected-option"]');

    assert.isFalse(isOptionSelected(1));
    assert.isFalse(isOptionSelected(2));
    assert.isTrue(isOptionSelected(3));
    assert.isFalse(isOptionSelected(4));
    assert.isFalse(isOptionSelected(5));
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

  context('when Option is rendered outside of SelectNext', () => {
    it('throws an error', () => {
      assert.throws(
        () =>
          mount(<SelectNext.Option value="1">{() => '1'}</SelectNext.Option>),
        'Select.Option can only be used as Select child',
      );
    });
  });

  context('when popover is supported', () => {
    it('opens listbox via popover API', async () => {
      const wrapper = createComponent({ listboxAsPopover: true });
      let resolve;
      const promise = new Promise(res => (resolve = res));

      getListbox(wrapper).getDOMNode().addEventListener('toggle', resolve);
      toggleListbox(wrapper);

      // This test will timeout if the toggle event is not dispatched
      await promise;
    });
  });

  context('when listbox is bigger than toggle button', () => {
    [
      // Inferring listboxAsPopover based on browser support
      {
        listboxAsPopover: 'default',
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
        const wrapper = createComponent(
          {
            listboxAsPopover:
              typeof listboxAsPopover === 'boolean'
                ? listboxAsPopover
                : undefined,
            right: true,
            buttonClasses: '!w-8', // Set a small width in the button
          },
          { defaultListboxAsPopover: listboxAsPopover === 'default' },
        );
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
    ]),
  );
});
