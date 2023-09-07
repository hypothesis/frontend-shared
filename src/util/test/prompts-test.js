import { confirm } from '../prompts';

describe('confirm', () => {
  function clickClose() {
    const closeButton = getCustomDialog().querySelector('[aria-label="Close"]');
    closeButton.click();
  }

  function getCancelButton() {
    return getCustomDialog().querySelector('[data-testid="cancel-button"]');
  }

  function clickCancel() {
    getCancelButton().click();
  }

  function getConfirmButton() {
    return getCustomDialog().querySelector('[data-testid="confirm-button"]');
  }

  function clickConfirm() {
    getConfirmButton().click();
  }

  function getCustomDialog() {
    return document.querySelector('[data-testid="confirm-container"]');
  }

  it('renders a custom dialog', async () => {
    const result = confirm({
      title: 'Confirm action?',
      message: 'Do the thing?',
      confirmAction: 'Yeah!',
    });
    const dialog = getCustomDialog();

    assert.ok(dialog);

    clickClose();

    assert.notOk(getCustomDialog());
    assert.isFalse(await result);
  });

  it('renders provided actions', async () => {
    const result = confirm({
      title: 'Confirm action?',
      message: 'Do the thing?',
      confirmAction: 'Do it!',
      cancelAction: "Don't do it!",
    });

    assert.equal(getConfirmButton().innerText, 'Do it!');
    assert.equal(getCancelButton().innerText, "Don't do it!");

    clickClose();
    await result;
  });

  it('returns true if "Confirm" button is clicked', async () => {
    const result = confirm({ message: 'Do the thing?' });
    clickConfirm();
    assert.isTrue(await result);
  });

  it('returns false if "Cancel" button is clicked', async () => {
    const result = confirm({ message: 'Do the thing?' });
    clickCancel();
    assert.isFalse(await result);
  });
});
