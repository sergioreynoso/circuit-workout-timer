import React from "react";
import { Workout } from "@prisma/client";
import { useWorkout } from "../../hooks/useWorkout";
import { Exercise } from "../../pages/workout/[id]";
import useTimer from "../../hooks/useTimer";
import { formatTime } from "../../lib/formatTime";
import { styled } from "../../styles/stitches.congif";
import Timer_control from "../timer_control";
import Exercise_counter from "../exercise_counter";

type TimerProps = {
  workout: Workout;
  exercises: Exercise[] | undefined;
};

const Timer = ({ workout, exercises }: TimerProps) => {
  const [workoutExercises, workoutTotalTime] = useWorkout(workout, exercises);
  const [remainingTime, isTimer, startTimer] = useTimer(workoutTotalTime);

  console.log(workoutExercises);

  return (
    <Box as="main">
      <Heading2>{formatTime(remainingTime)}</Heading2>
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

const Heading2 = styled("h2", {});

export default Timer;
