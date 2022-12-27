import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Exercise } from "@prisma/client";
import { useEffect, useState } from "react";
import useExerciseMutation from "../../hooks/useExerciseMutation";
import updateDisplaySeq from "../../lib/updateDisplaySeq";
import { styled } from "../../styles/stitches.congif";
import AddExerciseDialog from "../addExerciseDialog";
import ExerciseListItem from "../exerciseListItem";
import { Flex } from "../layout";

type Props = {
  workoutId: string;
  exerciseData: Exercise[];
};

const ActivityList = ({ workoutId, exerciseData }: Props) => {
  const [activeId, setActiveId] = useState(null);
  const [exercises, setExercises] = useState(() => exerciseData);
  const mutation = useExerciseMutation("updateExerciseOrder", undefined, false);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
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
        const sortedArray = arrayMove(items, oldIndex, newIndex);
        const updatedDisplaySeq = updateDisplaySeq(sortedArray);
        mutation.mutate(updatedDisplaySeq as Partial<Exercise>);
        return updatedDisplaySeq;
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
            padding: "$md",
          }}>
          <h3>Add an exercise to your workout</h3>
          <AddExerciseDialog
            workoutId={workoutId}
            exercisesTotalCount={exercises.length}
          />
        </Flex>

        <Flex
          as="ul"
          direction="column"
          css={{ gap: "$sm", minWidth: "380px", position: "relative" }}>
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

export default ActivityList;
