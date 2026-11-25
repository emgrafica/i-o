import { useEffect, useRef } from 'react';

/**
 * Hook to keep track of the previous value of a state.
 * Here is an example of how to use it:
 * @example
    function Counter() {
      const [count, setCount] = useState(0);
      const prevCount = usePrevious(count);
      return <h1>Now: {count}, before: {prevCount}</h1>;
    }
 * @see: https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
 */
export const usePrevious = (value: any, initial?: any) => {
  const ref = useRef(initial);
  useEffect(() => {
    ref.current = value;
  }, [value, ref]);
  return ref.current;
};
