import React, { useState } from "react";
import AlertDialog from "../alertDialog/alertDialog";
import { Title, Cancel, Action } from "@radix-ui/react-alert-dialog";
import { Flex } from "../layout";
import Button from "../button";

const AddWorkoutDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AlertDialog label="Add Exercise" isOpen={isOpen} setIsOpen={setIsOpen}>
      <Flex direction="column">
        <Title>Build Workout</Title>
        <Flex css={{ justifyContent: "flex-end", gap: "$lg" }}>
          <Cancel asChild>
            <Button color="gray">Cancel</Button>
          </Cancel>
          <Action asChild>
            <Button color="violet" type="submit">
              Save
            </Button>
          </Action>
        </Flex>
      </Flex>
    </AlertDialog>
  );
};

export default AddWorkoutDialog;
