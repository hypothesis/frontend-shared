import { useCallback, useState } from 'preact/hooks';

import type {
  ToastMessagesProps,
  ToastMessage,
} from '../../../../components/feedback/ToastMessages';
import ToastMessages from '../../../../components/feedback/ToastMessages';
import Button from '../../../../components/input/Button';
import Link from '../../../../components/navigation/Link';
import Library from '../../Library';

type BaseToastMessage = Omit<ToastMessage, 'id'>;

const toastMessages: BaseToastMessage[] = [
  {
    message: 'Success toast message',
    type: 'success',
    autoDismiss: false,
  },
  {
    message: 'Warning toast message',
    type: 'notice',
    autoDismiss: false,
  },
  {
    message: 'Error toast message',
    type: 'error',
    autoDismiss: false,
  },
];

type ToastMessages_Props = Omit<ToastMessagesProps, 'messages'> & {
  messages: BaseToastMessage[];
  _printOnDismiss?: boolean;
  _allowAppending?: boolean;
};

function ToastMessages_({
  messages: initialMessages,
  transitionClasses,
  _printOnDismiss = false,
  _allowAppending = false,
}: ToastMessages_Props) {
  const [messages, setMessages] = useState(
    initialMessages.map((message, index) => ({
      id: `${index}`,
      ...message,
    })),
  );
  const [lastDismissedMessage, setLastDismissedMessage] =
    useState<BaseToastMessage>();
  const onMessageDismiss = useCallback(
    (id: string) => {
      setLastDismissedMessage(messages.find(message => message.id === id));
      setMessages(prev => prev.filter(message => message.id !== id));
    },
    [messages],
  );
  const appendMessage = useCallback(
    ({ autoDismiss }: { autoDismiss: boolean }) => {
      const newId =
        messages.length === 0
          ? 1
          : Number(messages[messages.length - 1].id) + 1;
      const newMessage: ToastMessage = {
        id: `${newId}`,
        message: autoDismiss
          ? 'Dismissing in 5 seconds...'
          : 'Click me to dismiss',
        type: 'success',
        autoDismiss,
      };
      setMessages(prev => [...prev, newMessage]);
    },
    [messages],
  );

  return (
    <div className="w-full">
      {_allowAppending && (
        <div className="flex gap-x-2 mb-3">
          <Button
            onClick={() => appendMessage({ autoDismiss: false })}
            classes="mb-2"
            variant="primary"
          >
            Append message
          </Button>
          <Button
            onClick={() => appendMessage({ autoDismiss: true })}
            classes="mb-2"
            variant="primary"
          >
            Append auto-dismiss message
          </Button>
        </div>
      )}
      <div className="w-1/2 mx-auto flex flex-col gap-y-4">
        <ToastMessages
          messages={messages}
          onMessageDismiss={onMessageDismiss}
          transitionClasses={transitionClasses}
        />
        {_printOnDismiss && lastDismissedMessage && (
          <div>
            Just dismissed message {'"'}
            {lastDismissedMessage.message}
            {'"'}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ToastMessagesPage() {
  return (
    <Library.Page
      title="ToastMessages"
      intro={
        <p>
          ToastMessages is a component that wraps{' '}
          <Library.Link href="/feedback-callout">Callout</Library.Link> with out
          of the box accessibility, message auto-dismiss, dismiss-on-click,
          transitions and message positioning.
        </p>
      }
    >
      <Library.Section>
        <Library.Pattern>
          <Library.Usage componentName="ToastMessages" />
          <Library.Example>
            <Library.Demo withSource title="Basic ToastMessages">
              <ToastMessages_
                messages={toastMessages}
                onMessageDismiss={() => {}}
              />
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Working with ToastMessages">
          <Library.Example title="Accessibility">
            <p>
              <code>ToastMessages</code> includes an{' '}
              <Link href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions">
                <code>
                  aria-live={'"'}polite{'"'}
                </code>
              </Link>{' '}
              wrapper which will announce added toast messages to screen
              readers.
            </p>
            <p>
              Additionally, it is possible to append hidden messages that are
              only announced by screen readers, via{' '}
              <code>{'{ visuallyHidden: true }'}</code>
            </p>
          </Library.Example>
          <Library.Example title="Positioning">
            <p>
              By default, every message rendered by <code>ToastMessages</code>{' '}
              will be relative positioned. It{"'"}s up to consumers to wrap it
              in an absolute-positioned container if desired.
            </p>
          </Library.Example>
          <Library.Example title="Auto-dismiss">
            <p>
              All messages will be auto-dismissed after 5 seconds. Pass
              <code>{'{ autoDismiss: false }'}</code> for those messages where
              you want this to be prevented.
            </p>
          </Library.Example>
          <Library.Example title="Transitions">
            <p>
              All messages will fade-in when appended and fade-out when
              dismissed, but you can provide your own transition classes via{' '}
              <code>transitionClasses</code> prop.
            </p>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Component API">
          <Library.Example title="messages">
            <Library.Info>
              <Library.InfoItem label="description">
                The list of toast messages to display at a given point.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`ToastMessage[]`}</code>
              </Library.InfoItem>
            </Library.Info>

            <Library.Demo title="ToastMessages with one message" withSource>
              <ToastMessages_
                messages={[toastMessages[0]]}
                onMessageDismiss={() => {}}
              />
            </Library.Demo>
          </Library.Example>
          <Library.Example title="onMessageDismiss">
            <Library.Info>
              <Library.InfoItem label="description">
                Callback invoked with the toast message id, when it ends its
                dismiss transition. The message with that id can then be removed
                from the list.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`(toastMessageId: string) => void`}</code>
              </Library.InfoItem>
            </Library.Info>

            <Library.Demo title="Click a message to dismiss it" withSource>
              <ToastMessages_
                messages={toastMessages}
                onMessageDismiss={() => {}}
                _printOnDismiss
              />
            </Library.Demo>
          </Library.Example>
          <Library.Example title="transitionClasses">
            <Library.Info>
              <Library.InfoItem label="description">
                Custom CSS classes to apply to toast messages when appended
                and/or dismissed. By default they get{' '}
                <code>animate-fade-in</code> and <code>animate-fade-out</code>
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`{ transitionIn?: string; transitionOut?: string; }`}</code>
              </Library.InfoItem>
            </Library.Info>

            <Library.Demo title="Custom transitions" withSource>
              <ToastMessages_
                messages={toastMessages}
                onMessageDismiss={() => {}}
                transitionClasses={{
                  transitionIn: 'animate-slide-in-from-right',
                  transitionOut: 'animate-slide-out-to-right',
                }}
                _allowAppending
              />
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
