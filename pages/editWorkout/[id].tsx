import { useRouter } from 'next/router';
import EditWorkout from '../../components/editWorkout/editWorkout';
import Preloader from '../../components/preloader/preloader';

const Edit = () => {
  const {
    isReady,
    query: { id },
  } = useRouter();

  if (!isReady) return <Preloader label="Loading workout..." />;

  return <EditWorkout workoutId={id as string} />;
};

export default Edit;
