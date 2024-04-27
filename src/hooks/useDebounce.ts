import { useEffect, useMemo, useRef } from "react";
import { debounce } from "lodash";

export const useDebounce = (callback: any) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = () => {
      //@ts-ignore
      ref.current?.();
    };

    return debounce(func, 500);
  }, []);

  return debouncedCallback;
};
