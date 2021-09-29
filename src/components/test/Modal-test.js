import { mount } from 'enzyme';
import { act } from 'preact/test-utils';

import { ConfirmModal, Modal } from '../Modal';

describe('Modal', () => {
  function createComponent(props = {}) {
    return mount(
      <Modal title="My modal" onCancel={sinon.stub()} {...props}>
        This is my modal
      </Modal>
    );
  }

  it('renders a dialog for the modal', () => {
    const wrapper = createComponent();
    assert.isTrue(wrapper.find('Dialog').exists());
    assert.equal(wrapper.find('Dialog').props().title, 'My modal');
  });

  describe('closing the modal', () => {
    it('closes when `ESC` pressed if `onCancel` is provided', () => {
      const onCancel = sinon.stub();
      const container = document.createElement('div');
      document.body.appendChild(container);
      mount(
        <Modal title="Test dialog" onCancel={onCancel}>
          This is my modal
        </Modal>,
        {
          attachTo: container,
        }
      );

      const event = new Event('keydown');
      event.key = 'Escape';
      document.body.dispatchEvent(event);
      assert.called(onCancel);
      container.remove();
    });

    it('closes on external click if `onCancel` is provided', () => {
      const onCancel = sinon.stub();
      const container = document.createElement('div');
      document.body.appendChild(container);
      mount(
        <Modal title="Test dialog" onCancel={onCancel}>
          This is my modal
        </Modal>,
        {
          attachTo: container,
        }
      );

      const event = new Event('mousedown');
      document.body.dispatchEvent(event);
      assert.called(onCancel);
      container.remove();
    });

    it('does not close on external click if `closeOnExternalInteraction` disabled', () => {
      const onCancel = sinon.stub();
      const container = document.createElement('div');
      document.body.appendChild(container);
      mount(
        <Modal
          title="Test dialog"
          onCancel={onCancel}
          closeOnExternalInteraction={false}
        >
          This is my modal
        </Modal>,
        {
          attachTo: container,
        }
      );

      const event = new Event('mousedown');
      document.body.dispatchEvent(event);
      assert.notCalled(onCancel);
      container.remove();
    });

    it('closes when close button is pressed', () => {
      const onCancel = sinon.stub();
      const wrapper = createComponent({ onCancel });

      wrapper
        .find('LabeledButton[data-testid="cancel-button"]')
        .props()
        .onClick();
      assert.calledOnce(onCancel);
    });
  });
});

describe('Confirm Modal', () => {
  function createComponent(props = {}) {
    return mount(
      <ConfirmModal
        title="Really?"
        message="Are you sure you want to do that?"
        onConfirm={sinon.stub()}
        confirmAction="Yes"
        onCancel={sinon.stub()}
        {...props}
      />
    );
  }

  it('renders a dialog for the modal', () => {
    const wrapper = createComponent();

    const dialog = wrapper.find('Dialog');

    assert.equal(dialog.props().title, 'Really?');
    assert.include(
      dialog.children().text(),
      'Are you sure you want to do that?'
    );
  });

  it('invokes confirm and cancel callbacks when dialog buttons clicked', () => {
    const onCancel = sinon.stub();
    const onConfirm = sinon.stub();
    const wrapper = createComponent({ onCancel, onConfirm });

    const dialog = wrapper.find('Dialog');
    const cancelButton = dialog.find(
      'LabeledButton[data-testid="cancel-button"]'
    );
    const confirmButton = dialog.find(
      'LabeledButton[data-testid="confirm-button"]'
    );

    assert.equal(confirmButton.children().text(), 'Yes');
    act(() => {
      confirmButton.props().onClick();
    });
    confirmButton.update();
    assert.calledOnce(onConfirm);

    cancelButton.props().onClick();
    assert.calledOnce(onCancel);
  });
});
