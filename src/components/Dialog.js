import classnames from 'classnames';
import { useEffect, useLayoutEffect, useRef, useState } from 'preact/hooks';

import { IconButton, LabeledButton } from './buttons';
import { registerIcons, SvgIcon } from './SvgIcon';

// Register the checkbox icon for use
registerIcons({
  /** @ts-ignore - TS doesn't understand require here */
  'hyp-cancel': require('../../images/icons/cancel.svg'),
});

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
 * @prop {string} [icon] - Name of optional icon to render in header
 * @prop {import("preact/hooks").Ref<HTMLElement>} [initialFocus] -
 *   Child element to focus when the dialog is rendered.
 * @prop {() => void} [onCancel] -
 *   A callback to invoke when the user cancels the dialog. If provided, a
 *   "Cancel" button will be displayed.
 * @prop {'dialog'|'alertdialog'} [role] - The aria role for the dialog (defaults to" dialog")
 * @prop {string} title
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
}) {
  const dialogDescriptionId = useUniqueId('dialog-description');
  const dialogTitleId = useUniqueId('dialog-title');

  const rootEl = useRef(/** @type {HTMLDivElement | null} */ (null));

  useEffect(() => {
    const focusEl = /** @type {InputElement|undefined} */ (initialFocus?.current);
    if (focusEl && !focusEl.disabled) {
      focusEl.focus();
    } else {
      // Modern accessibility guidance is to focus the dialog itself rather than
      // trying to be smart about focusing a particular control within the
      // dialog. See resources above.
      rootEl.current.focus();
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

  return (
    <div
      aria-labelledby={dialogTitleId}
      className={classnames(
        'Hyp-Dialog',
        { 'Hyp-Dialog--closeable': !!onCancel },
        contentClass
      )}
      ref={rootEl}
      role={role}
      tabIndex={-1}
    >
      <header>
        {icon && (
          <div className="Hyp-Dialog__header-icon">
            <SvgIcon name={icon} title={title} data-testid="header-icon" />
          </div>
        )}
        <h2 className="Hyp-Dialog__title" id={dialogTitleId}>
          {title}
        </h2>
        {onCancel && (
          <div className="Hyp-Dialog__close">
            <IconButton icon="hyp-cancel" title="Close" onClick={onCancel} />
          </div>
        )}
      </header>
      {children}
      <div className="Hyp-Dialog__actions">
        {onCancel && (
          <LabeledButton data-testid="cancel-button" onClick={onCancel}>
            {cancelLabel}
          </LabeledButton>
        )}
        {buttons}
      </div>
    </div>
  );
}
