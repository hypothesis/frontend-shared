import { checkAccessibility } from '@hypothesis/frontend-testing';
import { mount } from 'enzyme';

import RadioGroup from '../RadioGroup';

describe('RadioGroup', () => {
  let container;
  let wrappers;

  beforeEach(() => {
    wrappers = [];
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    wrappers.forEach(wrapper => wrapper.unmount());
    container.remove();
  });

  const createComponent = (props = {}) => {
    const wrapper = mount(
      <RadioGroup aria-label="Radio group" onChange={sinon.stub()} {...props}>
        <RadioGroup.Radio value="one">One</RadioGroup.Radio>
        <RadioGroup.Radio value="two">Two</RadioGroup.Radio>
        <RadioGroup.Radio value="three" disabled>
          Three
        </RadioGroup.Radio>
        <RadioGroup.Radio value="four" subtitle="This has a subtitle">
          Four
        </RadioGroup.Radio>
      </RadioGroup>,
      { attachTo: container },
    );
    wrappers.push(wrapper);

    return wrapper;
  };

  function getRadio(wrapper, index) {
    return wrapper.find('[role="radio"]').at(index);
  }

  function clickRadio(wrapper, index) {
    getRadio(wrapper, index).simulate('click');
  }

  function pressKeyOnRadio(wrapper, index, key) {
    getRadio(wrapper, index).simulate('keydown', { key });
  }

  function pressKeyOnRadioGroup(wrapper, key) {
    wrapper
      .find('[role="radiogroup"]')
      .getDOMNode()
      .dispatchEvent(new KeyboardEvent('keydown', { key }));
  }

  [
    { index: 0, expectedValue: 'one' },
    { index: 1, expectedValue: 'two' },
    { index: 3, expectedValue: 'four' },
  ].forEach(({ index, expectedValue }) => {
    it('allows selected option to be changed by clicking a radio', () => {
      const onChange = sinon.stub();
      const wrapper = createComponent({ onChange });

      clickRadio(wrapper, index);
      assert.calledWith(onChange, expectedValue);
    });

    [
      {
        keyName: 'Enter',
        key: 'Enter',
      },
      {
        keyName: 'Space',
        key: ' ',
      },
    ].forEach(({ keyName, key }) => {
      it(`allows selected option to be changed via ${keyName}`, () => {
        const onChange = sinon.stub();
        const wrapper = createComponent({ onChange });

        pressKeyOnRadio(wrapper, index, key);
        assert.calledWith(onChange, expectedValue);
      });
    });
  });

  it('ignores clicks on disabled options', () => {
    const onChange = sinon.stub();
    const wrapper = createComponent({ onChange });

    clickRadio(wrapper, 2); // Second option is disabled
    assert.notCalled(onChange);
  });

  [
    {
      keyName: 'Enter',
      key: 'Enter',
    },
    {
      keyName: 'Space',
      key: ' ',
    },
  ].forEach(({ keyName, key }) => {
    it(`ignores ${keyName} press on disabled options`, () => {
      const onChange = sinon.stub();
      const wrapper = createComponent({ onChange });

      pressKeyOnRadio(wrapper, 2, key); // Second option is disabled
      assert.notCalled(onChange);
    });
  });

  it('shows expected radio icons in selected and non-selected options', () => {
    const wrapper = createComponent({ selected: 'two' });

    // First item is not selected
    assert.isFalse(getRadio(wrapper, 0).exists('RadioCheckedIcon'));
    assert.isTrue(getRadio(wrapper, 0).exists('RadioIcon'));

    // Second item is selected
    assert.isTrue(getRadio(wrapper, 1).exists('RadioCheckedIcon'));
    assert.isFalse(getRadio(wrapper, 1).exists('RadioIcon'));
  });

  [
    { nextKey: 'ArrowRight', prevKey: 'ArrowLeft' },
    { nextKey: 'ArrowDown', prevKey: 'ArrowUp' },
  ].forEach(({ nextKey, prevKey }) => {
    it('selects option when focused via arrow keys', () => {
      const onChange = sinon.stub();
      const wrapper = createComponent({ onChange });

      // When pressing next key for the first time, it will select and focus
      // the second radio
      pressKeyOnRadioGroup(wrapper, nextKey);
      assert.calledWith(onChange.lastCall, 'two');

      // When pressing next key again, it will select and focus the fourth
      // radio, because the third one is disabled
      pressKeyOnRadioGroup(wrapper, nextKey);
      assert.calledWith(onChange.lastCall, 'four');

      // Pressing prev key twice will select first radio again
      pressKeyOnRadioGroup(wrapper, prevKey);
      pressKeyOnRadioGroup(wrapper, prevKey);
      assert.calledWith(onChange.lastCall, 'one');
    });
  });

  [
    {
      name: 'some-name',
      shouldHaveHiddenInput: true,
    },
    {
      name: undefined,
      shouldHaveHiddenInput: false,
    },
  ].forEach(({ name, shouldHaveHiddenInput }) => {
    it('renders a hidden input when name is provided', () => {
      const wrapper = createComponent({ name });
      assert.equal(
        wrapper.exists('[data-testid="hidden-input"]'),
        shouldHaveHiddenInput,
      );
    });
  });

  context('when RadioGroup.Radio is used outside of RadioGroup', () => {
    it('throws an error', () => {
      assert.throws(
        () => mount(<RadioGroup.Radio value="1">One</RadioGroup.Radio>),
        'RadioGroup.Radio can only be used as RadioGroup child',
      );
    });
  });

  it(
    'should pass a11y checks',
    checkAccessibility([
      {
        name: 'no selected item',
        content: createComponent,
      },
      {
        name: 'selected item',
        content: () => createComponent({ selected: 'one' }),
      },
      {
        name: 'selected item with subtitle',
        content: () => createComponent({ selected: 'four' }),
      },
    ]),
  );
});
