import { mount } from 'enzyme';
import { createRef } from 'preact';

import { Link } from '../Link';

describe('Link', () => {
  const createComponent = (props = {}) => {
    return mount(
      <Link href="http://www.example.com" {...props}>
        This is content inside of a Link
      </Link>
    );
  };

  it('renders children with appropriate classnames', () => {
    const wrapper = createComponent();

    assert.isTrue(wrapper.find('a').first().hasClass('Hyp-Link'));
  });

  it('applies extra classes', () => {
    const wrapper = createComponent({ classes: 'foo bar' });
    assert.deepEqual(
      [...wrapper.find(`a.Hyp-Link.foo.bar`).getDOMNode().classList.values()],
      ['Hyp-Link', 'foo', 'bar']
    );
  });

  it('passes along a `ref` to the `a` element through `linkRef`', () => {
    const linkRef = createRef();
    createComponent({ linkRef });

    assert.instanceOf(linkRef.current, Node);
  });

  it('adds common `rel` attributes', () => {
    const wrapper = createComponent();
    assert.equal(
      wrapper.find('a').first().getDOMNode().getAttribute('rel'),
      'noopener noreferrer'
    );
  });
});
