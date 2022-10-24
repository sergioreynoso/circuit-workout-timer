import React from "react";
import { Workout } from "@prisma/client";
import { ExerciseWithTimestamp, useWorkout } from "../../hooks/useWorkout";
import useTimer from "../../hooks/useTimer";
import { formatTime } from "../../lib/formatTime";
import { styled } from "../../styles/stitches.congif";
import Timer_control from "../timerControl";
import Exercise_counter from "../exerciseCounter";

type TimerProps = {
  workout: Workout;
  exercises: ExerciseWithTimestamp[] | undefined;
};

const Timer = ({ workout, exercises }: TimerProps) => {
  const [workoutExercises, workoutTotalTime] = useWorkout(workout, exercises);
  const [remainingTime, isTimer, startTimer] = useTimer(workoutTotalTime);

  return (
    <Box as="main">
      <p>{formatTime(remainingTime)}</p>
      <Exercise_counter
        workoutExercises={workoutExercises}
        remainingTime={remainingTime}
      />
      <Timer_control startTimer={startTimer} isTimer={isTimer} />
    </Box>
  );
};

const Box = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "$2x",
});

export default Timer;
