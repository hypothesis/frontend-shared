import { mount } from 'enzyme';
import { createRef } from 'preact';

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
  it('applies `ref` via `elementRef`', () => {
    const elementRef = createRef();
    createComponent({ elementRef });

    assert.instanceOf(elementRef.current, Node);
  });

  it('applies supplied `className`', () => {
    const wrapper = createComponent({ className: 'testClass' });

    const allClasses = [...wrapper.childAt(0).getDOMNode().classList];

    assert.deepEqual(allClasses, ['testClass']);
  });

  it('applies HTML attributes to outer element', () => {
    const wrapperOuterEl = createComponent({ 'data-testid': 'foo-container' })
      .childAt(0)
      .getDOMNode();

    assert.isTrue(wrapperOuterEl.hasAttribute('data-testid'));
    assert.equal(wrapperOuterEl.getAttribute('data-testid'), 'foo-container');
  });

  // Tests specific to this base component
  it('adds common `rel` attributes', () => {
    const wrapper = createComponent();
    assert.equal(
      wrapper.find('a').first().getDOMNode().getAttribute('rel'),
      'noopener noreferrer'
    );
  });
});
