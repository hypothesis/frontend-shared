import classnames from 'classnames';
import type { RefObject } from 'preact';
import { Fragment } from 'preact';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'preact/hooks';

import { useClickAway } from '../../hooks/use-click-away';
import { useFocusAway } from '../../hooks/use-focus-away';
import { useKeyPress } from '../../hooks/use-key-press';
import { useSyncedRef } from '../../hooks/use-synced-ref';
import { useUniqueId } from '../../hooks/use-unique-id';
import type { PresentationalProps, TransitionComponent } from '../../types';
import { downcastRef } from '../../util/typing';
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

  /**
   * Element that should take focus when the Dialog is first rendered. When not
   * provided ("auto"), the dialog's outer element will take focus. Setting this
   * prop to "manual" will opt out of focus routing.
   */
  initialFocus?: RefObject<HTMLOrSVGElement | null> | 'auto' | 'manual';

  /**
   * Restore focus to previously-focused element when unmounted/closed
   */
  restoreFocus?: boolean;

  /**
   * Optional TransitionComponent for open (mount) and close (unmount) transitions
   */
  transitionComponent?: TransitionComponent;
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
const Dialog = function Dialog({
  closeOnClickAway = false,
  closeOnEscape = false,
  closeOnFocusAway = false,
  children,
  initialFocus = 'auto',
  restoreFocus = false,
  transitionComponent: TransitionComponent,

  classes,
  elementRef,

  // Forwarded to Panel
  buttons,
  icon,
  onClose = noop,
  paddingSize = 'md',
  scrollable = true,
  title,

  ...htmlAttributes
}: DialogProps) {
  const modalRef = useSyncedRef(elementRef);
  const restoreFocusEl = useRef<HTMLElement | null>(
    document.activeElement as HTMLElement | null
  );
  const [transitionComponentVisible, setTransitionComponentVisible] =
    useState(false);

  const closeHandler = useCallback(() => {
    if (TransitionComponent) {
      // When a TransitionComponent is provided, the actual "onClose" will be
      // called by that component, once the "out" transition has finished
      setTransitionComponentVisible(false);
    } else {
      onClose();
    }
  }, [onClose, TransitionComponent]);

  const initializeDialog = useCallback(() => {
    if (initialFocus === 'manual') {
      return;
    }
    if (initialFocus === 'auto') {
      // An explicit `initialFocus` has not been set, so use automatic focus
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
    }
  }, [initialFocus, modalRef]);

  const onTransitionEnd = (direction: 'in' | 'out') => {
    if (direction === 'in') {
      initializeDialog();
    } else {
      onClose();
    }
  };

  useClickAway(modalRef, closeHandler, {
    enabled: closeOnClickAway,
  });

  useKeyPress(['Escape'], closeHandler, {
    enabled: closeOnEscape,
  });

  useFocusAway(modalRef, closeHandler, {
    enabled: closeOnFocusAway,
  });

  const dialogDescriptionId = useUniqueId('dialog-description');
  const Wrapper = useMemo(
    () => TransitionComponent ?? Fragment,
    [TransitionComponent]
  );

  useEffect(() => {
    setTransitionComponentVisible(true);
    if (!TransitionComponent) {
      initializeDialog();
    }

    // We only want to run this effect once when the dialog is mounted.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(
    /**
     * Restore focus when component is unmounted, if `restoreFocus` is set.
     */
    () => {
      const restoreFocusTo = restoreFocusEl.current;
      return () => {
        if (restoreFocus && restoreFocusTo) {
          restoreFocusTo.focus();
        }
      };
    },
    // We only want to run this effect once when the dialog is mounted.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

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

  return (
    <Wrapper
      direction={transitionComponentVisible ? 'in' : 'out'}
      onTransitionEnd={onTransitionEnd}
    >
      <div
        data-component="Dialog"
        tabIndex={-1}
        // NB: Role can be overridden with an HTML attribute; this is purposeful
        role="dialog"
        {...htmlAttributes}
        className={classnames(
          // Column-flex layout to constrain content to max-height
          'flex flex-col',
          classes
        )}
        ref={downcastRef(modalRef)}
      >
        <Panel
          buttons={buttons}
          fullWidthHeader={true}
          icon={icon}
          onClose={closeHandler}
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

export default Dialog;
