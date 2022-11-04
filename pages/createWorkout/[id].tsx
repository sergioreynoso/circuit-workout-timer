import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Exercise, Workout } from "@prisma/client";
import { GetServerSideProps } from "next";
import CreateWorkoutForm from "../../components/createWorkoutForm";
import { Flex } from "../../components/layout";
import prisma from "../../lib/prisma";

export interface WorkoutWithExercises extends Workout {
  exercises: Exercise[];
}

type Props = {
  workout: WorkoutWithExercises;
};

const CreateWorkout = (props: Props) => {
  const getWorkout = (workoutId: string): Promise<WorkoutWithExercises> =>
    axios
      .get(`/api/getWorkout`, { params: { id: workoutId } })
      .then((res) => res.data);

  const { data } = useQuery({
    queryKey: ["workout", props.workout.id],
    queryFn: () => getWorkout(props.workout.id),
    initialData: props.workout,
  });

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
      <CreateWorkoutForm data={data} />
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
    props: { workout },
  };
};

export default CreateWorkout;
