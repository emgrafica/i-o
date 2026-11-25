import { useState, useEffect, useRef } from 'react';

/**
 *
 * Function that waits to fire another function until after a delay set by the consumer
 *
 * @param value - Function that is to be called after set delay
 * @param delay - Delay value
 */
export const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay, value]);

  return debouncedValue;
};

/**
 *
 * Function that waits to fire another function until after a delay set by the consumer
 *
 * @param callback - Function that is to be called after set delay
 * @param wait - Delay value
 */
export function useDebouncedCallback<A extends any[]>(
  callback: (...args: A) => void,
  wait: number,
) {
  // track args & timeout handle between calls
  const argsRef = useRef<A>();
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  function cleanup() {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  }

  // make sure our timeout gets cleared if
  // our consuming component gets unmounted
  useEffect(() => cleanup, []);

  return function debouncedCallback(...args: A) {
    // capture latest args
    argsRef.current = args;

    // clear debounce timer
    cleanup();

    // start waiting again
    timeout.current = setTimeout(() => {
      if (argsRef.current) {
        callback(...argsRef.current);
      }
    }, wait);
  };
}
