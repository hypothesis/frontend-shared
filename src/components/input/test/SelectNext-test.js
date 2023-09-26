import { mount } from 'enzyme';

import { checkAccessibility } from '../../../../test/util/accessibility.js';
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

  const createComponent = (props = {}, paddingTop = 0) => {
    const container = document.createElement('div');
    container.style.paddingTop = `${paddingTop}px`;
    document.body.append(container);

    const wrapper = mount(
      <SelectNext value={undefined} onChange={sinon.stub()} label="" {...props}>
        {items.map(item => (
          <SelectNext.Option
            value={item}
            disabled={item.id === '4'}
            key={item.id}
          >
            {({ selected, disabled }) => (
              <span data-testid={`option-${item.id}`}>
                {item.name}
                {selected && <span data-testid="selected-option" />}
                {disabled && <span data-testid="disabled-option" />}
              </span>
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
    getListbox(wrapper).prop('className').includes('hidden');

  const listboxDidDropUp = wrapper =>
    getListbox(wrapper).prop('className').includes('bottom-full');

  it('changes selected value when an option is clicked', () => {
    const onChange = sinon.stub();
    const wrapper = createComponent({ onChange });

    wrapper.find('[data-testid="option-3"]').simulate('click');
    assert.calledWith(onChange.lastCall, items[2]);

    wrapper.find('[data-testid="option-5"]').simulate('click');
    assert.calledWith(onChange.lastCall, items[4]);

    wrapper.find('[data-testid="option-1"]').simulate('click');
    assert.calledWith(onChange.lastCall, items[0]);
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
      .closest('button')
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
    { containerPaddingTop: 0, shouldDropUp: false },
    { containerPaddingTop: 1000, shouldDropUp: true },
  ].forEach(({ containerPaddingTop, shouldDropUp }) => {
    it('makes listbox drop up or down based on available space below', () => {
      const wrapper = createComponent({}, containerPaddingTop);
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

  it(
    'should pass a11y checks',
    checkAccessibility([
      {
        name: 'Closed Select listbox',
        content: () => createComponent({ label: 'Select' }),
      },
      {
        name: 'Open Select listbox',
        content: () => {
          const wrapper = createComponent({ label: 'Select' });
          toggleListbox(wrapper);

          return wrapper;
        },
      },
    ]),
  );
});
