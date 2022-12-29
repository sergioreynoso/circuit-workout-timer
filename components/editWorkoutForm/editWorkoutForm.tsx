import { useRouter } from "next/router";
import React, { ReactNode, useState } from "react";
import { WorkoutWithExercises } from "../../hooks/useFetchWorkout";
import useWorkoutMutation from "../../hooks/useWorkoutMutation";
import { styled } from "../../styles/stitches.congif";
import Button from "../button";
import Input from "../input/input";
import { Flex } from "../layout";

type Props = {
  initialData: WorkoutWithExercises;
  children?: ReactNode;
};

const EditWorkoutForm = ({ initialData, children }: Props) => {
  const router = useRouter();
  const [{ name, set, rest }, setInputValue] = useState(() => ({
    name: initialData.workout_name,
    set: initialData.set_count,
    rest: Math.round(initialData.set_rest / 1000),
  }));

  const mutation = useWorkoutMutation("updateWorkout", "workout", () => {
    router.push(`/workout/${initialData.id}`);
  });

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({
      id: initialData.id,
      workout_name: name,
      set_count: Number(set),
      set_rest: Number(rest * 1000),
    });
  };

  return (
    <Flex
      direction="column"
      as="form"
      css={{
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        padding: "$lmd",
        gap: "$xl",
        "@less-sm": {
          paddingBottom: "40px",
        },
      }}
      onSubmit={onFormSubmit}>
      <Input
        label="Workout Name"
        type="text"
        name="name"
        value={name}
        onChange={handleOnChange}
        placeholder=""
        required={true}
        autoComplete="off"
      />
      <Input
        label="Sets"
        type="number"
        name="set"
        value={set}
        onChange={handleOnChange}
        placeholder=""
      />
      <Input
        label="Set rest in seconds"
        type="number"
        name="rest"
        value={rest}
        onChange={handleOnChange}
        placeholder=""
      />
      {children}
      <div>
        {mutation.isLoading ? (
          "Updating workout..."
        ) : (
          <div>
            {mutation.isError ? `An error occurred: ${mutation.error}` : null}
          </div>
        )}
      </div>
      <Footer>
        <Button
          colors="primary"
          type="submit"
          css={{ flex: 1, maxWidth: "200px" }}>
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
  width: "100%",
  height: "80px",
  backgroundColor: "$primary-02",
  "@less-sm": {
    position: "fixed",
    bottom: "0",
  },
});

export default EditWorkoutForm;
