import { useEffect, useState, useCallback } from "react";
import axios from "axios";

import { useLocalStorage } from "./useLocalStorage";

export const useFetch = (
  url: string
): [
  { isLoading?: boolean; response?: any; error?: any },
  (options?: {}) => void
] => {
  const baseUrl = "https://conduit.productionready.io/api";
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});
  const { value: token } = useLocalStorage("token");

  const doFetch = useCallback((options = {}): void => {
    setOptions(options);
    setIsLoading(true);
  }, []);

  useEffect((): any => {
    let skipGetResponseAfterDestroy = false;

    const requestOptions = {
      ...options,
      ...{
        headers: {
          authorization: token ? `Token ${token}` : "",
        },
      },
    };

    if (!isLoading) {
      return;
    }

    axios(baseUrl + url, requestOptions)
      .then((res) => {
        if (!skipGetResponseAfterDestroy) {
          setIsLoading(false);
          setResponse(res.data);
        }
      })
      .catch((err) => {
        if (!skipGetResponseAfterDestroy) {
          setIsLoading(false);
          setError(err.response.data);
        }
      });

    return () => (skipGetResponseAfterDestroy = true);
  }, [isLoading, url, options, token]);

  return [{ isLoading, response, error }, doFetch];
};
