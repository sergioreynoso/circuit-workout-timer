import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { Cancel, Description, Title } from '@radix-ui/react-alert-dialog';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { endPoints } from '../../lib/endPoints';

import AlertDialog from '../alertDialog';
import Button from '../button/button';
import CircleButton from '../circleButton/circleButton';

type Props = {
  activityId: string;
};

const DeleteActivityDialog = ({ activityId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const workoutId = router.query.id as string;

  const queryClient = useQueryClient();
  const mutation = useMutation((id: string) => axios.delete(endPoints.activity, { data: { id: id } }), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workout', workoutId] });
      setIsOpen(false);
    },
  });

  const onClickHandler = () => {
    mutation.mutate(activityId);
  };

  function TriggerButton() {
    return (
      <AlertDialogPrimitive.Trigger asChild>
        <CircleButton intent="delete" isBg={false} />
      </AlertDialogPrimitive.Trigger>
    );
  }

  return (
    <AlertDialog TriggerButton={TriggerButton} isOpen={isOpen} setIsOpen={setIsOpen} title="Delete Activity">
      <div className="flex flex-col gap-4 p-2 sm:p-4">
        {mutation.isLoading && (
          <div className="absolute top-0 bottom-0 left-0 right-0 z-10 flex items-center justify-center bg-gray-900/95 ">
            <p className="text-xl font-bold text-gray-300">Deleting Activity...</p>{' '}
          </div>
        )}
        <Description className="text-base font-normal leading-6 text-gray-300">
          This action is irreversible and will delete your exercise and data permanently.
        </Description>
        <div className="mt-4 flex w-full justify-end gap-4">
          <Cancel asChild>
            <button className="text-md flex h-12 items-center justify-center gap-2 rounded-lg px-4 font-bold leading-7 sm:px-8 ">
              Cancel
            </button>
          </Cancel>
          {/* <Action asChild> */}
          <Button onClick={onClickHandler} intent="delete">
            Delete
          </Button>
          {/* </Action> */}
        </div>
      </div>
    </AlertDialog>
  );
};

export default DeleteActivityDialog;
