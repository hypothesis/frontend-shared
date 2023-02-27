import { mount } from 'enzyme';
import { createRef } from 'preact';

import { checkAccessibility } from '../../../test/util/accessibility';
import mockImportedComponents from '../../../test/util/mock-imported-components';
import { IconButton, LabeledButton, LinkButton } from '../buttons.js';
import { $imports } from '../buttons.js';

// Add common tests for a button component for stuff provided by `ButtonBase`
function addCommonTests({ componentName, createComponentFn, withIcon = true }) {
  const className = `Hyp-${componentName}`;
  describe(`${componentName} common support`, () => {
    if (withIcon) {
      it('renders the indicated icon', () => {
        const wrapper = createComponentFn({ icon: 'fakeIcon' });
        const button = wrapper.find('button');
        const icon = wrapper.find('SvgIcon');
        assert.equal(icon.prop('name'), 'fakeIcon');
        // Icon is positioned "left" even if it is the only element in the <button>
        assert.isTrue(button.hasClass(`${className}--icon-left`));
      });
    }

    it('passes along a `ref` to the button element through `buttonRef`', () => {
      const buttonRef = createRef();
      createComponentFn({ buttonRef: buttonRef });

      assert.isTrue(buttonRef.current instanceof Node);
    });

    it('does not attach a `ref` to the button element when `buttonRef is undefined', () => {
      const buttonRef = createRef();
      createComponentFn({ buttonRef: undefined });

      assert.notExists(buttonRef.current);
    });

    it('invokes callback on click', () => {
      const onClick = sinon.stub();
      const wrapper = createComponentFn({ onClick });

      wrapper.find('button').simulate('click');
      assert.calledOnce(onClick);
    });

    it('uses an internal no-op callback if no `onClick` is provided', () => {
      // This test merely exercises the `onClick` prop default-value branch
      // in the code
      const wrapper = createComponentFn({ onClick: undefined });
      wrapper.find('button').simulate('click');
    });

    it('uses a default className', () => {
      const wrapper = createComponentFn();

      assert.isTrue(wrapper.find('button').hasClass(className));
    });

    ['primary', 'light', 'dark'].forEach(variant => {
      it('renders a valid variant', () => {
        const wrapper = createComponentFn({ variant });

        assert.isTrue(
          wrapper.find('button').hasClass(`${className}--${variant}`)
        );
      });
    });

    it('sets a `normal` variant modifier class by default', () => {
      const wrapper = createComponentFn();

      assert.isTrue(wrapper.find('button').hasClass(`${className}--normal`));
    });

    ['small', 'medium', 'large'].forEach(size => {
      it('renders a valid size', () => {
        const wrapper = createComponentFn({ size });

        assert.isTrue(wrapper.find('button').hasClass(`${className}--${size}`));
      });
    });

    it('sets a `medium` size modifier class by default', () => {
      const wrapper = createComponentFn();

      assert.isTrue(wrapper.find('button').hasClass(`${className}--medium`));
    });

    it('overrides className when provided', () => {
      const wrapper = createComponentFn({
        className: 'CustomClassName',
        variant: 'primary',
      });

      assert.isTrue(wrapper.find('button').hasClass('CustomClassName'));
      assert.isTrue(
        wrapper.find('button').hasClass('CustomClassName--primary')
      );
      assert.isFalse(wrapper.find('button').hasClass(className));
    });

    it('applies extra classes after component classes', () => {
      const wrapper = createComponentFn({ classes: 'foo bar' });

      const wrapperClasses = wrapper
        .find(`button.${className}.foo.bar`)
        .getDOMNode().classList;
      assert.equal(wrapperClasses.item(wrapperClasses.length - 1), 'bar');
      assert.equal(wrapperClasses.item(wrapperClasses.length - 2), 'foo');
    });

    it('adds inline styles when provided', () => {
      const wrapper = createComponentFn({ style: { backgroundColor: 'pink' } });

      assert.equal(
        wrapper.getDOMNode().getAttribute('style'),
        'background-color: pink;'
      );
    });

    it('sets `type` to "button" by default', () => {
      const wrapper = createComponentFn();
      assert.equal(wrapper.getDOMNode().type, 'button');
    });

    it('allows overriding type', () => {
      const wrapper = createComponentFn({ type: 'submit' });
      assert.equal(wrapper.getDOMNode().type, 'submit');
    });

    [
      {
        propName: 'expanded',
        propValue: true,
        attributeName: 'aria-expanded',
        attributeValue: 'true',
      },
      {
        propName: 'pressed',
        propValue: true,
        attributeName: 'aria-pressed',
        attributeValue: 'true',
      },
      {
        propName: 'title',
        propValue: 'Click here',
        attributeName: 'aria-label',
        attributeValue: 'Click here',
      },
      {
        propName: 'disabled',
        propValue: true,
        attributeName: 'disabled',
        attributeValue: '',
      },
      {
        propName: 'expanded',
        propValue: undefined,
        attributeName: 'aria-expanded',
        attributeValue: null,
      },
      {
        propName: 'pressed',
        propValue: undefined,
        attributeName: 'aria-pressed',
        attributeValue: null,
      },
      {
        propName: 'disabled',
        propValue: undefined,
        attributeName: 'disabled',
        attributeValue: null,
      },
    ].forEach(testCase => {
      it('sets attributes on the button element', () => {
        const wrapper = createComponentFn({
          [testCase.propName]: testCase.propValue,
        });

        const element = wrapper.find('button').getDOMNode();

        assert.equal(
          element.getAttribute(testCase.attributeName),
          testCase.attributeValue,
          testCase.attributeName
        );
      });
    });
  });

  it('provides appropriate aria attributes for buttons with role = "tab"', () => {
    const wrapper = createComponentFn({ role: 'tab', pressed: true });

    const element = wrapper.find('button').getDOMNode();
    assert.equal(element.getAttribute('aria-selected'), 'true');
    assert.isNull(element.getAttribute('aria-pressed'));
  });
}

describe('buttons', () => {
  let fakeOnClick;

  beforeEach(() => {
    fakeOnClick = sinon.stub();
    $imports.$mock(mockImportedComponents());
  });

  afterEach(() => {
    $imports.$restore();
  });

  describe('IconButton', () => {
    function createComponent(props = {}) {
      return mount(
        <IconButton
          icon="fakeIcon"
          title="My Action"
          onClick={fakeOnClick}
          {...props}
        />
      );
    }

    addCommonTests({
      componentName: 'IconButton',
      createComponentFn: createComponent,
    });

    it(
      'should pass a11y checks',
      checkAccessibility({
        content: () => createComponent(),
      })
    );
  });

  describe('LabeledButton', () => {
    function createComponent(props = {}) {
      return mount(
        <LabeledButton title="My Action" onClick={fakeOnClick} {...props}>
          Do this
        </LabeledButton>
      );
    }

    addCommonTests({
      componentName: 'LabeledButton',
      createComponentFn: createComponent,
    });

    it('renders the indicated icon on the right if `iconPosition` is `right`', () => {
      const wrapper = createComponent({
        icon: 'fakeIcon',
        iconPosition: 'right',
      });

      const icon = wrapper.find('SvgIcon');
      const button = wrapper.find('button');
      assert.equal(icon.prop('name'), 'fakeIcon');
      assert.isTrue(button.hasClass('Hyp-LabeledButton--icon-right'));
    });

    it('does not render an icon if none indicated', () => {
      // Icon not required for `LabeledButton`
      const wrapper = createComponent();

      const icon = wrapper.find('SvgIcon');
      assert.isFalse(icon.exists());
    });

    it('renders children', () => {
      const wrapper = createComponent();

      assert.equal(wrapper.text(), 'Do this');
    });

    it(
      'should pass a11y checks',
      checkAccessibility({
        content: () => createComponent(),
      })
    );
  });

  describe('LinkButton', () => {
    function createComponent(props = {}) {
      return mount(
        <LinkButton title="My Action" onClick={fakeOnClick} {...props}>
          Do this
        </LinkButton>
      );
    }

    addCommonTests({
      componentName: 'LinkButton',
      createComponentFn: createComponent,
      withIcon: false,
    });

    it('renders children', () => {
      const wrapper = createComponent();

      assert.equal(wrapper.text(), 'Do this');
    });

    it(
      'should pass a11y checks',
      checkAccessibility({
        content: () => createComponent(),
      })
    );
  });
});
