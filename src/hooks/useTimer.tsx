import { useEffect, useState } from 'react';

const useTimer = (timeoutInSecond: number) => {
  const [timeLeft, setTimeLeft] = useState(timeoutInSecond);

  useEffect(() => {
    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  return [timeLeft, setTimeLeft] as const;
};

export default useTimer;
