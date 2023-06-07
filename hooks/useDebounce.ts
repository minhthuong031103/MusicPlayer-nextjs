import { useEffect, useState } from 'react';

// :T return T => lay <T> vi no se co the nhan vao ca string hoac number, nen ham nay return lai T luon

//=> generic type
function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(
    function () {
      const timer = setTimeout(function () {
        setDebouncedValue(value);
      }, delay || 500);
      return function () {
        clearTimeout(timer); //clear for not overflow
      };
    },
    [value, delay]
  );
  return debouncedValue; //type=> get result after delay 500
}
export default useDebounce;
