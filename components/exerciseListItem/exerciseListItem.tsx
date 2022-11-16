import { Exercise } from "@prisma/client";
import React, { useEffect } from "react";
import { formatTime } from "../../lib/formatTime";
import { styled } from "../../styles/stitches.congif";
import DeleteExerciseDialog from "../deleteExerciseDialog";
import EditExerciseDialog from "../editExerciseDialog";
import { Flex } from "../layout";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CaretSortIcon } from "@radix-ui/react-icons";
import Button from "../button";

export const ExerciseListItem = ({ exercise }: { exercise: Exercise }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: exercise.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Flex
      ref={setNodeRef}
      style={style}
      css={{
        justifyContent: "space-between",
        alignItems: "center",
        gap: "$md",
        padding: "$md",
        color: "$primary-12",
        backgroundColor: "$primary-03",
      }}>
      <ItemTitle>{exercise.exercise_name}</ItemTitle>

      <Flex
        css={{
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "$sm",
        }}>
        <ListItemDuration>{formatTime(exercise.duration)}</ListItemDuration>
        <EditExerciseDialog exerciseData={exercise} />
        <DeleteExerciseDialog exerciseId={exercise.id} />
        <Button
          colors="transparent"
          {...attributes}
          {...listeners}
          css={{
            cursor: "grab",
            "&:active": {
              cursor: "grabbing",
            },
          }}>
          <CaretSortIcon />
        </Button>
      </Flex>
    </Flex>
  );
};

const ItemTitle = styled("p", {
  fontWeight: "$700",
  lineHeight: "$150",
  userSelect: "none",
});

const ListItemDuration = styled("span", {
  userSelect: "none",
});

export default ExerciseListItem;
