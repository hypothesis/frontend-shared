import { mount } from 'enzyme';
import { createRef } from 'preact';

import { Dialog } from '../Dialog';
import { checkAccessibility } from '../../../test/util/accessibility';

describe('Dialog', () => {
  it('renders content', () => {
    const wrapper = mount(
      <Dialog>
        <span>content</span>
      </Dialog>
    );
    assert.isTrue(wrapper.contains(<span>content</span>));
  });

  it('adds `contentClass` value to class list', () => {
    const wrapper = mount(
      <Dialog title="test" contentClass="foo">
        <span>content</span>
      </Dialog>
    );
    assert.isTrue(wrapper.find('.Hyp-Dialog').hasClass('foo'));
  });

  it('renders buttons', () => {
    const wrapper = mount(
      <Dialog
        title="My dialog"
        buttons={[
          <button key="foo" name="foo" />,
          <button key="bar" name="bar" />,
        ]}
      />
    );
    assert.isTrue(wrapper.contains(<button key="foo" name="foo" />));
    assert.isTrue(wrapper.contains(<button key="bar" name="bar" />));
  });

  it('renders the title', () => {
    const wrapper = mount(<Dialog title="Test dialog" />);
    const header = wrapper.find('header');
    assert.equal(header.text().indexOf('Test dialog'), 0);
  });

  it('renders an icon', () => {
    const wrapper = mount(<Dialog title="Test dialog" icon="hyp-test" />);
    const icon = wrapper.find('SvgIcon[data-testid="header-icon"]');
    assert.isTrue(icon.exists());
  });

  it('closes when close button is clicked', () => {
    const onCancel = sinon.stub();
    const wrapper = mount(<Dialog title="Test dialog" onCancel={onCancel} />);

    wrapper
      .find('LabeledButton[data-testid="cancel-button"]')
      .props()
      .onClick();

    assert.called(onCancel);
  });

  it(`defaults cancel button's label to "Cancel"`, () => {
    const wrapper = mount(<Dialog onCancel={sinon.stub()} />);
    assert.equal(
      wrapper.find('LabeledButton[data-testid="cancel-button"]').text().trim(),
      'Cancel'
    );
  });

  it('adds a custom label to the cancel button', () => {
    const wrapper = mount(
      <Dialog onCancel={sinon.stub()} cancelLabel="hello" />
    );
    assert.equal(
      wrapper.find('LabeledButton[data-testid="cancel-button"]').text().trim(),
      'hello'
    );
  });

  describe('initial focus', () => {
    let container;

    beforeEach(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
    });

    afterEach(() => {
      container.remove();
    });

    it('focuses the `initialFocus` element', () => {
      const inputRef = createRef();

      mount(
        <Dialog initialFocus={inputRef} title="My dialog">
          <input ref={inputRef} />
        </Dialog>,
        { attachTo: container }
      );

      assert.equal(document.activeElement, inputRef.current);
    });

    it('focuses the dialog if `initialFocus` prop is missing', () => {
      const wrapper = mount(
        <Dialog title="My dialog">
          <div>Test</div>
        </Dialog>,
        { attachTo: container }
      );

      assert.equal(
        document.activeElement,
        wrapper.find('[role="dialog"]').getDOMNode()
      );
    });

    it('does not set focus if `initialFocus` is set to `null`', () => {
      const focusedBefore = document.activeElement;
      mount(
        <Dialog initialFocus={null} title="My dialog">
          <div>Test</div>
        </Dialog>,
        { attachTo: container }
      );

      assert.equal(document.activeElement, focusedBefore);
    });

    it('focuses the dialog if `initialFocus` element is disabled', () => {
      const inputRef = createRef();

      const wrapper = mount(
        <Dialog initialFocus={inputRef} title="My dialog">
          <button ref={inputRef} disabled={true} />
        </Dialog>,
        { attachTo: container }
      );

      assert.equal(
        document.activeElement,
        wrapper.find('[role="dialog"]').getDOMNode()
      );
    });
  });

  it("marks the first `<p>` in the dialog's content as the accessible description", () => {
    const wrapper = mount(
      <Dialog title="My dialog">
        <p>Enter a URL</p>
      </Dialog>
    );
    const content = wrapper.find('[role="dialog"]').getDOMNode();
    const paragraphEl = wrapper.find('p').getDOMNode();

    assert.ok(content.getAttribute('aria-describedby'));
    assert.equal(content.getAttribute('aria-describedby'), paragraphEl.id);
  });

  it("does not set an accessible description if the dialog's content does not have a `<p>`", () => {
    const wrapper = mount(
      <Dialog title="My dialog">
        <button>Click me</button>
      </Dialog>
    );
    const content = wrapper.find('[role="dialog"]').getDOMNode();
    assert.isNull(content.getAttribute('aria-describedby'));
  });

  it(
    'should pass a11y checks',
    checkAccessibility({
      // eslint-disable-next-line react/display-name
      content: () => (
        <Dialog title="Test dialog">
          <div>test</div>
        </Dialog>
      ),
    })
  );
});
