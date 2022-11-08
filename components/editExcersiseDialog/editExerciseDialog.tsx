import React, { useState } from "react";
import { ExerciseWithTimestamp } from "../../hooks/useWorkout";
import AlertDialog from "../alertDialog/alertDialog";
import { Title, Cancel, Action } from "@radix-ui/react-alert-dialog";
import Input from "../input";
import Button from "../button";
import { Flex } from "../layout";
import useExerciseMutation from "../../hooks/useExerciseMutation";

type Props = {
  exerciseData: ExerciseWithTimestamp;
};

const EditExerciseDialog = ({ exerciseData }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const mutation = useExerciseMutation("updateExercise", () =>
    setIsOpen(false)
  );

  const [{ name, duration, type }, setInputValue] = useState({
    name: exerciseData.exercise_name,
    duration: Math.round(exerciseData.duration / 1000),
    type: exerciseData.type,
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
    e.stopPropagation();

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
              <Button>Cancel</Button>
            </Cancel>
            {/* <Action asChild onClick={(event) => event.preventDefault()}> */}
            <Button colors="primary" type="submit">
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
