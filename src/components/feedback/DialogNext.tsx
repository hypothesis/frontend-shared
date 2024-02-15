import classnames from 'classnames';
import type { JSX, RefObject } from 'preact';
import { useCallback, useEffect } from 'preact/hooks';

import { useSyncedRef } from '../../hooks/use-synced-ref';
import type { PresentationalProps } from '../../types';
import type { CloseableInfo } from '../CloseableContext';
import CloseableContext from '../CloseableContext';

type ComponentProps = {
  open?: boolean;
  onClose?: () => void;
  closeTitle?: string;
  modal?: boolean;
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
        className={classnames(classes, {
          'backdrop:bg-black/50': modal,
          static: !modal,
        })}
        ref={dialogRef}
      >
        {children}
      </dialog>
    </CloseableContext.Provider>
  );
}
