import { Cancel, Description, Title } from '@radix-ui/react-alert-dialog';
import { TrashIcon } from '@radix-ui/react-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { endPoints } from '../../lib/endPoints';
import { styled } from '../../styles/stitches.congif';
import AlertDialog from '../alertDialog';
import Button from '../button';

type Props = {
  activityId: string;
};

const DeleteActivityDialog = ({ activityId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();
  const mutation = useMutation((id: string) => axios.delete(endPoints.activity, { data: { id: id } }), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workout'] });
      setIsOpen(false);
    },
  });

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    mutation.mutate(activityId);
  };

  const triggerButton = (
    <Button colors="transparent">
      <TrashIcon />
    </Button>
  );

  return (
    <AlertDialog triggerButton={triggerButton} isOpen={isOpen} setIsOpen={setIsOpen}>
      {mutation.isLoading ? (
        <p>Deleting Exercise...</p>
      ) : (
        <Wrapper css={{ flexDirection: 'column', gap: '$lg' }}>
          <Title>Delete Exercise</Title>
          <Description>
            This action cannot be undone. This will permanently delete your exercise and remove your data from our
            servers.
          </Description>
          <Wrapper css={{ justifyContent: 'flex-end', gap: '$lg' }}>
            <Cancel asChild>
              <Button>Cancel</Button>
            </Cancel>
            {/* <Action asChild> */}
            <Button onClick={onClickHandler}>Delete</Button>
            {/* </Action> */}
          </Wrapper>
        </Wrapper>
      )}
    </AlertDialog>
  );
};

const Wrapper = styled('div', {
  display: 'flex',
});

export default DeleteActivityDialog;
