import { Exercise } from "@prisma/client";
import React from "react";
import { formatTime } from "../../lib/formatTime";
import { styled } from "../../styles/stitches.congif";
import DeleteExerciseDialog from "../deleteExerciseDialog";
import EditExerciseDialog from "../editExerciseDialog";
import { Flex } from "../layout";

export type DragItem = {
  id: string;
};

const ExerciseListItem = ({ exercise }: { exercise: Exercise }) => {
  return (
    <Flex
      css={{
        justifyContent: "space-between",
        alignItems: "baseline",
        gap: "$2x",
        padding: "$lg",
        color: "$primary-12",
        backgroundColor: "$primary-03",
      }}>
      <ItemTitle>{exercise.exercise_name}</ItemTitle>
      <Flex
        css={{
          justifyContent: "space-between",
          alignItems: "center",
          gap: "$2x",
        }}>
        <ListItemDuration>{formatTime(exercise.duration)}</ListItemDuration>
        <EditExerciseDialog exerciseData={exercise} />
        <DeleteExerciseDialog exerciseId={exercise.id} />
      </Flex>
    </Flex>
  );
};

const ItemTitle = styled("p", {
  fontWeight: "$700",
});

const ListItemDuration = styled("span", {});

export default ExerciseListItem;
