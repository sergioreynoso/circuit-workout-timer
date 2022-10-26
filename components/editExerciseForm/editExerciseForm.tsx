import React, { useState } from "react";
import Input from "../input/input";
import Button from "../button";
import { styled } from "../../styles/stitches.congif";
import { Exercise } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ExerciseWithTimestamp } from "../../hooks/useWorkout";

type ExerciseUpdate = Omit<Exercise, "workoutId">;

const EditExerciseForm = ({
  exerciseData,
  setOpen,
}: {
  exerciseData: ExerciseWithTimestamp;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (exercise: ExerciseUpdate) => axios.post("/api/exercise", exercise),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["exercises"]);
        setOpen(false);
      },
    }
  );

  const [inputValue, setInputValue] = useState({
    name: exerciseData.exercise_name,
    duration: Math.round(exerciseData.duration / 1000),
    type: exerciseData.type,
  });
  const { name, duration, type } = inputValue;

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
      id: exerciseData.id,
      exercise_name: name,
      type: type,
      duration: Number(duration * 1000),
    });
  };

  return (
    <Box as="form" css={{ gap: "$xl" }} onSubmit={onFormSubmit}>
      <Input
        type="text"
        label="Exercise Name"
        name="name"
        value={name}
        onChange={handleChange}
        placeholder=""
      />
      <Input
        type="number"
        label="duration"
        name="duration"
        value={duration}
        onChange={handleChange}
        placeholder=""
      />
      <div>{mutation.isLoading && "Updating exercise..."}</div>
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

export default EditExerciseForm;
