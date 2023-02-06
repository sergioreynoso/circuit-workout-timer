import { Cancel, Title } from '@radix-ui/react-alert-dialog';
import { PlusIcon } from '@radix-ui/react-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { FormattedActivity } from '../../hooks/useFormatWorkout';
import AlertDialog from '../alertDialog/alertDialog';
import Button from '../button';
import Input from '../input';
import { Flex } from '../layout';

type Props = {
  workoutId: string;
  activitiesTotalCount: number;
};

const AddActivityDialog = ({ workoutId: id, activitiesTotalCount }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [{ name, duration, workoutId }, setInputValue] = useState({
    name: '',
    duration: 30,
    workoutId: id,
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (activity: FormattedActivity) => axios.post(`/api/v1/activity`, activity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workout', workoutId], exact: true });
      setIsOpen(false);
      setInputValue(prev => ({
        ...prev,
        name: '',
      }));
    },
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setInputValue(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    mutation.mutate({
      activity_name: name,
      type: 'WORK',
      duration: Number(duration * 1000),
      workoutId: workoutId,
      display_seq: activitiesTotalCount + 1,
    });
  };

  const triggerButton = (
    <Button colors="primary">
      <PlusIcon />
    </Button>
  );

  return (
    <AlertDialog triggerButton={triggerButton} isOpen={isOpen} setIsOpen={setIsOpen}>
      <Flex direction="column">
        <Title>Add Exercise</Title>
        <Flex
          as="form"
          css={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '$lg',
            gap: '$xl',
          }}
          onSubmit={onFormSubmit}
        >
          <Input
            type="text"
            label="Exercise Name"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder=""
            required={true}
            autoComplete="off"
          />
          <Input
            type="number"
            label="Duration in seconds"
            name="duration"
            value={duration}
            onChange={handleChange}
            placeholder=""
            required={true}
          />
          <div>{mutation.isLoading && 'Updating exercise...'}</div>
          <Flex css={{ justifyContent: 'flex-end', gap: '$lg' }}>
            <Cancel asChild>
              <Button>Cancel</Button>
            </Cancel>
            {/* <Action asChild> */}
            <Button colors="primary" type="submit">
              Save
            </Button>
            {/* </Action> */}
          </Flex>
        </Flex>
      </Flex>
    </AlertDialog>
  );
};

export default AddActivityDialog;
