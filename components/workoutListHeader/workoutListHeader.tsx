import { Exercise, Workout } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import Button from "../button";
import { Flex } from "../layout";

export interface TransformedWorkout extends Omit<Workout, "id"> {
  exerciseList: Partial<Exercise>[];
}

type Props = {
  userId: string;
};

const exercises: Partial<Exercise>[] = [
  {
    exercise_name: "First Exercise",
    display_seq: 1,
    duration: 30000,
    type: "EXERCISE",
  },
];

const WorkoutListHeader = ({ userId }: Props) => {
  const router = useRouter();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (workout: TransformedWorkout) => axios.post("/api/v1/workout", workout),
    onSuccess: data => {
      const newData = data.data;
      queryClient.setQueryData(["workouts", newData.id], newData);
    },
  });

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    mutation.mutate({
      workout_name: "Untitled Workout",
      set_count: 1,
      set_rest: 10000,
      userId: userId,
      display_seq: 0,
      exerciseList: exercises,
    });
  };

  if (mutation.isSuccess) {
    router.push(`/createWorkout/${mutation.data.data.id}`);
  }

  return (
    <Flex
      css={{
        justifyContent: "space-between",
        gap: "$lg",
        paddingBlock: "$2x",
      }}
    >
      <Flex direction="column" css={{ gap: "$sm" }}>
        <h2>Build Workout</h2>
        <p>Add exercises or rests between exercises. </p>
      </Flex>

      <Button colors="primary" onClick={onClickHandler}>
        Add Workout
      </Button>
    </Flex>
  );
};

export default WorkoutListHeader;
