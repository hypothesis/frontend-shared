import { mount } from 'enzyme';
import { createRef } from 'preact';

import Link from '../Link';

describe('Link', () => {
  const createComponent = (props = {}) => {
    return mount(
      <Link href="http://www.example.com" {...props}>
        This is content inside of a Link
      </Link>
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

  // Tests specific to this component
  it('styles link color', () => {
    const defaultOuter = createComponent().find('a');
    const textOuter = createComponent({ color: 'text' }).find('a');
    const lightOuter = createComponent({ color: 'text-light' }).find('a');

    assert.isTrue(defaultOuter.hasClass('text-brand'));
    assert.isTrue(defaultOuter.hasClass('hover:text-brand-dark'));

    assert.isTrue(textOuter.hasClass('text-color-text'));
    assert.isTrue(textOuter.hasClass('hover:text-brand-dark'));

    assert.isTrue(lightOuter.hasClass('text-color-text-light'));
    assert.isTrue(lightOuter.hasClass('hover:text-brand'));
  });

  it('styles link underline', () => {
    const defaultOuter = createComponent().find('a');
    const hoverOuter = createComponent({ underline: 'hover' }).find('a');
    const alwaysOuter = createComponent({ underline: 'always' }).find('a');

    assert.isTrue(defaultOuter.hasClass('no-underline'));
    assert.isTrue(defaultOuter.hasClass('hover:no-underline'));

    assert.isTrue(hoverOuter.hasClass('no-underline'));
    assert.isTrue(hoverOuter.hasClass('hover:underline'));

    assert.isTrue(alwaysOuter.hasClass('underline'));
    assert.isTrue(alwaysOuter.hasClass('hover:underline'));
  });
});
