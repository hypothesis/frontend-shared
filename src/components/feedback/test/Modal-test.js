import { mount } from 'enzyme';
import { createRef } from 'preact';

import { testPresentationalComponent } from '../../test/common-tests';

import Modal from '../Modal';

const createComponent = (Component, props = {}) => {
  return mount(
    <Component title="Test title" onClose={() => {}} {...props}>
      This is child content
    </Component>
  );
};

describe('Modal', () => {
  testPresentationalComponent(Modal, {
    createContent: createComponent,
    elementSelector: 'div[data-component="Modal"]',
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
        <Modal initialFocus={inputRef} title="My modal">
          <input ref={inputRef} />
        </Modal>,
        { attachTo: container }
      );

      assert.equal(document.activeElement, inputRef.current);
    });

    it('focuses the modal itself if `initialFocus` prop is missing', () => {
      const wrapper = mount(
        <Modal title="My modal">
          <div>Test</div>
        </Modal>,
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
        <Modal initialFocus={null} title="My modal">
          <div>Test</div>
        </Modal>,
        { attachTo: container }
      );

      assert.equal(document.activeElement, focusedBefore);
    });

    it('focuses the modal if `initialFocus` element is disabled', () => {
      const inputRef = createRef();

      const wrapper = mount(
        <Modal initialFocus={inputRef} title="My modal">
          <button ref={inputRef} disabled={true} />
        </Modal>,
        { attachTo: container }
      );

      assert.equal(
        document.activeElement,
        wrapper.find('[role="dialog"]').getDOMNode()
      );
    });
  });

  describe('closing the modal', () => {
    it('closes when `ESC` pressed', () => {
      const onClose = sinon.stub();
      const container = document.createElement('div');
      document.body.appendChild(container);
      mount(
        <Modal title="Test modal" onClose={onClose}>
          This is my modal
        </Modal>,
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
    it("marks the first `<p>` in the modal's content as the accessible description", () => {
      const wrapper = mount(
        <Modal title="My modal">
          <p>Enter a URL</p>
        </Modal>
      );
      const content = wrapper.find('[role="dialog"]').getDOMNode();
      const paragraphEl = wrapper.find('p').getDOMNode();

      assert.ok(content.getAttribute('aria-describedby'));
      assert.equal(content.getAttribute('aria-describedby'), paragraphEl.id);
    });

    it("does not set an accessible description if the modal's content does not have a `<p>`", () => {
      const wrapper = mount(
        <Modal title="My modal">
          <button>Click me</button>
        </Modal>
      );
      const content = wrapper.find('[role="dialog"]').getDOMNode();
      assert.isNull(content.getAttribute('aria-describedby'));
    });
  });
});
