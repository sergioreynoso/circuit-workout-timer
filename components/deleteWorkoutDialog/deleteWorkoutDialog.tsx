import { Cancel, Description, Title } from '@radix-ui/react-alert-dialog';
import { TrashIcon } from '@radix-ui/react-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { endPoints } from '../../lib/endPoints';
import AlertDialog from '../alertDialog';

type DeleteWorkoutDialogProps = {
  label?: string;
  workoutId: string;
};

const DeleteWorkoutDialog = ({ label, workoutId }: DeleteWorkoutDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();
  const mutation = useMutation((id: string) => axios.delete(endPoints.workout, { data: { id: id } }), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workouts'], refetchType: 'all' });
      queryClient.refetchQueries(['workouts']);
      setIsOpen(false);
    },
  });

  const onClickHandler = () => {
    mutation.mutate(workoutId);
  };

  const triggerButton = (
    <button>{label ? label : <TrashIcon className="h-6 w-6 text-gray-500 hover:text-gray-200" />}</button>
  );

  return (
    <AlertDialog triggerButton={triggerButton} isOpen={isOpen} setIsOpen={setIsOpen}>
      {mutation.isLoading ? (
        <p>Deleting Exercise...</p>
      ) : (
        <div className="flex flex-col gap-4">
          <Title>Delete</Title>
          <Description>
            This action cannot be undone. This will permanently delete your workout and remove your data from our
            servers.
          </Description>
          <div className="flex justify-end gap-4">
            <Cancel asChild>
              <button>Cancel</button>
            </Cancel>
            {/* <Action asChild> */}
            <button onClick={onClickHandler}>Delete</button>
            {/* </Action> */}
          </div>
        </div>
      )}
    </AlertDialog>
  );
};

export default DeleteWorkoutDialog;
