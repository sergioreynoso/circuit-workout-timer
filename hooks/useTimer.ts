import { useCallback, useState } from "react";
import useInterval from "./useInterval";

const INTERVAL: 1000 = 1000;

export default function useTimer(workoutTotalTime: number) {
  const [remainingTime, setRemainingTime] = useState(() => workoutTotalTime);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isTimerDone, setIsTimerDone] = useState(false);

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

  useInterval(updateTimer, isTimerRunning ? INTERVAL : null);

  return [remainingTime, isTimerRunning, isTimerDone, toggleTimer] as const;
}
