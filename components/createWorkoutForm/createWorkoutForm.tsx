import React, { useCallback, useEffect, useState } from "react";
import Input from "../input/input";
import Button from "../button";
import { styled } from "../../styles/stitches.congif";
import { Exercise } from "@prisma/client";
import Link from "next/link";
import { Flex } from "../layout";
import ExerciseList from "../exerciseList";
import { useRouter } from "next/router";
import { WorkoutWithExercises } from "../../hooks/useFetchWorkout";
import useWorkoutMutation from "../../hooks/useWorkoutMutation";
import DeleteWorkoutDialog from "../deleteWorkoutDialog";

const CreateWorkoutForm = ({
  initialData,
}: {
  initialData: WorkoutWithExercises;
}) => {
  const router = useRouter();
  const [isDone, setIsDone] = useState<boolean>(false);

  const updateWorkout = useWorkoutMutation("updateWorkout", "workout");

  const [{ name, set, rest }, setInputValue] = useState({
    name: "",
    set: 3,
    rest: 30,
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDone(true);
    updateWorkout.mutate({
      id: initialData.id,
      workout_name: name,
      set_count: Number(set),
      set_rest: Number(rest * 1000),
    });
  };

  const returnToWorkout = useCallback(() => {
    router.push(`/workout/${initialData.id}`);
  }, [router, initialData.id]);

  useEffect(() => {
    if (updateWorkout.isSuccess && isDone) {
      returnToWorkout();
    }
  }, [updateWorkout.isSuccess, isDone, returnToWorkout]);

  return (
    <Wrapper as="form" css={{ gap: "$xl" }} onSubmit={onFormSubmit}>
      <Input
        type="text"
        label="Workout Name"
        name="name"
        value={name}
        onChange={handleChange}
        placeholder=""
        isRequired={true}
      />
      <Input
        type="number"
        label="Sets"
        name="set"
        value={set}
        onChange={handleChange}
        placeholder=""
      />
      <Input
        type="number"
        label="Set rest in seconds"
        name="rest"
        value={rest}
        onChange={handleChange}
        placeholder=""
      />

      <ExerciseList
        workoutId={initialData.id}
        exerciseData={initialData.exercises as Exercise[]}
      />

      <div>
        {updateWorkout.isLoading ? (
          "Adding workout..."
        ) : (
          <div>
            {updateWorkout.isError
              ? `An error occurred: ${updateWorkout.error}`
              : null}
          </div>
        )}
      </div>

      <Flex css={{ gap: "$lg" }}>
        <DeleteWorkoutDialog label="Cancel" workoutId={initialData.id} />
        <Button colors="primary" type="submit">
          Done
        </Button>
      </Flex>
    </Wrapper>
  );
};

const Wrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "$lg",
});

const NextLink = styled(Link, {
  color: "$primary-12",
  textDecoration: "none",
  padding: "$md $xl",
  ["&:hover"]: {
    color: "$primary-11",
  },
});

export default CreateWorkoutForm;
