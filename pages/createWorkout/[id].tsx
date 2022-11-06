import React from "react";
import { Exercise, Workout } from "@prisma/client";
import { GetServerSideProps } from "next";
import CreateWorkoutForm from "../../components/createWorkoutForm";
import { Flex } from "../../components/layout";
import prisma from "../../lib/prisma";
import useFetchWorkout from "../../hooks/useFetchWorkout";

export interface WorkoutWithExercises extends Workout {
  exercises: Exercise[];
}
type CreateWorkoutProps = {
  initialData: Workout;
};

const CreateWorkout = ({ initialData }: CreateWorkoutProps) => {
  const { data } = useFetchWorkout("getWorkout", initialData.id, initialData);

  return (
    <Flex
      direction="column"
      css={{
        justifyContent: "center",
        alignItems: "center",
        padding: "$3x",
        gap: "$3x",
      }}>
      <h1>Create Workout</h1>
      <CreateWorkoutForm data={data as WorkoutWithExercises} />
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

export default CreateWorkout;
