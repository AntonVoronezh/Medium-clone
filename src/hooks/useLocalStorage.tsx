import { useState, useEffect } from "react";

export const useLocalStorage = (
  key: string,
  initialValue: string = ""
): {
  setValue: (
    value: ((prevState: string | null) => string | null) | string | null
  ) => void;
  value: string | null;
} => {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(key || initialValue);
  });

  useEffect(() => {
    value && localStorage.setItem(key, value);
  }, [value, key]);

  return { value, setValue };
};
