import { Exercise, Workout } from "@prisma/client";
import React, { useMemo, useRef } from "react";
import { ExerciseWithTimestamp } from "../../hooks/useWorkout";
import { Flex } from "../layout";

const INITIAL_SET: 0 = 0;

interface SetCounterProps {
  exercises: ExerciseWithTimestamp[];
  remainingTime: number;
}

const SetCounter = ({ exercises, remainingTime }: SetCounterProps) => {
  const totalSets = useMemo(() => {
    return exercises.filter((item) => item.type === "REST").length;
  }, [exercises]);

  const currentSetCount = useRef<number>(INITIAL_SET);

  const setsLeft = useMemo(() => {
    return exercises.filter((item) => item.type === "REST");
  }, [exercises]);

  setsLeft.forEach((item) => {
    if (item.timestamp) {
      if (
        remainingTime < item.timestamp.start &&
        remainingTime > item.timestamp.end
      ) {
        currentSetCount.current++;
        setsLeft.shift();
      }
    }
  });

  return <Flex>{`Sets: ${currentSetCount.current} / ${totalSets}`}</Flex>;
  //   return <Flex>0/0</Flex>;
};

export default SetCounter;
