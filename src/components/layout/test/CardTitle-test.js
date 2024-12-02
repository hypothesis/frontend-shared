import { mount } from '@hypothesis/frontend-testing';

import { testPresentationalComponent } from '../../test/common-tests';
import CardTitle from '../CardTitle';

const createComponent = (Component, props = {}) => {
  return mount(<Component {...props}>This is child content</Component>);
};

describe('CardTitle', () => {
  testPresentationalComponent(CardTitle);

  describe('heading element tagName', () => {
    it('should wrap title in an `h1` by default', () => {
      const wrapper = createComponent(CardTitle);
      const headingEl = wrapper
        .find('[data-testid="card-title-heading"]')
        .getDOMNode();
      assert.equal(headingEl.tagName, 'H1');
    });

    it('should allow designation of other heading tags', () => {
      const wrapper = createComponent(CardTitle, { tagName: 'h3' });
      const headingEl = wrapper
        .find('[data-testid="card-title-heading"]')
        .getDOMNode();
      assert.equal(headingEl.tagName, 'H3');
    });
  });
});
