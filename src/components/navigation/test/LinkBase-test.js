import { mount } from 'enzyme';

import { testBaseComponent } from '../../test/common-tests';

import LinkBase from '../LinkBase';

describe('LinkBase', () => {
  const createComponent = (props = {}) => {
    return mount(
      <LinkBase href="http://www.example.com" {...props}>
        This is content inside of a Link
      </LinkBase>
    );
  };

  // Tests common to base components
  testBaseComponent(LinkBase);

  // Tests specific to this base component
  it('adds common `rel` attributes', () => {
    const wrapper = createComponent();
    assert.equal(
      wrapper.find('a').first().getDOMNode().getAttribute('rel'),
      'noopener noreferrer'
    );
  });
});
