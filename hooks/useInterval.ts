import React, { useEffect, useRef } from "react";

export default function useInterval(
  callback: () => void,
  delay: number | null
) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current();
    if (typeof delay === "number") {
      intervalRef.current = setInterval(tick, delay);
      return () => clearInterval(intervalRef.current as NodeJS.Timeout);
    }
  }, [delay]);
  return intervalRef;
}
