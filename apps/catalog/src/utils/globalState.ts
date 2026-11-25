import { useEffect, useState } from 'react';
import { dispatch, subscribe } from 'utils/eventManager';

/** Global store object to manage global state */
const store: { [key: string]: any } = {};

/** Access Global State */
export const getGlobalState = (name: string) => store[name];

/** Set global state and update the subscribers */
export const setGlobalState = (
  name: string,
  value: any,
  userIdToPersist?: string,
) => {
  if (store[name] !== value) {
    store[name] = value;
    if (userIdToPersist) {
      const item = { [name]: value };
      localStorage.setItem(userIdToPersist, JSON.stringify(item));
    }
    dispatch(name, value);
  }
};

/**
 * Hook to get and set the global state from the store.
 * The component will refresh every time the value in the
 * store is updated
 * @returns A tuple with the current value of
 * the store and a function to update it.
 */
const useGlobalState = <T>(
  name: string,
  userId?: string,
): [T, (value: T) => void] => {
  const [value, setValueLocal] = useState(store[name]);

  // Update local value when store is updated
  useEffect(() => {
    const unsubscribe = subscribe(name, setValueLocal);
    return unsubscribe;
  }, [name]);
  return [value, (value: T) => setGlobalState(name, value, userId)];
};

/**
 * Set the initial value for a store
 * @returns A function that returns a useGlobalState
 * hook for the create global state
 */
export const initGlobalState = <T>(name: string, value?: T) => {
  store[name] = value;
  return () => useGlobalState<T>(name);
};

/**
 * Set the initial value for a store that persists
 * @returns A function that returns a useGlobalState
 * hook for the create global state
 */
export const initPersistentGlobalState = <T>(
  name: string,
  userId: string,
  value?: T,
) => {
  const userItem = localStorage.getItem(userId);
  const userItemInitialValue = userItem
    ? JSON.parse(userItem)
    : { [name]: value };
  store[name] = userItemInitialValue[name];
  !userItem &&
    localStorage.setItem(userId, JSON.stringify(userItemInitialValue));
  return () => useGlobalState<T>(name, userId);
};
