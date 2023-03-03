import { Cancel, Description, Title } from '@radix-ui/react-alert-dialog';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

import { TrashIcon } from '@radix-ui/react-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { endPoints } from '../../lib/endPoints';
import AlertDialog from '../alertDialog';
import CircleButton from '../circleButton/circleButton';
import Button from '../button/button';

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

  function TriggerButton() {
    return (
      <AlertDialogPrimitive.Trigger asChild>
        <CircleButton intent="delete" isBg={false} />
      </AlertDialogPrimitive.Trigger>
    );
  }

  return (
    <AlertDialog TriggerButton={TriggerButton} isOpen={isOpen} setIsOpen={setIsOpen}>
      {mutation.isLoading ? (
        <p>Deleting Exercise...</p>
      ) : (
        <div className="flex flex-col gap-4 p-2 sm:p-4">
          <Title className="mb-4 text-xl font-semibold leading-7 text-gray-300">Delete</Title>
          <Description>
            This action cannot be undone. This will permanently delete your workout and remove your data from our
            servers.
          </Description>
          <div className="flex w-full justify-end gap-4">
            <Cancel asChild>
              <Button intent="transparent">Cancel</Button>
            </Cancel>
            {/* <Action asChild> */}
            <Button intent="delete" onClick={onClickHandler}>
              Delete
            </Button>
            {/* </Action> */}
          </div>
        </div>
      )}
    </AlertDialog>
  );
};

export default DeleteWorkoutDialog;
