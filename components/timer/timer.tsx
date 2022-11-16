import React from "react";
import { Workout } from "@prisma/client";
import { ExerciseWithTimestamp, useWorkout } from "../../hooks/useWorkout";
import useTimer from "../../hooks/useTimer";
import { formatTime } from "../../lib/formatTime";
import { styled } from "../../styles/stitches.congif";
import Timer_control from "../timerControl";
import Exercise_counter from "../exerciseCounter";
import { Flex } from "../layout";
import { useRouter } from "next/router";
import Button from "../button";

type TimerProps = {
  workout: Workout;
  exercises: ExerciseWithTimestamp[];
};

const Timer = ({ workout, exercises }: TimerProps) => {
  const [workoutExercises, workoutTotalTime] = useWorkout(workout, exercises);
  const [remainingTime, isTimer, startTimer] = useTimer(workoutTotalTime);

  const router = useRouter();

  const onCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    router.push(`/dashboard`);
  };

  const onEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    router.push(`/editWorkout/${workout.id as string}`);
  };

  return (
    <Flex
      as="main"
      css={{ flexDirection: "column", alignItems: "center", gap: "$2x" }}>
      <Exercise_counter
        workoutExercises={workoutExercises}
        remainingTime={remainingTime}
      />
      <Flex as="nav" css={{ justifyContent: "space-between", gap: "$3x" }}>
        {remainingTime > 0 ? (
          <>
            <Button onClick={onCancel}>Cancel</Button>
            <Button onClick={onEdit}>Edit</Button>
          </>
        ) : (
          <Button onClick={onCancel}>Back to Dashboard</Button>
        )}
      </Flex>
      {remainingTime > 0 ? (
        <Footer>
          <Timer_control startTimer={startTimer} isTimer={isTimer} />
        </Footer>
      ) : null}
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
