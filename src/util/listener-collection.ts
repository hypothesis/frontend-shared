export type Listener = {
  eventTarget: EventTarget;
  eventType: string;
  listener: EventListener;
  options?: AddEventListenerOptions;
};

/**
 * Return the event type that a listener will receive.
 *
 * For example `EventType<HTMLElement, 'keydown'>` evaluates to `KeyboardEvent`.
 *
 * The event type is extracted from the target's `on${Type}` property (eg.
 * `HTMLElement.onkeydown` here) If there is no such property, the type defaults
 * to `Event`.
 */
export type EventType<
  Target extends EventTarget,
  TypeName extends string,
> = `on${TypeName}` extends keyof Target
  ? Target[`on${TypeName}`] extends ((...args: any[]) => void) | null
    ? Parameters<NonNullable<Target[`on${TypeName}`]>>[0]
    : Event
  : Event;

/**
 * Utility that provides a way to conveniently remove a set of DOM event
 * listeners when they are no longer needed.
 */
export class ListenerCollection {
  private _listeners: Map<symbol, Listener>;

  constructor() {
    this._listeners = new Map();
  }

  /**
   * Add a listener and return an ID that can be used to remove it later
   */
  add<ListenerTarget extends EventTarget, Type extends string>(
    eventTarget: ListenerTarget,
    eventType: Type,
    listener: (event: EventType<ListenerTarget, Type>) => void,
    options?: AddEventListenerOptions,
  ) {
    eventTarget.addEventListener(eventType, listener, options);
    const symbol = Symbol();
    this._listeners.set(symbol, {
      eventTarget,
      eventType,
      listener,
      options,
    });
    return symbol;
  }

  /**
   * Remove a specific listener.
   */
  remove(listenerId: symbol) {
    const event = this._listeners.get(listenerId);
    if (event) {
      const { eventTarget, eventType, listener, options } = event;
      eventTarget.removeEventListener(eventType, listener, options);
      this._listeners.delete(listenerId);
    }
  }

  removeAll() {
    this._listeners.forEach(({ eventTarget, eventType, listener, options }) => {
      eventTarget.removeEventListener(eventType, listener, options);
    });
    this._listeners.clear();
  }
}
