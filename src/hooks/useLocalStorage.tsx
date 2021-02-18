import { useState, useEffect } from "react";

export const useLocalStorage = (key, initialValue = "") => {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(key|| initialValue) ;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};
