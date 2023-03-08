import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useId, useMemo } from 'react';
import ActivitySortableList from '../../components/activitySortableList/activitySortableList';
import AddActivityDialog from '../../components/addActivityDialog/addActivityDialog';
import CircleButton from '../../components/circleButton/circleButton';
import { Container } from '../../components/layout';
import Preloader from '../../components/preloader';
import WorkoutForm from '../../components/workoutForm';
import useFetchWorkout from '../../hooks/useFetchWorkout';
import { formatTime } from '../../lib/formatTime';
import { formatWorkout } from '../../lib/formatWorkout';
import { WorkoutWithActivities } from '../../types/workout';
import Button from '../button/button';
import EditWorkoutHeader from '../editWorkoutHeader/editWorkoutHeader';

type Props = {
  workoutId: string;
};

const EditWorkout = ({ workoutId }: Props) => {
  const formId = useId();

  const queryClient = useQueryClient();
  const { data, error, dataUpdatedAt } = useFetchWorkout(workoutId);

  if (!data) return <Preloader label="Loading workout..." />;
  if (error) return <Preloader label="Error loading page" />;

  return (
    <Container>
      <EditWorkoutHeader initialData={data} formId={formId} />
      <div className="mt-24 mb-24 px-4 md:px-0">
        <WorkoutForm data={data} formId={formId} />
        <div className="mt-12 flex items-center justify-center">
          <div className="mb-8 flex flex-1 items-center justify-between gap-4">
            <div className="flex flex-grow flex-col">
              <h3 className="tex-base font-semibold leading-6 text-gray-300">Workout Activities</h3>
              <p className="text-base font-normal leading-6">Add up to 8 activity</p>
            </div>
            <AddActivityDialog data={data} />
          </div>
        </div>
        <ActivitySortableList key={dataUpdatedAt} data={data} />
      </div>
    </Container>
  );
};

export default EditWorkout;
