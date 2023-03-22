import { mount } from 'enzyme';

import { testCompositeComponent } from '../../test/common-tests';
import ModalDialog from '../ModalDialog';
import { $imports } from '../ModalDialog';

const createComponent = (Component, props = {}) => {
  return mount(
    <Component title="Test title" onClose={() => {}} {...props}>
      This is child content
    </Component>
  );
};

describe('ModalDialog', () => {
  let fakeUseTabKeyNavigation;

  beforeEach(() => {
    fakeUseTabKeyNavigation = sinon.stub();
    $imports.$mock({
      '../../hooks/use-tab-key-navigation': {
        useTabKeyNavigation: fakeUseTabKeyNavigation,
      },
    });
  });

  testCompositeComponent(ModalDialog, {
    createContent: createComponent,
    // ModalDialog's primary component element is its wrapped Dialog
    elementSelector: 'Dialog',
    // But the composite component is identified on the wrapping Overlay
    wrapperSelector: 'Overlay',
  });

  afterEach(() => {
    $imports.$restore();
  });

  describe('closing the modal dialog', () => {
    it('closes on ESC by default, but not on away-focus or away-click', () => {
      const wrapper = mount(
        <ModalDialog title="Test modal dialog">This is my dialog</ModalDialog>
      );
      const dialogProps = wrapper.find('Dialog').props();
      assert.isTrue(dialogProps.closeOnEscape);
      assert.isFalse(dialogProps.closeOnClickAway);
      assert.isFalse(dialogProps.closeOnFocusAway);
    });
  });

  describe('restoring focus', () => {
    it('restores focus by default', () => {
      const wrapper = mount(
        <ModalDialog title="Test modal dialog">This is my dialog</ModalDialog>
      );
      const dialogProps = wrapper.find('Dialog').props();
      assert.isTrue(dialogProps.restoreFocus);
    });
  });

  describe('trapping focus', () => {
    it('traps focus by default', () => {
      mount(
        <ModalDialog title="Test modal dialog">This is my dialog</ModalDialog>
      );
      assert.deepEqual(fakeUseTabKeyNavigation.lastCall.args[1], {
        enabled: true,
      });
    });

    it('allows disabling of focus trap', () => {
      mount(
        <ModalDialog title="Test modal dialog" disableFocusTrap>
          This is my dialog
        </ModalDialog>
      );
      assert.deepEqual(fakeUseTabKeyNavigation.lastCall.args[1], {
        enabled: false,
      });
    });
  });
});
