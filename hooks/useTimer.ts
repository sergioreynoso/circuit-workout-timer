import { useCallback, useEffect, useRef, useState } from "react";

const INITIAL_TIME: 0 = 0;
const INTERVAL: 1000 = 1000;

export default function useTimer(workoutTotalTime: number) {
  const [remainingTime, setRemainingTime] = useState<number>(workoutTotalTime);
  const [isTimer, setIsTimer] = useState<boolean>(false);

  const remainingTimeRef = useRef<number>(workoutTotalTime);

  const endTimer = useCallback(() => {
    setIsTimer(false);
  }, [setIsTimer]);

  const startTimer = () => {
    setIsTimer(!isTimer);
  };

  const updateTimer = useCallback((): void => {
    remainingTimeRef.current -= INTERVAL;
    setRemainingTime(remainingTimeRef.current);
    if (remainingTimeRef.current < INTERVAL) {
      console.log("Workout Done");
      endTimer();
    }
  }, [remainingTimeRef, endTimer]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isTimer) interval = setInterval(updateTimer, INTERVAL);
    return () => clearInterval(interval);
  }, [updateTimer, isTimer]);

  return [remainingTime, isTimer, startTimer] as const;
}
