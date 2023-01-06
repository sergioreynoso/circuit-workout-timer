import React from "react";
import { GetServerSideProps } from "next";
import CreateWorkoutForm from "../../components/createWorkoutForm";
import { Box, Container, Flex } from "../../components/layout";
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
    <Container>
      <Box as="h1" css={{ paddingBlock: "$2x" }}>
        Create your workout
      </Box>
      <CreateWorkoutForm initialData={data as WorkoutWithExercises} />
    </Container>
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
