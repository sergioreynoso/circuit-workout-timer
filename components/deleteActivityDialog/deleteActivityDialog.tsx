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
import useMutateActivity from "../../hooks/useMutateActivity";
import { TrashIcon } from "@radix-ui/react-icons";

type Props = {
  activityId: string;
};

const DeleteActivityDialog = ({ activityId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const mutation = useMutateActivity("deleteExercise", () => setIsOpen(false));
  const onClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    mutation.mutate({
      id: activityId,
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
        <Wrapper css={{ flexDirection: "column", gap: "$lg" }}>
          <Title>Delete Exercise</Title>
          <Description>
            This action cannot be undone. This will permanently delete your
            exercise and remove your data from our servers.
          </Description>
          <Wrapper css={{ justifyContent: "flex-end", gap: "$lg" }}>
            <Cancel asChild>
              <Button>Cancel</Button>
            </Cancel>
            {/* <Action asChild> */}
            <Button onClick={onClickHandler}>Delete</Button>
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

export default DeleteActivityDialog;