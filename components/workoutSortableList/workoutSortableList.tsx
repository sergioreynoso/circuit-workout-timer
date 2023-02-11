import { Activity, Workout } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';

import { useState } from 'react';
import { endPoints } from '../../lib/endPoints';
import { formatTime } from '../../lib/formatTime';
import { styled } from '../../styles/stitches.congif';
import DeleteWorkoutDialog from '../deleteWorkoutDialog';
import { Flex } from '../layout';
import SortableList from '../sortableList/sortableList';

type Props = {
  data: Workout[];
};

const WorkoutSortableList = ({ data }: Props) => {
  const [items, setItems] = useState(data);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (workouts: (Workout | Activity)[]) => axios.patch(endPoints.workoutSort, workouts),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
    },
  });

  function onDragEnd(items: Workout[]) {
    setItems(items);
    mutation.mutate(items);
  }

  return (
    <Flex direction="column">
      <SortableList<Workout> items={items} onDragEnd={onDragEnd} renderItem={item => <ListItem item={item} />} />
    </Flex>
  );
};

const NextLink = styled(Link, {
  flex: 1,
  display: 'flex',
  gap: '$2x',
  alignItems: 'center',
  padding: '$lg',
  color: '$primary-01',
  textDecoration: 'none',
  cursor: 'pointer',
  fontWeight: '$700',
  '-webkit-touch-callout': 'none',
});

function ListItem({ item }: { item: Workout }) {
  const { id, name, duration } = item;

  return (
    <Flex
      css={{
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '$sm',
        backgroundColor: '$primary-09',
        cursor: 'grab',
        '&:active': {
          cursor: 'grabbing',
        },
      }}
    >
      <NextLink href={`/workout/${id}`}>
        <p>{name}</p>
        <p>{formatTime(duration)}</p>
      </NextLink>
      <DeleteWorkoutDialog workoutId={id} />
    </Flex>
  );
}

export default WorkoutSortableList;
