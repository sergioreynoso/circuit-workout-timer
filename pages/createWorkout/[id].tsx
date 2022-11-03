import { Exercise, Workout } from "@prisma/client";
import { useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Button from "../../components/button";
import CreateWorkoutForm from "../../components/createWorkoutForm";
import Input from "../../components/input";
import { Flex } from "../../components/layout";
import Preloader from "../../components/preloader";

export interface WorkoutWithExercises extends Workout {
  exercises: Exercise[];
}

type Props = {
  workout: WorkoutWithExercises;
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

const CreateWorkout = (props: Props) => {
  const getWorkout = (workoutId: string): Promise<WorkoutWithExercises> =>
    axios
      .get(`/api/workout`, { params: { id: workoutId } })
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

export default CreateWorkout;
