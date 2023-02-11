import { Activity } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { endPoints } from '../../lib/endPoints';
import { formatTime } from '../../lib/formatTime';
import { styled } from '../../styles/stitches.congif';
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workout', data.id] });
    },
  });

  function onDragEnd(items: Activity[]) {
    setItems(items);
    mutation.mutate(items);
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
      <ItemTitle>{name}</ItemTitle>
      <Flex
        css={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '$sm',
        }}
      >
        <ListItemDuration>{formatTime(duration)}</ListItemDuration>
        <EditActivityDialog activity={item} />
        <DeleteActivityDialog activityId={id} />
      </Flex>
    </Flex>
  );
};

const ItemTitle = styled('p', {
  fontWeight: '$700',
  lineHeight: '$150',
  userSelect: 'none',
  color: '$primary-01',
});

const ListItemDuration = styled('span', {
  userSelect: 'none',
  color: '$primary-01',
});

export default ActivitySortableList;
