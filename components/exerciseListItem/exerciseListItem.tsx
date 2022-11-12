import { Exercise } from "@prisma/client";
import React, { useEffect } from "react";
import { formatTime } from "../../lib/formatTime";
import { styled } from "../../styles/stitches.congif";
import DeleteExerciseDialog from "../deleteExerciseDialog";
import EditExerciseDialog from "../editExerciseDialog";
import { Box, Flex } from "../layout";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CaretSortIcon } from "@radix-ui/react-icons";
import Button from "../button";
import useExerciseMutation from "../../hooks/useExerciseMutation";
import useUpdateExerciseOrder from "../../hooks/useUpdateExerciseOrder";

export const ExerciseListItem = ({ exercise }: { exercise: Exercise }) => {
  const mutation = useExerciseMutation("updateExerciseOrder");
  // useUpdateExerciseOrder(exercise);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: exercise.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useEffect(() => {
    // console.log(exercise.exercise_name, exercise.display_seq);

    mutation.mutate({
      id: exercise.id,
      display_seq: exercise.display_seq,
    });
  }, [exercise.display_seq]);

  return (
    <Flex
      ref={setNodeRef}
      style={style}
      // {...attributes}
      // {...listeners}
      css={{
        justifyContent: "space-between",
        alignItems: "center",
        gap: "$md",
        padding: "$lg",
        color: "$primary-12",
        backgroundColor: "$primary-03",
      }}>
      <Flex
        css={{
          flex: "1",
          justifyContent: "space-between",
          alignItem: "center",
          gap: "$lg",
        }}>
        <ItemTitle>{exercise.exercise_name}</ItemTitle>
        <ListItemDuration>{formatTime(exercise.duration)}</ListItemDuration>
      </Flex>

      <Flex
        css={{
          justifyContent: "flex-end",
          alignItems: "center",
          // backgroundColor: "blue",
          gap: "$lg",
        }}>
        <EditExerciseDialog exerciseData={exercise} />
        <DeleteExerciseDialog exerciseId={exercise.id} />
        <DragHandle {...attributes} {...listeners}>
          <CaretSortIcon />
          {exercise.display_seq}
        </DragHandle>
      </Flex>
    </Flex>
  );
};

const ItemTitle = styled("p", {
  fontWeight: "$700",
  userSelect: "none",
});

const ListItemDuration = styled("span", {
  userSelect: "none",
});

const DragHandle = styled(Button, {
  backgroundColor: "transparent",
  cursor: "grab",
});

export default ExerciseListItem;
