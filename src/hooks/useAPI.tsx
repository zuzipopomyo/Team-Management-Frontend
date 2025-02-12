import { AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from 'react';

type TApi<T> = () => Promise<AxiosResponse<T, any>>;
const useAPI = <T,>(api: TApi<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const callAPI = useCallback(async () => {
    try {
      const res = await api();
      setData(res.data);
      setIsLoading(false);
      setError(null);
    } catch (err: any) {
      setError(err?.message || 'Something went wrong');
      setIsLoading(false);
    }
  }, [api]);
  useEffect(() => {
    callAPI();
  }, []);
  return { data, isLoading, error };
};
export default useAPI;
