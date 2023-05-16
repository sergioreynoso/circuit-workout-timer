import { useId } from 'react';
import ActivitySortableList from '../../components/activitySortableList/activitySortableList';
import AddActivityDialog from '../../components/addActivityDialog/addActivityDialog';
import { Container } from '../../components/layout';
import Preloader from '../../components/preloader';
import useFetchWorkout from '../../hooks/reactQueryHooks/useFetchWorkout';
import { EditWorkoutForm } from '../editWorkoutForm';
import { EditWorkoutHeader } from '../editWorkoutHeader';

type Props = {
  workoutId: string;
};

const EditWorkout = ({ workoutId }: Props) => {
  const formId = useId();

  const { data, error, dataUpdatedAt } = useFetchWorkout(workoutId);

  if (!data) return <Preloader label="Loading workout..." />;
  if (error) return <Preloader label="Error loading page" />;

  return (
    <Container>
      <EditWorkoutHeader initialData={data} formId={formId} /> 
      <div className="mt-24 mb-24 px-4 md:px-0">
        <EditWorkoutForm data={data} formId={formId} />
        <div className="mt-12 flex items-center justify-center">
          <div className="mb-8 flex flex-1 items-center justify-between gap-4">
            <div className="flex flex-grow flex-col">
              <h3 className="tex-base font-bold leading-6 text-gray-100">Workout Activities</h3>
              <p className="text-base font-normal leading-6 text-gray-400">Add up to 8 activities</p>
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
