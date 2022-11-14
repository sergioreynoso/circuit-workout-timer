import React from "react";
import { GetServerSideProps } from "next";
import CreateWorkoutForm from "../../components/createWorkoutForm";
import { Flex } from "../../components/layout";
import { prisma } from "../../lib/prisma";
import useFetchWorkout, {
  WorkoutWithExercises,
} from "../../hooks/useFetchWorkout";

type CreateWorkoutProps = {
  initialData: WorkoutWithExercises;
};

const CreateWorkout = ({ initialData }: CreateWorkoutProps) => {
  const { data } = useFetchWorkout(
    "getWorkout",
    initialData.id,
    "workout",
    initialData
  );

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
      <CreateWorkoutForm initialData={data as WorkoutWithExercises} />
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
