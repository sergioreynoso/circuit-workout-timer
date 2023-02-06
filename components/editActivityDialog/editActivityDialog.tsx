import { Cancel, Title } from '@radix-ui/react-alert-dialog';
import { Pencil1Icon } from '@radix-ui/react-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { FormattedActivity } from '../../hooks/useFormatWorkout';
import { endPoints } from '../../lib/endPoints';
import AlertDialog from '../alertDialog/alertDialog';
import Button from '../button';
import Input from '../input';
import { Flex } from '../layout';

type Props = {
  activity: FormattedActivity;
};

const EditActivityDialog = ({ activity }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [{ name, duration, type }, setInputValue] = useState({
    name: activity.activity_name,
    duration: Math.round(activity.duration / 1000),
    type: activity.type,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation((data: FormattedActivity) => axios.put(endPoints.activity, data), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workout'] });
      setIsOpen(false);
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
      id: activity.id,
      activity_name: name,
      type: type,
      duration: Number(duration * 1000),
    });
  };

  const triggerButton = (
    <Button colors="transparent">
      <Pencil1Icon />
    </Button>
  );

  return (
    <AlertDialog triggerButton={triggerButton} isOpen={isOpen} setIsOpen={setIsOpen}>
      <Flex direction="column">
        <Title>Edit Exercise</Title>
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
          />
          <Input
            type="number"
            label="duration"
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
            {/* <Action asChild onClick={(event) => event.preventDefault()}> */}
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

export default EditActivityDialog;
