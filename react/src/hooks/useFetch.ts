import { useEffect, useState } from 'react';

export const useFetch = (url: string, method = 'GET') => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setLoading(true);

    fetch(url, {
      method
    })
      .then((res: any) => res.json())
      .then((res: any) => {
        setData(res);
        setLoading(false);
      })
      .catch((err: any) => {
        setLoading(false);
        setError(err);
      });
  }, [url]);

  return { data, loading, error };
};
