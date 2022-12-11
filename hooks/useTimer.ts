import { useCallback, useEffect, useState } from "react";

const INTERVAL: 1000 = 1000;

export default function useTimer(workoutTotalTime: number) {
  const [remainingTime, setRemainingTime] = useState(() => workoutTotalTime);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isTimerDone, setIsTimerDone] = useState(true);

  const toggleTimer = useCallback(() => {
    setIsTimerRunning(!isTimerRunning);
  }, [isTimerRunning]);

  const updateTimer = () => {
    const currentTime = remainingTime - INTERVAL;
    setRemainingTime(currentTime);
    if (currentTime <= 0) {
      console.log("Workout Done");
      setIsTimerRunning(false);
      setIsTimerDone(false);
    }
  };

  useEffect(() => {
    let timerInterval: ReturnType<typeof setInterval>;
    if (isTimerRunning) timerInterval = setInterval(updateTimer, INTERVAL);
    return () => clearInterval(timerInterval);
  }, [updateTimer, isTimerRunning]);

  return [remainingTime, isTimerRunning, isTimerDone, toggleTimer] as const;
}
