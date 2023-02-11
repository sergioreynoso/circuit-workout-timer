import { Cancel, Description, Title } from '@radix-ui/react-alert-dialog';
import { TrashIcon } from '@radix-ui/react-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { endPoints } from '../../lib/endPoints';
import AlertDialog from '../alertDialog';
import Button from '../button';
import { Flex } from '../layout';

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

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    mutation.mutate(workoutId);
  };

  const triggerButton = (
    <Button colors="transparent" css={{ padding: '$lg', borderRadius: '0' }}>
      {label ? label : <TrashIcon />}
    </Button>
  );

  return (
    <AlertDialog triggerButton={triggerButton} isOpen={isOpen} setIsOpen={setIsOpen}>
      {mutation.isLoading ? (
        <p>Deleting Exercise...</p>
      ) : (
        <Flex css={{ flexDirection: 'column', gap: '$lg' }}>
          <Title>Delete</Title>
          <Description>
            This action cannot be undone. This will permanently delete your workout and remove your data from our
            servers.
          </Description>
          <Flex css={{ justifyContent: 'flex-end', gap: '$lg' }}>
            <Cancel asChild>
              <Button>Cancel</Button>
            </Cancel>
            {/* <Action asChild> */}
            <Button onClick={onClickHandler}>Delete</Button>
            {/* </Action> */}
          </Flex>
        </Flex>
      )}
    </AlertDialog>
  );
};

export default DeleteWorkoutDialog;
