import { Workout } from '@prisma/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';

import fetcher from '../../lib/fetcher';
import { styled } from '../../styles/stitches.congif';
import { WorkoutWithActivities } from '../../types/workout';
import DeleteWorkoutDialog from '../deleteWorkoutDialog';
import { Flex } from '../layout';
import Preloader from '../preloader';
import SortableList, { DraggableItemProps } from '../sortableList/sortableList';

type Props = {
  userId: string;
};

const WorkoutSortableList = ({ userId }: Props) => {
  const { status, data, error } = useQuery({
    queryKey: ['workouts'],
    queryFn: () => fetcher<WorkoutWithActivities[]>(userId, 'workouts'),
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (workouts: DraggableItemProps[]) => axios.patch('/api/v1/updateWorkoutOrder', workouts),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
    },
  });

  if (status !== 'success' && !data) return <Preloader label="Loading workouts..." />;
  if (error) return <Preloader label="Error loading page" />;

  function onDragEnd(sortedList: DraggableItemProps[]) {
    mutation.mutate(sortedList);
  }

  return (
    <Flex direction="column">
      <SortableList Item={Item} data={data} onDragEnd={onDragEnd} />
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

const Item = ({ id, name, duration }: { id: string; name: string; duration: number }) => {
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
        <p>{duration || '00:00'}</p>
      </NextLink>
      <DeleteWorkoutDialog workoutId={id} />
    </Flex>
  );
};

export default WorkoutSortableList;
