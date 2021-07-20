import { mount } from 'enzyme';

import { Spinner } from '../Spinner';

import { checkAccessibility } from '../../../test/util/accessibility';

describe('Spinner', () => {
  const createSpinner = (props = {}) => mount(<Spinner {...props} />);

  it('renders', () => {
    const wrapper = createSpinner();
    assert.isTrue(wrapper.find('SvgIcon.Hyp-Spinner--medium').exists());
  });

  it('uses the registered `hyp-spinner` icon', () => {
    const wrapper = createSpinner();
    assert.equal(wrapper.find('SvgIcon').props().name, 'hyp-spinner');
  });

  it('applies additional classes', () => {
    const wrapper = createSpinner({ classes: 'foo bar' });
    assert.isTrue(wrapper.find('SvgIcon.Hyp-Spinner--medium.foo.bar').exists());
  });

  it('sets indicated size', () => {
    const wrapper = createSpinner({ size: 'large' });
    assert.isTrue(wrapper.find('SvgIcon.Hyp-Spinner--large').exists());
  });

  it(
    'should pass a11y checks',
    checkAccessibility({
      content: () => createSpinner(),
    })
  );
});
