import React, { useState } from "react";
import Input from "../input/input";
import Button from "../button";
import { styled } from "../../styles/stitches.congif";
import { Workout } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { WorkoutWithExercises } from "../../hooks/useFetchWorkout";

type WorkoutUpdate = Omit<Workout, "userId" | "display_seq">;

type Props = {
  workoutData: WorkoutWithExercises;
  children?: JSX.Element;
};

const EditWorkoutForm = ({ workoutData, children }: Props) => {
  const router = useRouter();

  const mutation = useMutation((workout: WorkoutUpdate) => {
    return axios.post("/api/updateWorkout", workout);
  });

  const [{ name, set, rest }, setInputValue] = useState({
    name: workoutData.workout_name,
    set: workoutData.set_count,
    rest: Math.round(workoutData.set_rest / 1000),
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
      id: workoutData.id,
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
            {mutation.isSuccess ? <div>Workout updated!</div> : null}
          </div>
        )}
      </div>

      <Button color="violet" type="submit">
        Update Workout
      </Button>
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

export default EditWorkoutForm;
