import React from "react";
import { styled } from "../../styles/stitches.congif";
import { prisma } from "../../lib/prisma";
import { GetServerSideProps } from "next";
import { WorkoutWithExercises } from "../../hooks/useFetchWorkout";
import { Flex } from "../../components/layout";
import { useWorkout } from "../../hooks/useWorkout";
import useTimer from "../../hooks/useTimer";
import Timer_control from "../../components/timerControl";
import Exercise_counter from "../../components/exerciseCounter";

type WorkoutTimerProps = {
  initialData: WorkoutWithExercises;
};

const WorkoutTimer = ({ initialData }: WorkoutTimerProps) => {
  const [workoutExercises, workoutTotalTime] = useWorkout(initialData);
  const [remainingTime, isTimerRunning, isTimerDone, toggleTimer] =
    useTimer(workoutTotalTime);

  return (
    <Flex
      direction="column"
      css={{
        justifyContent: "space-around",
        alignItems: "center",
        padding: "24px",
      }}>
      <Heading1>{initialData.workout_name}</Heading1>
      <Flex css={{ flex: "1" }}>
        <Flex
          as="main"
          css={{ flexDirection: "column", alignItems: "center", gap: "$2x" }}>
          <Exercise_counter
            workoutExercises={workoutExercises}
            remainingTime={remainingTime}
          />
          <Footer>
            <Timer_control
              workoutId={initialData.id}
              toggleTimer={toggleTimer}
              isTimerRunning={isTimerRunning}
              isTimerDone={isTimerDone}
            />
          </Footer>
        </Flex>
      </Flex>
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const workout = await prisma?.workout.findUnique({
    where: {
      id: params?.id as string,
    },
    include: {
      exercises: {
        orderBy: {
          display_seq: "asc",
        },
      },
    },
  });

  return {
    props: { initialData: workout },
  };
};

const Heading1 = styled("h1", {
  fontSize: "$lg",
  lineHeight: "$150",
  textAlign: "center",
  marginBottom: "$lg",
});

const Footer = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "$lg",
  width: "100%",
  height: "80px",
  paddingInline: "$2x",
  backgroundColor: "$primary-02",
  "@less-sm": {
    position: "fixed",
    bottom: "0",
  },
});

export default WorkoutTimer;
