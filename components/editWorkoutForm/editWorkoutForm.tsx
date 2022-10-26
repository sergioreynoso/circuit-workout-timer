import React, { useState } from "react";
import Input from "../input/input";
import Button from "../button";
import { styled } from "../../styles/stitches.congif";
import { Workout } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type WorkoutUpdate = Omit<Workout, "userId">;

const EditWorkoutForm = ({ workoutData }: { workoutData: Workout }) => {
  const mutation = useMutation((workout: WorkoutUpdate) => {
    return axios.post("/api/workout", workout);
  });

  const [inputValue, setInputValue] = useState({
    name: workoutData.workout_name,
    set: workoutData.set_count,
    rest: Math.round(workoutData.set_rest / 1000),
  });
  const { name, set, rest } = inputValue;

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(inputValue);
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
    <Box as="form" css={{ gap: "$xl" }} onSubmit={onFormSubmit}>
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
    </Box>
  );
};

const Box = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "24px",
});

export default EditWorkoutForm;
