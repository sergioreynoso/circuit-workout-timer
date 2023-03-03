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

type Props = {
  workoutId: string;
};

const EditWorkout = ({ workoutId }: Props) => {
  const formId = useId();
  const router = useRouter();

  const { data, error, dataUpdatedAt } = useFetchWorkout(workoutId);

  const workoutDuration = useMemo(() => {
    if (data) return formatTime(formatWorkout(data).duration);
  }, [data]);

  if (!data) return <Preloader label="Loading workout..." />;
  if (error) return <Preloader label="Error loading page" />;

  return (
    <Container>
      <div className="px-4 md:px-0">
        <div className="mb-8 flex items-center justify-start gap-6 py-4">
          <CircleButton
            intent="cancel"
            onClick={() => router.push(`/workout/${data.id}`)}
            type="submit"
            form={formId}
          />
          <h1 className="flex-grow text-xl font-semibold leading-7">
            <span className="text-amber-500">{workoutDuration}</span>
            {` ${data.name}`}
          </h1>
        </div>
        <WorkoutForm data={data} id={formId} />
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
