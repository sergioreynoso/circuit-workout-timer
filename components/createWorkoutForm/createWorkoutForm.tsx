import { Exercise } from "@prisma/client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { WorkoutWithExercises } from "../../hooks/useFetchWorkout";
import useWorkoutMutation from "../../hooks/useWorkoutMutation";
import { styled } from "../../styles/stitches.congif";
import ActivityList from "../activityList";
import Button from "../button";
import DeleteWorkoutDialog from "../deleteWorkoutDialog";
import Input from "../input/input";
import { Flex } from "../layout";

const CreateWorkoutForm = ({
  initialData,
}: {
  initialData: WorkoutWithExercises;
}) => {
  const router = useRouter();

  const updateWorkout = useWorkoutMutation("updateWorkout", "workout", () => {
    router.push(`/workout/${initialData.id}`);
  });

  const [{ name, set, rest }, setInputValue] = useState({
    name: "",
    set: 3,
    rest: 30,
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
    updateWorkout.mutate({
      id: initialData.id,
      workout_name: name,
      set_count: Number(set),
      set_rest: Number(rest * 1000),
    });
  };

  return (
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
        label="Workout Name"
        name="name"
        value={name}
        onChange={handleChange}
        placeholder=""
        isRequired={true}
      />
      <Input
        type="number"
        label="Sets"
        name="set"
        value={set}
        onChange={handleChange}
        placeholder=""
      />
      <Input
        type="number"
        label="Set rest in seconds"
        name="rest"
        value={rest}
        onChange={handleChange}
        placeholder=""
      />

      <ActivityList
        workoutId={initialData.id}
        exerciseData={initialData.exercises as Exercise[]}
      />

      <div>
        {updateWorkout.isLoading ? (
          "Adding workout..."
        ) : (
          <div>
            {updateWorkout.isError
              ? `An error occurred: ${updateWorkout.error}`
              : null}
          </div>
        )}
      </div>

      <Footer css={{ gap: "$lg" }}>
        <DeleteWorkoutDialog label="Cancel" workoutId={initialData.id} />
        <Button colors="primary" type="submit">
          Done
        </Button>
      </Footer>
    </Flex>
  );
};

const Footer = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "$lg",
  width: "100%",
  height: "80px",
  backgroundColor: "$primary-02",
  "@less-sm": {
    position: "fixed",
    bottom: "0",
  },
});

export default CreateWorkoutForm;
