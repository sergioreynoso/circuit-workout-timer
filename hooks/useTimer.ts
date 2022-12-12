import { useCallback, useEffect, useRef, useState } from "react";

const INTERVAL: 1000 = 1000;

export default function useTimer(workoutTotalTime: number) {
  const [remainingTime, setRemainingTime] = useState(() => workoutTotalTime);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isTimerDone, setIsTimerDone] = useState(false);
  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const toggleTimer = useCallback(() => {
    setIsTimerRunning(!isTimerRunning);
  }, [isTimerRunning]);

  const updateTimer = () => {
    const currentTime = remainingTime - INTERVAL;
    setRemainingTime(currentTime);
    if (currentTime <= 0) {
      console.log("Workout Done", currentTime);
      setIsTimerRunning(false);
      setIsTimerDone(true);
    }
  };

  useEffect(() => {
    if (isTimerRunning)
      timerIntervalRef.current = setInterval(updateTimer, INTERVAL);
    return () => clearInterval(timerIntervalRef.current as NodeJS.Timeout);
  }, [updateTimer]);

  return [remainingTime, isTimerRunning, isTimerDone, toggleTimer] as const;
}
