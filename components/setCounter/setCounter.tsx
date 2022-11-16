import { Exercise, Workout } from "@prisma/client";
import React, { useMemo, useRef } from "react";
import { ExerciseWithTimestamp } from "../../hooks/useWorkout";
import { styled } from "../../styles/stitches.congif";
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

  return (
    <Flex direction="column" css={{ alignItems: "center", gap: "$sm" }}>
      <h4>Sets:</h4>
      <Sets>{`${currentSetCount.current} / ${totalSets}`}</Sets>
    </Flex>
  );
};

const Sets = styled("p", {
  fontSize: "$xx",
  fontWeight: "$700",
  lineHeight: "$150",
});

export default SetCounter;
