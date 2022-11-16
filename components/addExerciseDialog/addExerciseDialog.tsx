import React, { useState } from "react";
import AlertDialog from "../alertDialog/alertDialog";
import { Title, Cancel, Action } from "@radix-ui/react-alert-dialog";
import Input from "../input";
import Button from "../button";
import useExerciseMutation from "../../hooks/useExerciseMutation";
import { Flex } from "../layout";
import { PlusIcon } from "@radix-ui/react-icons";

type Props = {
  workoutId: string;
  exercisesTotalCount: number;
};

const AddExerciseDialog = ({ workoutId: id, exercisesTotalCount }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [{ name, duration, workoutId }, setInputValue] = useState({
    name: "",
    duration: 30,
    workoutId: id,
  });

  const mutation = useExerciseMutation("createExercise", () => {
    setIsOpen(false);
    setInputValue((prev) => ({
      ...prev,
      name: "",
    }));
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
      exercise_name: name,
      type: "EXERCISE",
      duration: Number(duration * 1000),
      workoutId: workoutId,
      display_seq: exercisesTotalCount + 1,
    });
  };

  const triggerButton = (
    <Button colors="primary">
      <PlusIcon />
    </Button>
  );

  return (
    <AlertDialog
      triggerButton={triggerButton}
      isOpen={isOpen}
      setIsOpen={setIsOpen}>
      <Flex direction="column">
        <Title>Add Exercise</Title>
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
            label="Duration in seconds"
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
            {/* <Action asChild> */}
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

export default AddExerciseDialog;
