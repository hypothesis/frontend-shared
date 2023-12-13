import { useCallback, useState } from 'preact/hooks';

import type { ToastMessage } from '../components/feedback';

export type ToastMessageData = Omit<ToastMessage, 'id'>;

export type ToastMessageAppender = (toastMessageData: ToastMessageData) => void;

export type ToastMessages = {
  toastMessages: ToastMessage[];
  appendToastMessage: ToastMessageAppender;
  dismissToastMessage: (id: string) => void;
};

// Keep a global incremental counter to use as unique toast message ID
let toastMessageCounter = 0;

function dataToToastMessage(toastMessageData: ToastMessageData): ToastMessage {
  toastMessageCounter++;
  const id = `${toastMessageCounter}`;
  return { ...toastMessageData, id };
}

/**
 * Hook providing a simple way to handle state for <ToastMessages />
 * {@link ToastMessages}
 */
export function useToastMessages(
  initialToastMessages: ToastMessageData[] = [],
): ToastMessages {
  const [toastMessages, setToastMessages] = useState<ToastMessage[]>(
    initialToastMessages.map(dataToToastMessage),
  );
  const appendToastMessage = useCallback(
    (toastMessageData: ToastMessageData) => {
      setToastMessages(messages => [
        ...messages,
        dataToToastMessage(toastMessageData),
      ]);
    },
    [],
  );
  const dismissToastMessage = useCallback(
    (id: string) =>
      setToastMessages(messages =>
        messages.filter(message => message.id !== id),
      ),
    [],
  );

  return { toastMessages, appendToastMessage, dismissToastMessage };
}
