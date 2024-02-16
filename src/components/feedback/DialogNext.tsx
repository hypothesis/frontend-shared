import classnames from 'classnames';
import type { JSX, RefObject } from 'preact';
import { useCallback, useEffect } from 'preact/hooks';

import { useSyncedRef } from '../../hooks/use-synced-ref';
import type { PresentationalProps } from '../../types';
import type { CloseableInfo } from '../CloseableContext';
import CloseableContext from '../CloseableContext';

export type ModalSize = 'sm' | 'md' | 'lg';

type ComponentProps = {
  open?: boolean;
  onClose?: () => void;
  closeTitle?: string;

  /**
   * Determines if this dialog should be opened as a modal, ensuring proper
   * focus trap.
   * The modal size can be optionally provided too, otherwise it will adjust its
   * contents.
   * Defaults to `false`.
   *
   * <Dialog modal /> -> A modal dialog with automatic sizing.
   * <Dialog modal="sm" /> -> A small-size modal dialog.
   * <Dialog modal="md" /> -> A medium-size modal dialog.
   * <Dialog modal="lg" /> -> A large-size modal dialog.
   */
  modal?: boolean | ModalSize;
};

export type DialogNextProps = PresentationalProps &
  ComponentProps &
  JSX.HTMLAttributes<HTMLDialogElement>;

export default function DialogNext({
  open = false,
  onClose,
  closeTitle,
  modal = false,

  // TODO
  //   closeOnClickAway,
  //   closeOnFocusAway,
  //   initialFocus,
  //   restoreFocus,
  //   transitionComponent,

  classes,
  elementRef,
  children,
  ...htmlAttributes
}: DialogNextProps) {
  const size = typeof modal === 'boolean' ? 'custom' : modal;
  const dialogRef = useSyncedRef(elementRef) as RefObject<HTMLDialogElement>;
  const closeDialog = useCallback(
    () => dialogRef.current?.close(),
    [dialogRef],
  );
  const openDialog = useCallback(() => {
    if (modal) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.show();
    }
  }, [dialogRef, modal]);

  useEffect(() => {
    if (open) {
      openDialog();
    } else {
      closeDialog();
    }
  }, [open, closeDialog, openDialog]);

  useEffect(() => {
    const dialogElement = dialogRef.current;
    const handler = () => onClose?.();

    dialogElement?.addEventListener('close', handler);
    return () => {
      dialogElement?.removeEventListener('close', handler);
    };
  }, [onClose, dialogRef]);

  const closeableContext: CloseableInfo = {
    onClose: onClose ? closeDialog : undefined,
    title: closeTitle,
  };

  return (
    <CloseableContext.Provider value={closeableContext}>
      <dialog
        data-component="DialogNext"
        {...htmlAttributes}
        ref={dialogRef}
        className={classnames(classes, {
          // We want to render non-modal dialogs inline. By default they are
          // absolute-positioned
          static: !modal,

          'backdrop:bg-black/50': modal,

          // Max-width rules will ensure actual width never exceeds 90vw
          'w-[30rem]': size === 'sm',
          'w-[36rem]': size === 'md',
          'w-[42rem]': size === 'lg',
          // No width classes are added if `size` is 'custom'
        })}
      >
        {children}
      </dialog>
    </CloseableContext.Provider>
  );
}
