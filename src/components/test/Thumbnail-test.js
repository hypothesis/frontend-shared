import { mount } from 'enzyme';

import { checkAccessibility } from '../../../test/util/accessibility';
import { Thumbnail } from '../Thumbnail';

describe('Thumbnail', () => {
  const createComponent = (props = {}) =>
    mount(
      <Thumbnail {...props}>
        <img src="http://placekitten.com/200/300" alt="kitty" />
      </Thumbnail>
    );

  const createEmptyComponent = (props = {}) => mount(<Thumbnail {...props} />);

  it('renders', () => {
    const wrapper = createComponent();

    assert.isTrue(wrapper.find('div.Hyp-Thumbnail').exists());
  });

  it('applies additional classes', () => {
    const wrapper = createComponent({ classes: 'foo bar' });
    assert.isTrue(wrapper.find('div.Hyp-Thumbnail.foo.bar').exists());
  });

  context('when in loading state', () => {
    it('renders a loading spinner', () => {
      const wrapper = createComponent({ isLoading: true });
      assert.isTrue(wrapper.find('Spinner').exists());
    });

    it('does not render content', () => {
      const wrapper = createComponent({ isLoading: true });
      assert.isFalse(wrapper.find('img').exists());
    });

    it('applies size to loading spinner', () => {
      const wrapper = createComponent({ isLoading: true, size: 'large' });
      const spinner = wrapper.find('Spinner');
      assert.equal(spinner.props().size, 'large');
    });
  });

  context('when empty', () => {
    it('renders default placeholder', () => {
      const wrapper = createEmptyComponent();
      assert.equal(wrapper.text(), '...');
    });

    it('renders the provided placeholder', () => {
      const wrapper = createEmptyComponent({ placeholder: '!' });
      assert.equal(wrapper.text(), '!');
    });

    it('does not render a placeholder when in loading state', () => {
      const wrapper = createComponent({ isLoading: true, placeholder: '!' });
      assert.notInclude(wrapper.text(), '!');
    });
  });

  it(
    'should pass a11y checks',
    checkAccessibility({
      content: () => createComponent(),
    })
  );
});
