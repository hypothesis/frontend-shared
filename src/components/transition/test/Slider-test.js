import { mount } from '@hypothesis/frontend-testing';

import { testTransitionComponent } from '../../test/common-tests';
import Slider from '../Slider';

describe('Slider', () => {
  const createSlider = (props = {}) => {
    return mount(
      <Slider {...props}>
        <div style={{ width: 100, height: 200 }}>Test content</div>
      </Slider>,
      { connected: true },
    );
  };

  function triggerTransitionEnd(
    wrapper,
    target = undefined,
    propertyName = 'height',
  ) {
    const container = wrapper.find('div').first();
    container.prop('ontransitionend')({
      target: target ?? container.getDOMNode(),
      propertyName,
    });
    wrapper.update();
  }

  testTransitionComponent(Slider, {
    event: { propertyName: 'height' },
  });

  it('should render collapsed if `direction` is `out` on mount', () => {
    const wrapper = createSlider({ direction: 'out' });
    const { height } = wrapper.getDOMNode().getBoundingClientRect();
    assert.equal(height, 0);

    // The content shouldn't be rendered, so it doesn't appear in the keyboard
    // navigation order.
    assert.equal(wrapper.getDOMNode().style.display, 'none');
  });

  ['in', undefined].forEach(direction => {
    it('should render expanded if `direction` is `in` or not provided on mount', () => {
      const wrapper = createSlider({ direction });
      const { height } = wrapper.getDOMNode().getBoundingClientRect();
      assert.equal(height, 200);
    });
  });

  it('should transition to expanded if `direction` changes to `in`', () => {
    const wrapper = createSlider({ direction: 'out' });

    wrapper.setProps({ direction: 'in' });

    const containerStyle = wrapper.getDOMNode().style;
    assert.equal(containerStyle.height, '200px');
  });

  it('should transition to collapsed if `direction` changes to `out`', done => {
    const wrapper = createSlider({ direction: 'in' });

    wrapper.setProps({ direction: 'out' });

    setTimeout(() => {
      const containerStyle = wrapper.getDOMNode().style;
      assert.equal(containerStyle.height, '0px');
      done();
    }, 1);
  });

  it('should set the container height to "auto" when an expand transition finishes', () => {
    const wrapper = createSlider({ direction: 'out' });

    wrapper.setProps({ direction: 'in' });

    let containerStyle = wrapper.getDOMNode().style;
    assert.equal(containerStyle.height, '200px');

    triggerTransitionEnd(wrapper);

    containerStyle = wrapper.getDOMNode().style;
    assert.equal(containerStyle.height, 'auto');
  });

  it('should hide overflowing content when not fully expanded', () => {
    // When fully collapsed, overflow should be hidden.
    const wrapper = createSlider({ direction: 'out' });
    let containerStyle = wrapper.getDOMNode().style;
    assert.equal(containerStyle.overflow, 'hidden');

    // When starting to expand, or when collapsing, overflow should also be hidden.
    wrapper.setProps({ direction: 'in' });
    assert.equal(containerStyle.overflow, 'hidden');

    // When fully expanded, we make overflow visible to make focus rings or
    // other content which extends beyond the bounds of the Slider visible.
    triggerTransitionEnd(wrapper);
    containerStyle = wrapper.getDOMNode().style;
    assert.equal(containerStyle.overflow, 'visible');
  });

  it('should stop rendering content when a collapse transition finishes', () => {
    const wrapper = createSlider({ direction: 'in' });

    wrapper.setProps({ direction: 'out' });

    triggerTransitionEnd(wrapper);

    const containerStyle = wrapper.getDOMNode().style;
    assert.equal(containerStyle.display, 'none');
  });

  [
    [undefined, 'width'],
    ['foo', 'height'],
    ['foo', 'width'],
  ].forEach(([target, propertyName]) => {
    it('ignores not relevant transitions', () => {
      const onTransitionEnd = sinon.stub();
      const wrapper = createSlider({ direction: 'in', onTransitionEnd });

      triggerTransitionEnd(wrapper, target, propertyName);

      assert.notCalled(onTransitionEnd);
    });
  });
});
