import { mount } from 'enzyme';

import { testPresentationalComponent } from '../../test/common-tests';
import TabList from '../TabList';
import { $imports } from '../TabList';

/**
 * An element with `role="tablist"` needs at least one `role="tab"` child.
 * Accessibility tests will fail without it.
 */
const contentFn = (Component, props = {}) => {
  return mount(
    <Component {...props}>
      <button role="tab">Tab 1</button>
    </Component>,
  );
};

describe('TabList', () => {
  testPresentationalComponent(TabList, { createContent: contentFn });

  describe('TabList orientation and keyboard navigation', () => {
    let fakeUseArrowKeyNavigation;

    beforeEach(() => {
      fakeUseArrowKeyNavigation = sinon.stub();
      $imports.$mock({
        '../../hooks/use-arrow-key-navigation': {
          useArrowKeyNavigation: fakeUseArrowKeyNavigation,
        },
      });
    });

    afterEach(() => {
      $imports.$restore();
    });

    it('sets `aria-orientation` to `horizontal` or `vertical` based on `vertical` prop', () => {
      const horizontalTabList = contentFn(TabList, {});
      const verticalTabList = contentFn(TabList, { vertical: true });

      assert.equal(
        horizontalTabList
          .find('[data-component="TabList"]')
          .getDOMNode()
          .getAttribute('aria-orientation'),
        'horizontal',
      );
      assert.equal(
        verticalTabList
          .find('[data-component="TabList"]')
          .getDOMNode()
          .getAttribute('aria-orientation'),
        'vertical',
      );
    });

    it('applies horizontal (left/right) keyboard navigation when horizontal', () => {
      contentFn(TabList, {});

      const navOpts = fakeUseArrowKeyNavigation.getCall(0).args[1];

      assert.include(navOpts, { horizontal: true, vertical: false });
    });

    it('applies horizontal and vertical (up/down) keyboard navigation when vertical', () => {
      contentFn(TabList, { vertical: true });

      const navOpts = fakeUseArrowKeyNavigation.getCall(0).args[1];

      assert.include(navOpts, { horizontal: true, vertical: true });
    });
  });
});
