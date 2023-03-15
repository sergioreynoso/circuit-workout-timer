import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { Action, Cancel, Description } from '@radix-ui/react-alert-dialog';
import { useState } from 'react';
import useWorkoutMutation from '../../hooks/reactQueryHooks/useWorkoutMutation';
import AlertDialog from '../alertDialog';
import Button from '../button/button';
import CircleButton from '../circleButton/circleButton';

type DeleteWorkoutDialogProps = {
  workoutId: string;
};

const DeleteWorkoutDialog = ({ workoutId }: DeleteWorkoutDialogProps) => {
  const { deleteWorkout } = useWorkoutMutation('');
  const [isOpen, setIsOpen] = useState(false);

  const onClickHandler = () => {
    deleteWorkout.mutate(workoutId, {
      onSuccess: () => {
        setIsOpen(false);
      },
    });
  };

  function TriggerButton() {
    return (
      <AlertDialogPrimitive.Trigger asChild>
        <CircleButton intent="delete" description="Delete Workout" isBg={false} />
      </AlertDialogPrimitive.Trigger>
    );
  }

  return (
    <AlertDialog TriggerButton={TriggerButton} isOpen={isOpen} setIsOpen={setIsOpen} title="Delete workout">
      <div className="flex flex-col gap-4 p-2 sm:p-4">
        {deleteWorkout.isLoading && (
          <div className="absolute top-0 bottom-0 left-0 right-0 z-10 flex items-center justify-center bg-gray-900/95 ">
            <p className="text-xl font-bold text-gray-300">Deleting Workout...</p>{' '}
          </div>
        )}
        <Description>This action is irreversible and will delete your workout permanently.</Description>
        <div className="flex w-full justify-end gap-4">
          <Cancel asChild>
            <button className="text-md flex h-12 items-center justify-center gap-2 rounded-lg px-4 font-bold leading-7 sm:px-8 ">
              Cancel
            </button>
          </Cancel>
          <Action asChild>
            <Button intent="delete" onClick={onClickHandler}>
              Delete
            </Button>
          </Action>
        </div>
      </div>
    </AlertDialog>
  );
};

export default DeleteWorkoutDialog;
