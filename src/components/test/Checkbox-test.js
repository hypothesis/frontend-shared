import { mount } from 'enzyme';

import { checkAccessibility } from '../../../test/util/accessibility';

import { LabeledCheckbox, Checkbox } from '../Checkbox';

describe('Checkbox', () => {
  function createComponent(props = {}) {
    return mount(<Checkbox name="my-checkbox" {...props} />);
  }

  it('passes along a `ref` to the input element through `inputRef`', () => {
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
      <div>
        {/** wrapped on a div to pass the a11y test */}
        <LabeledCheckbox name="my-checkbox" {...props}>
          {props.children || 'My Action'}
        </LabeledCheckbox>
      </div>
    );
  }

  it('places the `label` element after the `input` element', () => {
    const inputRef = {};
    // The default `position` prop is 'before'
    const wrapper = createComponent({ inputRef });
    const labelElement = wrapper.find('label');
    assert.equal(labelElement.text(), 'My Action');
    assert.equal(inputRef.current.nextElementSibling.tagName, 'LABEL');
  });

  it('places the `label` element before the `input` element', () => {
    const inputRef = {};
    const wrapper = createComponent({ inputRef, position: 'before' });
    const labelElement = wrapper.find('label');
    assert.equal(labelElement.text(), 'My Action');
    assert.equal(inputRef.current.previousElementSibling.tagName, 'LABEL');
  });

  it('renders children in a `label` element', () => {
    const wrapper = createComponent({ children: <code>My Code</code> });
    const labelElement = wrapper.find('label');
    assert.isTrue(labelElement.find('code').exists());
    assert.equal(labelElement.text(), 'My Code');
  });

  it('does not check the checkbox by default', () => {
    const wrapper = createComponent();
    const inputElement = wrapper.find('input').getDOMNode();
    assert.isFalse(inputElement.checked);
  });

  it('uses the `name` as an `id` attr if no `id` provided', () => {
    const wrapper = createComponent();
    const labeledCheckbox = wrapper.find('label');
    const inputElement = wrapper.find('input');
    assert.equal(inputElement.prop('id'), labeledCheckbox.prop('htmlFor'));
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
