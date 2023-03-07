import { mount } from 'enzyme';
import { createRef } from 'preact';

import { testPresentationalComponent } from '../../test/common-tests';
import Dialog from '../Dialog';

const createComponent = (Component, props = {}) => {
  return mount(
    <Component title="Test title" onClose={() => {}} {...props}>
      This is child content
    </Component>
  );
};

describe('Dialog', () => {
  testPresentationalComponent(Dialog, {
    createContent: createComponent,
    elementSelector: 'div[data-component="Dialog"]',
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

    it('focuses the element referred to by `initialFocus`', () => {
      const inputRef = createRef();

      mount(
        <Dialog initialFocus={inputRef} title="My dialog">
          <input ref={inputRef} />
        </Dialog>,
        { attachTo: container }
      );

      assert.equal(document.activeElement, inputRef.current);
    });

    it('focuses the dialog itself if `initialFocus` prop is missing', () => {
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

    it('does not set focus if `initialFocus` is set to "manual"', () => {
      const focusedBefore = document.activeElement;
      mount(
        <Dialog initialFocus={'manual'} title="My dialog">
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

  describe('closing the dialog', () => {
    it('closes when `ESC` pressed', () => {
      const onClose = sinon.stub();
      const container = document.createElement('div');
      document.body.appendChild(container);
      mount(
        <Dialog title="Test dialog" onClose={onClose}>
          This is my dialog
        </Dialog>,
        {
          attachTo: container,
        }
      );

      const event = new Event('keydown');
      event.key = 'Escape';
      document.body.dispatchEvent(event);
      assert.called(onClose);
      container.remove();
    });
  });

  describe('aria-describedby', () => {
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
  });

  describe('modal Dialogs', () => {
    let nonModalWrapper;
    let modalWrapper;

    beforeEach(() => {
      nonModalWrapper = mount(
        <Dialog title="My dialog">
          <p>Dialog content</p>
        </Dialog>
      );

      modalWrapper = mount(
        <Dialog title="My dialog" modal>
          <p>Modal Dialog content</p>
        </Dialog>
      );
    });

    it('should render a backdrop for modal dialogs', () => {
      assert.isFalse(nonModalWrapper.find('Overlay').exists());
      assert.isTrue(modalWrapper.find('Overlay').exists());
    });

    it('should set aria-modal for modal dialogs', () => {
      const nonModalContainer = nonModalWrapper
        .find('[role="dialog"]')
        .getDOMNode();
      const modalContainer = modalWrapper.find('[role="dialog"]').getDOMNode();

      assert.equal(nonModalContainer.getAttribute('aria-modal'), 'false');
      assert.equal(modalContainer.getAttribute('aria-modal'), 'true');
    });
  });
});
