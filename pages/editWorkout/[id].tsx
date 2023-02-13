import { useRouter } from 'next/router';
import { useId, useMemo } from 'react';
import ActivitySortableList from '../../components/activitySortableList/activitySortableList';
import AddActivityDialog from '../../components/addActivityDialog/addActivityDialog';
import Button from '../../components/button';
import { Box, Container, Flex, FooterContainer } from '../../components/layout';
import Preloader from '../../components/preloader';
import WorkoutForm from '../../components/workoutForm';
import useFetchWorkout from '../../hooks/useFetchWorkout';
import useUpdateWorkout from '../../hooks/useUpdateWorkout';
import { formatTime } from '../../lib/formatTime';
import { formatWorkout } from '../../lib/formatWorkout';

const Edit = () => {
  const formId = useId();
  const router = useRouter();
  const workoutId = router.query.id as string;

  const { data, error, dataUpdatedAt } = useFetchWorkout(workoutId);
  const mutation = useUpdateWorkout();

  const workoutDuration = useMemo(() => {
    if (data) return formatTime(formatWorkout(data).duration);
  }, [data]);

  if (!data) return <Preloader label="Loading workout..." />;
  if (error) return <Preloader label="Error loading page" />;

  const mutateWorkout = (name: string, set: number, rest: number) => {
    mutation.mutate({
      id: data.id,
      name: name,
      set_count: Number(set),
      set_rest: Number(rest),
      duration: formatWorkout(data).duration,
    });
  };

  return (
    <Container>
      <Flex css={{ justifyContent: 'space-between', alignItems: 'baseline', gap: '$2x' }}>
        <Box as="h1" css={{ lineHeight: '$100', paddingBlock: '$2x' }}>
          Edit Workout
        </Box>
        <Box as="h3" css={{ lineHeight: '$100' }}>
          Workout length: {workoutDuration}
        </Box>
      </Flex>
      <WorkoutForm
        name={data.name}
        setCount={data.set_count}
        setRest={data.set_rest}
        onSubmitCallback={mutateWorkout}
        id={formId}
      />
      <Flex
        css={{
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '$md',
        }}
      >
        <Flex css={{ gap: '$2x' }}>
          <h3>Add an activity to your workout</h3>
        </Flex>
        <AddActivityDialog workoutId={data.id} activitiesTotalCount={data.activities.length} />
      </Flex>
      <ActivitySortableList key={dataUpdatedAt} data={data} />
      <FooterContainer>
        <Button colors="primary" type="submit" form={formId} css={{ flex: 1, maxWidth: '200px' }}>
          Done
        </Button>
      </FooterContainer>
    </Container>
  );
};

export default Edit;
