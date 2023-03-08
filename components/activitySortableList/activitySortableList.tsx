import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Workout } from '@prisma/client';
import { DragHandleDots2Icon } from '@radix-ui/react-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { endPoints } from '../../lib/endPoints';
import { formatTime } from '../../lib/formatTime';
import { FormattedActivity } from '../../lib/formatWorkout';
import { WorkoutWithActivities } from '../../types/workout';
import DeleteActivityDialog from '../deleteActivityDialog/deleteActivityDialog';
import EditActivityDialog from '../editActivityDialog/editActivityDialog';
import SortableList from '../sortableList';

type Props = {
  data: WorkoutWithActivities;
};

const ActivitySortableList = ({ data }: Props) => {
  const [items, setItems] = useState(() => data.activities);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (activities: FormattedActivity[]) => axios.patch(endPoints.activitySort, activities),
    onMutate: newActivities => {
      const workout = queryClient.getQueryData<Workout>(['workout', data.id]);
      queryClient.setQueryData(['workout', data.id], { ...workout, activities: newActivities });
    },
  });

  function onDragEnd(updatedItems: FormattedActivity[]) {
    mutation.mutate(updatedItems);
    setItems(updatedItems);
  }

  return (
    <SortableList<FormattedActivity>
      items={items}
      onDragEnd={onDragEnd}
      renderItem={item => <ListItem key={item.id} item={item} />}
    />
  );
};

function ListItem({ item }: { item: FormattedActivity }) {
  const { id, name, duration } = item;

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    listStyle: 'none',
  };

  return (
    <li
      className="flex h-16 items-center justify-between rounded-lg bg-gray-800 pr-4 text-gray-100 hover:bg-gray-700 active:bg-gray-800"
      ref={setNodeRef}
      style={style}
    >
      <button className="flex h-full grow items-center gap-5 pl-4" {...listeners} {...attributes}>
        <DragHandleDots2Icon className="h-6 w-6 text-gray-500" />
        <p className="text-base font-medium leading-6 text-green-400">{formatTime(duration)}</p>
        <p className="text-base font-bold leading-6 text-gray-300">{name}</p>
      </button>
      <div className="flex gap-1">
        <EditActivityDialog activity={item} />
        <DeleteActivityDialog activityId={id} />
      </div>
    </li>
  );
}

export default ActivitySortableList;
