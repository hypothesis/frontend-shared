import classnames from 'classnames';
import { useEffect, useLayoutEffect, useRef, useState } from 'preact/hooks';

// @ts-ignore
import cancelSVG from '../../images/icons/cancel.svg';
import { IconButton, LabeledButton } from './buttons';
import { registerIcon, SvgIcon } from './SvgIcon';

// Register the checkbox icon for use
const cancelIcon = registerIcon('cancel', cancelSVG);

let idCounter = 0;

/**
 * Return an element ID beginning with `prefix` that is unique per component instance.
 *
 * This avoids different instances of a component re-using the same ID.
 *
 * @param {string} prefix
 */
function useUniqueId(prefix) {
  const [id] = useState(() => {
    ++idCounter;
    return `${prefix}-${idCounter}`;
  });
  return id;
}

/**
 * @typedef {import('preact').ComponentChildren} Children
 *
 * @typedef DialogProps
 * @prop {Children} [buttons] -
 *   Additional `Button` elements to display at the bottom of the dialog.
 *   A "Cancel" button is added automatically if the `onCancel` prop is set.
 * @prop {string} [cancelLabel] - Label for the cancel button
 * @prop {Children} children
 * @prop {string} [contentClass] - CSS class to apply to the dialog's content
 * @prop {string|symbol} [icon] - Name of optional icon to render in header
 * @prop {import("preact/hooks").Ref<HTMLElement>|null} [initialFocus] -
 *   Child element to focus when the dialog is rendered. If not provided,
 *   the Dialog's container will be automatically focused on opening. Set to
 *   `null` to opt out of automatic focus control.
 * @prop {() => void} [onCancel] -
 *   A callback to invoke when the user cancels the dialog. If provided, a
 *   "Cancel" button will be displayed.
 * @prop {'dialog'|'alertdialog'} [role] - The aria role for the dialog (defaults to" dialog")
 * @prop {string} title
 * @prop {boolean} [withCancelButton=true] - If `onCancel` is provided, render
 *   a Cancel button as one of the Dialog's buttons (along with any other
 *   `buttons`)
 * @prop {boolean} [withCloseButton=true] - If `onCancel` is provided, render
 *   a close button (X icon) in the Dialog's header
 */

/**
 * HTML control that can be disabled.
 *
 * @typedef {HTMLElement & { disabled: boolean }} InputElement
 */

/**
 * Render a "panel"-like interface with a title and optional icon and/or
 * close button. Grabs focus on initial render, defaulting to the entire
 * Dialog container element, or `initialFocus` HTMLElement if provided.
 *
 * @param {DialogProps} props
 */
export function Dialog({
  buttons,
  cancelLabel = 'Cancel',
  children,
  contentClass,
  icon,
  initialFocus,
  onCancel,
  role = 'dialog',
  title,
  withCancelButton = true,
  withCloseButton = true,
}) {
  const dialogDescriptionId = useUniqueId('dialog-description');
  const dialogTitleId = useUniqueId('dialog-title');

  const rootEl = useRef(/** @type {HTMLDivElement | null} */ (null));

  useEffect(() => {
    // Setting `initialFocus` to `null` opts out of focus handling
    if (initialFocus !== null) {
      const focusEl = /** @type {InputElement|null} */ (initialFocus?.current);
      if (focusEl && !focusEl.disabled) {
        focusEl.focus();
      } else {
        // The `initialFocus` prop has not been set, so use automatic focus handling.
        // Modern accessibility guidance is to focus the dialog itself rather than
        // trying to be smart about focusing a particular control within the
        // dialog.
        rootEl.current.focus();
      }
    }

    // We only want to run this effect once when the dialog is mounted.
    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Try to assign the dialog an accessible description, using the content of
  // the first paragraph of text in it.
  //
  // A limitation of this approach is that it doesn't update if the dialog's
  // content changes after the initial render.
  useLayoutEffect(() => {
    const description = rootEl.current.querySelector('p');
    if (description) {
      description.id = dialogDescriptionId;
      rootEl.current.setAttribute('aria-describedby', dialogDescriptionId);
    }
  }, [dialogDescriptionId]);

  const hasCancelButton = onCancel && withCancelButton;
  const hasCloseButton = onCancel && withCloseButton;
  const hasButtons = buttons || hasCancelButton;

  return (
    <div
      aria-labelledby={dialogTitleId}
      className={classnames(
        'Hyp-Dialog',
        { 'Hyp-Dialog--closeable': hasCloseButton },
        contentClass
      )}
      ref={rootEl}
      role={role}
      tabIndex={-1}
    >
      <header className="Hyp-Dialog__header">
        {icon && (
          <div className="Hyp-Dialog__header-icon">
            <SvgIcon name={icon} title={title} data-testid="header-icon" />
          </div>
        )}
        <h2 className="Hyp-Dialog__title" id={dialogTitleId}>
          {title}
        </h2>
        {onCancel && withCloseButton && (
          <div className="Hyp-Dialog__close">
            <IconButton
              data-testid="close-button"
              icon={cancelIcon}
              title="Close"
              onClick={onCancel}
            />
          </div>
        )}
      </header>
      {children}
      {hasButtons && (
        <div className="Hyp-Dialog__actions">
          {hasCancelButton && (
            <LabeledButton data-testid="cancel-button" onClick={onCancel}>
              {cancelLabel}
            </LabeledButton>
          )}
          {buttons}
        </div>
      )}
    </div>
  );
}
