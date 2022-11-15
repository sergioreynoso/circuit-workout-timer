import React, { useCallback, useEffect, useState } from "react";
import Input from "../input/input";
import Button from "../button";
import { styled } from "../../styles/stitches.congif";
import { Workout } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { WorkoutWithExercises } from "../../hooks/useFetchWorkout";
import useWorkoutMutation from "../../hooks/useWorkoutMutation";

type WorkoutUpdate = Omit<Workout, "userId" | "display_seq">;

type EditWorkoutFormProps = {
  initialData: WorkoutWithExercises;
  children?: JSX.Element;
};

const EditWorkoutForm = ({ initialData, children }: EditWorkoutFormProps) => {
  const router = useRouter();
  const [isDone, setIsDone] = useState<boolean>(false);
  const [{ name, set, rest }, setInputValue] = useState(() => ({
    name: initialData.workout_name,
    set: initialData.set_count,
    rest: Math.round(initialData.set_rest / 1000),
  }));

  const mutation = useWorkoutMutation("updateWorkout", "workout", () => {
    router.push(`/workout/${initialData.id}`);
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
    mutation.mutate({
      id: initialData.id,
      workout_name: name,
      set_count: Number(set),
      set_rest: Number(rest * 1000),
    });
  };

  return (
    <Wrapper as="form" css={{ gap: "$xl" }} onSubmit={onFormSubmit}>
      <Input
        type="text"
        label="Workout Name"
        name="name"
        value={name}
        onChange={handleChange}
        placeholder=""
        isRequired
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
      {children}
      <div>
        {mutation.isLoading ? (
          "Adding todo..."
        ) : (
          <div>
            {mutation.isError ? `An error occurred: ${mutation.error}` : null}
          </div>
        )}
      </div>

      <Button colors="primary" type="submit">
        Done
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "$lmd",
});

export default EditWorkoutForm;
