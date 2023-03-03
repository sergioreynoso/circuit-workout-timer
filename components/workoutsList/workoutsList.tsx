import { Workout } from '@prisma/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Optional } from 'ts-toolbelt/out/Object/Optional';
import { FormattedActivity } from '../../hooks/useFormatWorkout';
import { defaultActivities } from '../../lib/defaultWorkout';
import fetcher from '../../lib/fetcher';
import Button from '../button';
import Preloader from '../preloader/preloader';
import WorkoutListHeader from '../workoutListHeader';
import WorkoutSortableList from '../workoutSortableList';

const Workouts = ({ userId }: { userId: string }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (workout: Optional<Workout, 'id'> & { activities: FormattedActivity[] }) =>
      axios.post('/api/v1/workout', workout),
  });

  const query = useQuery({
    queryKey: ['workouts'],
    queryFn: () => fetcher<Workout[]>(userId, 'workouts'),
    onSuccess: data => {
      if (data.length === 0) {
        mutation.mutate(
          {
            name: 'Light Workout',
            set_count: 1,
            set_rest: 10000,
            duration: 125000,
            userId: userId,
            display_seq: 0,
            activities: defaultActivities,
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries(['workouts']);
            },
          }
        );
      }
    },
  });

  if (query.status !== 'success' && !query.data) return <Preloader label="Loading workouts..." />;
  if (query.error) return <Preloader label="Error loading page" />;

  return (
    <div className=" mt-8 flex max-w-lg flex-col gap-8  px-4 md:px-0">
      <WorkoutListHeader userId={userId} data={query.data} />
      <WorkoutSortableList key={query.dataUpdatedAt} data={query.data} />
    </div>
  );
};

export default Workouts;
