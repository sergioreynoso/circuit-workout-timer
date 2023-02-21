import { useRouter } from 'next/router';
import { useContext } from 'react';

import { WorkoutWithActivities } from '../../types/workout';
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
    <div>
      {!isTimerDone && <button onClick={onCancel}>Cancel</button>}
      <h1>{data.name}</h1>
      {!isTimerDone && <button onClick={onEdit}>Edit</button>}
    </div>
  );
};

export default TimerHeader;
