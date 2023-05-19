import { mount } from 'enzyme';

import { testPresentationalComponent } from '../../test/common-tests';
import Link from '../Link';

describe('Link', () => {
  const createComponent = (props = {}) => {
    return mount(
      <Link href="http://www.example.com" {...props}>
        This is content inside of a Link
      </Link>
    );
  };

  testPresentationalComponent(Link, { componentName: 'Link' });

  // TODO: Extract tests to common-tests and enhance as more components add
  // support for the styling API
  function getStyles(wrapper) {
    return wrapper.find('a').prop('className');
  }

  it('applies component styles', () => {
    const withStyles = createComponent();
    assert.isNotEmpty(getStyles(withStyles));
  });

  it('does not apply any styles if `unstyled` is set', () => {
    const noStyles = createComponent({ unstyled: true });
    assert.isEmpty(getStyles(noStyles));
  });

  it('does not apply theming styles if variant is set to `custom`', () => {
    const withStyles = createComponent();
    const noThemeStyles = createComponent({ variant: 'custom' });
    assert.isTrue(
      getStyles(withStyles).length > getStyles(noThemeStyles).length
    );
  });
});
