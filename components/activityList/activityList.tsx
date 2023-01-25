import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Exercise } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import updateDisplaySeq from '../../lib/updateDisplaySeq';
import { styled } from '../../styles/stitches.congif';
import ActivityListItem from '../activityListItem';
import AddActivityDialog from '../addActivityDialog';
import { Flex } from '../layout';

type Props = {
  workoutId: string;
  activities: Exercise[];
};

const ActivityList = ({ workoutId, activities }: Props) => {
  const [activeId, setActiveId] = useState(null);
  const [exercises, setActivities] = useState<Exercise[]>(() => activities);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (exercise: Exercise[]) =>
      axios.post('/api/v1/updateExerciseOrder', { id: workoutId, exercises: exercise }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workout', workoutId], exact: true });
    },
  });

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
      setActivities(items => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        const sortedArray = arrayMove(items, oldIndex, newIndex);
        const updatedDisplaySeq = updateDisplaySeq<Exercise>(sortedArray);
        mutation.mutate(updatedDisplaySeq);
        return updatedDisplaySeq;
      });
    }
    setActiveId(null);
  }

  const DragOverlayItem = ({ activeId }: { activeId: string }) => {
    return (
      <ActivityListItem
        activity={exercises.find(exercise => (exercise.id === activeId ? exercise : null)) as Exercise}
      />
    );
  };

  return (
    <DndContext
      id="0"
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <Flex direction="column">
        <Flex
          css={{
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '$md',
          }}
        >
          <h3>Add an activity to your workout</h3>
          <AddActivityDialog workoutId={workoutId} exercisesTotalCount={exercises.length} />
        </Flex>

        <Flex
          as="ul"
          direction="column"
          css={{
            gap: '$sm',
            minWidth: '350px',
            position: 'relative',
            '@less-sm': {
              paddingBottom: '64px',
            },
          }}
        >
          <SortableContext items={exercises} strategy={verticalListSortingStrategy}>
            {exercises.map(activity => (
              <ActivityListItem key={activity.id} activity={activity} />
            ))}
          </SortableContext>
          <StyledDragOverLay>{activeId ? <DragOverlayItem activeId={activeId} /> : null}</StyledDragOverLay>
        </Flex>
      </Flex>
    </DndContext>
  );
};

const StyledDragOverLay = styled(DragOverlay, {
  boxShadow: '$high',
});

export default ActivityList;
