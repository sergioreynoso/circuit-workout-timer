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
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  exerciseId: string;
};

const DeleteExerciseDialog = ({ exerciseId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();
  const mutation = useMutation(
    (exercise: { id: string }) => axios.post("/api/deleteExercise", exercise),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["exercises"]);
        setIsOpen(false);
      },
    }
  );

  const onClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    mutation.mutate({
      id: exerciseId,
    });
  };

  return (
    <AlertDialog label="Delete" isOpen={isOpen} setIsOpen={setIsOpen}>
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

export default DeleteExerciseDialog;
