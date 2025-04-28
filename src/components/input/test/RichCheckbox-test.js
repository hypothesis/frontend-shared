import { checkAccessibility, mount } from '@hypothesis/frontend-testing';

import RichCheckbox from '../RichCheckbox';

describe('RichCheckbox', () => {
  let fakeOnChange;

  beforeEach(() => {
    fakeOnChange = sinon.stub();
  });

  function createComponent(props = {}) {
    return mount(
      <RichCheckbox checked onChange={fakeOnChange} {...props}>
        This is child content
      </RichCheckbox>,
    );
  }

  const getCheckbox = wrapper => wrapper.find('[role="checkbox"]');

  [
    { checked: false, expectedIcon: 'CheckboxIcon' },
    { checked: true, expectedIcon: 'CheckboxCheckedFilledIcon' },
  ].forEach(({ checked, expectedIcon }) => {
    it('shows the right icon depending on the checked state', () => {
      const wrapper = createComponent({ checked });
      assert.isTrue(wrapper.exists(expectedIcon));
    });

    it('sets matching checked prop and aria-checked attribute', () => {
      const wrapper = createComponent({ checked });
      assert.equal(getCheckbox(wrapper).prop('aria-checked'), checked);
    });

    it('calls onChange when clicked', () => {
      const wrapper = createComponent({ checked });

      assert.notCalled(fakeOnChange);
      getCheckbox(wrapper).simulate('click');
      assert.calledWith(fakeOnChange, !checked);
    });
  });

  ['Enter', ' '].forEach(key => {
    it('calls onChange when Enter or Space are pressed', () => {
      const wrapper = createComponent();

      assert.notCalled(fakeOnChange);
      getCheckbox(wrapper).simulate('keydown', { key });
      assert.calledWith(fakeOnChange, false);
    });
  });

  it('does not call onChange when keys other than Enter or Space are pressed', () => {
    const wrapper = createComponent();

    getCheckbox(wrapper).simulate('keydown', { key: 'A' });
    assert.notCalled(fakeOnChange);
  });

  [{ subtitle: 'Hello world' }, { subtitle: undefined }].forEach(
    ({ subtitle }) => {
      it('shows subtitle only when provided', () => {
        const wrapper = createComponent({ subtitle });
        assert.equal(wrapper.exists('[data-testid="subtitle"]'), !!subtitle);
      });
    },
  );

  it(
    'should pass a11y checks',
    checkAccessibility({
      content: createComponent,
    }),
  );
});
