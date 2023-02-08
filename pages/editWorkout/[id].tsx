import { Workout } from '@prisma/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import cuid from 'cuid';
import { useRouter } from 'next/router';
import { useId } from 'react';
import ActivityList from '../../components/activityList';
import Button from '../../components/button';
import { Box, Container, FooterContainer } from '../../components/layout';
import Preloader from '../../components/preloader';
import WorkoutForm from '../../components/workoutForm';
import { endPoints } from '../../lib/endPoints';
import fetcher from '../../lib/fetcher';
import { WorkoutWithActivities } from '../../types/workout';

const Edit = () => {
  const formId = useId();
  const router = useRouter();
  const workoutId = router.query.id as string;

  const queryClient = useQueryClient();
  const { data, error } = useQuery({
    queryKey: ['workout', workoutId],
    queryFn: () => (workoutId ? fetcher<WorkoutWithActivities>(workoutId, 'workout') : null),
  });

  const mutation = useMutation({
    mutationFn: (workout: Partial<Workout>) => axios.put(endPoints.workout, workout),
    onSuccess: ({ data: newData }) => {
      queryClient.setQueryData(['workout', workoutId], newData);
      router.push(`/workout/${newData.id}`);
    },
  });

  if (!data) return <Preloader label="Loading workout..." />;
  if (error) return <Preloader label="Error loading page" />;

  const mutateWorkout = (name: string, set: number, rest: number) => {
    mutation.mutate({
      id: data.id,
      name: name,
      set_count: Number(set),
      set_rest: Number(rest),
    });
  };

  return (
    <Container>
      <Box as="h1" css={{ paddingBlock: '$2x' }}>
        Edit Workout
      </Box>
      <WorkoutForm
        name={data.name}
        setCount={data.set_count}
        setRest={data.set_rest}
        onSubmitCallback={mutateWorkout}
        id={formId}
      />
      <ActivityList key={cuid()} workout={data} />
      <FooterContainer>
        <Button colors="primary" type="submit" form={formId} css={{ flex: 1, maxWidth: '200px' }}>
          Done
        </Button>
      </FooterContainer>
    </Container>
  );
};

export default Edit;
