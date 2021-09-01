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

  it('applies extra classes', () => {
    const wrapper = createComponent({ classes: 'foo bar' });
    assert.deepEqual(
      [...wrapper.find('input.foo.bar').getDOMNode().classList.values()],
      ['Hyp-Checkbox', 'foo', 'bar']
    );
  });
});

describe('LabeledCheckbox', () => {
  function createComponent(props = {}) {
    return mount(
      <LabeledCheckbox name="my-checkbox" {...props}>
        {props.children || 'My Action'}
      </LabeledCheckbox>
    );
  }

  it('renders children in a `span` element', () => {
    const wrapper = createComponent({ children: <code>My Code</code> });
    const labelText = wrapper.find('span[data-testid="label-text"]');
    assert.isTrue(labelText.find('code').exists());
    assert.equal(labelText.text(), 'My Code');
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

  it('renders a checkbox SvgIcon for styling the checkbox visually', () => {
    const wrapper = createComponent();
    const icon = wrapper.find('SvgIcon');
    assert.equal(icon.props().name, 'hyp-checkbox');
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

  it('applies extra container classes', () => {
    const wrapper = createComponent({ containerClasses: 'foo bar' });
    assert.deepEqual(
      [...wrapper.find('label.foo.bar').getDOMNode().classList.values()],
      ['Hyp-LabeledCheckbox', 'foo', 'bar']
    );
  });

  it(
    'should pass a11y checks',
    checkAccessibility({
      content: () => createComponent({ id: 'whatever' }),
    })
  );
});
