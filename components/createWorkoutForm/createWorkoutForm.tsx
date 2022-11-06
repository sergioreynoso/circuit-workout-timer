import React, { useState } from "react";
import Input from "../input/input";
import Button from "../button";
import { styled } from "../../styles/stitches.congif";
import { Exercise, Workout } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { Flex } from "../layout";
import ExerciseList from "../exerciseList";
import { useRouter } from "next/router";
import { WorkoutWithExercises } from "../../hooks/useFetchWorkout";

type WorkoutUpdate = Omit<Workout, "userId" | "display_seq">;

const CreateWorkoutForm = ({ data }: { data: WorkoutWithExercises }) => {
  const router = useRouter();
  const mutation = useMutation((workout: WorkoutUpdate) => {
    return axios.post("/api/updateWorkout", workout);
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
    mutation.mutate({
      id: data.id,
      workout_name: name,
      set_count: Number(set),
      set_rest: Number(rest * 1000),
    });
  };

  return (
    <Wrapper as="form" css={{ gap: "$xl" }} onSubmit={onFormSubmit}>
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

      <ExerciseList workoutId={data.id} data={data.exercises as Exercise[]} />

      <div>
        {mutation.isLoading ? (
          "Adding workout..."
        ) : (
          <div>
            {mutation.isError ? `An error occurred: ${mutation.error}` : null}
          </div>
        )}
      </div>

      <Flex css={{ gap: "$lg" }}>
        <Link href="/dashboard">
          <Button color="gray">Cancel </Button>
        </Link>
        <Button color="violet" type="submit">
          Done
        </Button>
      </Flex>
    </Wrapper>
  );
};

const Wrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "$lg",
});

export default CreateWorkoutForm;
