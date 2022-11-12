import { Exercise } from "@prisma/client";
import React, { useEffect, useState } from "react";
import AddExerciseDialog from "../addExerciseDialog";
import ExerciseListItem from "../exerciseListItem";
import { Flex } from "../layout";
import {
  DndContext,
  closestCenter,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { styled } from "../../styles/stitches.congif";

type Props = {
  workoutId: string;
  exerciseData: Exercise[];
};

const ExerciseList = ({ workoutId, exerciseData }: Props) => {
  const [activeId, setActiveId] = useState(null);
  const [exercises, setExercises] = useState(() => exerciseData);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: any) {
    const { active } = event;
    setActiveId(active.id);
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setExercises((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const sortedArray = arrayMove(items, oldIndex, newIndex).map(
          (exercise, index) => {
            return { ...exercise, display_seq: index };
          }
        );
        return sortedArray;
      });
    }
    setActiveId(null);
  }

  const DragOverlayItem = ({ activeId }: { activeId: string }) => {
    return (
      <ExerciseListItem
        exercise={
          exercises.find((exercise) =>
            exercise.id === activeId ? exercise : null
          ) as Exercise
        }
      />
    );
  };

  useEffect(() => {
    setExercises(exerciseData);
  }, [exerciseData]);

  return (
    <DndContext
      id="0"
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}>
      <Flex direction="column">
        <Flex
          css={{
            justifyContent: "space-between",
            alignItems: "center",
            padding: "$lg",
          }}>
          <h3>Add exercise</h3>
          <AddExerciseDialog
            workoutId={workoutId}
            exercisesTotalCount={exercises.length}
          />
        </Flex>
        <Flex
          as="ul"
          direction="column"
          css={{ gap: "$sm", minWidth: "$bp-sm" }}>
          <SortableContext
            items={exercises}
            strategy={verticalListSortingStrategy}>
            {exercises.map((exercise) => (
              <ExerciseListItem key={exercise.id} exercise={exercise} />
            ))}
          </SortableContext>
          <StyledDragOverLay>
            {activeId ? <DragOverlayItem activeId={activeId} /> : null}
          </StyledDragOverLay>
        </Flex>
      </Flex>
    </DndContext>
  );
};

const StyledDragOverLay = styled(DragOverlay, {
  boxShadow: "$high",
});

export default ExerciseList;
