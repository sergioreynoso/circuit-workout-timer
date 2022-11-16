import React from "react";
import { Workout } from "@prisma/client";
import { ExerciseWithTimestamp, useWorkout } from "../../hooks/useWorkout";
import useTimer from "../../hooks/useTimer";
import { formatTime } from "../../lib/formatTime";
import { styled } from "../../styles/stitches.congif";
import Timer_control from "../timerControl";
import Exercise_counter from "../exerciseCounter";
import { Flex } from "../layout";

type TimerProps = {
  workout: Workout;
  exercises: ExerciseWithTimestamp[];
};

const Timer = ({ workout, exercises }: TimerProps) => {
  const [workoutExercises, workoutTotalTime] = useWorkout(workout, exercises);
  const [remainingTime, isTimer, startTimer] = useTimer(workoutTotalTime);

  return (
    <Flex
      as="main"
      css={{ flexDirection: "column", alignItems: "center", gap: "$2x" }}>
      <p>{formatTime(remainingTime)}</p>
      <Exercise_counter
        workoutExercises={workoutExercises}
        remainingTime={remainingTime}
      />
      <Footer>
        <Timer_control startTimer={startTimer} isTimer={isTimer} />
      </Footer>
    </Flex>
  );
};

const Footer = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "$lg",
  width: "100%",
  height: "80px",
  backgroundColor: "$primary-02",
  "@less-sm": {
    position: "fixed",
    bottom: "0",
  },
});

export default Timer;
