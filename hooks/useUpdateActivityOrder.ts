import { Exercise } from '@prisma/client';
import { useEffect } from 'react';
import useMutateActivity from './useMutateActivity';

const useUpdateActivityOrder = (exercise: Exercise) => {
  const mutation = useMutateActivity('updateExerciseOrder');
  function update() {
    mutation.mutate({
      id: exercise.id,
      display_seq: exercise.display_seq,
    });
  }

  useEffect(() => {
    update();
  }, [exercise]);
};

export default useUpdateActivityOrder;
