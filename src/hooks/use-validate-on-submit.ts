/**
 * Return a form "submit" event handler that validates the form using
 * {@link HTMLFormElement.checkValidity}.
 *
 * If the check passes, `onValid` is invoked. Otherwise the first control in
 * {@link HTMLFormElement.elements} with an error is focused. This will allow
 * the user to correct the error, and also cause screen readers to announce
 * the current validation state and errors.
 *
 * This hook is useful for forms which want to display a custom presentation
 * of validation errors. Forms using the browser's built-in validation error
 * display do not need to use this.
 *
 * To show custom validation errors, the consumer should:
 *
 * - Ensure that all input controls validate their input on "change" events.
 * - Ensure that validation errors are displayed for each control.  The input
 *   fields must link their validation errors using `aria-describedby` and
 *   indicate their state using `aria-invalid`.
 * - Set the `noValidate` property on the `<form>` to disable the native
 *   validation UI message
 * - Call this hook to create a "submit" event handler and pass it to
 *   the form's `submit` prop.
 *
 * See also https://react-spectrum.adobe.com/react-aria/forms.html.
 */
export function useValidateOnSubmit(
  onValid: () => void,
): (e: SubmitEvent) => void {
  const onSubmit = (event: SubmitEvent) => {
    if (event.type !== 'submit') {
      throw new Error('Event type is not "submit"');
    }
    const formEl = event.target;
    if (!(formEl instanceof HTMLFormElement)) {
      throw new Error('Event target is not a form');
    }

    event.preventDefault();

    if (formEl.checkValidity()) {
      onValid();
    } else {
      // Focus first field wth an error if invalid. This matches the behavior
      // of native form validation, allowing the user to correct the error
      // and also announcing the problem to screen reader users.
      let foundFirst = false;
      for (const el of Array.from(formEl.elements) as Array<
        HTMLElement | HTMLInputElement
      >) {
        if (!('validity' in el) || el.validity.valid) {
          continue;
        }

        if (!foundFirst) {
          el.focus();
          foundFirst = true;
        }

        // If the user has focused an empty, required input field and
        // triggered a submission by pressing Enter, that will not trigger
        // a "change" event. Trigger this event to allow the input's "change"
        // handler to update its custom error.
        if (el.validity.valueMissing) {
          el.dispatchEvent(new Event('change'));
        }
      }
    }
  };
  return onSubmit;
}
