import { Workout } from '@prisma/client';
import { DragHandleDots2Icon, Pencil1Icon } from '@radix-ui/react-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import axios from 'axios';
import Link from 'next/link';

import { useCallback, useMemo, useState } from 'react';
import { endPoints } from '../../lib/endPoints';
import { formatTime } from '../../lib/formatTime';

import DeleteWorkoutDialog from '../deleteWorkoutDialog';
import SortableList from '../sortableList/sortableList';

type Props = {
  data: Workout[];
};

const WorkoutSortableList = ({ data }: Props) => {
  const [items, setItems] = useState(data);

  //TODO: Refactor to include drag feature
  // const queryClient = useQueryClient();
  // const mutation = useMutation({
  //   mutationFn: (workouts: Workout[]) => axios.patch(endPoints.workoutSort, workouts),
  //   onMutate: newData => {
  //     queryClient.setQueryData(['workouts'], newData);
  //     newData.forEach(item => {
  //       const oldData = queryClient.getQueryData<Workout>(['workout', item.id]);
  //       queryClient.setQueryData(['workout', item.id], { ...oldData, display_seq: item.display_seq });
  //     });
  //   },
  // });
  // function onDragEnd(updatedItem: Workout[]) {
  //   mutation.mutate(updatedItem);
  //   setItems(updatedItem);
  // }

  // return <SortableList<Workout> items={items} onDragEnd={onDragEnd} renderItem={item => <ListItem item={item} />} />;
  return (
    <ul className="flex flex-col gap-3">
      {items.map(item => {
        return <ListItem key={item.id} item={item} />;
      })}
    </ul>
  );
};

function ListItem({ item }: { item: Workout }) {
  const { id, name, duration } = item;

  return (
    <li className="flex h-16 items-center justify-between rounded-lg bg-gray-800 px-4  text-gray-100 hover:bg-gray-700">
      <Link href={`/workout/${id}`} className="flex h-full grow items-center gap-5">
        {/* <DragHandleDots2Icon className="h-6 w-6 text-gray-400" /> */}
        <p className="text-base font-medium leading-6 text-amber-400">{formatTime(duration)}</p>
        <p className="text-base font-bold leading-6 text-gray-300">{name}</p>
      </Link>
      <div className="flex gap-1">
        <Link
          href={`/editWorkout/${id}`}
          className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-800/50"
        >
          <Pencil1Icon className="h-6 w-6 text-gray-400 " />
          <VisuallyHidden.Root>Edit workout</VisuallyHidden.Root>
        </Link>
        <DeleteWorkoutDialog workoutId={id} />
      </div>
    </li>
  );
}

export default WorkoutSortableList;
