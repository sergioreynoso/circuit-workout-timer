import React, { useState } from "react";
import { styled } from "../../styles/stitches.congif";
import { DialogTitle } from "@radix-ui/react-dialog";
import Dialog from "../dialog";
import Input from "../input";
import Button from "../button";
import useExerciseMutation from "../../hooks/useExerciseMutation";

type Props = {
  workoutId: string;
  exercisesTotalCount: number;
};

const AddExerciseDialog = ({ workoutId: id, exercisesTotalCount }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const mutation = useExerciseMutation(() => setIsOpen(false));

  const [{ name, duration, workoutId }, setInputValue] = useState({
    name: "Name your exercise",
    duration: 0,
    workoutId: id,
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
      exercise_name: name,
      type: "EXERCISE",
      duration: Number(duration * 1000),
      workoutId: workoutId,
      display_seq: exercisesTotalCount + 1,
    });
  };

  return (
    <Dialog label="Add Exercise" isOpen={isOpen} setIsOpen={setIsOpen}>
      <DialogTitle>Add Exercise</DialogTitle>
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
          Add Exercise
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

export default AddExerciseDialog;
