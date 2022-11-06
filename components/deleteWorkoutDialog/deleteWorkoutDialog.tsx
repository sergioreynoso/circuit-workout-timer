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

type Props = {
  workoutId: string;
};

const DeleteWorkoutDialog = ({ workoutId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const mutation = useWorkoutMutation("deleteWorkout", () => setIsOpen(false));
  const onClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    mutation.mutate({
      id: workoutId,
    });
  };

  return (
    <AlertDialog label="Delete" isOpen={isOpen} setIsOpen={setIsOpen}>
      {mutation.isLoading ? (
        <p>Deleting Exercise...</p>
      ) : (
        <Wrapper css={{ flexDirection: "column", gap: "$lg" }}>
          <Title>Delete</Title>
          <Description>
            This action cannot be undone. This will permanently delete your
            workout and remove your data from our servers.
          </Description>
          <Wrapper css={{ justifyContent: "flex-end", gap: "$lg" }}>
            <Cancel asChild>
              <Button color="gray">Cancel</Button>
            </Cancel>
            {/* <Action asChild> */}
            <Button color="red" onClick={onClickHandler}>
              Delete
            </Button>
            {/* </Action> */}
          </Wrapper>
        </Wrapper>
      )}
    </AlertDialog>
  );
};

const Wrapper = styled("div", {
  display: "flex",
});

export default DeleteWorkoutDialog;