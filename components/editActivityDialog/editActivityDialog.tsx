import { Cancel, Title } from "@radix-ui/react-alert-dialog";
import { Pencil1Icon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import useMutateActivity from "../../hooks/useMutateActivity";
import { Activity } from "../../hooks/useWorkout";
import AlertDialog from "../alertDialog/alertDialog";
import Button from "../button";
import Input from "../input";
import { Flex } from "../layout";

type Props = {
  activity: Activity;
};

const EditActivityDialog = ({ activity }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const mutation = useMutateActivity("updateExercise", () => setIsOpen(false));

  const [{ name, duration, type }, setInputValue] = useState({
    name: activity.exercise_name,
    duration: Math.round(activity.duration / 1000),
    type: activity.type,
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
      id: activity.id,
      exercise_name: name,
      type: type,
      duration: Number(duration * 1000),
    });
  };

  const triggerButton = (
    <Button colors="transparent">
      <Pencil1Icon />
    </Button>
  );

  return (
    <AlertDialog
      triggerButton={triggerButton}
      isOpen={isOpen}
      setIsOpen={setIsOpen}>
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

export default EditActivityDialog;