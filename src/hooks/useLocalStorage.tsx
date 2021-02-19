import { useState, useEffect } from "react";

export const useLocalStorage = (key: string, initialValue: string = "") => {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(key || initialValue);
  });

  useEffect(() => {
    value && localStorage.setItem(key, value);
  }, [value, key]);

  return { value, setValue };
};
