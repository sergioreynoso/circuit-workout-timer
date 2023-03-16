import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { formatTime } from '../../lib/formatTime';
import { formatWorkout } from '../../lib/formatWorkout';
import { WorkoutWithActivities } from '../../types/workout';
import Button from '../button/button';

type Props = {
  initialData: WorkoutWithActivities;
  formId: string;
};

const EditWorkoutHeader = ({ initialData, formId }: Props) => {
  return (
    <header className="fixed top-0 left-0 right-0  h-20 bg-gray-800 py-4 px-4">
      <nav className=" mx-auto flex max-w-lg items-center gap-8">
        <Button intent="primary" type="submit" form={formId}>
          <ChevronLeftIcon className="h-6 w-6" />
          Done
        </Button>
        <h1 className="flex flex-grow justify-end gap-4 text-2xl font-semibold leading-7">
          Duration:{<span className="text-amber-400">{formatTime(formatWorkout(initialData).duration)}</span>}
        </h1>
      </nav>
    </header>
  );
};

export default EditWorkoutHeader;
