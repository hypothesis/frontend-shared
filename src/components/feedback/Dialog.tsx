import classnames from 'classnames';
import type { RefObject } from 'preact';
import { Fragment } from 'preact';
import { useEffect, useLayoutEffect } from 'preact/hooks';

import { useClickAway } from '../../hooks/use-click-away';
import { useFocusAway } from '../../hooks/use-focus-away';
import { useKeyPress } from '../../hooks/use-key-press';
import { useSyncedRef } from '../../hooks/use-synced-ref';
import { useUniqueId } from '../../hooks/use-unique-id';
import type { PresentationalProps } from '../../types';
import { downcastRef } from '../../util/typing';
import Overlay from '../layout/Overlay';
import Panel from '../layout/Panel';
import type { PanelProps } from '../layout/Panel';

type ComponentProps = {
  closeOnClickAway?: boolean;
  closeOnEscape?: boolean;
  closeOnFocusAway?: boolean;
  /**
   * Dialog _should_ be provided with a close handler. We have a few edge use
   * cases, however, in which we need to render a "non-closeable" modal dialog.
   */
  onClose?: () => void;
  width?: 'sm' | 'md' | 'lg' | 'custom';

  /**
   * Element that should take focus when the Dialog is first rendered. When not
   * provided ("auto"), the dialog's outer element will take focus. Setting this
   * prop to "manual" will opt out of focus routing.
   */
  initialFocus?: RefObject<HTMLOrSVGElement | null> | 'auto' | 'manual';

  /**
   * Make this Dialog modal. Modal dialogs are:
   * - Rendered with a full-screen overlay backdrop
   */
  modal?: boolean;
};

// This component forwards a number of props on to `Panel` but always sets the
// `fullWidthHeader` prop to `true`.
export type DialogProps = PresentationalProps &
  ComponentProps &
  Omit<PanelProps, 'fullWidthHeader'>;

const noop = () => {};

/**
 * Show a dialog
 */
const DialogNext = function Dialog({
  closeOnClickAway = false,
  closeOnEscape, // Default depends on whether modal or not
  closeOnFocusAway = false,
  children,
  width = 'md',
  initialFocus = 'auto',
  modal = false,

  classes,
  elementRef,

  // Forwarded to Panel
  buttons,
  icon,
  onClose,
  paddingSize = 'md',
  scrollable = true,
  title,

  ...htmlAttributes
}: DialogProps) {
  const modalRef = useSyncedRef(elementRef);
  const closeHandler = onClose ?? noop;

  // Closing when ESC pressed is default behavior for modal dialogs
  const closeOnEscapeEnabled =
    (modal && closeOnEscape !== false) || closeOnEscape === true;

  useClickAway(modalRef, () => closeHandler(), {
    enabled: closeOnClickAway,
  });

  useKeyPress(['Escape'], () => closeHandler(), {
    enabled: closeOnEscapeEnabled,
  });

  useFocusAway(modalRef, () => closeHandler(), {
    enabled: closeOnFocusAway,
  });

  const dialogDescriptionId = useUniqueId('dialog-description');

  useEffect(() => {
    if (initialFocus === 'manual') {
      return;
    }
    if (initialFocus === 'auto') {
      // An explicit `initialFocus` has not be set, so use automatic focus
      // handling. Modern accessibility guidance is to focus the dialog itself
      // rather than trying to be smart about focusing a particular control
      // within the dialog.
      modalRef.current?.focus();
      return;
    }

    const focusEl = initialFocus?.current as HTMLElement & {
      disabled?: boolean;
    };

    if (focusEl && !focusEl.disabled) {
      focusEl.focus();
    } else {
      // Fall back to focusing the modal itself
      modalRef.current?.focus();
      return;
    }

    // We only want to run this effect once when the dialog is mounted.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(
    /**
     * Try to assign the dialog an accessible description, using the content of
     * the first paragraph of text within it.
     *
     * A limitation of this approach is that it doesn't update if the dialog's
     * content changes after the initial render.
     */
    () => {
      const description = modalRef?.current?.querySelector('p');
      if (description) {
        description.id = dialogDescriptionId;
        modalRef.current!.setAttribute('aria-describedby', dialogDescriptionId);
      }
    },
    [dialogDescriptionId, modalRef]
  );

  // Wrap modal dialogs in a full-screen overlay
  const Wrapper = modal ? Overlay : Fragment;

  return (
    <Wrapper>
      <div
        aria-modal={modal}
        data-component="Dialog"
        tabIndex={-1}
        // NB: Role can be overridden with an HTML attribute; this is purposeful
        role="dialog"
        {...htmlAttributes}
        className={classnames(
          // Column-flex layout to constrain content to max-height
          'flex flex-col',
          {
            // Maximum width and height should not exceed 90vw/h
            'max-w-[90vw] max-h-[90vh]': modal,
            // Overlay sets up a flex layout centered on both axes. For taller
            // viewports, remove this modal container from the flex flow with
            // fixed positioning and position it 10vh from the top of the
            // viewport. This feels more balanced on taller screens. Ensure an
            // equal 10vh gap at the bottom of the screen by adjusting max-height
            // to `80vh`.
            'tall:fixed tall:max-h-[80vh] tall:top-[10vh]': modal,
          },
          {
            // Max-width rules will ensure actual width never exceeds 90vw
            'w-[30rem]': modal && width === 'sm',
            'w-[36rem]': modal && width === 'md', // default
            'w-[42rem]': modal && width === 'lg',
            // No width classes are added if width is 'custom'
          },
          classes
        )}
        ref={downcastRef(modalRef)}
      >
        <Panel
          buttons={buttons}
          fullWidthHeader={true}
          icon={icon}
          onClose={onClose}
          paddingSize={paddingSize}
          title={title}
          scrollable={scrollable}
        >
          {children}
        </Panel>
      </div>
    </Wrapper>
  );
};

export default DialogNext;