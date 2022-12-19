import React from "react";
import { prisma } from "../../lib/prisma";
import { GetServerSideProps } from "next";
import { WorkoutWithExercises } from "../../hooks/useFetchWorkout";
import { useWorkout } from "../../hooks/useWorkout";
import ExerciseCounter from "../../components/exerciseCounter";
import { Box, Flex } from "../../components/layout";
import CounterProvider from "../../components/counterProvider/counterProvider";
import CounterHeader from "../../components/counterHeader";
import TimerControl from "../../components/timerControl/timerControl";

type WorkoutTimerProps = {
  initialData: WorkoutWithExercises;
};

const WorkoutTimer = ({ initialData }: WorkoutTimerProps) => {
  const formattedWorkout = useWorkout(initialData);

  return (
    <CounterProvider>
      <Box
        css={{
          padding: "$xl",
          maxWidth: "$bp-md",
          margin: "auto",
        }}>
        <CounterHeader id={initialData.id}>
          {initialData.workout_name}
        </CounterHeader>
        <ExerciseCounter workoutData={formattedWorkout} />
        <TimerControl />
      </Box>
    </CounterProvider>
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

export default WorkoutTimer;
