export type EventHandler = (arg: any) => void;
export type SubscriptionCanceller = () => void;
const subscriptions: { [eventName: string]: EventHandler[] } = {};

/**
 * Subscribe an event handler to an event.
 * @param eventName The name of the event to subscribe to.
 * @param handler The handler function to subscribe to the event.
 * @returns Function that unsubscribes the handler from the event
 */
export const subscribe = (
  eventName: string,
  handler: EventHandler,
): SubscriptionCanceller => {
  if (!subscriptions[eventName]) subscriptions[eventName] = [];
  const eventSubscriptions = subscriptions[eventName];
  eventSubscriptions.push(handler);
  return unsubscribe(eventName, handler);
};

/**
 * Generates a function that unsubscribes an event handler from an event
 * @param eventName The name of the event to unsubscribe from.
 * @param handler The handler function to unsubscribe from the event.
 * @returns Function that unsubscribes the handler from the event
 */
export const unsubscribe = (
  eventName: string,
  handler: EventHandler,
): SubscriptionCanceller => {
  return () => {
    const eventSubscriptions = subscriptions[eventName];
    const index = eventSubscriptions.indexOf(handler);
    if (index > -1) {
      eventSubscriptions.splice(index, 1);
    }
  };
};

/**
 * Dispatch an event with a given argument. All the
 * event handlers subscribed to the event will be
 * called.
 */
export const dispatch = (eventName: string, arg: any) => {
  if (subscriptions[eventName]) {
    subscriptions[eventName].forEach(handler => handler(arg));
  }
};
