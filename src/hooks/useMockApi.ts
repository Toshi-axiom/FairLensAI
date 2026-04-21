import { useState, useEffect } from 'react';

export function useMockApi<T>(apiCall: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);

    apiCall()
      .then(res => {
        if (mounted) {
          setData(res);
          setIsLoading(false);
        }
      })
      .catch(err => {
        if (mounted) {
          console.error("API Fetch Error:", err);
          setError(err as Error);
          setIsLoading(false);
        }
      });

    // Cleanup to prevent processing on unmounted components
    return () => {
      mounted = false;
    };
  }, [apiCall]);

  return { data, isLoading, error };
}
