import { mount } from '@hypothesis/frontend-testing';

import {
  testPresentationalComponent,
  testStyledComponent,
} from '../../test/common-tests';
import Callout from '../Callout';

const createComponent = (Component, props = {}) => {
  return mount(<Component {...props}>This is a callout</Component>);
};

function FakeIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      aria-hidden="true"
      viewBox="0 0 16 16"
      data-component="FakeIcon"
      {...props}
    >
      <g fill="none">
        <path d="M0 0h16v16H0z" />
        <path stroke="currentColor" d="M10 12 6 8l4-4" />
      </g>
    </svg>
  );
}

describe('Callout', () => {
  testPresentationalComponent(Callout);
  // This component does support the `size` prop, but setting it to `custom`
  // does not change classes applied to the primary element, which makes the
  // common size-prop test fail. Size is tested below.
  testStyledComponent(Callout, { supportedProps: ['variant', 'unstyled'] });

  describe('icons', () => {
    it('renders appropriate icon for status', () => {
      const notice = createComponent(Callout, { status: 'notice' });
      const error = createComponent(Callout, { status: 'error' });
      const success = createComponent(Callout, { status: 'success' });

      assert.isTrue(notice.find('CautionIcon').exists());
      assert.isTrue(error.find('CancelIcon').exists());
      assert.isTrue(success.find('CheckIcon').exists());
    });

    it('renders a custom icon if provided', () => {
      const wrapper = createComponent(Callout, {
        icon: FakeIcon,
        status: 'error',
      });
      assert.isTrue(wrapper.find('[data-component="FakeIcon"]').exists());
    });

    it('does not render an icon if styling is customized', () => {
      const iconSelector = '[data-testid="callout-icon"]';
      const defaultStyled = createComponent(Callout);
      const unsized = createComponent(Callout, { size: 'custom' });
      const unthemed = createComponent(Callout, { variant: 'custom' });
      const unstyled = createComponent(Callout, { unstyled: true });
      const withCustomIcon = createComponent(Callout, {
        unstyled: true,
        icon: FakeIcon,
      });

      assert.isTrue(defaultStyled.find(iconSelector).exists());

      assert.isFalse(unsized.find(iconSelector).exists());
      assert.isFalse(unthemed.find(iconSelector).exists());
      assert.isFalse(unstyled.find(iconSelector).exists());
      assert.isFalse(withCustomIcon.find(iconSelector).exists());
      assert.isFalse(
        withCustomIcon.find('[data-component="FakeIcon"]').exists(),
      );
    });
  });
});
