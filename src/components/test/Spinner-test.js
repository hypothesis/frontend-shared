import { mount } from 'enzyme';

import { Spinner } from '../Spinner';

import { checkAccessibility } from '../../../test/util/accessibility';

describe('Spinner', () => {
  const createSpinner = (props = {}) => mount(<Spinner {...props} />);

  it('renders', () => {
    createSpinner();
    assert.exists('span.Hyp-Spinner--medium');
  });

  it('applies additional classes', () => {
    createSpinner({ classes: 'foo bar' });
    assert.exists('span.Hyp-Spinner--medium.foo.bar');
  });

  it('sets indicated size', () => {
    createSpinner({ size: 'xlarge' });
    assert.exists('span.Hyp-Spinner--large.foo.bar');
  });

  it(
    'should pass a11y checks',
    checkAccessibility({
      content: () => createSpinner(),
    })
  );
});
