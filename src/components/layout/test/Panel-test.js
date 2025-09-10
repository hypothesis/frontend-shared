import { mount } from '@hypothesis/frontend-testing';

import { LoremIpsum } from '../../../pattern-library/components/patterns/samples';
import { EditIcon } from '../../icons';
import { testCompositeComponent } from '../../test/common-tests';
import Panel from '../Panel';

const createComponent = (Component, props = {}) => {
  return mount(
    <Component title="Test title" {...props}>
      This is child content
    </Component>,
  );
};

describe('Panel', () => {
  testCompositeComponent(Panel);

  it('renders an icon if one provided to `icon`', () => {
    const wrapper = createComponent(Panel, { icon: EditIcon });

    assert.isTrue(wrapper.find('EditIcon').exists());
  });

  it('renders a close button if `onClose` set', () => {
    const onClose = sinon.stub();
    const wrapper = createComponent(Panel, { onClose });

    wrapper.find('button').simulate('click');
    assert.calledOnce(onClose);
  });

  it('does not render a container for `buttons` if none provided', () => {
    const buttons = <button>click me</button>;
    const wrapper = createComponent(Panel, { buttons });
    const noButtonWrapper = createComponent(Panel);

    assert.isTrue(wrapper.find('[data-testid="panel-buttons"]').exists());
    assert.isFalse(
      noButtonWrapper.find('[data-testid="panel-buttons"]').exists(),
    );
  });

  it('renders `buttons` as CardActions', () => {
    const buttons = <button>click me</button>;
    const wrapper = createComponent(Panel, { buttons });

    assert.isTrue(wrapper.find('CardActions').exists());
    assert.equal(wrapper.find('CardActions').text(), 'click me');
  });

  context('when rendered in an element with constrained dimensions', () => {
    const prepareContainer = container => {
      container.style.height = '200px';
    };

    it('should not exceed height of parent container if `scrollable` is set', () => {
      const loremWrapper = mount(<LoremIpsum />, { connected: true });

      // The lorem ipsum content in the Panel will be constrained and will scroll
      // within the allotted 200px height
      const wrapper = mount(
        <Panel title="Constrained Panel" scrollable>
          <LoremIpsum />
        </Panel>,
        { connected: true, prepareContainer },
      );

      // Lorem ipsum rendered without constraints will take up more than 200
      // vertical pixels
      assert.isTrue(loremWrapper.find('p').getDOMNode().clientHeight > 200);
      // But when in a Panel, and the Panel is within a height-constrained
      // element, the total Panel height will not exceed parent height (200px)
      assert.isBelow(
        wrapper.find('div[data-composite-component="Panel"]').getDOMNode()
          .clientHeight,
        200,
      );
    });

    it('should not constrain content if `scrollable` is not set', () => {
      const wrapper = mount(
        <Panel title="Unconstrained Panel">
          <LoremIpsum />
        </Panel>,
        { connected: true, prepareContainer },
      );

      assert.isAbove(
        wrapper.find('div[data-component="CardContent"] p').first().getDOMNode()
          .clientHeight,
        200,
      );
    });

    it('should not wrap content in `CardContent` if paddingSize is `none`', () => {
      const wrapper = createComponent(Panel);
      const noPaddingWrapper = createComponent(Panel, { paddingSize: 'none' });

      assert.isTrue(
        wrapper.find('[data-testid="panel-content-wrapper"]').exists(),
      );
      assert.isFalse(
        noPaddingWrapper.find('[data-testid="panel-content-wrapper"]').exists(),
      );
    });
  });
});
