import React, { useState } from "react";
import {
  Title,
  Description,
  Cancel,
  Action,
} from "@radix-ui/react-alert-dialog";
import AlertDialog from "../alertDialog";
import Button from "../button";
import { styled } from "../../styles/stitches.congif";
import useWorkoutMutation from "../../hooks/useWorkoutMutation";
import { useRouter } from "next/router";
import { TrashIcon } from "@radix-ui/react-icons";
import { Flex } from "../layout";

type DeleteWorkoutDialogProps = {
  label: string;
  workoutId: string;
};

const DeleteWorkoutDialog = ({
  label = "Delete",
  workoutId,
}: DeleteWorkoutDialogProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const mutation = useWorkoutMutation("deleteWorkout", "workouts", () => {
    setIsOpen(false);
    router.push("/dashboard");
  });
  const onClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    mutation.mutate({
      id: workoutId,
    });
  };

  const triggerButton = (
    <Button colors="transparent">
      <TrashIcon />
    </Button>
  );

  return (
    <AlertDialog
      triggerButton={triggerButton}
      isOpen={isOpen}
      setIsOpen={setIsOpen}>
      {mutation.isLoading ? (
        <p>Deleting Exercise...</p>
      ) : (
        <Flex css={{ flexDirection: "column", gap: "$lg" }}>
          <Title>Delete</Title>
          <Description>
            This action cannot be undone. This will permanently delete your
            workout and remove your data from our servers.
          </Description>
          <Flex css={{ justifyContent: "flex-end", gap: "$lg" }}>
            <Cancel asChild>
              <Button>Cancel</Button>
            </Cancel>
            {/* <Action asChild> */}
            <Button onClick={onClickHandler}>Delete</Button>
            {/* </Action> */}
          </Flex>
        </Flex>
      )}
    </AlertDialog>
  );
};

export default DeleteWorkoutDialog;
