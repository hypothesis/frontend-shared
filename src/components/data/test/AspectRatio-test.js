import { mount } from 'enzyme';

import { testSimpleComponent } from '../../test/common-tests';

import AspectRatio from '../AspectRatio';

const createComponent = (Component, props = {}) => {
  return mount(<Component {...props} />);
};

describe('AspectRatio', () => {
  testSimpleComponent(AspectRatio);

  it('applies bottom-padding to container based on `ratio` value', () => {
    const wrapper16_9 = createComponent(AspectRatio, {
      children: <img src="https://placekitten.com/400/400" alt="kitty" />,
    });

    const wrapper4_3 = createComponent(AspectRatio, {
      children: <img src="https://placekitten.com/400/400" alt="kitty" />,
      ratio: '4/3',
    });

    assert.include(
      wrapper16_9
        .find('[data-component="AspectRatio"]')
        .getDOMNode()
        .getAttribute('style'),
      'padding-bottom: calc(56.25%)'
    );

    assert.include(
      wrapper4_3
        .find('[data-component="AspectRatio"]')
        .getDOMNode()
        .getAttribute('style'),
      'padding-bottom: calc(75%)'
    );
  });

  it('retains original classes on first direct child', () => {
    const wrapper = createComponent(AspectRatio, {
      children: (
        <img
          src="https://placekitten.com/400/400"
          alt="kitty"
          className="object-top"
        />
      ),
    });

    // Assigned when cloning the element (by the component)
    assert.isTrue(wrapper.find('img').hasClass('absolute'));

    // From the original node
    assert.isTrue(wrapper.find('img').hasClass('object-top'));
  });
});
