import { mount } from 'enzyme';

import { ProfileIcon } from '../../icons';
import {
  testPresentationalComponent,
  testStyledComponent,
} from '../../test/common-tests';
import Tab from '../Tab';

const contentFn = (Component, props = {}) => {
  return mount(
    <div role="tablist">
      <Component {...props}>This is child content</Component>
    </div>,
  );
};

describe('Tab', () => {
  testPresentationalComponent(Tab, {
    createContent: contentFn,
    elementSelector: 'button[data-component="Tab"]',
  });
  testStyledComponent(Tab);

  it('sets `aria-selected` when selected', () => {
    const tab1 = contentFn(Tab, { selected: true });
    const tab2 = contentFn(Tab, { selected: false });

    assert.equal(
      tab1.find('button').getDOMNode().getAttribute('aria-selected'),
      'true',
    );
    assert.equal(
      tab2.find('button').getDOMNode().getAttribute('aria-selected'),
      'false',
    );
  });

  it('sets content data attribute on sizing span when `textContent` provided', () => {
    const wrapper = contentFn(Tab, { textContent: 'Tab Label' });
    assert.equal(
      wrapper
        .find('[data-testid="sizing-wrapper"]')
        .getDOMNode()
        .getAttribute('data-content'),
      'Tab Label',
    );
  });

  it('renders an icon when provided', () => {
    const wrapper = contentFn(Tab, { icon: ProfileIcon });

    assert.isTrue(wrapper.find('ProfileIcon').exists());
  });
});
