import { Activity, Workout } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { endPoints } from '../../lib/endPoints';
import { formatTime } from '../../lib/formatTime';
import { WorkoutWithActivities } from '../../types/workout';
import DeleteActivityDialog from '../deleteActivityDialog/deleteActivityDialog';
import EditActivityDialog from '../editActivityDialog/editActivityDialog';
import { Flex } from '../layout';
import SortableList from '../sortableList';

type Props = {
  data: WorkoutWithActivities;
};

const ActivitySortableList = ({ data }: Props) => {
  const [items, setItems] = useState(() => data.activities);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (activities: Activity[]) => axios.patch(endPoints.activitySort, activities),
    onMutate: newActivities => {
      const workout = queryClient.getQueryData<Workout>(['workout', data.id]);
      queryClient.setQueryData(['workout', data.id], { ...workout, activities: newActivities });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['workout', data.id]);
    },
  });

  function onDragEnd(updatedItems: Activity[]) {
    mutation.mutate(updatedItems);
    setItems(updatedItems);
  }

  return (
    <Flex direction="column">
      <SortableList<Activity> items={items} onDragEnd={onDragEnd} renderItem={item => <ListItem item={item} />} />
    </Flex>
  );
};

const ListItem = ({ item }: { item: Activity }) => {
  const { id, name, duration } = item;
  return (
    <Flex
      css={{
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '$lg',
        marginBottom: '$sm',
        backgroundColor: '$primary-09',
        cursor: 'grab',
        '-webkit-touch-callout': 'none',
        '&:active': {
          cursor: 'grabbing',
        },
      }}
    >
      <p>{name}</p>
      <Flex
        css={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '$sm',
        }}
      >
        <span>{formatTime(duration)}</span>
        <EditActivityDialog activity={item} />
        <DeleteActivityDialog activityId={id} />
      </Flex>
    </Flex>
  );
};

export default ActivitySortableList;
