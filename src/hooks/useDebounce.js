import { useState, useEffect } from 'react';

/**
 * Custom hook to debounce rapid value updates
 * @param {*} value - The input value to debounce
 * @param {number} delay - Delay in milliseconds (default 300ms)
 */
export function useDebounce(value, delay = 350) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
