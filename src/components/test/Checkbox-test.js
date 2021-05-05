import { mount } from 'enzyme';

import { checkAccessibility } from '../../../test/util/accessibility';

import { LabeledCheckbox, Checkbox } from '../Checkbox';

describe('Checkbox', () => {
  function createComponent(props = {}) {
    return mount(<Checkbox name="my-checkbox" {...props} />);
  }

  it('inputRef points to the input element', () => {
    const inputRef = {};
    createComponent({ inputRef });
    assert.isTrue(inputRef.current instanceof HTMLInputElement);
  });

  it('invokes onClick callback on click', () => {
    const inputRef = {};
    const onClick = sinon.stub();
    createComponent({ inputRef, onClick });

    inputRef.current.click();
    assert.calledOnce(onClick);
  });
});

describe('LabeledCheckbox', () => {
  function createComponent(props = {}) {
    return mount(
      <LabeledCheckbox name="my-checkbox" label="My Action" {...props} />
    );
  }

  it('does not check the checkbox by default', () => {
    const wrapper = createComponent();
    const inputElement = wrapper.find('input').getDOMNode();
    assert.isFalse(inputElement.checked);
  });

  it('uses the `name` as an `id` attr if no `id` provided', () => {
    const wrapper = createComponent();
    const inputElement = wrapper.find('input').getDOMNode();
    assert.equal(inputElement.id, wrapper.props().name);
  });

  it('uses provided `id` attr', () => {
    const wrapper = createComponent({ id: 'much-needed-pretzel-snack' });
    const inputElement = wrapper.find('input').getDOMNode();
    assert.equal(inputElement.id, 'much-needed-pretzel-snack');
  });

  it('invokes onToggle callback on click', () => {
    const onToggle = sinon.stub();
    const wrapper = createComponent({ onToggle });
    const inputElement = wrapper.find('input').getDOMNode();

    inputElement.click();

    assert.calledOnce(onToggle);
    assert.calledWith(onToggle, true);
    onToggle.reset();

    inputElement.click();

    assert.calledOnce(onToggle);
    assert.calledWith(onToggle, false);
    onToggle.reset();
  });

  it(
    'should pass a11y checks',
    checkAccessibility({
      content: () => createComponent({ id: 'whatever' }),
    })
  );
});
