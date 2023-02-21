import { Cancel, Description, Title } from '@radix-ui/react-alert-dialog';
import { TrashIcon } from '@radix-ui/react-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { endPoints } from '../../lib/endPoints';

import AlertDialog from '../alertDialog';
import Button from '../button';

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

  const triggerButton = (
    <button>
      <TrashIcon />
    </button>
  );

  return (
    <AlertDialog triggerButton={triggerButton} isOpen={isOpen} setIsOpen={setIsOpen}>
      {mutation.isLoading ? (
        <p>Deleting Exercise...</p>
      ) : (
        <div>
          <Title>Delete Exercise</Title>
          <Description>
            This action cannot be undone. This will permanently delete your exercise and remove your data from our
            servers.
          </Description>
          <div>
            <Cancel asChild>
              <Button>Cancel</Button>
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

export default DeleteActivityDialog;
