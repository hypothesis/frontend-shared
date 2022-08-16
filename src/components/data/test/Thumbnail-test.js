import { mount } from 'enzyme';

import { testCompositeComponent } from '../../test/common-tests';

import Thumbnail from '../Thumbnail';

const createComponent = (Component, props = {}) => {
  return mount(<Component {...props} />);
};

describe('Thumbnail', () => {
  testCompositeComponent(Thumbnail);

  it('disables container border when `borderless` is set', () => {
    const withBorder = createComponent(Thumbnail);
    const withoutBorder = createComponent(Thumbnail, { borderless: true });

    // The "border" on Thumbnails is formed by padding classes. Default
    // padding size ("md" size) is `p-3`. The absence of padding means there
    // is no border.
    assert.isFalse(
      withBorder.find('[data-composite-component="Thumbnail"]').hasClass('p-0')
    );
    assert.isTrue(
      withoutBorder
        .find('[data-composite-component="Thumbnail"]')
        .hasClass('p-0')
    );
  });

  it('shows a loading spinner when `loading` is set', () => {
    const wrapper = createComponent(Thumbnail, { loading: true });
    assert.isTrue(wrapper.find('Spinner').exists());
    // Default size is `md`
    assert.equal(wrapper.find('Spinner').props().size, 'md');
  });

  it('renders placeholder content when empty', () => {
    const wrapper = createComponent(Thumbnail, {
      placeholder: <p id="placeholder">custom placeholder</p>,
    });
    assert.isTrue(wrapper.find('#placeholder').exists());
  });

  it('sets ratio on content', () => {
    const wrapper = createComponent(Thumbnail, {
      children: <img src="https://placekitten.com/300/300" alt="kitty" />,
      ratio: '4/3',
    });

    assert.equal(wrapper.find('AspectRatio').props().ratio, '4/3');
  });
});
