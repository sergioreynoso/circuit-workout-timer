import React, { useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { styled } from "../../styles/stitches.congif";
import { ExerciseWithTimestamp } from "../../hooks/useWorkout";
import { DialogTitle } from "@radix-ui/react-dialog";
import Dialog from "../dialog";
import Input from "../input";
import { Exercise } from "@prisma/client";
import Button from "../button";

type Props = {
  exerciseData: ExerciseWithTimestamp;
  children?: JSX.Element;
};

const EditExerciseDialog = ({ exerciseData, children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();
  const mutation = useMutation(
    (exercise: Omit<Exercise, "workoutId">) =>
      axios.post("/api/exercise", exercise),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["exercises"]);
        setIsOpen(false);
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
    <Dialog label="Edit" isOpen={isOpen} setIsOpen={setIsOpen}>
      <DialogTitle>Edit Exercise</DialogTitle>
      <Wrapper as="form" css={{ gap: "$xl" }} onSubmit={onFormSubmit}>
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
      </Wrapper>
    </Dialog>
  );
};

const Wrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "24px",
});

export default EditExerciseDialog;
