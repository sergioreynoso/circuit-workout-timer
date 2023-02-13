import { useRouter } from 'next/router';
import { useId } from 'react';
import ActivitySortableList from '../../components/activitySortableList/activitySortableList';
import AddActivityDialog from '../../components/addActivityDialog/addActivityDialog';
import Button from '../../components/button';
import DeleteWorkoutDialog from '../../components/deleteWorkoutDialog';
import { Box, Container, Flex, FooterContainer } from '../../components/layout';
import Preloader from '../../components/preloader';
import WorkoutForm from '../../components/workoutForm';
import useFetchWorkout from '../../hooks/useFetchWorkout';
import useUpdateWorkout from '../../hooks/useUpdateWorkout';
import { formatWorkout } from '../../lib/formatWorkout';

const CreateWorkout = () => {
  const formId = useId();
  const router = useRouter();
  const workoutId = router.query.id as string;

  const { data, error, dataUpdatedAt } = useFetchWorkout(workoutId);

  const mutation = useUpdateWorkout();

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
      <Box as="h1" css={{ paddingBlock: '$2x' }}>
        Create your workout
      </Box>
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
        <h3>Add an activity to your workout</h3>
        <AddActivityDialog workoutId={data.id} activitiesTotalCount={data.activities.length} />
      </Flex>
      <ActivitySortableList key={dataUpdatedAt} data={data} />

      <FooterContainer css={{ gap: '$3x' }}>
        <DeleteWorkoutDialog label="Cancel" workoutId={data.id} />
        <Button colors="primary" type="submit" form={formId}>
          Done
        </Button>
      </FooterContainer>
    </Container>
  );
};

export default CreateWorkout;
