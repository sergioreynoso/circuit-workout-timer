import { Exercise } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const useExerciseMutation = (onUpdate: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(
    (exercise: Omit<Exercise, "id">) =>
      axios.post("/api/createExercise", exercise),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["exercises"]);
        onUpdate();
      },
    }
  );
};

export default useExerciseMutation;
