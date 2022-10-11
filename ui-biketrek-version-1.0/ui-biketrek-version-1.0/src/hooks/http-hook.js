import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const activeHttpRequest = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbrtCtrl = new AbortController();
      activeHttpRequest.current.push(httpAbrtCtrl);
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbrtCtrl.signal,
        });

        const responseData = await response.json();

        activeHttpRequest.current = activeHttpRequest.current.filter(
          (reqCtrl) => reqCtrl !== httpAbrtCtrl
        );

        if (!response.ok) {
          throw new Error(
            responseData.message || "Something went wrong , please try again"
          );
        }
        setIsLoading(false);
        return responseData;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
      setIsLoading(false);
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequest.current.forEach((abrtCtrl) => abrtCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
