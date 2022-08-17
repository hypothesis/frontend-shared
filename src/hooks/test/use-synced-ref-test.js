import { mount } from 'enzyme';
import { useEffect } from 'preact/hooks';

import { useSyncedRef } from '../use-synced-ref';

function Widget({ elementRef, visible, onRender }) {
  const ref = useSyncedRef(elementRef);

  assert.equal(ref.target, elementRef);

  useEffect(() => {
    onRender?.(ref.current);
  });

  if (!visible) {
    return null;
  }

  return <div ref={ref}>Test</div>;
}

describe('useSyncedRef', () => {
  it('updates target object ref with current ref value', () => {
    const ref = { current: null };

    const widget = mount(<Widget elementRef={ref} visible />);
    assert.instanceOf(ref.current, HTMLElement);

    widget.setProps({ elementRef: ref, visible: false });
    assert.isNull(ref.current);
  });

  it('updates new target object ref with current ref value', () => {
    const refA = { current: null };
    const refB = { current: null };

    const widget = mount(<Widget elementRef={refA} visible />);
    assert.instanceOf(refA.current, HTMLElement);

    widget.setProps({ elementRef: refB, visible: true });
    assert.instanceOf(refB.current, HTMLElement);
  });

  it('updates target callback ref with current ref value', () => {
    let refValue;
    const ref = value => (refValue = value);

    const widget = mount(<Widget elementRef={ref} visible />);
    assert.instanceOf(refValue, HTMLElement);

    widget.setProps({ elementRef: ref, visible: false });
    assert.isNull(refValue);
  });

  it('updates new target callback ref with current ref value', () => {
    let refValueA;
    const refA = value => (refValueA = value);
    let refValueB;
    const refB = value => (refValueB = value);

    const widget = mount(<Widget elementRef={refA} visible />);
    assert.instanceOf(refValueA, HTMLElement);

    widget.setProps({ elementRef: refB, visible: true });
    assert.instanceOf(refValueB, HTMLElement);
  });

  it('does not update target ref on render if target and ref are unchanged', () => {
    let updateCount = 0;
    const ref = {
      get current() {
        return this._current;
      },
      set current(value) {
        ++updateCount;
        this._current = value;
      },
    };

    const widget = mount(<Widget elementRef={ref} visible />);
    assert.equal(updateCount, 1);

    widget.setProps({ elementRef: ref, visible: true });
    assert.equal(updateCount, 1);

    widget.unmount();
    assert.equal(updateCount, 2);
  });

  it('does not invoke target ref on render if target and ref are unchanged', () => {
    let updateCount = 0;
    const ref = () => ++updateCount;

    const widget = mount(<Widget elementRef={ref} visible />);
    assert.equal(updateCount, 1);

    widget.setProps({ elementRef: ref, visible: true });
    assert.equal(updateCount, 1);

    widget.unmount();
    assert.equal(updateCount, 2);
  });

  it('acts like a normal object ref if no target is provided', () => {
    let refValue;
    const onRender = element => (refValue = element);

    const widget = mount(<Widget visible={true} onRender={onRender} />);
    assert.instanceOf(refValue, HTMLElement);

    widget.setProps({ onRender, visible: false });
    assert.isNull(refValue);
  });
});
