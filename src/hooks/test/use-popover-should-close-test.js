import { mount } from 'enzyme';
import { useRef } from 'preact/hooks';

import usePopoverShouldClose, { $imports } from '../use-popover-should-close';

describe('usePopoverShouldClose', () => {
  function FakeComponent({ closeHandler, options }) {
    const popoverEl = useRef();

    usePopoverShouldClose(popoverEl, closeHandler, options);

    return <div ref={popoverEl} />;
  }

  let fakeUseClickAway;
  let fakeUseFocusAway;
  let fakeUseKeyPress;

  beforeEach(() => {
    fakeUseClickAway = sinon.stub();
    fakeUseFocusAway = sinon.stub();
    fakeUseKeyPress = sinon.stub();

    $imports.$mock({
      './use-click-away': {
        useClickAway: fakeUseClickAway,
      },
      './use-focus-away': {
        useFocusAway: fakeUseFocusAway,
      },
      './use-key-press': {
        useKeyPress: fakeUseKeyPress,
      },
    });
  });

  afterEach(() => {
    $imports.$restore();
  });

  function createElement(closeHandler, options) {
    return mount(
      <FakeComponent closeHandler={closeHandler} options={options} />,
    );
  }

  [{ enabled: true }, { enabled: false }, undefined].forEach(options => {
    it('combines useClickAway, useFocusAway and useKeyPress', () => {
      const closeHandler = sinon.stub();

      createElement(closeHandler, options);

      assert.calledWith(
        fakeUseClickAway,
        sinon.match.any,
        closeHandler,
        options ?? {},
      );
      assert.calledWith(
        fakeUseFocusAway,
        sinon.match.any,
        closeHandler,
        options ?? {},
      );
      assert.calledWith(
        fakeUseKeyPress,
        ['Escape'],
        closeHandler,
        options ?? {},
      );
    });
  });
});
