import classnames from 'classnames';
import type {
  ComponentChildren,
  ComponentProps,
  FunctionComponent,
} from 'preact';
import {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'preact/hooks';

import type { TransitionComponent } from '../../types';
import Callout from './Callout';

export type ToastMessage = {
  id: string;
  type: 'error' | 'success' | 'notice';
  message: ComponentChildren;

  /**
   * Visually hidden messages are announced to screen readers but not visible.
   * Defaults to false.
   */
  visuallyHidden?: boolean;

  /**
   * Determines if the toast message should be auto-dismissed.
   * Defaults to true.
   */
  autoDismiss?: boolean;
};

export type ToastMessageTransitionClasses = {
  /** Classes to apply to a toast message when appended. Defaults to 'animate-fade-in' */
  transitionIn?: string;
  /** Classes to apply to a toast message being dismissed. Defaults to 'animate-fade-out' */
  transitionOut?: string;
};

type ToastMessageItemProps = {
  message: ToastMessage;
  onDismiss: (id: string) => void;
};

/**
 * An individual toast message: a brief and transient success or error message.
 * The message may be dismissed by clicking on it. `visuallyHidden` toast
 * messages will not be visible but are still available to screen readers.
 */
function ToastMessageItem({ message, onDismiss }: ToastMessageItemProps) {
  return (
    <Callout
      classes={classnames({
        'sr-only': message.visuallyHidden,
      })}
      status={message.type}
      onClick={() => onDismiss(message.id)}
      variant="raised"
    >
      {message.message}
    </Callout>
  );
}

type ToastMessageTransitionType = FunctionComponent<
  ComponentProps<TransitionComponent> & {
    transitionClasses?: ToastMessageTransitionClasses;
  }
>;

const ToastMessageTransition: ToastMessageTransitionType = ({
  direction,
  onTransitionEnd,
  children,
  transitionClasses = {},
}) => {
  const isDismissed = direction === 'out';
  const containerRef = useRef<HTMLDivElement>(null);
  const handleAnimation = (e: AnimationEvent) => {
    // Ignore animations happening on child elements
    if (e.target !== containerRef.current) {
      return;
    }

    onTransitionEnd?.(direction ?? 'in');
  };
  const classes = useMemo(() => {
    const {
      transitionIn = 'animate-fade-in',
      transitionOut = 'animate-fade-out',
    } = transitionClasses;

    return {
      [transitionIn]: !isDismissed,
      [transitionOut]: isDismissed,
    };
  }, [isDismissed, transitionClasses]);

  return (
    <div
      data-testid="animation-container"
      onAnimationEnd={handleAnimation}
      ref={containerRef}
      className={classnames('relative w-full container', classes)}
    >
      {children}
    </div>
  );
};

export type ToastMessagesProps = {
  messages: ToastMessage[];
  onMessageDismiss: (id: string) => void;
  transitionClasses?: ToastMessageTransitionClasses;
  setTimeout_?: typeof setTimeout;
};

type TimeoutId = number;

/**
 * A collection of toast messages. These are rendered within an `aria-live`
 * region for accessibility with screen readers.
 */
export default function ToastMessages({
  messages,
  onMessageDismiss,
  transitionClasses,
  /* istanbul ignore next - test seam */
  setTimeout_ = setTimeout,
}: ToastMessagesProps) {
  // List of IDs of toast messages that have been dismissed and have an
  // in-progress 'out' transition
  const [dismissedMessages, setDismissedMessages] = useState<string[]>([]);
  // Tracks not finished timeouts for auto-dismiss toast messages
  const messageSchedules = useRef(new Map<string, TimeoutId>());

  const dismissMessage = useCallback(
    (id: string) => setDismissedMessages(ids => [...ids, id]),
    [],
  );
  const scheduleMessageDismiss = useCallback(
    (id: string) => {
      const timeout = setTimeout_(() => {
        dismissMessage(id);
        messageSchedules.current.delete(id);
      }, 5000);
      messageSchedules.current.set(id, timeout);
    },
    [dismissMessage, setTimeout_],
  );

  const onTransitionEnd = useCallback(
    (direction: 'in' | 'out', message: ToastMessage) => {
      const autoDismiss = message.autoDismiss ?? true;
      if (direction === 'in' && autoDismiss) {
        scheduleMessageDismiss(message.id);
      }

      if (direction === 'out') {
        onMessageDismiss(message.id);
        setDismissedMessages(ids => ids.filter(id => id !== message.id));
      }
    },
    [scheduleMessageDismiss, onMessageDismiss],
  );

  useLayoutEffect(() => {
    // Clear all pending timeouts for not yet dismissed toast messages when the
    // component is unmounted
    const pendingTimeouts = messageSchedules.current;
    return () => {
      pendingTimeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  return (
    <ul
      aria-live="polite"
      aria-relevant="additions"
      className="w-full space-y-2"
      data-component="ToastMessages"
    >
      {messages.map(message => {
        const isDismissed = dismissedMessages.includes(message.id);
        return (
          <li
            className={classnames({
              // Add a bottom margin to visible messages only. Typically, we'd
              // use a `space-y-2` class on the parent to space children.
              // Doing that here could cause an undesired top margin on
              // the first visible message in a list that contains (only)
              // visually-hidden messages before it.
              // See https://tailwindcss.com/docs/space#limitations
              'mb-2': !message.visuallyHidden,
            })}
            key={message.id}
          >
            <ToastMessageTransition
              direction={isDismissed ? 'out' : 'in'}
              onTransitionEnd={direction => onTransitionEnd(direction, message)}
              transitionClasses={transitionClasses}
            >
              <ToastMessageItem message={message} onDismiss={dismissMessage} />
            </ToastMessageTransition>
          </li>
        );
      })}
    </ul>
  );
}
