import { mount } from 'enzyme';

import { useToastMessages } from '../use-toast-messages';

describe('useToastMessages', () => {
  function FakeToastMessagesContainer({ initialToastMessages }) {
    const { toastMessages, appendToastMessage, dismissToastMessage } =
      useToastMessages(initialToastMessages);

    return (
      <div>
        {!toastMessages.length && (
          <span data-testid="no-toast-messages">
            There are no toast messages
          </span>
        )}
        {toastMessages.map(({ message }, index) => (
          <span key={`${message}_${index}`} className="toast-message">
            {message}
          </span>
        ))}
        <button
          data-testid="append-button"
          onClick={() =>
            appendToastMessage({
              type: 'success',
              message: 'Toast message',
            })
          }
        >
          Append
        </button>
        <button
          data-testid="dismiss-button"
          onClick={() =>
            toastMessages.length && dismissToastMessage(toastMessages[0].id)
          }
        >
          Dismiss
        </button>
      </div>
    );
  }

  function createFakeToastMessages(initialToastMessages) {
    return mount(
      <FakeToastMessagesContainer
        initialToastMessages={initialToastMessages}
      />,
    );
  }

  it('defaults to no initial toast messages', () => {
    const wrapper = createFakeToastMessages();

    assert.isTrue(wrapper.exists('[data-testid="no-toast-messages"]'));
    assert.isFalse(wrapper.exists('.toast-message'));
  });

  it('allows to provide initial toast messages', () => {
    const initialToastMessages = [
      { message: 'This is a toast message', type: 'success' },
      { message: 'This is another toast message', type: 'error' },
    ];
    const wrapper = createFakeToastMessages(initialToastMessages);

    assert.isFalse(wrapper.exists('[data-testid="no-toast-messages"]'));
    assert.equal(
      wrapper.find('.toast-message').length,
      initialToastMessages.length,
    );
  });

  it('can append toast messages', () => {
    const wrapper = createFakeToastMessages();
    const appendButton = wrapper.find('[data-testid="append-button"]');

    appendButton.simulate('click');
    appendButton.simulate('click');
    appendButton.simulate('click');

    assert.isFalse(wrapper.exists('[data-testid="no-toast-messages"]'));
    assert.equal(wrapper.find('.toast-message').length, 3);
  });

  it('can dismiss toast messages', () => {
    const wrapper = createFakeToastMessages();
    const appendButton = wrapper.find('[data-testid="append-button"]');
    const dismissButton = wrapper.find('[data-testid="dismiss-button"]');

    // Append five messages
    appendButton.simulate('click');
    appendButton.simulate('click');
    appendButton.simulate('click');
    appendButton.simulate('click');
    appendButton.simulate('click');
    assert.equal(wrapper.find('.toast-message').length, 5);

    // Dismiss three
    dismissButton.simulate('click');
    dismissButton.simulate('click');
    dismissButton.simulate('click');
    assert.equal(wrapper.find('.toast-message').length, 2);
  });
});
