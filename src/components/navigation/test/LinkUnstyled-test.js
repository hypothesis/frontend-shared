import { mount } from 'enzyme';
import { createRef } from 'preact';

import LinkUnstyled from '../LinkUnstyled';

describe('LinkUnstyled', () => {
  const createComponent = (props = {}) => {
    return mount(
      <LinkUnstyled href="http://www.example.com" {...props}>
        This is content inside of a Link
      </LinkUnstyled>
    );
  };

  // Tests common to presentational components
  it('applies extra classes', () => {
    const wrapper = createComponent({ classes: 'foo bar' });
    const allClasses = [...wrapper.childAt(0).getDOMNode().classList];
    assert.equal(allClasses.at(-2), 'foo');
    assert.equal(allClasses.at(-1), 'bar');
  });

  it('applies `ref` via `elementRef`', () => {
    const elementRef = createRef();
    createComponent({ elementRef });

    assert.instanceOf(elementRef.current, Node);
  });

  it('overrides disallowed `className` prop', () => {
    const wrapper = createComponent({ className: 'verboten' });

    assert.isFalse(wrapper.childAt(0).hasClass('verboten'));
  });

  it('applies HTML attributes to outer element', () => {
    const wrapperOuterEl = createComponent({ 'data-testid': 'foo-container' })
      .childAt(0)
      .getDOMNode();

    assert.isTrue(wrapperOuterEl.hasAttribute('data-testid'));
    assert.equal(wrapperOuterEl.getAttribute('data-testid'), 'foo-container');
  });
});
