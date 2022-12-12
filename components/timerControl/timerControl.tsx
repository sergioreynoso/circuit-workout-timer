import { useRouter } from "next/router";
import React, { memo, useState } from "react";
import Button from "../button";
import { Flex } from "../layout";

interface TimerControlProps {
  workoutId: string;
  toggleTimer: () => void;
  isTimerRunning: boolean;
  isTimerDone: boolean;
}

const TimerControl = ({
  workoutId,
  toggleTimer,
  isTimerRunning,
  isTimerDone,
}: TimerControlProps) => {
  const [label, setLabel] = useState<string>("start");
  const router = useRouter();

  const onCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    router.push(`/dashboard`);
  };

  const onEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    router.push(`/editWorkout/${workoutId as string}`);
  };

  const onStart = () => {
    toggleTimer();
    if (isTimerRunning) {
      setLabel("continue");
    } else {
      setLabel("pause");
    }
  };

  return (
    <Flex css={{ gap: "$2x" }}>
      {!isTimerDone ? (
        <>
          <Button onClick={onCancel}>Cancel</Button>
          <Button colors="primary" onClick={onStart}>
            {label}
          </Button>
          <Button onClick={onEdit}>Edit</Button>
        </>
      ) : (
        <Button onClick={onCancel}>Back to Dashboard</Button>
      )}
    </Flex>
  );
};

export default memo(TimerControl);
