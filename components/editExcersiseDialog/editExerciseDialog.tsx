import React, { useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { styled } from "../../styles/stitches.congif";
import { ExerciseWithTimestamp } from "../../hooks/useWorkout";
import AlertDialog from "../alertDialog/alertDialog";
import { Title, Cancel, Action } from "@radix-ui/react-alert-dialog";
import Input from "../input";
import { Exercise } from "@prisma/client";
import Button from "../button";
import { Flex } from "../layout";

type Props = {
  exerciseData: ExerciseWithTimestamp;
  children?: JSX.Element;
};

const EditExerciseDialog = ({ exerciseData, children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();
  const mutation = useMutation(
    (exercise: Omit<Exercise, "workoutId" | "display_seq">) =>
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
    <AlertDialog label="Edit" isOpen={isOpen} setIsOpen={setIsOpen}>
      <Flex direction="column">
        <Title>Edit Exercise</Title>
        <Flex
          as="form"
          css={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "$lg",
            gap: "$xl",
          }}
          onSubmit={onFormSubmit}>
          <Input
            type="text"
            label="Exercise Name"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder=""
            isRequired={true}
          />
          <Input
            type="number"
            label="duration"
            name="duration"
            value={duration}
            onChange={handleChange}
            placeholder=""
            isRequired={true}
          />
          <div>{mutation.isLoading && "Updating exercise..."}</div>

          <Flex css={{ justifyContent: "flex-end", gap: "$lg" }}>
            <Cancel asChild>
              <Button color="gray">Cancel</Button>
            </Cancel>
            {/* <Action asChild onClick={(event) => event.preventDefault()}> */}
            <Button color="violet" type="submit">
              Save
            </Button>
            {/* </Action> */}
          </Flex>
        </Flex>
      </Flex>
    </AlertDialog>
  );
};
export default EditExerciseDialog;
