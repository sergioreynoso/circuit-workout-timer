import { useRouter } from 'next/router';
import { useContext } from 'react';

import { WorkoutWithActivities } from '../../types/workout';
import CircleButton from '../circleButton/circleButton';
import { TimerContext } from '../timerContext';

type Props = {
  data: WorkoutWithActivities;
};

const TimerHeader = ({ data }: Props) => {
  const { isTimerDone } = useContext(TimerContext);

  const router = useRouter();
  const onCancel = () => {
    router.push(`/dashboard`);
  };

  const onEdit = () => {
    router.push(`/editWorkout/${data.id as string}`);
  };

  return (
    <div className="flex h-24 items-center justify-between px-4 text-gray-400 md:px-0">
      {!isTimerDone && <CircleButton intent="cancel" onClick={onCancel} />}

      <h1 className="text-xl font-medium leading-7">{data.name}</h1>
      {!isTimerDone && <CircleButton intent="edit" onClick={onEdit} />}
    </div>
  );
};

export default TimerHeader;
