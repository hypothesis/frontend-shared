import { mount } from 'enzyme';

import { FullScreenSpinner, Spinner } from '../Spinner';

import { checkAccessibility } from '../../../test/util/accessibility';

describe('Spinner', () => {
  const createSpinner = (props = {}) => mount(<Spinner {...props} />);

  it('renders', () => {
    const wrapper = createSpinner();
    assert.isTrue(wrapper.find('Icon .Hyp-Spinner--medium').exists());
  });

  it('uses the registered `hyp-spinner` icon', () => {
    const wrapper = createSpinner();
    assert.equal(
      wrapper.find('Icon').props().name.toString(),
      Symbol('spinner').toString()
    );
  });

  it('applies additional classes', () => {
    const wrapper = createSpinner({ classes: 'foo bar' });
    assert.isTrue(wrapper.find('Icon .Hyp-Spinner--medium.foo.bar').exists());
  });

  it('sets indicated size', () => {
    const wrapper = createSpinner({ size: 'large' });
    assert.isTrue(wrapper.find('Icon .Hyp-Spinner--large').exists());
  });

  it(
    'should pass a11y checks',
    checkAccessibility({
      content: () => createSpinner(),
    })
  );
});

describe('FullScreenSpinner', () => {
  const createSpinner = (props = {}) => mount(<FullScreenSpinner {...props} />);

  it('renders a containing div', () => {
    const wrapper = createSpinner();
    assert.isTrue(wrapper.find('div.Hyp-FullScreenSpinner').exists());
  });

  it('renders a spinner', () => {
    const wrapper = createSpinner();

    const spinner = wrapper.find('Spinner');
    assert.isTrue(spinner.exists());
    assert.equal(spinner.prop('size'), 'large');
  });

  it('applies additional classes', () => {
    const wrapper = createSpinner({ classes: 'foo bar' });
    const spinner = wrapper.find('Spinner');

    assert.equal(
      spinner.prop('classes'),
      'Hyp-FullScreenSpinner__spinner foo bar'
    );
  });

  it('applies container classes', () => {
    const wrapper = createSpinner({ containerClasses: 'foo bar' });

    assert.deepEqual(
      [
        ...wrapper
          .find(`div.Hyp-FullScreenSpinner.foo.bar`)
          .getDOMNode()
          .classList.values(),
      ],
      ['Hyp-FullScreenSpinner', 'foo', 'bar']
    );
  });

  it(
    'should pass a11y checks',
    checkAccessibility({
      content: () => createSpinner(),
    })
  );
});
